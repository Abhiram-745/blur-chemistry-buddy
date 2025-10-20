import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","then","than","that","this","these","those",
  "is","are","was","were","be","been","being","to","of","in","on","for","as","at",
  "by","with","from","it","its","their","there","which","who","whom","into","out",
  "about","over","under","between","within","also","can","may","might","should","would",
]);

function extractKeywords(text: string, max = 24): string[] {
  const freq = new Map<string, number>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9-]+/g)) {
    const w = raw.trim();
    if (w.length < 3) continue;
    if (STOPWORDS.has(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return Array.from(freq.entries()).sort((a,b) => b[1]-a[1]).slice(0, max).map(([w]) => w);
}

function makeExamFallback({ studyContent, numQuestions, previousQuestions }: { studyContent: string; numQuestions: number; previousQuestions: string[] }) {
  const kws = extractKeywords(studyContent, 30);
  const prev = new Set((previousQuestions || []).map(String));
  const questions: any[] = [];
  for (const kw of kws.slice(0, 10)) {
    const q = `Explain how ${kw} is described in these notes.`;
    if (!prev.has(q)) {
      questions.push({ question: q, marks: 3, expectedKeyPoints: [kw] });
    }
    if (questions.length >= numQuestions) break;
  }
  if (!questions.length) {
    questions.push({ question: "Explain one idea from these notes.", marks: 2, expectedKeyPoints: [] });
  }
  return { questions };
}

async function callLovableAIWithTimeout(payload: any, timeoutMs = 20000) {
  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) throw new Error("LOVABLE_API_KEY is not configured");
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await resp.text();
    if (!resp.ok) throw new Error(`Lovable AI error ${resp.status}: ${text}`);
    return JSON.parse(text);
  } finally { clearTimeout(id); }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { studyContent, numQuestions = 1, previousQuestions = [] } = await req.json();
    if (!studyContent || typeof studyContent !== "string") {
      return new Response(JSON.stringify({ error: "Missing studyContent" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const fallback = makeExamFallback({ studyContent, numQuestions, previousQuestions });

    const kws = extractKeywords(studyContent, 24);
    // Shuffle keywords to vary focus each time
    const shuffledKws = [...kws].sort(() => Math.random() - 0.5);
    const system = `You are an expert GCSE chemistry examiner creating APPLICATION-BASED exam questions. STRICT RULES:
1. Stay fully within the provided study content - no invented experiments or data
2. Include at least TWO of these keywords: ${shuffledKws.join(", ")}
3. Create MULTI-PART questions with sub-questions (a), (b), (c) that build on each other
4. For CALCULATION questions (moles, mass, concentration, limiting reactants):
   - ALWAYS provide the balanced chemical equation first
   - Use realistic numerical data with decimals (e.g., 4.05g, 7.10g)
   - Part (a): Calculate limiting reactant with specific masses (4 marks)
   - Part (b): Calculate mass of product formed (2 marks)  
   - Part (c): Add a practical/experimental consideration (2 marks)
   - Provide relative atomic masses when needed (e.g., Ar: Al=27, Cl=35.5)
   - Example: "Aluminium reacts with chlorine to form aluminium chloride. 2Al + 3Cl₂ → 2AlCl₃ (a) Calculate the limiting reactant if 4.05 g of Al reacts with 7.10 g of Cl₂. (4 marks) (b) Calculate the mass of aluminium chloride formed. (2 marks) (c) Explain one way to ensure the reaction has gone to completion. (2 marks)"
5. For NON-CALCULATION questions:
   - Still use multi-part format (a), (b), (c)
   - Focus on application, evaluation, and justification
   - Connect theory to practical scenarios
6. Output ONLY valid JSON format`;

    const user = `Study Content:\n\n${studyContent}\n\nCreate ${numQuestions} APPLICATION-BASED GCSE EXAM question(s) about ONLY the content above.

CRITICAL REQUIREMENTS:
- Create MULTI-PART questions with (a), (b), (c) sub-questions
- For CALCULATION questions:
  * Start with a balanced chemical equation
  * Provide specific masses with decimals (e.g., 4.05g, 7.10g)
  * Part (a): Limiting reactant calculation (4 marks)
  * Part (b): Mass of product calculation (2 marks)
  * Part (c): Practical consideration or explanation (2 marks)
  * Include relevant atomic masses (e.g., Ar: Al=27, Cl=35.5)
- For NON-CALCULATION questions:
  * Use multi-part structure with increasing complexity
  * Focus on application, not just recall
  * Include practical scenarios and justifications
- VARY each question: different concepts/reactions each time
- Total marks per question: 6-8 marks

AVOID repeating these previous questions:
${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join("\n")}

Return ONLY this JSON structure:
{ "questions": [ { "question": string, "marks": number (6-8), "expectedKeyPoints": string[] } ] }`;

    let data: any | null = null;
    try {
      console.log("[generate-varied-questions] Calling Lovable AI...");
      data = await callLovableAIWithTimeout({
        model: "google/gemini-2.5-flash",
        messages: [ { role: "system", content: system }, { role: "user", content: user } ],
      });
    } catch (e) {
      console.warn("[generate-varied-questions] Lovable AI call failed, using fallback:", e);
      return new Response(JSON.stringify(fallback), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const content = data?.choices?.[0]?.message?.content;
    let parsed: any = null;
    try { parsed = typeof content === "string" ? JSON.parse(content) : content; }
    catch { const m = typeof content === "string" ? content.match(/\{[\s\S]*\}/) : null; if (m) parsed = JSON.parse(m[0]); }

    const out: any[] = [];
    const prev = new Set((previousQuestions || []).map(String));
    const arr: any[] = parsed?.questions ?? [];
    for (const q of arr) {
      const text = String(q?.question ?? "");
      if (!text || prev.has(text)) continue;
      const lower = text.toLowerCase();
      let overlap = 0; for (const k of kws) { if (lower.includes(k)) overlap++; }
      if (overlap < 2) continue;
      const marks = Math.min(6, Math.max(1, Number(q?.marks ?? 3)));
      out.push({ question: text, marks, expectedKeyPoints: Array.isArray(q?.expectedKeyPoints) ? q.expectedKeyPoints : [] });
      if (out.length >= numQuestions) break;
    }

    if (!out.length) {
      return new Response(JSON.stringify(fallback), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ questions: out }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error in generate-varied-questions:", error);
    return new Response(JSON.stringify({ questions: [ { question: "Explain one idea from these notes.", marks: 2, expectedKeyPoints: [] } ] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
