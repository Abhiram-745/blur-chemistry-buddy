import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, pairContent, previousKeywords } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are a helpful tutor creating memorization questions for students. 
Generate 3-5 blurting questions based ONLY on the content provided. 
These should test recall of key facts, definitions, processes, or concepts from the material.

IMPORTANT: Return ONLY a JSON array of objects with this structure:
[
  {
    "question": "What is...?",
    "keyKeywords": ["keyword1", "keyword2"],
    "marks": 2
  }
]

No explanations, no markdown, just the JSON array.`;

    const userPrompt = `Based on this study content:

${pairContent}

Generate 3-5 blurting questions that test key information from this specific section.

${previousKeywords && previousKeywords.length > 0 ? `Try to focus on different concepts than these already covered: ${previousKeywords.join(', ')}` : ''}`;

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
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limits exceeded, please try again later.");
      }
      if (response.status === 402) {
        throw new Error("Payment required, please add funds to your Lovable AI workspace.");
      }
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const textResponse = data.choices?.[0]?.message?.content;
    
    if (!textResponse) {
      throw new Error('No response from AI');
    }

    // Parse JSON from response
    const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Could not parse questions from response');
    }

    const questions = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify({ questions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-blurt-questions:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});