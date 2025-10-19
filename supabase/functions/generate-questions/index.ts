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
    const { studyContent, numQuestions = 1, previousQuestions = [] } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert AQA GCSE chemistry examiner creating application-based exam questions. 
Your task is to:
1. Analyze the provided study content thoroughly
2. Generate ${numQuestions} APPLICATION-BASED exam question(s)
3. Each question MUST be COMPLETELY DIFFERENT from any previously asked questions
4. Questions should be 1-6 marks and sometimes require APPLICATION of knowledge, not just recall
5. Focus on: explain WHY/HOW, compare/contrast, analyze data, apply to new situations, evaluate, calculate with reasoning
6. Avoid simple recall - students must USE the knowledge to solve problems
7. Use command words: explain, evaluate, compare, analyze, predict, justify, suggest why, state, define
8. Test understanding through application to scenarios, data interpretation, or problem-solving
9. CRITICAL: Maximum creativity - each question should feel fresh and unique
10. Return a JSON array of questions with this structure:
{
  "questions": [
    {
      "question": "The actual question text",
      "marks": <number between 3-6>,
      "expectedKeyPoints": ["key point 1", "key point 2", ...]
    }
  ]
}`;

    let userPrompt = `Study Content:
${studyContent}

Generate ${numQuestions} unique exam-style question(s) based on this content. Make sure each question tests different aspects of the material.`;

    if (previousQuestions.length > 0) {
      userPrompt += `\n\nCRITICAL: You have ALREADY asked these questions:
${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join("\n")}

DO NOT:
- Ask about the same topics or concepts
- Use similar wording or question structure
- Test the same knowledge areas

INSTEAD:
- Focus on completely different aspects of the content
- Use different command words and question styles
- Test different levels of understanding (if previous was recall, now do application, etc.)`;
    }

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
        temperature: 0.9,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse the JSON response from AI
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not parse AI response:", aiResponse);
      throw new Error("Invalid AI response format");
    }

    const result = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-questions function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
