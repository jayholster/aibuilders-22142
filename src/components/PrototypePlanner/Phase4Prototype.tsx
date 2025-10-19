import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Wrench, ChevronRight, ChevronLeft, RefreshCw, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { PhaseComponentProps } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Phase4Prototype = ({ formData, updateFormData, onNext, onBack }: PhaseComponentProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (formData.recommendedTools.length === 0 || formData.buildSteps.length === 0) {
      generatePrototypeDetails();
    }
  }, []);

  const generatePrototypeDetails = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-prototype-plan', {
        body: {
          phase: 'prototype',
          selectedConcept: formData.selectedConcept,
          problemStatement: formData.problemStatement,
          targetAudience: formData.targetAudience,
          context: formData.context,
        }
      });

      if (error) throw error;

      if (data) {
        updateFormData({
          thinSlice: data.thinSlice || formData.selectedConcept,
          recommendedTools: data.recommendedTools || [],
          studentFlow: data.studentFlow || { start: "", do: "", finish: "" },
          buildSteps: data.buildSteps || [],
        });
      }
    } catch (error) {
      console.error('Error generating prototype details:', error);
      toast({
        title: "Generation failed",
        description: "Please fill in the details manually.",
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
          <Wrench className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Prototype</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Scope your build. One feature, one interaction, one clear output.
        </p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <AlertDescription className="text-sm">
          <strong>Design Thinking Tip:</strong> Keep it thin. A working prototype that does one thing well 
          is better than a complex idea that never ships.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="thinSlice" className="text-base font-medium">
            Thin Slice
          </Label>
          <p className="text-sm text-muted-foreground">
            What's the absolute core feature? (Shippable today)
          </p>
          <Textarea
            id="thinSlice"
            placeholder="e.g., A simple chatbot that quizzes students on chord progressions with immediate feedback..."
            value={formData.thinSlice}
            onChange={(e) => updateFormData({ thinSlice: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Recommended Tools</Label>
              <p className="text-sm text-muted-foreground mt-1">
                AI-suggested platforms based on your prototype scope
              </p>
            </div>
            <Button
              onClick={generatePrototypeDetails}
              disabled={isGenerating}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>

          {formData.recommendedTools.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {formData.recommendedTools.map((tool, index) => (
                <Card key={index} className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{tool.name}</h4>
                      {tool.route && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild 
                          className="flex items-center gap-1 h-7 text-xs shrink-0"
                        >
                          <Link to={tool.route}>
                            View Module <ExternalLink className="w-3 h-3" />
                          </Link>
                        </Button>
                      )}
                    </div>
                    {tool.description && (
                      <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {tool.badges.map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Student Flow (2 Steps)</Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="flowInput" className="text-sm font-medium text-primary">
                Input
              </Label>
              <p className="text-xs text-muted-foreground mb-1">
                What do students provide or start with?
              </p>
              <Textarea
                id="flowInput"
                placeholder="e.g., Students upload a chord progression or musical excerpt..."
                value={formData.studentFlow.start}
                onChange={(e) => updateFormData({ 
                  studentFlow: { ...formData.studentFlow, start: e.target.value } 
                })}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flowOutput" className="text-sm font-medium text-primary">
                Output
              </Label>
              <p className="text-xs text-muted-foreground mb-1">
                What do they get back? (feedback, content, etc.)
              </p>
              <Textarea
                id="flowOutput"
                placeholder="e.g., They receive immediate feedback on accuracy and suggestions..."
                value={formData.studentFlow.finish}
                onChange={(e) => updateFormData({ 
                  studentFlow: { ...formData.studentFlow, finish: e.target.value } 
                })}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">Build Steps (10-30 minutes)</Label>
          <p className="text-sm text-muted-foreground">
            Concrete actions to build your thin slice
          </p>
          <div className="space-y-2">
            {formData.buildSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                <Checkbox
                  id={`step-${index}`}
                  checked={checkedSteps[index] || false}
                  onCheckedChange={(checked) => 
                    setCheckedSteps({ ...checkedSteps, [index]: checked as boolean })
                  }
                />
                <Label 
                  htmlFor={`step-${index}`} 
                  className={`flex-1 cursor-pointer leading-relaxed ${
                    checkedSteps[index] ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {step}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Ideate
        </Button>
        <Button 
          onClick={onNext}
          size="lg"
          className="flex items-center gap-2"
        >
          Continue to Test <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
