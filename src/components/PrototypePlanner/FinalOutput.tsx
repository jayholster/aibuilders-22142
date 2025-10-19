import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Copy, RotateCcw, CheckCircle2, Edit, Send } from "lucide-react";
import { WizardFormData } from "./types";
import { useToast } from "@/hooks/use-toast";

interface FinalOutputProps {
  formData: WizardFormData;
  onStartOver: () => void;
  onEditPhase: (phase: number) => void;
  onSubmitForFeedback?: () => void;
}

export const FinalOutput = ({ formData, onStartOver, onEditPhase, onSubmitForFeedback }: FinalOutputProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    const fullPlan = generatePlanText();
    await navigator.clipboard.writeText(fullPlan);
    toast({
      title: "Copied to clipboard!",
      description: "Your complete design thinking plan has been copied.",
    });
  };


  const generatePlanText = () => {
    return `
AI PROTOTYPE PLAN - DESIGN THINKING APPROACH
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════════════════════

PHASE 1: EMPATHIZE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Target Audience:
${formData.targetAudience}

Context & Constraints:
${formData.context || "Not specified"}

Prior Knowledge:
${formData.priorKnowledge || "Not specified"}

Access & Ethics Commitments:
✓ No student PII in prompts or uploads
✓ Captions/transcripts for audio/video
✓ Alt text for images; keyboard accessible
✓ Cite and verify sources

═══════════════════════════════════════════════════════════

PHASE 2: DEFINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problem Statement:
${formData.problemStatement}

Because...
${formData.becauseStatement}

How Might We...
${formData.hmwStatements.map((hmw, i) => `${i + 1}. ${hmw}`).join('\n')}

═══════════════════════════════════════════════════════════

PHASE 3: IDEATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Selected Concept:
${formData.selectedConcept}

Success Measures:
${formData.successMeasures.map((measure, i) => `${i + 1}. ${measure}`).join('\n')}

═══════════════════════════════════════════════════════════

PHASE 4: PROTOTYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thin Slice:
${formData.thinSlice}

Recommended Tools:
${formData.recommendedTools.map(tool => `• ${tool.name} (${tool.badges.join(', ')})`).join('\n')}

Student Flow:
START: ${formData.studentFlow.start}
DO: ${formData.studentFlow.do}
FINISH: ${formData.studentFlow.finish}

Build Steps:
${formData.buildSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

═══════════════════════════════════════════════════════════

PHASE 5: TEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test Notes:
${formData.testNotes || "Not yet tested"}

Revision Actions:
${formData.revisionActions.map((action, i) => `${i + 1}. ${action}`).join('\n')}

═══════════════════════════════════════════════════════════

Next Steps:
1. Build your thin slice prototype using recommended tools
2. Test with 2-3 real users following the quick test protocol
3. Iterate based on feedback
4. Share your results in the workshop gallery

═══════════════════════════════════════════════════════════
    `.trim();
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-semibold text-foreground">Your Complete Design Thinking Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review your 5-phase prototype plan below. Download, share, or edit any section.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {onSubmitForFeedback && (
          <Button 
            onClick={onSubmitForFeedback} 
            size="lg"
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit for CPAD Feedback
          </Button>
        )}
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copy Plan
        </Button>
        <Button onClick={onStartOver} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Start New Plan
        </Button>
      </div>

      <Card className="border-2 print-content">
        <CardContent className="p-6">
          <Accordion type="single" collapsible defaultValue="phase-1" className="space-y-4">
            <AccordionItem value="phase-1" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <h3 className="text-lg font-semibold text-foreground">Phase 1: Empathize</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPhase(1);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Target Audience</h4>
                  <p className="text-foreground">{formData.targetAudience}</p>
                </div>
                {formData.context && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Context & Constraints</h4>
                    <p className="text-foreground">{formData.context}</p>
                  </div>
                )}
                {formData.priorKnowledge && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Prior Knowledge</h4>
                    <p className="text-foreground">{formData.priorKnowledge}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Access & Ethics Commitments</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">No PII</Badge>
                    <Badge variant="secondary">Captions/Transcripts</Badge>
                    <Badge variant="secondary">Alt Text</Badge>
                    <Badge variant="secondary">Cite Sources</Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="phase-2" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <h3 className="text-lg font-semibold text-foreground">Phase 2: Define</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPhase(2);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Problem Statement</h4>
                  <p className="text-foreground">{formData.problemStatement}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Because...</h4>
                  <p className="text-foreground">{formData.becauseStatement}</p>
                </div>
                {formData.hmwStatements.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">How Might We...</h4>
                    <ul className="space-y-2">
                      {formData.hmwStatements.map((hmw, i) => (
                        <li key={i} className="text-foreground flex items-start gap-2">
                          <span className="text-primary font-bold">{i + 1}.</span>
                          <span>{hmw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="phase-3" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <h3 className="text-lg font-semibold text-foreground">Phase 3: Ideate</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPhase(3);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Selected Concept</h4>
                  <p className="text-foreground font-medium">{formData.selectedConcept}</p>
                </div>
                {formData.successMeasures.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Success Measures</h4>
                    <ul className="space-y-2">
                      {formData.successMeasures.map((measure, i) => (
                        <li key={i} className="text-foreground flex items-start gap-2">
                          <span className="text-primary font-bold">{i + 1}.</span>
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="phase-4" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <h3 className="text-lg font-semibold text-foreground">Phase 4: Prototype</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPhase(4);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Thin Slice</h4>
                  <p className="text-foreground">{formData.thinSlice}</p>
                </div>
                {formData.recommendedTools.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Recommended Tools</h4>
                    <div className="space-y-2">
                      {formData.recommendedTools.map((tool, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="font-semibold text-foreground">{tool.name}</span>
                          <div className="flex flex-wrap gap-1">
                            {tool.badges.map((badge, j) => (
                              <Badge key={j} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Student Flow</h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-xs font-semibold text-primary mb-1">START</p>
                      <p className="text-sm text-foreground">{formData.studentFlow.start}</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-xs font-semibold text-primary mb-1">DO</p>
                      <p className="text-sm text-foreground">{formData.studentFlow.do}</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-xs font-semibold text-primary mb-1">FINISH</p>
                      <p className="text-sm text-foreground">{formData.studentFlow.finish}</p>
                    </div>
                  </div>
                </div>
                {formData.buildSteps.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Build Steps</h4>
                    <ol className="space-y-1">
                      {formData.buildSteps.map((step, i) => (
                        <li key={i} className="text-foreground text-sm flex items-start gap-2">
                          <span className="text-primary font-bold">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="phase-5" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <h3 className="text-lg font-semibold text-foreground">Phase 5: Test</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPhase(5);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {formData.testNotes && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Test Notes</h4>
                    <p className="text-foreground whitespace-pre-wrap">{formData.testNotes}</p>
                  </div>
                )}
                {formData.revisionActions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Revision Actions</h4>
                    <ul className="space-y-2">
                      {formData.revisionActions.map((action, i) => (
                        <li key={i} className="text-foreground flex items-start gap-2">
                          <span className="text-primary font-bold">{i + 1}.</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-content, .print-content * {
              visibility: visible;
            }
            .print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};
