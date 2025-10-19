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
    const body = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Step 1: Analyze reflections and generate form suggestions
    if (body.step === "analyze") {
      const systemPrompt = `You are an AI assistant helping university faculty, staff, and students design custom GPTs. 
Based on the user's reflections, analyze their needs and generate specific suggestions to populate a form.

Return a JSON object with this EXACT structure (no markdown, just JSON):
{
  "suggestions": {
    "purpose": "Clear, specific purpose statement (2-3 sentences)",
    "audience": "students|faculty|staff|researchers|administrators|mixed",
    "contextDocuments": "Specific documents or data they should include (2-3 sentences)",
    "customInstructions": "Specific behavioral instructions for the GPT (2-3 sentences)",
    "conversationStarters": "ONE conversation starter as a single line of text",
    "toolCapabilities": ["array", "of", "capability", "ids"]
  }
}

Tool capability IDs to choose from: "web_browsing", "image_generation", "data_analysis", "code_interpreter"

Make suggestions specific to their reflections. Extract concrete details from what they shared.`;

      const userPrompt = `Here are the user's reflections:\n\n${body.reflections}\n\nGenerate form field suggestions based on these reflections.`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI gateway error:', response.status, errorText);
        
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
        
        throw new Error(`AI gateway error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("No content in AI response");
      }

      let cleanedContent = content.trim();
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.slice(7);
      } else if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.slice(3);
      }
      if (cleanedContent.endsWith("```")) {
        cleanedContent = cleanedContent.slice(0, -3);
      }
      cleanedContent = cleanedContent.trim();

      const result = JSON.parse(cleanedContent);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Generate final GPT plan from form data
    if (body.step === "generate") {
      const formData = body.formData;
      
      const systemPrompt = `You are an expert AI assistant helping university faculty, staff, and students design custom GPTs. 
Based on the structured form data provided, generate a comprehensive, ready-to-implement Custom GPT plan.

Return a JSON object with this EXACT structure (no markdown, just JSON):
{
  "recommendation": {
    "gpt_name": "Creative, memorable name for the GPT",
    "system_prompt": "Complete, ready-to-use system prompt that incorporates the user's purpose, audience, and custom instructions. This should be 3-5 paragraphs of detailed instructions for the GPT.",
    "knowledge_base_recommendations": [
      "Specific document type or file to upload (e.g., 'Course syllabus with grading rubrics')",
      "Another specific document recommendation",
      "3-5 total recommendations"
    ],
    "conversation_starter": "ONE specific, actionable conversation starter as a single line of text that demonstrates the GPT's capabilities",
    "configuration_checklist": [
      "Step 1: Specific action item",
      "Step 2: Another action item",
      "5-7 steps that guide them through building the GPT"
    ]
  }
}

IMPORTANT: conversation_starter must be ONE single line of text, not an array. Make the recommendation highly specific and actionable. Reference their exact inputs. Make the system prompt comprehensive and ready to copy-paste.`;

      const userPrompt = `Generate a Custom GPT plan based on this information:

Purpose/Role: ${formData.purpose}
Target Audience: ${formData.audience}
${formData.contextDocuments ? `Context Documents: ${formData.contextDocuments}` : ''}
Custom Instructions: ${formData.customInstructions}
${formData.conversationStarters ? `Suggested Starter: ${formData.conversationStarters}` : ''}
${formData.toolCapabilities && formData.toolCapabilities.length > 0 ? `Tool Capabilities: ${formData.toolCapabilities.join(', ')}` : ''}

Create a comprehensive, specific plan that I can immediately use to build this Custom GPT.`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI gateway error:', response.status, errorText);
        
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
        
        throw new Error(`AI gateway error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("No content in AI response");
      }

      let cleanedContent = content.trim();
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.slice(7);
      } else if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.slice(3);
      }
      if (cleanedContent.endsWith("```")) {
        cleanedContent = cleanedContent.slice(0, -3);
      }
      cleanedContent = cleanedContent.trim();

      const result = JSON.parse(cleanedContent);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Invalid step parameter");

  } catch (error) {
    console.error("Error in generate-gpt-ideas:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});