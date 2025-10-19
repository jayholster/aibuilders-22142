import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

const standardExample = {
  prompt: "Solve this problem: If a classroom has 24 students and you want to arrange them into equal groups, what are all the possible group sizes?",
  response: "The possible group sizes are: 1, 2, 3, 4, 6, 8, 12, or 24 students per group. These are the factors of 24."
};

const reasoningExample = {
  prompt: "Solve this problem: If a classroom has 24 students and you want to arrange them into equal groups, what are all the possible group sizes?",
  thinking: [
    "Let me think about this step-by-step...",
    "I need to find all the factors of 24 (numbers that divide evenly into 24)",
    "Starting with 1: 24 ÷ 1 = 24 ✓",
    "Checking 2: 24 ÷ 2 = 12 ✓",
    "Checking 3: 24 ÷ 3 = 8 ✓",
    "Checking 4: 24 ÷ 4 = 6 ✓",
    "Checking 5: 24 ÷ 5 = 4.8 ✗ (not a whole number)",
    "Checking 6: 24 ÷ 6 = 4 ✓",
    "Beyond 6, I'd be repeating pairs (8, 12, 24 already found)",
    "Let me verify my list is complete: 1, 2, 3, 4, 6, 8, 12, 24"
  ],
  response: "The possible group sizes are: 1, 2, 3, 4, 6, 8, 12, or 24 students per group. These represent all factors of 24, meaning each creates equal-sized groups with no students left over."
};

const useCaseQuestions = [
  {
    scenario: "A student asks: 'What's the capital of France?'",
    correctAnswer: "standard",
    explanation: "Simple factual questions don't need reasoning models—standard models retrieve this instantly."
  },
  {
    scenario: "A student asks: 'Design a step-by-step debugging process for finding errors in my Python code.'",
    correctAnswer: "reasoning",
    explanation: "Multi-step problem-solving and planning benefit from reasoning models' structured thinking."
  },
  {
    scenario: "Drafting a creative story opening for a fantasy novel",
    correctAnswer: "standard",
    explanation: "Creative writing doesn't require step-by-step logic—standard models excel at creative tasks."
  },
  {
    scenario: "Analyzing survey data to identify correlations and propose teaching interventions",
    correctAnswer: "reasoning",
    explanation: "Data analysis requiring verification of logic and multi-step reasoning benefits from reasoning models."
  },
  {
    scenario: "Translating a paragraph from English to Spanish",
    correctAnswer: "standard",
    explanation: "Translation is pattern-based work where standard models perform efficiently."
  }
];

