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
      systemPrompt = `You are an AQA GCSE Chemistry examiner creating exam questions for GCSE level students.

CRITICAL RULES:
- Generate ONLY 1 question based DIRECTLY on the study content provided
- Questions MUST be appropriate for GCSE level (NOT A-level or university level)
- Questions MUST test content that appears in the study notes
- Keep questions at 1-6 marks
- DO NOT ask about experimental design, practical methods, or procedures UNLESS they are explicitly covered in the study content
- Focus on: recall, describe, explain, calculate, compare (using content from notes)
- Questions can ask to: define terms, state facts, explain concepts, do calculations, compare/contrast (all from the notes)

QUESTION TYPES (choose one):
- Recall: "What is...?", "Define...", "State..."
- Explain: "Explain why...", "Explain how..."
- Calculate: "Calculate the..." (only if calculation methods are in the notes)
- Compare: "Compare X and Y", "What is the difference between..."
- Describe: "Describe the..."

AVOID:
- Complex multi-part experimental design questions
- Content not in the study notes
- A-level or university-level complexity
- Asking students to "suggest methods" or "design experiments" unless explicitly taught
- Questions requiring knowledge beyond what's in the provided content

Return as JSON: 
{
  "questions": [{
    "question": "question text with [X marks]",
    "marks": X,
    "expectedKeyPoints": ["point 1", "point 2", ...]
  }]
}`;
    } else {
      systemPrompt = `You are a GCSE chemistry teacher creating SIMPLE memory recall questions for the BLURT technique.

CRITICAL RULES FOR BLURT QUESTIONS:
- Generate ONLY 1 question
- Question must be EXTREMELY SHORT (max 1 sentence, ideally just a few words)
- Test ONLY direct memory recall - NO calculations, NO application, NO reasoning
- ONLY ask for: definitions, facts, names, lists, simple statements
- Answer should be a direct fact from the memorized content

GOOD EXAMPLES:
- "What is a mole?"
- "Define relative atomic mass."
- "Name the three states of matter."
- "What is Avogadro's constant?"
- "List two properties of acids."

BAD EXAMPLES (DO NOT GENERATE THESE):
- Questions requiring calculations or working
- Questions asking to "explain", "calculate", "work out", or "show your working"
- Multi-part questions
- Questions requiring diagrams or models
- Questions with "given that" or data to analyze
- Any question longer than one simple sentence

Return as JSON:
{
  "questions": [{
    "question": "question text",
    "marks": 1
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
        temperature: questionType === 'exam' ? 0.9 : 0.3, // Lower temperature for blurt = more consistent simple questions
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