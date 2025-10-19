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
    const { subjectArea, gradeLevel, learningObjectives, aiTools, duration } = await req.json();
    console.log('Generating assignment ideas for:', { subjectArea, gradeLevel, learningObjectives, aiTools, duration });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert educational consultant specializing in AI tool integration across all subject areas in classroom settings. Generate concise, practical assignment ideas that work for any teaching discipline.`;

    const userPrompt = `Create 1-2 simple assignment ideas (200-300 words total) with these parameters:

Subject Area: ${subjectArea}
Grade Level: ${gradeLevel}
Learning Objectives: ${learningObjectives}
Available AI Tools: ${aiTools}
Assignment Duration: ${duration}

For each assignment, provide:
- Clear title relevant to the subject area
- Brief description (2-3 sentences) showing how AI enhances learning in this specific subject
- Which AI tools to use and why they're appropriate for this subject
- Basic implementation steps (3-4 bullet points) specific to the subject area
- Key learning outcome that connects AI use to subject mastery

Keep it concise and actionable. Ensure ideas are appropriate for the specified subject area. Teachers can request detailed rubrics or student guides as follow-ups.`;

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
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Successfully generated assignment ideas');

    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-assignment-ideas function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