export default function ReasoningModelsComparison() {
  const [showReasoning, setShowReasoning] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowResults(false);
  };

  const score = Object.entries(quizAnswers).filter(
    ([idx, answer]) => answer === useCaseQuestions[parseInt(idx)].correctAnswer
  ).length;

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Brain className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">What Are Reasoning Models?</h3>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Reasoning models</strong> (also called "thinking models") engage in <em>extended deliberation</em> before responding. 
              Unlike standard AI that generates answers immediately through pattern matching, reasoning models show their work through step-by-step reasoning, 
              can self-correct mid-process, and break complex problems into manageable sub-tasks.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Think of it as the difference between a student who blurts out an answer versus one who works through a problem methodically, 
              checking their work as they go.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Comparison */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Standard vs. Reasoning Models</CardTitle>
          <CardDescription>See how different model types approach the same problem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Standard Model */}
            <div className="space-y-3 p-5 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <h4 className="text-lg font-semibold text-foreground">Standard Model</h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>→ Pattern matching</p>
                <p>→ Immediate response</p>
                <p>→ Single-pass generation</p>
                <p>→ Hidden reasoning process</p>
                <p>→ Polished final answer only</p>
              </div>
            </div>

            {/* Reasoning Model */}
            <div className="space-y-3 p-5 rounded-xl bg-primary/10 border-2 border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-primary" />
                <h4 className="text-lg font-semibold text-foreground">Reasoning Model</h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>→ Problem analysis & planning</p>
                <p>→ Step-by-step execution</p>
                <p>→ Error checking & verification</p>
                <p>→ Transparent thought process</p>
                <p>→ Shows work + final answer</p>
              </div>
            </div>
          </div>

          {/* Metacognition Image */}
          <div className="mt-6 flex flex-col items-center">
            <div className="rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg max-w-3xl w-full">
              <img 
                src="/lovable-uploads/55f5c579-3741-4c4a-b8ba-ee059e554bf3.png" 
                alt="Example of AI metacognition demonstrating self-awareness"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-muted-foreground italic mt-2 text-center">
              Metacognition: AI tracking its own reasoning process
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Toggle Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interactive Comparison</CardTitle>
          <CardDescription>Toggle between response types to see the difference</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2">
            <Button
              variant={!showReasoning ? "default" : "outline"}
              onClick={() => setShowReasoning(false)}
              className="flex-1"
            >
              <Zap className="w-4 h-4 mr-2" />
              Standard Response
            </Button>
            <Button
              variant={showReasoning ? "default" : "outline"}
              onClick={() => setShowReasoning(true)}
              className="flex-1"
            >
              <Brain className="w-4 h-4 mr-2" />
              Reasoning Response
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm font-medium text-foreground mb-3">
              <strong>Prompt:</strong> {standardExample.prompt}
            </p>

            {!showReasoning ? (
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-2">Instant Response</Badge>
                <p className="text-sm text-muted-foreground">{standardExample.response}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Badge variant="default" className="mb-2">Showing Work</Badge>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5">
                  {reasoningExample.thinking.map((step, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground font-mono">
                      {step}
                    </p>
                  ))}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-foreground mb-1">Final Answer:</p>
                  <p className="text-sm text-muted-foreground">{reasoningExample.response}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Use Cases Quiz */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When Should You Use Each Model Type?</CardTitle>
          <CardDescription>Test your understanding with these scenarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {useCaseQuestions.map((question, idx) => (
            <div key={idx} className="p-4 rounded-lg border bg-card/50 space-y-3">
              <p className="text-sm font-medium text-foreground">{question.scenario}</p>
              <div className="flex gap-2">
                <Button
                  variant={quizAnswers[idx] === "standard" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuizAnswer(idx, "standard")}
                  disabled={showResults}
                >
                  Standard Model
                </Button>
                <Button
                  variant={quizAnswers[idx] === "reasoning" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuizAnswer(idx, "reasoning")}
                  disabled={showResults}
                >
                  Reasoning Model
                </Button>
              </div>
              {showResults && (
                <div className={`p-3 rounded-lg ${
                  quizAnswers[idx] === question.correctAnswer 
                    ? 'bg-green-500/10 border border-green-500/30' 
                    : 'bg-red-500/10 border border-red-500/30'
                }`}>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    {quizAnswers[idx] === question.correctAnswer ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            {!showResults ? (
              <Button 
                onClick={checkAnswers} 
                disabled={Object.keys(quizAnswers).length !== useCaseQuestions.length}
                className="flex-1"
              >
                Check Answers
              </Button>
            ) : (
              <>
                <div className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-lg font-bold text-foreground">
                    Score: {score}/{useCaseQuestions.length}
                  </span>
                </div>
                <Button onClick={resetQuiz} variant="outline">
                  Try Again
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Connection to Prompt Engineering
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Notice how reasoning models automatically use chain-of-thought? <strong className="text-foreground">You can achieve similar results with standard models</strong> by prompting for step-by-step thinking!
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-background/50 border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">With Standard Models</p>
              <p className="text-sm text-foreground italic">
                "Solve this math problem <strong>step-by-step, showing your work</strong>: If a train travels 120 miles in 2 hours..."
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Adding Reflection</p>
              <p className="text-sm text-foreground italic">
                "...After solving, <strong>verify your answer by checking if it makes sense</strong> given the context."
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed pt-2">
            The key insight: Whether you use a reasoning model or prompt a standard model effectively, the goal is the same—
            <strong className="text-foreground"> transparent, verifiable thinking that produces better results</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
