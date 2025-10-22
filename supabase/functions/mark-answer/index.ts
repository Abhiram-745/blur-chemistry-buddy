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
    const { question, studentAnswer, expectedContent, marks } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert chemistry examiner marking GCSE exam answers with LENIENT marking criteria.

CRITICAL MARKING RULES:
1. For calculation questions: Award FULL marks if the numerical answer is correct, even if working/units are slightly different
2. For multi-part questions: Mark each part separately and award partial credit generously
3. Accept equivalent expressions (e.g., "0.01 mol" = "1 × 10⁻² mol" = "ten millimoles")
4. Accept correct chemical formulae with minor notation differences (e.g., "H2O" = "H₂O")
5. Award marks for correct reasoning even if final answer has minor errors
6. Be GENEROUS with marks - if the student shows understanding, give them credit
7. For balanced equations: Accept any correctly balanced form (coefficients may vary but ratios must be correct)

MARKING PROCESS:
- Read the full answer carefully before judging
- Look for correct numerical values, chemical formulae, and key concepts
- Award marks for partially correct answers
- Only deduct marks for fundamental errors or completely missing key points
- If the student demonstrates understanding of the concept, be lenient with presentation

Return JSON with: score (0-${marks}), keyIdeasCovered (array of strings showing what they got right), keyIdeasMissed (array of strings showing what they missed), and feedback (constructive string)`;

    const userPrompt = `Question (${marks} marks): ${question}

Expected Content/Key Concepts:
${expectedContent}

Student's Answer:
${studentAnswer}

MARKING INSTRUCTIONS:
- For calculation questions: Check if numerical answers are correct (allow for rounding)
- For explanation questions: Look for key concepts and understanding
- For multi-part questions: Award marks for each correct part
- Be LENIENT - if the answer demonstrates understanding, award marks
- Award partial credit wherever possible

Return your response as JSON with this exact structure:
{
  "score": <number between 0 and ${marks}>,
  "keyIdeasCovered": ["list specific correct points from the answer"],
  "keyIdeasMissed": ["list specific missing or incorrect points"],
  "feedback": "Clear feedback explaining: (1) what they got right, (2) what they missed, (3) how to improve"
}

IMPORTANT: Be generous with marks. Students should get high scores for correct answers.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
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
    
    console.log("[mark-answer] AI Response:", aiResponse.substring(0, 300));
    
    // Parse the JSON response from AI
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not parse AI response:", aiResponse);
      throw new Error("Invalid AI response format");
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    console.log("[mark-answer] Parsed result:", {
      score: result.score,
      maxMarks: marks,
      keyIdeasCoveredCount: result.keyIdeasCovered?.length,
      keyIdeasMissedCount: result.keyIdeasMissed?.length
    });
    
    return new Response(JSON.stringify(result), {
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
