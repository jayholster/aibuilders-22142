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
    const { prompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Evaluating prompt quality:', prompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert prompt engineering educator. Analyze prompts and provide friendly, conversational feedback. When appropriate, demonstrate advanced techniques like:
- Few-shot prompting (showing 2-3 examples before asking)
- Chain-of-thought reasoning (asking the AI to think step-by-step)
- Reflection prompting (asking AI to review and improve its own output)

Your feedback should feel encouraging and educational, not judgmental. Help users understand not just what to change, but why these techniques make prompts more effective.`
          },
          {
            role: 'user',
            content: `Analyze this prompt: "${prompt}"`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "evaluate_prompt",
              description: "Provide conversational feedback and improvement suggestions for a prompt",
              parameters: {
                type: "object",
                properties: {
                  feedback: {
                    type: "string",
                    description: "2-3 sentences of friendly, conversational feedback explaining what's working and what could be better. Be encouraging!"
                  },
                  suggestions: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 3,
                    maxItems: 5,
                    description: "Specific, actionable suggestions. Include advanced techniques (few-shot, chain-of-thought, reflection) when they would strengthen the prompt. Explain WHY each suggestion helps."
                  },
                  improvedPrompt: {
                    type: "string",
                    description: "A complete rewrite incorporating improvements. If suggesting few-shot, include example demonstrations. If suggesting chain-of-thought, add 'think step-by-step' phrasing. If suggesting reflection, add a review step."
                  },
                  techniquesUsed: {
                    type: "array",
                    items: { 
                      type: "string",
                      enum: ["few-shot", "chain-of-thought", "reflection", "specificity", "context", "constraints"]
                    },
                    description: "Which techniques were applied in the improved version"
                  }
                },
                required: ["feedback", "suggestions", "improvedPrompt", "techniquesUsed"]
              }
            }
          }
        ],
        tool_choice: {
          type: "function",
          function: { name: "evaluate_prompt" }
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI gateway error:', response.status, error);
      throw new Error('AI evaluation failed');
    }

    const data = await response.json();
    const toolCall = data.choices[0].message.tool_calls?.[0];
    
    if (!toolCall || toolCall.function.name !== 'evaluate_prompt') {
      throw new Error('No valid evaluation returned');
    }

    const evaluation = JSON.parse(toolCall.function.arguments);
    console.log('Evaluation complete:', evaluation);

    return new Response(JSON.stringify(evaluation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in evaluate-prompt-quality:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
