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

Generate 1 varied exam-style question based on the study content. Include:
- Questions can be 1-6 marks
- Mix of recall, explain, describe, calculate types
- Questions requiring diagrams or labelled drawings
- Questions using data from tables or graphs
- CRITICAL: Generate questions that are VERY DIFFERENT from any previously asked questions

For the question, provide:
1. The question text with clear mark allocation [X marks]
2. A detailed mark scheme showing:
   - Each marking point
   - Acceptable alternatives
   - Command words explained (state, describe, explain, etc.)
3. Model answer

Return as JSON: 
{
  "questions": [{
    "question": "question text with [X marks]",
    "marks": X,
    "expectedKeyPoints": ["point 1", "point 2", ...]
  }]
}`;
    } else {
      systemPrompt = `You are a GCSE chemistry teacher creating blurting recall questions.

Generate 1 recall question that tests memory and understanding. 
- Can be simple recall, requiring explanations, about processes/experiments, asking for examples, or connecting multiple concepts
- CRITICAL: Make this question COMPLETELY DIFFERENT from any previously asked questions
- Test a different aspect of the material
- Use different wording and question structure

Return as JSON:
{
  "questions": [{
    "question": "question text",
    "marks": 3
  }]
}`;
    }

    let userPrompt = `Study Content:\n\n${studyContent}`;
    
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
- Test different levels (if previous was recall, now do explanation/application)
- Use different question formats (if previous was short answer, now try multi-part)`;
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
        temperature: 0.9, // Higher temperature for more creativity and diversity
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