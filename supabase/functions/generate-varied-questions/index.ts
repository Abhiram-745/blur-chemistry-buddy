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
    const key = w;
    freq.set(key, (freq.get(key) ?? 0) + 1);
  }
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([w]) => w);
}

function keywordOverlapCount(text: string, keywords: string[]): number {
  const t = text.toLowerCase();
  let count = 0;
  for (const k of keywords) {
    if (t.includes(k)) count++;
  }
  return count;
}

async function callAI({ systemPrompt, userPrompt }: { systemPrompt: string; userPrompt: string }) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.25,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      return {
        errorResponse: new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        ),
      } as const;
    }
    if (response.status === 402) {
      return {
        errorResponse: new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        ),
      } as const;
    }
    const t = await response.text();
    console.error("AI gateway error:", response.status, t);
    return {
      errorResponse: new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    } as const;
  }

  const data = await response.json();
  const aiContent = data?.choices?.[0]?.message?.content ?? "";

  let parsed: any = null;
  try {
    parsed = typeof aiContent === "string" ? JSON.parse(aiContent) : aiContent;
  } catch {
    const m = typeof aiContent === "string" ? aiContent.match(/\{[\s\S]*\}/) : null;
    if (m) parsed = JSON.parse(m[0]);
  }
  return { parsed } as const;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { studyContent, numQuestions = 1, previousQuestions = [] } = await req.json();

    if (!studyContent || typeof studyContent !== "string") {
      return new Response(JSON.stringify({ error: "Missing studyContent" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const keywords = extractKeywords(studyContent, 24);
    console.log("[generate-varied-questions] keywords:", keywords);

    const baseSystem = `You are an expert GCSE chemistry examiner writing application-focused EXAM questions. STRICT TOPIC LOCK:\n- Only use information explicitly in the student's notes (Study Content).\n- Do NOT invent experiments or introduce topics absent from the notes.\n- Avoid reaction-rate/collision-theory/acid-base contexts unless present in notes.\n- Each question must include at least TWO of these exact keywords (case-insensitive): ${keywords.join(", ")}.\n- Each new question must not repeat previous ones in wording or concept, but MUST remain on the SAME topic.`;

    const buildUser = (extra = "") => `Study Content (verbatim notes):\n\n${studyContent}\n\nCreate ${numQuestions} EXAM-STYLE question(s) about ONLY the content above.\nRules:\n1) 1–6 marks each, appropriate for GCSE.\n2) Prefer application/interpretation of the SAME topic (data, compare/contrast, explain why/how) BUT still grounded in the SAME notes.\n3) Include at least TWO required keywords from the system prompt in the question text.\n4) Do not repeat these previously asked questions (do not test the same idea):\n${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join("\n")}\n${extra}\n\nReturn JSON:\n{ "questions": [ { "question": string, "marks": number, "expectedKeyPoints": string[] } ] }`;

    const { parsed, errorResponse } = await callAI({
      systemPrompt: baseSystem,
      userPrompt: buildUser(),
    });
    if (errorResponse) return errorResponse;

    const validate = (obj: any) => {
      const out: any[] = [];
      const qs: any[] = obj?.questions ?? [];
      for (const q of qs) {
        const text = String(q?.question ?? "");
        const marks = Math.min(6, Math.max(1, Number(q?.marks ?? 3)));
        const overlap = keywordOverlapCount(text, keywords);
        const valid = text.length > 0 && overlap >= 2;
        console.log("[generate-varied-questions] candidate:", { text, marks, overlap, valid });
        if (valid) out.push({
          question: text,
          marks,
          expectedKeyPoints: Array.isArray(q?.expectedKeyPoints) ? q.expectedKeyPoints : [],
        });
      }
      return out;
    };

    let validQs = parsed ? validate(parsed) : [];

    if (!validQs.length) {
      const retry = await callAI({
        systemPrompt: baseSystem,
        userPrompt: buildUser(
          "CRITICAL: Your previous output failed topic-lock validation. Include at least TWO of the required keywords verbatim and stay within the notes.",
        ),
      });
      if (retry.errorResponse) return retry.errorResponse;
      validQs = retry.parsed ? validate(retry.parsed) : [];
    }

    // Emergency fallback: produce a short, on-notes compare/justify using a top keyword
    if (!validQs.length && keywords.length) {
      const k = keywords.slice(0, 2);
      validQs = [
        {
          question: `Explain how ${k.join(" and ")} relate in these notes.`,
          marks: 3,
          expectedKeyPoints: k,
        },
      ];
    }

    return new Response(
      JSON.stringify({ questions: validQs.slice(0, numQuestions) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in generate-varied-questions function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
