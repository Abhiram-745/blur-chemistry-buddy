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
      systemPrompt = `You are an AQA GCSE Chemistry examiner writing questions STRICTLY aligned to the AQA GCSE Chemistry specification and the provided study notes.

NON-NEGOTIABLE RULES:
- Generate ONLY 1 question
- Base it DIRECTLY and EXCLUSIVELY on the study content (use its exact terminology)
- 1–4 marks preferred (max 6), concise stem
- DO NOT invent scenarios, experiments, or data unless they appear in the notes
- NO "Experiment 1/2", "critically evaluate", "justify", "suggest", or open investigations
- Keep GCSE level; avoid A-level complexity
- If calculation is asked, only use formulas/methods explicitly present in the notes

ALLOWED QUESTION TYPES (choose one):
- State/Define/Name (recall)
- Describe
- Explain (one clear reason or mechanism)
- Calculate (single-step, if method given in notes)
- Compare (only if both items are in the notes)

OUTPUT FORMAT:
Return as JSON:
{
  "questions": [{
    "question": "question text with [X marks]",
    "marks": X,
    "expectedKeyPoints": ["point 1", "point 2"]
  }]
}`;
    } else {
      systemPrompt = `You are a GCSE chemistry teacher creating SIMPLE memory recall questions for the BLURT technique.

ABSOLUTE RULES - NO EXCEPTIONS:
- Generate ONLY 1 question
- Question MUST be 5-10 words maximum
- ONLY test direct recall of facts, definitions, or terms from the study content
- NO application, NO reasoning, NO analysis, NO comparison, NO evaluation
- NO scenarios, NO experiments, NO problem-solving
- NO "explain why", "justify", "evaluate", "compare experiments", "calculate"
- The question must be answerable with a simple fact stated directly in the study notes

YOU MUST ONLY ASK THESE TYPES:
1. "What is [term]?" - for definitions
2. "Define [term]" - for definitions  
3. "State [fact]" - for simple facts
4. "Name [things]" - for lists
5. "What does [term] mean?" - for meanings

GOOD EXAMPLES (USE THESE STYLES ONLY):
- "What is a mole?"
- "Define relative atomic mass."
- "State Avogadro's constant."
- "What does concentration mean?"
- "Name two types of bonds."

FORBIDDEN QUESTION TYPES (NEVER GENERATE):
- Any question with experimental scenarios or data
- Questions asking to compare, contrast, or evaluate anything
- Questions with "Experiment 1", "Experiment 2", or any experimental setup
- Questions asking to "justify", "critically evaluate", or "explain why"
- Questions mentioning specific conditions (temperatures, concentrations, masses)
- Multi-sentence questions or questions with multiple clauses
- Application-based or problem-solving questions
- Any question longer than 10 words

EXAMPLE OF WHAT TO NEVER DO:
"A student is investigating... Critically evaluate which experiment..." - NEVER GENERATE THIS TYPE

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
      if (questionType === 'blurt') {
        userPrompt += `\n\nYou have ALREADY asked these blurt questions:\n${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}\n\nDo NOT repeat the same fact or wording.\nPick a different short fact/term directly from the study content.\nKeep it a single 5–10 word recall question with no scenarios or calculations.`;
      } else {
        userPrompt += `\n\nYou have ALREADY asked these exam questions:\n${previousQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}\n\nConstraints:\n- Do NOT repeat the same subtopic or wording\n- Select a different point from the same study content\n- Stay within allowed GCSE types; 1–4 marks; no invented scenarios or multi-part unless the notes explicitly present them`;
      }
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
        temperature: questionType === 'exam' ? 0.4 : 0.2, // Lower temperature for both; reduce creativity for exam
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