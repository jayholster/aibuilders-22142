import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Brain, Palette, BarChart3, Users, Lightbulb } from "lucide-react";

interface Outcome {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const outcomes: Outcome[] = [
  {
    title: "Understand AI Systems",
    description: "How common AI systems work at a practical level",
    icon: <Brain className="w-5 h-5" />
  },
  {
    title: "Create & Document",
    description: "Create with multiple tools and explain your process",
    icon: <Palette className="w-5 h-5" />
  },
  {
    title: "Analyze Trade-offs",
    description: "Analyze use-cases and trade-offs; communicate clearly",
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    title: "Collaborate",
    description: "Collaborate across disciplines; build a small body of work",
    icon: <Users className="w-5 h-5" />
  },
  {
    title: "Propose Improvements",
    description: "Propose or test improvements (small, evidence-informed)",
    icon: <Lightbulb className="w-5 h-5" />
  }
];

export default function LearningOutcomes() {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-ink">Learning Outcomes</h2>
      </div>
      
      <div className="grid gap-4">
        {outcomes.map((outcome, index) => (
          <Card key={index} className="border border-border hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  {outcome.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <h3 className="font-semibold text-ink">{outcome.title}</h3>
                  </div>
                  <p className="text-ink-muted text-sm">{outcome.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}