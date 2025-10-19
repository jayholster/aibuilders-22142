import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Target, ChevronRight, ChevronLeft, Sparkles, RefreshCw } from "lucide-react";
import { PhaseComponentProps } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Phase2Define = ({ formData, updateFormData, onNext, onBack }: PhaseComponentProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const canProceed = formData.problemStatement.trim();

  // Auto-generate HMW statements when entering the phase
  useEffect(() => {
    if (formData.problemStatement.trim() && formData.hmwStatements.length === 0) {
      generateHMWStatements();
    }
  }, [formData.problemStatement]);

  const generateHMWStatements = async () => {
    if (!formData.problemStatement.trim()) {
      toast({
        title: "Problem statement required",
        description: "Please enter a problem statement first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-prototype-plan', {
        body: {
          phase: 'hmw',
          problemStatement: formData.problemStatement,
          targetAudience: formData.targetAudience,
          context: formData.context,
        }
      });

      if (error) throw error;

      if (data?.hmwStatements) {
        updateFormData({ hmwStatements: data.hmwStatements });
        toast({
          title: "HMW statements generated!",
          description: "Review and edit as needed.",
        });
      }
    } catch (error) {
      console.error('Error generating HMW statements:', error);
      toast({
        title: "Generation failed",
        description: "Please try again or write your own statements.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Target className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Define</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Frame the challenge clearly. A well-defined problem leads to better solutions.
        </p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <AlertDescription className="text-sm">
          <strong>Design Thinking Tip:</strong> The "Define" stage is about synthesizing what you learned 
          during empathy into a clear, actionable problem statement.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="problemStatement" className="text-base font-medium">
            Problem Statement <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="problemStatement"
            placeholder="e.g., Students struggle to identify chord progressions by ear, which limits their ability to learn songs independently..."
            value={formData.problemStatement}
            onChange={(e) => updateFormData({ problemStatement: e.target.value })}
            className="min-h-[120px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="becauseStatement" className="text-base font-medium">
            Because... (optional)
          </Label>
          <p className="text-sm text-muted-foreground">
            Why does this problem matter? What evidence supports this need?
          </p>
          <Textarea
            id="becauseStatement"
            placeholder="e.g., Research shows that ear training improves overall musicianship, yet students have limited practice opportunities outside of class..."
            value={formData.becauseStatement}
            onChange={(e) => updateFormData({ becauseStatement: e.target.value })}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">How Might We... (3 variants)</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Reframe your problem as opportunities for innovation
              </p>
            </div>
            <Button
              onClick={generateHMWStatements}
              disabled={isGenerating || !formData.problemStatement.trim()}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate HMW
                </>
              )}
            </Button>
          </div>

          {formData.hmwStatements.length > 0 ? (
            <div className="space-y-3">
              {formData.hmwStatements.map((statement, index) => (
                <Card key={index} className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <Textarea
                      value={statement}
                      onChange={(e) => {
                        const newStatements = [...formData.hmwStatements];
                        newStatements[index] = e.target.value;
                        updateFormData({ hmwStatements: newStatements });
                      }}
                      className="min-h-[60px] bg-background"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center text-muted-foreground">
                <p className="text-sm">
                  Click "Generate HMW" to create "How Might We" statements based on your problem, 
                  or write your own below.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Empathize
        </Button>
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="flex items-center gap-2"
        >
          Continue to Ideate <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
