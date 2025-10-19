import { learningModules } from "@/lib/learningModules";

export type SkillCard = {
  id: string;
  moduleId: string;
  title: string;
  headline: string;
  description: string;
  actionLabel: string;
  route: string;
  highlights: string[];
};

const moduleRoute = (moduleId: string) =>
  learningModules.find((module) => module.id === moduleId)?.route ?? "/";

export const skillCards: SkillCard[] = [
  {
    id: "literacy-bias-check",
    moduleId: "ai-literacy",
    title: "Spot-check an AI answer",
    headline: "Bias radar warm-up",
    description:
      "Grab a recent AI response and interrogate it with the literacy checklist prompts. Capture the red flags you notice.",
    actionLabel: "Run the checklist",
    route: moduleRoute("ai-literacy"),
    highlights: ["Checklist prompts", "Hallucination scan", "Evidence log"],
  },
  {
    id: "literacy-co-design",
    moduleId: "ai-literacy",
    title: "Co-design a prompt",
    headline: "Craft a teaching co-pilot",
    description:
      "Build a single teaching prompt that clarifies tone, role, and non-negotiables. Test it inside the ChatGPT review.",
    actionLabel: "Prototype the prompt",
    route: moduleRoute("ai-literacy"),
    highlights: ["Prompt canvas", "Tone tuning", "Quick test"],
  },
  {
    id: "ethics-journey-map",
    moduleId: "ai-ethics",
    title: "Map the risk moments",
    headline: "Responsible AI storyboard",
    description:
      "Sketch the learner journey and mark where harm, exclusion, or bias might creep in. Use the ethics timeline to shape mitigations.",
    actionLabel: "Open ethics lab",
    route: moduleRoute("ai-ethics"),
    highlights: ["Journey sketch", "Risk cues", "Mitigation plan"],
  },
  {
    id: "ethics-safeguards",
    moduleId: "ai-ethics",
    title: "Draft learner safeguards",
    headline: "Trust contract",
    description:
      "Write three concrete safeguards you can give learners. Pull language directly from the bias mitigation module for clarity.",
    actionLabel: "Draft safeguards",
    route: moduleRoute("ai-ethics"),
    highlights: ["Transparency note", "Data boundaries", "Student agency"],
  },
  {
    id: "story-hook",
    moduleId: "storytelling",
    title: "Write a narrative hook",
    headline: "Scene-setting sprint",
    description:
      "Use the storytelling cards to script a 90-second opener that sets the stakes for your prototype experience.",
    actionLabel: "Build the hook",
    route: moduleRoute("storytelling"),
    highlights: ["Character POV", "Conflict beat", "Call to action"],
  },
  {
    id: "story-arc",
    moduleId: "storytelling",
    title: "Sequence three beats",
    headline: "Story spine",
    description:
      "Drag three cards from the story lab to map the beginning, middle, and transformation. Note the feeling you want to evoke.",
    actionLabel: "Arrange beats",
    route: moduleRoute("storytelling"),
    highlights: ["Opening beat", "Pivot moment", "Payoff"],
  },
  {
    id: "vibe-soundscape",
    moduleId: "vibecoding",
    title: "Compose a micro soundscape",
    headline: "Atmosphere mixer",
    description:
      "Blend a mood, tempo, and sensory cue using the vibecoding palette. Play it back with your prototype storyboard.",
    actionLabel: "Mix the vibe",
    route: moduleRoute("vibecoding"),
    highlights: ["Mood sliders", "Trigger mapping", "Playback notes"],
  },
  {
    id: "vibe-feedback",
    moduleId: "vibecoding",
    title: "Collect vibe feedback",
    headline: "Signal pulse",
    description:
      "Share your vibecoding sketch with one learner and note three emotional responses. Log them inside the module journal.",
    actionLabel: "Open vibe lab",
    route: moduleRoute("vibecoding"),
    highlights: ["Quick interview", "Emotion tags", "Iteration idea"],
  },
  {
    id: "customgpt-scope",
    moduleId: "custom-gpts",
    title: "Define your assistant scope",
    headline: "Guardrails first",
    description:
      "Use the custom GPT canvas to list what your assistant should and should not do before you start training it.",
    actionLabel: "Scope the assistant",
    route: moduleRoute("custom-gpts"),
    highlights: ["Do/Don't list", "Source library", "Testing note"],
  },
  {
    id: "customgpt-script",
    moduleId: "custom-gpts",
    title: "Script a learner test",
    headline: "Trial run",
    description:
      "Pull the usability prompts and script a quick conversation to validate your custom GPT's tone and accuracy.",
    actionLabel: "Plan the test",
    route: moduleRoute("custom-gpts"),
    highlights: ["Test script", "Success metric", "Follow-up"],
  },
  {
    id: "planner-milestones",
    moduleId: "prototype-planner",
    title: "Name your next milestone",
    headline: "Prototype runway",
    description:
      "Jump into the planner and commit to one milestone you can hit this week. Add a note about the support you need.",
    actionLabel: "Set milestone",
    route: moduleRoute("prototype-planner"),
    highlights: ["Milestone", "Support ask", "Deadline"],
  },
  {
    id: "planner-feedback",
    moduleId: "prototype-planner",
    title: "Prepare a share-out",
    headline: "Feedback packet",
    description:
      "Bundle your notes, media, and reflection into the submission form so CPAD can respond with targeted support.",
    actionLabel: "Assemble packet",
    route: moduleRoute("prototype-planner"),
    highlights: ["Artifacts", "Who to invite", "Review date"],
  },
];
