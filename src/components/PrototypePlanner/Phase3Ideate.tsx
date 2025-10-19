import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lightbulb, ChevronRight, ChevronLeft, Sparkles, RefreshCw, Plus, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { PhaseComponentProps } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Phase3Ideate = ({ formData, updateFormData, onNext, onBack }: PhaseComponentProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    if (formData.ideaStarters.length === 0) {
      generateIdeaStarters();
    }
  }, []);

  // Auto-generate success measures when concept is selected
  useEffect(() => {
    const concept = selectedOption === "custom" ? formData.customConcept : formData.selectedConcept;
    if (concept && formData.successMeasures.length === 0) {
      generateSuccessMeasures();
    }
  }, [selectedOption, formData.selectedConcept, formData.customConcept]);

  const canProceed = (selectedOption !== "" && selectedOption !== "custom") || 
                     (selectedOption === "custom" && formData.customConcept.trim());

  const generateIdeaStarters = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-prototype-plan', {
        body: {
          phase: 'ideate',
          problemStatement: formData.problemStatement,
          targetAudience: formData.targetAudience,
          hmwStatements: formData.hmwStatements,
        }
      });

      if (error) throw error;

      if (data?.ideaStarters) {
        updateFormData({ ideaStarters: data.ideaStarters });
      }
    } catch (error) {
      console.error('Error generating idea starters:', error);
      toast({
        title: "Generation failed",
        description: "Please write your own idea or try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSuccessMeasures = async () => {
    const concept = selectedOption === "custom" ? formData.customConcept : formData.selectedConcept;
    
    if (!concept.trim()) {
      toast({
        title: "Please select a concept first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-prototype-plan', {
        body: {
          phase: 'success-measures',
          concept,
          problemStatement: formData.problemStatement,
          targetAudience: formData.targetAudience,
        }
      });

      if (error) throw error;

      if (data?.successMeasures) {
        updateFormData({ successMeasures: data.successMeasures });
        toast({
          title: "Success measures generated!",
          description: "Review and edit as needed.",
        });
      }
    } catch (error) {
      console.error('Error generating success measures:', error);
      toast({
        title: "Generation failed",
        description: "Please write your own measures or try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addSuccessMeasure = () => {
    updateFormData({ successMeasures: [...formData.successMeasures, ""] });
  };

  const updateSuccessMeasure = (index: number, value: string) => {
    const newMeasures = [...formData.successMeasures];
    newMeasures[index] = value;
    updateFormData({ successMeasures: newMeasures });
  };

  const removeSuccessMeasure = (index: number) => {
    const newMeasures = formData.successMeasures.filter((_, i) => i !== index);
    updateFormData({ successMeasures: newMeasures });
  };

  const handleNext = () => {
    const finalConcept = selectedOption === "custom" ? formData.customConcept : formData.selectedConcept;
    updateFormData({ selectedConcept: finalConcept });
    onNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Lightbulb className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Ideate</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore multiple options before committing to one. Diverge, then converge.
        </p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <AlertDescription className="text-sm">
          <strong>Design Thinking Tip:</strong> Resist the urge to pick the first idea. 
          Generate multiple possibilities to find the most promising direction.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Idea Starters</Label>
              <p className="text-sm text-muted-foreground mt-1">
                AI-generated concepts based on your problem statement
              </p>
            </div>
            <Button
              onClick={generateIdeaStarters}
              disabled={isGenerating}
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
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </>
              )}
            </Button>
          </div>

          {formData.ideaStarters.length > 0 && (
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              <div className="space-y-3">
                {formData.ideaStarters.map((idea, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedOption === `idea-${index}` 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      setSelectedOption(`idea-${index}`);
                      updateFormData({ selectedConcept: idea.title });
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={`idea-${index}`} id={`idea-${index}`} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Label htmlFor={`idea-${index}`} className="font-semibold cursor-pointer">
                              {idea.title}
                            </Label>
                            {idea.module && (
                              <Badge variant="secondary" className="text-xs shrink-0">
                                {idea.module}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                          {idea.route && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              asChild 
                              className="p-0 h-auto text-xs text-primary mt-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Link to={idea.route} className="flex items-center gap-1">
                                View {idea.module} module <ExternalLink className="w-3 h-3" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedOption === 'custom' 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-dashed border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedOption('custom')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="custom" id="custom" />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="custom" className="font-semibold cursor-pointer flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Custom Idea
                        </Label>
                        {selectedOption === 'custom' && (
                          <Textarea
                            placeholder="Describe your own prototype concept..."
                            value={formData.customConcept}
                            onChange={(e) => updateFormData({ customConcept: e.target.value })}
                            className="mt-2"
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </RadioGroup>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Success Looks Like...</Label>
              <p className="text-sm text-muted-foreground mt-1">
                How will you know your prototype is working? (2-3 concrete measures)
              </p>
            </div>
            <Button
              onClick={generateSuccessMeasures}
              disabled={isGenerating || !canProceed}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Suggest Measures
            </Button>
          </div>

          <div className="space-y-3">
            {formData.successMeasures.map((measure, index) => (
              <div key={index} className="flex items-start gap-2">
                <Input
                  placeholder={`Success measure ${index + 1}...`}
                  value={measure}
                  onChange={(e) => updateSuccessMeasure(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSuccessMeasure(index)}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              onClick={addSuccessMeasure}
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Success Measure
            </Button>
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
          <ChevronLeft className="w-4 h-4" /> Back to Define
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
          className="flex items-center gap-2"
        >
          Continue to Prototype <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
