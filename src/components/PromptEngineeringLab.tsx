import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles, ArrowRight, Loader2, Lightbulb, Brain, Repeat, Target, List, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const examplePrompts = [
  {
    level: "poor",
    text: "Write something about climate change",
    issues: ["Too vague", "No context", "No format specified"]
  },
  {
    level: "better",
    text: "Explain climate change to a high school student",
    issues: ["Better audience", "Still lacks specifics on depth/length"]
  },
  {
    level: "best",
    text: "Write a 300-word explanation of climate change for a 10th-grade environmental science class, focusing on greenhouse gases and their effects. Include one real-world example and end with an actionable tip.",
    strengths: ["Specific audience", "Clear length", "Defined focus", "Requested structure"]
  }
];

export default function PromptEngineeringLab() {
  const [userPrompt, setUserPrompt] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const { toast } = useToast();

  const evaluatePrompt = async () => {
    if (!userPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt to evaluate",
        variant: "destructive"
      });
      return;
    }

    setIsEvaluating(true);
    try {
      const { data, error } = await supabase.functions.invoke('evaluate-prompt-quality', {
        body: { prompt: userPrompt }
      });

      if (error) throw error;

      setEvaluation(data);
      toast({
        title: "Evaluation complete!",
        description: "Check out your personalized feedback below"
      });
    } catch (error) {
      console.error('Evaluation error:', error);
      toast({
        title: "Evaluation failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const useExample = (example: string) => {
    setUserPrompt(example);
    setEvaluation(null);
  };

  const techniqueIcons: Record<string, any> = {
    "few-shot": List,
    "chain-of-thought": Brain,
    "reflection": Repeat,
    "specificity": Target,
    "context": MessageSquare,
    "constraints": Sparkles
  };

  const techniqueDescriptions: Record<string, string> = {
    "few-shot": "Providing 2-3 examples helps the AI understand the pattern or format you want",
    "chain-of-thought": "Asking AI to think step-by-step reveals its reasoning and improves accuracy",
    "reflection": "Prompting the AI to review its own work catches errors and improves quality",
    "specificity": "Being specific about requirements guides the AI to more relevant responses",
    "context": "Adding context helps the AI understand your goals and audience",
    "constraints": "Clear constraints (length, format, style) shape the output structure"
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-ink flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            Prompt Engineering Practice Lab
          </h3>
          <p className="text-ink-muted">
            Write a prompt and receive personalized feedback with advanced technique suggestions
          </p>
        </div>
        
        {/* Introduction */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Effective prompting is a skill you can develop. The better you communicate with AI, the more useful its responses become. 
              This lab will help you learn techniques like <strong>few-shot prompting</strong> (showing examples), 
              <strong>chain-of-thought reasoning</strong> (asking AI to think step-by-step), and <strong>reflection</strong> (having AI review its own work). 
              These aren't just buzzwords—they're practical strategies that significantly improve AI output quality.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Example Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Example Progression: Poor → Better → Best</CardTitle>
          <CardDescription>See how prompt quality improves with specificity and context</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {examplePrompts.map((example, idx) => (
            <div key={idx} className="p-4 rounded-lg border bg-card/50 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={example.level === "best" ? "default" : example.level === "better" ? "secondary" : "outline"}>
                  {example.level.charAt(0).toUpperCase() + example.level.slice(1)}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => useExample(example.text)}>
                  Try This <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-ink italic">"{example.text}"</p>
              <div className="flex flex-wrap gap-2">
                {example.issues?.map((issue, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-destructive/10 text-destructive">
                    {issue}
                  </span>
                ))}
                {example.strengths?.map((strength, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">
                    ✓ {strength}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* User Input */}
      <Card>
        <CardHeader>
          <CardTitle>Your Turn: Write a Prompt</CardTitle>
          <CardDescription>Enter your prompt below and get instant quality feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type your prompt here... Try to be as specific as possible!"
            className="min-h-[120px] resize-none"
          />
          <Button 
            onClick={evaluatePrompt} 
            disabled={isEvaluating || !userPrompt.trim()}
            className="w-full"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Evaluating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 w-4 h-4" />
                Evaluate My Prompt
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Evaluation Results */}
      {evaluation && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Your Personalized Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Friendly Feedback */}
            <div className="p-5 rounded-xl bg-accent/10 border-2 border-accent/30">
              <p className="text-base text-foreground leading-relaxed">
                {evaluation.feedback}
              </p>
            </div>

            {/* Technique Badges */}
            {evaluation.techniquesUsed && evaluation.techniquesUsed.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Techniques Applied in Improved Version
                </h4>
                <TooltipProvider>
                  <div className="flex flex-wrap gap-2">
                    {evaluation.techniquesUsed.map((technique: string, index: number) => {
                      const Icon = techniqueIcons[technique] || Sparkles;
                      return (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Badge 
                              variant="secondary" 
                              className="px-3 py-1.5 cursor-help hover:bg-primary/20 transition-colors"
                            >
                              <Icon className="w-3.5 h-3.5 mr-1.5" />
                              {technique.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{techniqueDescriptions[technique]}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              </div>
            )}

            {/* Suggestions */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                How to Improve
              </h4>
              <ul className="space-y-3">
                {evaluation.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="text-sm flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/40">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compare View */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                Before & After Comparison
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Prompt</div>
                  <div className="text-sm bg-muted/50 p-4 rounded-lg border border-border/40 min-h-[100px]">
                    {userPrompt}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-primary uppercase tracking-wider">Improved Version</div>
                  <div className="text-sm bg-primary/5 p-4 rounded-lg border border-primary/20 min-h-[100px] font-medium">
                    {evaluation.improvedPrompt}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
