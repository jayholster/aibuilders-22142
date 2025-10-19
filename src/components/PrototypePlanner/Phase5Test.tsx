import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, ChevronLeft, ChevronRight, CheckCircle2, Plus, X } from "lucide-react";
import { PhaseComponentProps } from "./types";

export const Phase5Test = ({ formData, updateFormData, onNext, onBack }: PhaseComponentProps) => {
  const addRevisionAction = () => {
    updateFormData({ revisionActions: [...formData.revisionActions, ""] });
  };

  const updateRevisionAction = (index: number, value: string) => {
    const newActions = [...formData.revisionActions];
    newActions[index] = value;
    updateFormData({ revisionActions: newActions });
  };

  const removeRevisionAction = (index: number) => {
    const newActions = formData.revisionActions.filter((_, i) => i !== index);
    updateFormData({ revisionActions: newActions });
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 text-primary">
          <FlaskConical className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Test</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get feedback fast. Test with real users, observe, and iterate.
        </p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <AlertDescription className="text-sm">
          <strong>Design Thinking Tip:</strong> Testing isn't about proving your idea works—
          it's about learning what to improve. Embrace failures as learning opportunities.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Quick Test Protocol (5-10 min)</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary shrink-0">1.</span>
                <span>Ask a peer or student to try your prototype <strong>silently</strong> for 1 minute.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary shrink-0">2.</span>
                <span>Have them <strong>narrate their thinking</strong> out loud as they use it.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary shrink-0">3.</span>
                <span>End with <strong>"I liked... / I wish... / What if..."</strong> (one of each).</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label htmlFor="testNotes" className="text-base font-medium">
            Test Notes & Observations
          </Label>
          <p className="text-sm text-muted-foreground">
            What did you observe? What feedback did you receive?
          </p>
          <Textarea
            id="testNotes"
            placeholder="e.g., User was confused by the initial instructions. They liked the immediate feedback but wished the interface was simpler. What if we added audio examples?"
            value={formData.testNotes}
            onChange={(e) => updateFormData({ testNotes: e.target.value })}
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Revise Next (2 Actions)</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Based on testing, what are your top 2 priorities for improvement?
            </p>
          </div>

          <div className="space-y-3">
            {formData.revisionActions.length > 0 ? (
              formData.revisionActions.map((action, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Input
                    placeholder={`Action ${index + 1}: Improve, add, or refine...`}
                    value={action}
                    onChange={(e) => updateRevisionAction(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRevisionAction(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p className="text-sm">Add revision actions based on your test observations</p>
                </CardContent>
              </Card>
            )}
            
            {formData.revisionActions.length < 3 && (
              <Button
                onClick={addRevisionAction}
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Revision Action
              </Button>
            )}
          </div>
        </div>

        <Alert className="bg-accent/10 border-accent/30">
          <AlertDescription className="text-sm">
            <strong>Remember:</strong> Design thinking is iterative. After testing and revising, 
            you might loop back to earlier phases as you refine your prototype.
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Prototype
        </Button>
        <div className="flex gap-3">
          <Button 
            onClick={onNext}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            Skip Testing (Build First) <ChevronRight className="w-4 h-4" />
          </Button>
          <Button 
            onClick={onNext}
            size="lg"
            className="flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Generate Final Plan
          </Button>
        </div>
      </div>
    </div>
  );
};
