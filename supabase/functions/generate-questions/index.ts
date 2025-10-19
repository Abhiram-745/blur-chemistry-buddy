import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Very small stopword list to bias toward domain terms from the notes
const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","then","than","that","this","these","those",
  "is","are","was","were","be","been","being","to","of","in","on","for","as","at",
  "by","with","from","it","its","their","there","which","who","whom","into","out",
  "about","over","under","between","within","also","can","may","might","should","would",
]);

function extractKeywords(text: string, max = 20): string[] {
  const freq = new Map<string, number>();
  for (const raw of text.toLowerCase().split(/[^a-z0-9-]+/g)) {
    const w = raw.trim();
    if (w.length < 3) continue;
    if (STOPWORDS.has(w)) continue;
    // keep hyphenated terms and numbers in GCSE contexts (e.g., "group-7", "18th")
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
    // exact token or hyphen-term presence
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
      temperature: 0.2, // low creativity to avoid topic drift
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
    // Throw to let the caller generate a graceful on-topic fallback (200)
    throw new Error(`AI gateway error ${response.status}`);
  }

  const data = await response.json();
  const aiContent = data?.choices?.[0]?.message?.content ?? "";

  let parsed: any = null;
  try {
    parsed = typeof aiContent === "string" ? JSON.parse(aiContent) : aiContent;
  } catch {
    // Fallback: try to extract JSON object via regex
    const m = typeof aiContent === "string" ? aiContent.match(/\{[\s\S]*\}/) : null;
    if (m) {
      parsed = JSON.parse(m[0]);
    }
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
    console.log("[generate-questions] keywords:", keywords);

    const baseSystem = `You are an expert GCSE chemistry question writer. STRICT TOPIC LOCK:
- Only use facts explicitly present in the "Study Content" the user provides.
- Do NOT introduce topics not found in the content. If content is narrow, ask simpler recall.
- Absolutely avoid mentioning unrelated concepts (e.g., reaction rates, collisions, acids) unless they appear in the notes.
- Each question must include at least TWO of these exact keywords (case-insensitive): ${keywords.join(", ")}.
- Questions must NOT repeat any previous questions provided.`;

    const buildUserPrompt = (extraRules = "") => `Study Content (verbatim notes):\n\n${studyContent}\n\nCreate ${numQuestions} BLURT question(s) limited to the content above.\nRules:\n1) Keep each question 5-12 words, single line.\n2) Recall-style (term/definition/fact) – no scenarios or invented data.\n3) Must include at least TWO required keywords listed by the system.\n4) Must not match these previously asked questions (paraphrase not allowed):\n${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join("\n")}\n${extraRules}\n\nReturn JSON:\n{ "questions": [ { "question": string, "marks": 1, "expectedKeyPoints": string[] } ] }`;

    // First attempt
    const { parsed, errorResponse } = await callAI({
      systemPrompt: baseSystem,
      userPrompt: buildUserPrompt(),
    });
    if (errorResponse) return errorResponse;

    const validate = (obj: any) => {
      const out: any[] = [];
      const qs: any[] = obj?.questions ?? [];
      for (const q of qs) {
        const text = String(q?.question ?? "");
        const overlap = keywordOverlapCount(text, keywords);
        const valid = text.length > 0 && overlap >= 2;
        console.log("[generate-questions] candidate:", { text, overlap, valid });
        if (valid) out.push({
          question: text,
          marks: 1,
          expectedKeyPoints: Array.isArray(q?.expectedKeyPoints) ? q.expectedKeyPoints : [],
        });
      }
      return out;
    };

    let validQs = parsed ? validate(parsed) : [];

    // Retry once with stricter reminder if nothing valid
    if (!validQs.length) {
      const retry = await callAI({
        systemPrompt: baseSystem,
        userPrompt: buildUserPrompt(
          "CRITICAL: Your previous output failed validation. Include at least TWO of the required keywords verbatim. Do NOT drift from the notes.",
        ),
      });
      if (retry.errorResponse) return retry.errorResponse;
      validQs = retry.parsed ? validate(retry.parsed) : [];
    }

    // Emergency fallback: generate trivial recall from top keyword(s)
    if (!validQs.length && keywords.length) {
      const k = keywords.slice(0, Math.max(1, Math.min(2, keywords.length)));
      validQs = [
        {
          question: `State the meaning of: ${k.join(" and ")}.`,
          marks: 1,
          expectedKeyPoints: [k.join(", ")],
        },
      ];
    }

    return new Response(
      JSON.stringify({ questions: validQs.slice(0, numQuestions) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in generate-questions function:", error);
    // Graceful fallback to avoid blocking the UI when non-rate-limit errors happen
    const fallback = {
      questions: [
        {
          question: "Recall one key term from these notes.",
          marks: 1,
          expectedKeyPoints: [],
        },
      ],
    };
    return new Response(JSON.stringify(fallback), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
