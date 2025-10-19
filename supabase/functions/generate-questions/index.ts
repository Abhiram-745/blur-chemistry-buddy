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

    const systemPrompt = `You are an expert GCSE chemistry teacher creating diverse exam-style practice questions. 
Your task is to:
1. Analyze the provided study content thoroughly
2. Generate ${numQuestions} highly diverse, exam-style question(s) based on that content
3. Each question MUST be COMPLETELY DIFFERENT from any previously asked questions
4. Questions should be between 3-6 marks each
5. Vary question types: recall, explain, describe, compare, calculate, apply knowledge
6. Test different aspects and angles of the content - don't repeat topics
7. Use different command words (explain, describe, compare, suggest, calculate, etc.)
8. CRITICAL: Maximum creativity - each question should feel fresh and unique
9. Return a JSON array of questions with this structure:
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
${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

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
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.9,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
