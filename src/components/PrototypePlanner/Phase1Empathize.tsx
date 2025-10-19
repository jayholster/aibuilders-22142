import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, ChevronRight } from "lucide-react";
import { PhaseComponentProps } from "./types";

export const Phase1Empathize = ({ formData, updateFormData, onNext }: PhaseComponentProps) => {
  const allCheckboxesChecked = 
    formData.accessChecklist.noPII &&
    formData.accessChecklist.captions &&
    formData.accessChecklist.altText &&
    formData.accessChecklist.citeSources;

  const canProceed = formData.targetAudience.trim() && allCheckboxesChecked;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Heart className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Empathize</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start by understanding who this is for and the context in which they'll use your prototype.
        </p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <AlertDescription className="text-sm">
          <strong>Design Thinking Tip:</strong> Empathy is about deeply understanding your learners' needs, 
          challenges, and context before jumping to solutions.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="text-base font-medium">
            Who is this for? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="targetAudience"
            placeholder="e.g., Undergraduate music theory students, graduate composition majors, K-12 music educators..."
            value={formData.targetAudience}
            onChange={(e) => updateFormData({ targetAudience: e.target.value })}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="context" className="text-base font-medium">
            Context & Constraints
          </Label>
          <p className="text-sm text-muted-foreground">
            What are the practical limitations? (time, access to technology, class size, etc.)
          </p>
          <Textarea
            id="context"
            placeholder="e.g., 50-minute class periods, mix of in-person and online students, limited access to instruments..."
            value={formData.context}
            onChange={(e) => updateFormData({ context: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priorKnowledge" className="text-base font-medium">
            Prior Knowledge
          </Label>
          <p className="text-sm text-muted-foreground">
            What do learners already know? What skills can you build upon?
          </p>
          <Textarea
            id="priorKnowledge"
            placeholder="e.g., Basic music notation, some experience with digital audio workstations, familiarity with Google Classroom..."
            value={formData.priorKnowledge}
            onChange={(e) => updateFormData({ priorKnowledge: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-4 p-6 bg-accent/5 rounded-xl border border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            Access & Ethics Quick-Check <span className="text-destructive">*</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            Before proceeding, commit to these ethical principles for your prototype:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="noPII"
                checked={formData.accessChecklist.noPII}
                onCheckedChange={(checked) => 
                  updateFormData({ 
                    accessChecklist: { ...formData.accessChecklist, noPII: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="noPII" className="text-sm cursor-pointer leading-relaxed">
                No student personally identifiable information (PII) in prompts or uploads
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="captions"
                checked={formData.accessChecklist.captions}
                onCheckedChange={(checked) => 
                  updateFormData({ 
                    accessChecklist: { ...formData.accessChecklist, captions: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="captions" className="text-sm cursor-pointer leading-relaxed">
                Captions/transcripts for audio/video content
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="altText"
                checked={formData.accessChecklist.altText}
                onCheckedChange={(checked) => 
                  updateFormData({ 
                    accessChecklist: { ...formData.accessChecklist, altText: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="altText" className="text-sm cursor-pointer leading-relaxed">
                Alt text for images; keyboard accessible interactions
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="citeSources"
                checked={formData.accessChecklist.citeSources}
                onCheckedChange={(checked) => 
                  updateFormData({ 
                    accessChecklist: { ...formData.accessChecklist, citeSources: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="citeSources" className="text-sm cursor-pointer leading-relaxed">
                Cite and verify sources; teach students to do the same
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button 
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="flex items-center gap-2"
        >
          Continue to Define <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
