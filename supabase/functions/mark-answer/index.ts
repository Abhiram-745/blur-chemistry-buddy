import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { questions } = await req.json();
    
    if (!questions || !Array.isArray(questions)) {
      throw new Error("Missing or invalid questions parameter");
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const feedback = await Promise.all(questions.map(async (q: any) => {
      const userAnswerLower = q.userAnswer.toLowerCase();
      const coveredKeywords: string[] = [];
      const missedKeywords: string[] = [];

      q.keyKeywords.forEach((keyword: string) => {
        if (userAnswerLower.includes(keyword.toLowerCase())) {
          coveredKeywords.push(keyword);
        } else {
          missedKeywords.push(keyword);
        }
      });

      // Get AI feedback
      const prompt = `You are a helpful tutor providing constructive feedback on a blurting practice answer.

Question: ${q.question}

Student's Answer: ${q.userAnswer}

Key concepts they covered: ${coveredKeywords.join(', ') || 'None'}
Key concepts they missed: ${missedKeywords.join(', ') || 'None'}

Provide brief, encouraging feedback (2-3 sentences) that:
- Acknowledges what they did well
- Explains what was missing or could be improved
- Is constructive and motivating

Keep it concise and student-friendly.`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "user", content: prompt }
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limits exceeded, please try again later.");
        }
        if (response.status === 402) {
          throw new Error("Payment required, please add funds to your Lovable AI workspace.");
        }
        throw new Error("AI gateway error");
      }

      const data = await response.json();
      const aiFeedback = data.choices[0].message.content;

      return {
        feedback: aiFeedback,
        coveredKeywords,
        missedKeywords
      };
    }));

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in mark-answer function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
