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
      systemPrompt = `You are an AQA GCSE Chemistry examiner creating high-quality exam questions.

Generate 3 varied exam-style questions based on the study content. Include:
- 1 marker questions (recall/definition)
- 2 marker questions (explain/describe)
- 4-6 marker questions (extended response)
- Calculation questions with data
- Questions requiring diagrams or labelled drawings
- Questions using data from tables or graphs

For EACH question, provide:
1. The question text with clear mark allocation [X marks]
2. A detailed mark scheme showing:
   - Each marking point
   - Acceptable alternatives
   - Command words explained (state, describe, explain, etc.)
3. Model answer

Return as JSON array: 
[{
  "question": "question text with [X marks]",
  "marks": X,
  "markScheme": ["point 1", "point 2", ...],
  "modelAnswer": "example answer"
}]`;
    } else {
      systemPrompt = `You are a GCSE chemistry teacher creating blurting recall questions.

Generate 5 diverse recall questions that test memory and understanding. Include:
- Simple recall questions
- Questions requiring explanations
- Questions about processes or experiments
- Questions asking for examples
- Questions connecting multiple concepts

IMPORTANT: Make questions SIGNIFICANTLY DIFFERENT from each other. Avoid repetition.

Return as JSON array:
[{
  "question": "question text",
  "type": "recall|explain|process|example|connection"
}]`;
    }

    let userPrompt = `Study Content:\n\n${studyContent}`;
    
    if (previousQuestions.length > 0) {
      userPrompt += `\n\nIMPORTANT: You have already asked these questions:\n${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}\n\nGenerate COMPLETELY DIFFERENT questions. Do NOT ask about the same topics or use similar wording.`;
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