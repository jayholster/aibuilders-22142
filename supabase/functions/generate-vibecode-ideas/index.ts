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
    const { round, userContext } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    let systemPrompt = '';
    const timestamp = Date.now();
    const randomSeed = Math.random();
    
    // Add user context to the generation if provided
    const contextPrefix = userContext ? `USER'S IDEA/CONTEXT: ${userContext}\n\nUse this as inspiration but expand and refine it creatively. ` : '';
    
    if (round === 'a') {
      systemPrompt = `${contextPrefix}You are an innovative educational game designer creating wildly diverse HTML canvas games. 
Generate ONE completely unique and VERY DIFFERENT game concept focused on EDUCATIONAL LEARNING.

${userContext ? `CRITICAL: The user wants to create something related to: "${userContext}". Build directly on this theme and make the game concept match their vision. Stay true to their core idea while adding educational value.` : 'CRITICAL: Every game MUST be dramatically different in theme, mechanics, subject area, and style. Avoid ANY similarity to previous suggestions.'}

SUBJECT DIVERSITY - Rotate through these domains (pick ONE per game):
- Mathematics (algebra, geometry, statistics, calculus, number theory)
- Physical Sciences (physics, chemistry, astronomy, earth science)
- Life Sciences (biology, ecology, anatomy, genetics, botany)
- Language Arts (grammar, vocabulary, writing, literature, poetry)
- Social Studies (history, geography, civics, economics, anthropology)
- Arts (music theory, visual arts, theater, dance, film)
- Critical Thinking (logic, philosophy, debate, ethics, problem-solving)
- Computer Science (coding logic, algorithms, data structures, computational thinking)
- Foreign Languages (Spanish, French, Mandarin, etc.)
- Health & Wellness (nutrition, fitness, mental health, safety)

MECHANIC DIVERSITY - Use completely different mechanics each time:
- Spatial reasoning (arranging, rotating, positioning, navigating mazes)
- Temporal sequencing (timeline building, process ordering, historical events)
- Pattern recognition (sequences, fractals, musical patterns, visual motifs)
- Resource management (balancing budgets, ecosystems, chemical equations)
- Strategic planning (chess-like moves, optimization problems, route planning)
- Reflex & accuracy (typing challenges, musical rhythm, precision tasks)
- Memory & recall (flashcards evolved, spaced repetition, memory palaces)
- Synthesis & creation (building molecules, composing music, writing stories)
- Analysis & categorization (sorting, classifying, identifying relationships)
- Simulation & experimentation (virtual labs, hypothesis testing, scenario modeling)

THEME DIVERSITY - Vary visual themes dramatically:
- Abstract & geometric, Natural & organic, Historical & period-specific, Futuristic & sci-fi,
- Cultural & artistic, Mechanical & technical, Whimsical & fantastical, Realistic & documentary

TITLE DIVERSITY - Use VERY DIFFERENT naming patterns and AVOID OVERUSED WORDS:
${userContext ? `- Base the title on the user's theme: "${userContext}"` : ''}
- FORBIDDEN WORDS in titles: Logic, Match, Connect, Sort, Cascade, Drop, Catch, Puzzle
- Good patterns: Action + Subject (e.g., "Rhythm Rush", "Beat Builder"), Subject + Quest (e.g., "Melody Quest", "Tempo Trek")
- Creative compounds (e.g., "WordForge", "MathCraft", "BeatBlitz", "ChordChase")
- Playful & energetic names that reflect the ACTUAL game content

ABSOLUTELY FORBIDDEN MECHANICS:
- Matching/pairing games, Cascade/falling games, Color-based sorting, Simple collection games
- Any game concept similar to: Connect, Match, Sort, Cascade, Drop, Catch (unless radically reimagined)

Return ONLY a JSON object with:
- title: PLAYFUL, action-oriented 2-3 word game name that matches the user's theme (if provided)
- verb: The core educational action (be specific and varied)
- scoring: Unique scoring tied to learning mastery (never repeat the same scoring system)
- reset: Creative fail condition specific to the subject
- accessibility: One specific feature for diverse learners

${userContext ? `Remember: Build on "${userContext}" and make it educational and engaging!` : `Randomization seed: ${timestamp}-${randomSeed}. BE WILDLY CREATIVE AND COMPLETELY DIFFERENT EACH TIME!`}`;
    } else if (round === 'b') {
      systemPrompt = `${contextPrefix}You are a visionary web designer creating unique single-page websites for EDUCATION.
Generate ONE completely original website idea focused on teaching or learning.

EDUCATIONAL FOCUS: Every website must serve learners, teachers, students, or educational enthusiasts across any subject area.

AVOID these concepts: generic portfolio sites, event hubs, color tools, generic landing pages.

Explore educational niches:
- Learning communities (study groups, peer tutoring, collaborative projects)
- Teaching resources (lesson plans, activity libraries, assessment tools)
- Interactive showcases (student work galleries, project portfolios, learning experiments)
- Educational services (online tutoring, coaching, resource curation)
- Passion projects (subject timelines, concept explorers, interdisciplinary connections)
- Learning tools (calculators, converters, study aids, concept visualizers)

TITLE GUIDELINES FOR WEBSITES:
- Must sound PROFESSIONAL and ADMINISTRATIVE like a real website/organization
- Use formal, descriptive language (Center, Institute, Hub, Portal, Resources, Academy, etc.)
- Examples of GOOD website titles: "Online Learning Center", "Teacher Resource Hub", "Student Practice Portal", "Educator Resource Bank"
- Examples of BAD website titles: "Study Fun" (sounds like a game), "Learn Blast" (too playful)
- Think professional organizations, educational institutions, service providers - FORMAL and CLEAR names

Return ONLY a JSON object with:
- title: Professional, administrative 2-4 word website name (must sound like a real website/organization, not a game)
- audience: Specific educational niche (not just "students")
- goal: Clear unique educational purpose
- sections: 3 creative section names with educational focus
- cta: Action-oriented text related to learning

Think unconventional education. Be specific. Timestamp: ${timestamp}`;
    } else if (round === 'c') {
      systemPrompt = `${contextPrefix}You are an educational experience designer creating innovative micro-lessons.
Generate ONE unique interactive learning concept focused on EDUCATION across any subject area.

EDUCATIONAL FOCUS: Every lesson must teach a specific concept, skill, or knowledge area.

AVOID: color theory, CSS basics, generic web dev lessons.

Explore educational topics across subjects:
- Mathematics (algebra, geometry, statistics, problem-solving strategies)
- Science (scientific method, experiments, natural phenomena, data analysis)
- Language Arts (grammar, composition, literary analysis, vocabulary)
- Social Studies (historical events, geography, civics, cultural understanding)
- Critical Thinking (logic, reasoning, analysis, evaluation)
- Study Skills (note-taking, time management, test preparation, research methods)

TITLE GUIDELINES FOR LEARNING MODULES:
- Must sound EDUCATIONAL and INSTRUCTIONAL like a course or lesson
- Use teaching language (Introduction to, Understanding, Exploring, Mastering, Guide to, Fundamentals of, etc.)
- Examples of GOOD learning module titles: "Introduction to Algebra", "Understanding Scientific Method", "Mastering Essay Writing", "Guide to Historical Analysis"
- Examples of BAD learning module titles: "Math Rush" (sounds like a game), "Learning Hub" (sounds like a website)
- Think course names, lesson titles, tutorial topics - EDUCATIONAL and CLEAR names

Return ONLY a JSON object with:
- title: Educational, instructional 2-5 word module name (must sound like a lesson/course, not a game or website)
- audience: Specific learner group
- concept: One clear learning objective
- control: Creative interaction method for the subject (not just "slider")
- quiz: Thought-provoking question related to the concept

Be innovative with educational design. Make it memorable. Timestamp: ${timestamp}`;
    }

    console.log('Generating ideas for round:', round);

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
          { role: 'user', content: userContext 
            ? `Based on my idea: "${userContext}", generate ONE unique vibecoding concept that expands on this. Make it specific, educational, and dramatically different from common patterns.` 
            : `Generate ONE completely unique vibecoding idea that is DRAMATICALLY DIFFERENT from any common educational game. Use a completely different subject area, mechanic, theme, and title style. Explore unusual combinations and unconventional educational topics. Think outside the box and avoid ANY repetition. Random variation seed: ${timestamp}-${randomSeed}` 
          }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'generate_idea',
              description: 'Generate a vibecoding project idea',
              parameters: {
                type: 'object',
                properties: round === 'a' ? {
                  title: { type: 'string' },
                  verb: { type: 'string' },
                  scoring: { type: 'string' },
                  reset: { type: 'string' },
                  accessibility: { type: 'string' }
                } : round === 'b' ? {
                  title: { type: 'string' },
                  audience: { type: 'string' },
                  goal: { type: 'string' },
                  sections: { type: 'string' },
                  cta: { type: 'string' }
                } : {
                  title: { type: 'string' },
                  audience: { type: 'string' },
                  concept: { type: 'string' },
                  control: { type: 'string' },
                  quiz: { type: 'string' }
                },
                required: round === 'a' 
                  ? ['title', 'verb', 'scoring', 'reset', 'accessibility']
                  : round === 'b'
                  ? ['title', 'audience', 'goal', 'sections', 'cta']
                  : ['title', 'audience', 'concept', 'control', 'quiz'],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'generate_idea' } },
        temperature: 1.2  // Higher temperature for more creativity and variation
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response:', JSON.stringify(data));

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      throw new Error('No tool call in response');
    }

    const idea = JSON.parse(toolCall.function.arguments);
    console.log('Generated idea:', idea);

    return new Response(JSON.stringify({ idea }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-vibecode-ideas:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});