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
    const system = `You are an expert GCSE chemistry examiner creating Grade 8–9 level APPLICATION-BASED exam questions.

CRITICAL FORMATTING RULES:
1. Write chemical equations on ONE line, properly formatted (e.g., "2Al + 3Cl₂ → 2AlCl₃" or "2Mg + O₂ → 2MgO")
2. NEVER break chemical equations across multiple lines or separate state symbols
3. Keep the entire question text together - do NOT split multi-part questions incorrectly
4. Format multi-part questions as: "(a) First question (X marks)" NOT "a) , First question"
5. ALWAYS maintain proper spacing and punctuation between parts

CONTENT REQUIREMENTS:
1. Generate questions ONLY about the concepts in the provided study content
2. If the study content is about moles, mass, and Mr calculations - create questions testing those calculations
3. If the study content is about Avogadro's constant - create questions about particle numbers
4. If the study content is about balancing equations - create questions about equation balancing
5. DO NOT introduce topics not covered in the study content
6. Include at least TWO of these keywords: ${shuffledKws.join(", ")}

QUESTION STRUCTURE:
1. Write application-based questions, NOT simple recall or plug-in problems
2. Use data-based scenarios with realistic numerical values (masses, volumes, concentrations)
3. Require multi-step reasoning (students must link n=m/Mr, V=n×24, concentration calculations, Avogadro's constant)
4. Create MULTI-PART questions with sub-questions (a), (b), (c) that build on each other
5. Total marks per question: 6-8 marks

FOR MOLES/MASS/Mr QUESTIONS (when study content covers this):
- Start with a properly formatted balanced chemical equation on ONE line
- Provide specific numerical data with appropriate precision (e.g., 4.80 g, 3.00 g, 2.40 g)
- Part (a): Calculate moles from mass using n=m/Mr (2-3 marks)
- Part (b): Use balanced equation to find product moles (1-2 marks)
- Part (c): Calculate mass of product using m=n×Mr (2-3 marks)
- Part (d): Limiting reactant calculation or practical consideration (2-3 marks)
- Include relevant data (Ar values, Mr values)
- Example: "A student heats 4.80 g of magnesium in excess oxygen. 2Mg + O₂ → 2MgO (a) Calculate the number of moles of magnesium used. (Ar: Mg=24) (2 marks) (b) Using the balanced equation, determine the number of moles of magnesium oxide that can form. (1 mark) (c) Calculate the mass of magnesium oxide produced. (Mr: MgO=40) (2 marks) (d) A second student uses 3.00 g of oxygen instead of excess. Determine which reactant is limiting. (Ar: O=16) (3 marks)"

FOR AVOGADRO'S CONSTANT QUESTIONS (when study content covers this):
- Include calculations involving 6.022 × 10²³ particles
- Ask students to convert between moles and number of particles
- Include mass, moles, and particles in multi-step calculations
- Example: "Calculate the mass and number of particles in a gold sample"

FOR METHOD/PRACTICAL QUESTIONS:
- Use multi-part format (a), (b), (c)
- Ask how to improve accuracy, identify experimental errors, or ensure reactions are complete
- Connect theory to real experimental scenarios
- Require logical reasoning and evaluation skills

DIFFICULTY LEVEL (Grade 8–9):
- Use unfamiliar contexts not directly taught
- Require combining multiple concepts/equations
- Include challenging unit conversions or rearrangements
- Test deep understanding, not just memorization

Output ONLY valid JSON format`;

    const user = `Study Content:\n\n${studyContent}\n\nCreate ${numQuestions} Grade 8–9 level APPLICATION-BASED GCSE exam question(s) about ONLY the content above.

CRITICAL REQUIREMENTS:
✓ Format chemical equations properly on ONE line (e.g., "2Mg + O₂ → 2MgO")
✓ Create MULTI-PART questions with (a), (b), (c) sub-questions
✓ Use realistic numerical data with appropriate precision
✓ Require multi-step reasoning linking different equations
✓ Include both quantitative calculations AND method/explanation parts
✓ Set difficulty at Grade 8–9: unfamiliar contexts, tricky conversions, logical reasoning
✓ Add practical-based questions about accuracy, errors, or ensuring completion
✓ Total marks per question: 6-8 marks

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
