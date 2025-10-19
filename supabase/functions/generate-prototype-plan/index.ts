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
    const {
      problemStatement,
      targetAudience,
      desiredOutcome,
      availableResources,
      timeline,
      type = 'quick',
      phase,
      hmwStatements,
      context,
      selectedConcept,
      concept,
    } = await req.json();

    console.log('Generating content for phase:', phase || type);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = `You are an expert in design thinking for music education, helping faculty create practical AI prototypes.

CPAD AI BUILDERS TOOLKIT (ONLY suggest tools from this list):

1. **Custom GPTs** (/custom-gpts)
   - Use for: Chatbots, Q&A assistants, tutoring, personalized feedback, interactive conversations
   - Badges: No-code, Chat/Writing, Interactive
   - Example: "A custom GPT that helps students analyze musical forms through conversation"

2. **Vibecoding with Lovable** (/vibecoding)
   - Use for: Interactive websites, learning games, quizzes, student portfolios, web apps
   - Badges: Low-code, Interactive, Web-based
   - Example: "Build a chord progression quiz game with instant feedback"

3. **Storytelling with AI** (/storytelling)
   - Use for: Image generation (Midjourney), video (Kling), multimedia content, creative projects
   - Badges: Visual, Creative, Media
   - Example: "Generate album cover concept art with Midjourney"

4. **AI Literacy Checklist** (/chatgpt-review)
   - Use for: Teaching prompt engineering, AI fundamentals, critical evaluation
   - Badges: Foundational, Text-based
   - Example: "Start with prompt engineering basics before building prototypes"

5. **AI Ethics & Bias** (/ai-ethics-bias)
   - Use for: Ethical reflection, bias awareness, responsible AI use
   - Badges: Critical thinking, Ethics
   - Example: "Examine bias in training data before deploying student-facing tools"

CRITICAL RULES:
- NEVER suggest tools outside this toolkit (no VR, AR, hardware, third-party apps not mentioned)
- ALWAYS reference the specific module when suggesting a tool
- Use the route paths (/custom-gpts, /vibecoding, /storytelling, /chatgpt-review, /ai-ethics-bias) in recommendations
- Match tools to use cases based on what faculty already learned in workshops`;
    let userPrompt = '';
    let useStructuredOutput = false;
    let toolDefinition = null;

    // Phase-specific prompts
    if (phase === 'hmw') {
      systemPrompt += `

Generate exactly 3 "How Might We" statements that:
- Start with "How might we..."
- Are specific and actionable
- Focus on different angles of the problem
- Inspire creative solutions

Return them as a JSON array.`;
      userPrompt = `Problem: ${problemStatement}
Target Audience: ${targetAudience}
Context: ${context || 'Not specified'}

Generate 3 "How Might We" statements.`;

      useStructuredOutput = true;
      toolDefinition = {
        type: "function",
        function: {
          name: "generate_hmw_statements",
          description: "Generate How Might We statements",
          parameters: {
            type: "object",
            properties: {
              hmwStatements: {
                type: "array",
                items: { type: "string" },
                minItems: 3,
                maxItems: 3
              }
            },
            required: ["hmwStatements"],
            additionalProperties: false
          }
        }
      };
    } else if (phase === 'ideate') {
      userPrompt = `Problem: ${problemStatement}
Target Audience: ${targetAudience}
${hmwStatements && hmwStatements.length > 0 ? `How Might We Statements:\n${hmwStatements.join('\n')}` : ''}

For EACH idea, explicitly mention which CPAD toolkit module to use:
- Custom GPTs for chatbots/tutoring
- Vibecoding for interactive web experiences  
- Storytelling for visual/multimedia content

Format each idea with:
- title: "Build a [specific prototype]"
- description: "Use [CPAD module] to create [concrete outcome]. Students will [specific action]."
- module: "Custom GPTs"|"Vibecoding"|"Storytelling"
- route: "/custom-gpts"|"/vibecoding"|"/storytelling"

Example:
{
  "title": "Chord Progression Quiz Bot",
  "description": "Use Custom GPTs to create a chatbot that quizzes students on chord progressions with immediate feedback.",
  "module": "Custom GPTs",
  "route": "/custom-gpts"
}`;

      useStructuredOutput = true;
      toolDefinition = {
        type: "function",
        function: {
          name: "generate_idea_starters",
          description: "Generate prototype idea starters",
          parameters: {
            type: "object",
            properties: {
              ideaStarters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    module: { type: "string" },
                    route: { type: "string" }
                  },
                  required: ["title", "description", "module", "route"],
                  additionalProperties: false
                },
                minItems: 3,
                maxItems: 5
              }
            },
            required: ["ideaStarters"],
            additionalProperties: false
          }
        }
      };
    } else if (phase === 'success-measures') {
      systemPrompt = `You are a design thinking facilitator helping educators define success criteria.

Generate 2-3 specific, measurable success criteria that:
- Are concrete and observable
- Focus on learner outcomes or usability
- Can be tested quickly
- Are realistic for a prototype

Example success measures:
- "Students can identify 3 chord progressions in under 5 minutes with 80% accuracy"
- "Users complete the activity without instructor help"
- "90% of students report feeling more confident about the concept"

Return as JSON array.`;

      userPrompt = `Prototype Concept: ${concept || selectedConcept}
Problem: ${problemStatement}
Target Audience: ${targetAudience}

Generate 2-3 concrete success measures.`;

      useStructuredOutput = true;
      toolDefinition = {
        type: "function",
        function: {
          name: "generate_success_measures",
          description: "Generate success measures",
          parameters: {
            type: "object",
            properties: {
              successMeasures: {
                type: "array",
                items: { type: "string" },
                minItems: 2,
                maxItems: 3
              }
            },
            required: ["successMeasures"],
            additionalProperties: false
          }
        }
      };
    } else if (phase === 'prototype') {
      systemPrompt = `You are a workshop facilitator helping educators build AI prototypes.

CPAD AI Builders Toolkit Options:
- Custom GPTs: chatbots, Q&A assistants, tutoring tools (no-code)
- Vibecoding: interactive websites, games, learning modules (AI-assisted coding with Lovable)
- AI Media Tools: image generation (Midjourney), video (Kling), music tools

Recommend 2-3 tools with badges like: "No-code", "Chat/Writing", "Visual", "Audio", "Interactive", "Web-based"

Generate:
1. Thin slice description (1-2 sentences, core feature only)
2. Recommended tools with badges and brief descriptions
3. Student flow (start/do/finish - what students actually experience)
4. Build steps (5-7 actionable steps)

CRITICAL for build steps: Only suggest steps that reference materials/concepts from CPAD workshop modules:
- For Custom GPTs: uploading knowledge files, providing context documents, setting instructions (as covered in /custom-gpts module)
- For Vibecoding: using Lovable to build interactive elements (as covered in /vibecoding module)
- For Storytelling: generating images with Midjourney, videos with Kling (as covered in /storytelling module)

DO NOT suggest generic AI training steps like "train the custom GPT to respond" - only concrete actions reflected in workshop materials.

Return as JSON.`;

      userPrompt = `Prototype Concept: ${selectedConcept}
Problem: ${problemStatement}
Target Audience: ${targetAudience}
Context: ${context || 'Not specified'}

Based on this prototype concept, generate detailed build instructions using ONLY the CPAD toolkit.

CPAD Toolkit Options:
- Custom GPTs (/custom-gpts) - chatbots, Q&A, tutoring
- Vibecoding (/vibecoding) - interactive websites, games, quizzes
- Storytelling (/storytelling) - images (Midjourney), video (Kling)

Provide:
1. A refined "thin slice" - the absolute core feature
2. 1-2 recommended tools from CPAD toolkit with module name, description, badges, and route
3. Student flow (start, do, finish)
4. 5-7 build steps that ONLY reference actions covered in CPAD modules

CRITICAL: Build steps must only suggest actions reflected in the workshop materials:
- For Custom GPTs: "Upload your syllabus as a knowledge file", "Set clear instructions for student responses", "Test with sample questions"
- For Vibecoding: "Use Lovable to create an interactive quiz", "Add feedback messages", "Test the user flow"
- For Storytelling: "Generate concept images with Midjourney", "Create a video clip with Kling", "Combine media elements"

DO NOT include generic steps like "train the GPT" that aren't covered in modules.

Return format for recommendedTools:
{
  "name": "Custom GPTs",
  "description": "Why this tool fits the prototype",
  "badges": ["No-code", "Chat/Writing", "Interactive"],
  "route": "/custom-gpts"
}

Do NOT suggest tools outside the CPAD toolkit.`;

      useStructuredOutput = true;
      toolDefinition = {
        type: "function",
        function: {
          name: "generate_prototype_details",
          description: "Generate prototype implementation details",
          parameters: {
            type: "object",
            properties: {
              thinSlice: { type: "string" },
              recommendedTools: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    badges: {
                      type: "array",
                      items: { type: "string" }
                    },
                    description: { type: "string" },
                    route: { type: "string" }
                  },
                  required: ["name", "badges", "route"],
                  additionalProperties: false
                },
                minItems: 2,
                maxItems: 3
              },
              studentFlow: {
                type: "object",
                properties: {
                  start: { type: "string" },
                  do: { type: "string" },
                  finish: { type: "string" }
                },
                required: ["start", "do", "finish"],
                additionalProperties: false
              },
              buildSteps: {
                type: "array",
                items: { type: "string" },
                minItems: 5,
                maxItems: 7
              }
            },
            required: ["thinSlice", "recommendedTools", "studentFlow", "buildSteps"],
            additionalProperties: false
          }
        }
      };
    } else {
      // Original quick/detailed prompts for backward compatibility
      systemPrompt = type === 'quick' 
        ? `You are a workshop facilitator helping participants build AI prototypes.

Suggest ONE broad prototype idea based on their problem:
- "Build a game that [addresses their problem]" → route to /vibecoding
- "Create a learning module that [addresses their problem]" → route to /vibecoding  
- "Make a custom chatbot that [addresses their problem]" → route to /custom-gpts
- "Generate media/images/video that [addresses their problem]" → route to /storytelling
- If they need AI basics first → route to /chatgpt-review
- If they want ethical reflection → route to /ai-ethics-bias

Format (3-4 steps max):

🎯 PROTOTYPE IDEA: [Specific suggestion like "Build a game that..." or "Create a chatbot that..."]

NEXT STEPS:
1. Visit [module name] at /[page-url]
2. [Simple action step]
3. Test and iterate

Keep under 60 words. Only link to internal workshop pages.`
        : `You are a workshop facilitator creating concise build guides (300-500 words MAX).

CPAD AI Builders Toolkit Modules:
- Custom GPTs → Build interactive chatbots, Q&A tools, student participation tools
- Vibecoding → Build websites, games, and learning modules using AI tools like Lovable
- Storytelling with AI → Create/edit media (images, video, audio)
- ChatGPT Review → Learn AI basics and evaluation
- AI Ethics & Bias → Ethical reflection on AI use

Format (use bullets, NOT paragraphs):

🎯 PROTOTYPE IDEA: [One sentence - "Build a [X] that [solves Y]"]

MODULE PATHWAY: (2-3 modules with internal links)
1. [Module] at /[page] - [brief why]

STEP-BY-STEP BUILD: (5-7 concrete actions)
1. Visit [module] at /[page]
2. [Specific build action]
3. [Test step]
...

RECOMMENDED TOOLS: (2-3 tools, one line each)

POTENTIAL CHALLENGES: (2 max, brief solutions)

STRICT LIMIT: 400 words maximum. Use bullet points. This is a WORKSHOP guide, not a comprehensive plan.`;

      userPrompt = type === 'quick'
        ? `Route me to build a prototype:

WHAT I WANT TO BUILD: ${problemStatement}
FOR: ${targetAudience}
GOAL: ${desiredOutcome}
RESOURCES: ${availableResources || 'Not specified'}
TIME: ${timeline || 'Flexible'}

Give me 3-5 action steps to start building. Which module? Which tool? How to test and iterate?

Maximum 100 words. Just the sequential steps.`
        : `Create a BRIEF build guide (max 400 words):

PROBLEM: ${problemStatement}
TARGET AUDIENCE: ${targetAudience}
DESIRED OUTCOME: ${desiredOutcome}
RESOURCES: ${availableResources || 'Not specified'}
TIMELINE: ${timeline || 'Flexible'}

Include:
- ONE prototype idea
- MODULE PATHWAY (which workshop pages to visit)
- 5-7 ACTION STEPS (bullet points)
- 2-3 TOOLS
- 2 POTENTIAL CHALLENGES

Use bullets. Keep it scannable. Under 400 words.`;
    }

    const requestBody: any = {
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
    };

    if (useStructuredOutput && toolDefinition) {
      requestBody.tools = [toolDefinition];
      requestBody.tool_choice = { type: "function", function: { name: toolDefinition.function.name } };
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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
    
    let result;
    if (useStructuredOutput) {
      // Extract from tool call
      const toolCall = data.choices[0].message.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        result = JSON.parse(toolCall.function.arguments);
      } else {
        throw new Error('No structured output returned');
      }
    } else {
      // Regular text response
      result = { content: data.choices[0].message.content };
    }

    console.log('Successfully generated content');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-prototype-plan function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
