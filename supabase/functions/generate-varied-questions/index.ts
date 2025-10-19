import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { studyContent, questionType, previousQuestions = [] } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    
    if (questionType === 'exam') {
      systemPrompt = `You are a GCSE Chemistry question generator. Your ONLY job is to create questions from the study content provided.

ABSOLUTE REQUIREMENTS:
1. Generate EXACTLY 1 question
2. Question MUST use ONLY terms, concepts, and facts EXPLICITLY stated in the study content
3. DO NOT invent experiments, scenarios, or contexts not in the study content
4. DO NOT mention topics like "collision theory", "reaction rates", "marble chips", or ANY other topics unless they are EXPLICITLY in the study content provided
5. Keep questions 1-4 marks, GCSE appropriate
6. Use ONLY these question types: State, Define, Describe, Explain, Calculate (if formulas provided), Compare (if both items present)

FORBIDDEN:
- Any topic, term, or concept not explicitly in the study content
- Experimental scenarios unless described in the notes
- Complex multi-step questions
- Application to contexts outside the study content

Return JSON:
{
  "questions": [{
    "question": "question text [X marks]",
    "marks": X,
    "expectedKeyPoints": ["point 1", "point 2"]
  }]
}`;
    } else {
      systemPrompt = `You are a GCSE Chemistry blurt question generator. Your ONLY job is to create simple recall questions from the study content provided.

ABSOLUTE REQUIREMENTS:
1. Generate EXACTLY 1 question
2. Question must be 5-10 words maximum
3. Question MUST ask about a fact, term, or definition EXPLICITLY stated in the study content
4. DO NOT mention ANY topics not in the study content (e.g., no "collision theory", "reaction rates", etc. unless in the notes)
5. Question types ONLY: "What is...", "Define...", "State...", "Name..."

FORBIDDEN:
- Any topic not explicitly in the study content
- Application or reasoning questions
- Scenarios or experiments
- Questions longer than 10 words

Return JSON:
{
  "questions": [{
    "question": "question text",
    "marks": 1
  }]
}`;
    }

    let userPrompt = `HERE IS THE STUDY CONTENT - YOU MUST ONLY CREATE QUESTIONS FROM THIS CONTENT:\n\n${studyContent}\n\n---END OF STUDY CONTENT---\n\nCRITICAL: Generate a question using ONLY the information above. Do NOT use any topics, terms, or concepts not explicitly written in the study content above.`;
    
    if (previousQuestions.length > 0) {
      userPrompt += `\n\nPrevious questions:\n${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}\n\nGenerate a different question about a different point from the SAME study content above. Stay within the same topic.`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI API error:', error);
      throw new Error('Failed to generate questions');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return new Response(
      JSON.stringify({ questions: parsed.questions || parsed }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );

  } catch (error) {
    console.error('Error in generate-varied-questions:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
