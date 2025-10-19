import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  ExternalLink, 
  Copy, 
  Check,
  Sparkles,
  Zap,
  Target,
  AlertCircle
} from "lucide-react";
import extendedToolsImage from "@/assets/gemini-extended-tools.png";
import { toast } from "sonner";

const ExtendedToolsExplorer = () => {
  const [selectedTool, setSelectedTool] = useState<'deep-research' | 'agent-mode' | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const copyPrompt = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(id);
      toast.success("Prompt copied to clipboard!");
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
      toast.error("Failed to copy prompt");
    }
  };

  const useCaseScenarios = [
    {
      id: 1,
      scenario: "You need to write a literature review with 20+ citations on differentiated instruction",
      correctAnswer: "deep-research",
      explanation: "Deep Research excels at comprehensive research tasks that require multiple sources and citations."
    },
    {
      id: 2,
      scenario: "You want to analyze survey data and create a presentation with visualizations",
      correctAnswer: "agent-mode",
      explanation: "Agent Mode can handle multi-step workflows like data analysis and presentation creation."
    },
    {
      id: 3,
      scenario: "Research best practices for project-based learning with academic sources",
      correctAnswer: "deep-research",
      explanation: "Deep Research provides evidence-based answers with reliable academic citations."
    },
    {
      id: 4,
      scenario: "Create a semester course plan with integrated activities and assessment rubrics",
      correctAnswer: "agent-mode",
      explanation: "Agent Mode can tackle complex creation tasks that involve multiple components and iterations."
    },
    {
      id: 5,
      scenario: "Compare different learning theories with sources from educational psychology research",
      correctAnswer: "deep-research",
      explanation: "Deep Research synthesizes information from multiple academic sources for comprehensive comparisons."
    }
  ];

  const deepResearchPrompts = [
    {
      id: "dr1",
      title: "Literature Review",
      prompt: "Compare and contrast project-based learning, inquiry-based learning, and problem-based learning approaches, citing key research and theoretical foundations."
    },
    {
      id: "dr2",
      title: "Research Synthesis",
      prompt: "What does current research say about the effectiveness of spaced repetition and retrieval practice in long-term retention? Include citations from cognitive science literature."
    },
    {
      id: "dr3",
      title: "Evidence-Based Comparison",
      prompt: "Compare the educational outcomes of synchronous vs. asynchronous online learning environments, citing recent studies and meta-analyses."
    }
  ];

  const agentModePrompts = [
    {
      id: "am1",
      title: "Multi-Step Creation",
      prompt: "Analyze student survey data on learning preferences, identify key patterns and correlations, then create a PowerPoint presentation with data visualizations and actionable recommendations for differentiated instruction."
    },
    {
      id: "am2",
      title: "Complex Workflow",
      prompt: "Design a complete unit plan for teaching photosynthesis to 9th graders, including: learning objectives, daily lesson plans, hands-on activities, assessment rubrics, and differentiation strategies for diverse learners."
    },
    {
      id: "am3",
      title: "Iterative Problem-Solving",
      prompt: "Create a classroom management system for a high school English class that includes behavior expectations, positive reinforcement strategies, and restorative practices. Test the plan against common scenarios and refine based on potential challenges."
    }
  ];

  const checkAnswer = (scenarioId: number, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [scenarioId]: answer }));
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Beyond standard chat interfaces, modern AI tools offer specialized modes designed for specific types of work. 
          These "extended tools" represent different approaches to problem-solving: one optimized for research and citations, 
          the other for multi-step task execution.
        </p>
      </div>

      {/* Visual Showcase */}
      <div className="flex justify-center">
        <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg max-w-2xl">
          <img 
            src={extendedToolsImage} 
            alt="Gemini Extended Tools including Deep Research, Create Image, Agent Mode, and Add Sources"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Tool Selection Toggles */}
      <div className="flex gap-4 justify-center">
        <Button
          variant={selectedTool === 'deep-research' ? 'default' : 'outline'}
          onClick={() => setSelectedTool(selectedTool === 'deep-research' ? null : 'deep-research')}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Deep Research
        </Button>
        <Button
          variant={selectedTool === 'agent-mode' ? 'default' : 'outline'}
          onClick={() => setSelectedTool(selectedTool === 'agent-mode' ? null : 'agent-mode')}
          className="flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Agent Mode
        </Button>
      </div>

      {/* Deep Research Details */}
      {selectedTool === 'deep-research' && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <FileText className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Deep Research</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      What it does:
                    </h4>
                    <p className="text-muted-foreground">
                      Breaks a problem into sub-questions, pulls from multiple sources (papers, PDFs, web), 
                      and synthesizes answers into a long-form, evidence-based explanation.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-accent" />
                      Goal:
                    </h4>
                    <p className="text-muted-foreground">
                      Accuracy, comprehensiveness, citations.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Feels like:</h4>
                    <p className="text-muted-foreground">
                      A student writing a mini research paper after reading a stack of articles. They gather sources, 
                      cross-reference information, and synthesize findings into a comprehensive document with proper citations.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent" />
                        Strengths:
                      </h4>
                      <ul className="text-muted-foreground space-y-1.5 text-sm">
                        <li>• Reliable references and citations</li>
                        <li>• Stronger at "what do we know about X?" questions</li>
                        <li>• Good for class tasks where you want breadth and detail</li>
                      </ul>
                    </div>
                    
                    <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        Limitations:
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Can be slower, less conversational, sometimes over-detailed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Try it out prompts */}
            <div className="space-y-3 pt-4">
              <h4 className="font-semibold text-foreground">Try These Prompts:</h4>
              {deepResearchPrompts.map((item) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{item.title}</Badge>
                        <p className="text-sm text-muted-foreground italic">"{item.prompt}"</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPrompt(item.prompt, item.id)}
                        className="flex-shrink-0"
                      >
                        {copiedPrompt === item.id ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Mode Details */}
      {selectedTool === 'agent-mode' && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <ExternalLink className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Agent Mode</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      What it does:
                    </h4>
                    <p className="text-muted-foreground">
                      Treats the model as an autonomous problem-solver. It plans steps, uses tools iteratively, 
                      and adapts based on intermediate results.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Goal:
                    </h4>
                    <p className="text-muted-foreground">
                      Solve tasks, like ordering panera or creating a powerpoint, in addition to explanations.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Feels like:</h4>
                    <p className="text-muted-foreground">
                      A student actually doing the work in front of you (checking sources, running a calculation, 
                      revising approach) instead of just writing a summary.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-accent" />
                        Strengths:
                      </h4>
                      <ul className="text-muted-foreground space-y-1.5 text-sm">
                        <li>• Better at complex, multi-step tasks</li>
                        <li>• Dynamic: can change approach mid-task</li>
                        <li>• Good for workflow, problem-solving, or tool chaining</li>
                      </ul>
                    </div>
                    
                    <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        Limitations:
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        More prone to overcomplicating; sometimes burns time chasing unnecessary steps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Try it out prompts */}
            <div className="space-y-3 pt-4">
              <h4 className="font-semibold text-foreground">Try These Prompts:</h4>
              {agentModePrompts.map((item) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{item.title}</Badge>
                        <p className="text-sm text-muted-foreground italic">"{item.prompt}"</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPrompt(item.prompt, item.id)}
                        className="flex-shrink-0"
                      >
                        {copiedPrompt === item.id ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Use Case Matching Quiz */}
      <Card className="border-primary/30 bg-card/50">
        <CardContent className="p-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Which Tool Would You Use?</h3>
            <p className="text-muted-foreground text-sm">
              For each scenario, select whether Deep Research or Agent Mode would be the better choice.
            </p>
          </div>

          <div className="space-y-4">
            {useCaseScenarios.map((scenario) => (
              <Card key={scenario.id} className="border-border/50">
                <CardContent className="p-5">
                  <p className="text-foreground mb-4">{scenario.scenario}</p>
                  <div className="flex gap-3">
                    <Button
                      variant={quizAnswers[scenario.id] === 'deep-research' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => checkAnswer(scenario.id, 'deep-research')}
                      className="flex-1"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Deep Research
                    </Button>
                    <Button
                      variant={quizAnswers[scenario.id] === 'agent-mode' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => checkAnswer(scenario.id, 'agent-mode')}
                      className="flex-1"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Agent Mode
                    </Button>
                  </div>
                  {quizAnswers[scenario.id] && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      quizAnswers[scenario.id] === scenario.correctAnswer 
                        ? 'bg-accent/10 border border-accent/20' 
                        : 'bg-destructive/10 border border-destructive/20'
                    }`}>
                      <p className="text-sm">
                        {quizAnswers[scenario.id] === scenario.correctAnswer ? (
                          <span className="flex items-center gap-2 text-accent font-medium">
                            <Check className="w-4 h-4" />
                            Correct!
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-destructive font-medium">
                            <AlertCircle className="w-4 h-4" />
                            Not quite.
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{scenario.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtendedToolsExplorer;
