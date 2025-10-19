import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WizardProgress } from "./PrototypePlanner/WizardProgress";
import { Phase1Empathize } from "./PrototypePlanner/Phase1Empathize";
import { Phase2Define } from "./PrototypePlanner/Phase2Define";
import { Phase3Ideate } from "./PrototypePlanner/Phase3Ideate";
import { Phase4Prototype } from "./PrototypePlanner/Phase4Prototype";
import { Phase5Test } from "./PrototypePlanner/Phase5Test";
import { FinalOutput } from "./PrototypePlanner/FinalOutput";
import { WizardFormData, Phase } from "./PrototypePlanner/types";
import { useAppProgress } from "@/hooks/useAppProgress";

interface PrototypePlannerProps {
  onSubmitForFeedback?: () => void;
}

const STORAGE_KEY = "prototype-planner-wizard";

const initialFormData: WizardFormData = {
  targetAudience: "",
  context: "",
  priorKnowledge: "",
  accessChecklist: {
    noPII: false,
    captions: false,
    altText: false,
    citeSources: false,
  },
  problemStatement: "",
  becauseStatement: "",
  hmwStatements: [],
  ideaStarters: [],
  selectedConcept: "",
  customConcept: "",
  successMeasures: [],
  thinSlice: "",
  recommendedTools: [],
  studentFlow: {
    start: "",
    do: "",
    finish: "",
  },
  buildSteps: [],
  testNotes: "",
  revisionActions: [],
};

export const PrototypePlanner = ({ onSubmitForFeedback }: PrototypePlannerProps = {}) => {
  const [currentPhase, setCurrentPhase] = useState<Phase>(1);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const { reflection, updateModuleStep, completeModule } = useAppProgress();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.formData || initialFormData);
        setCurrentPhase(parsed.currentPhase || 1);
        setCompletedPhases(parsed.completedPhases || []);
      } catch (error) {
        console.error("Error loading saved wizard data:", error);
      }
    }

    // Prefill problem statement from reflection store
    if (reflection && !formData.problemStatement) {
      setFormData(prev => ({ ...prev, problemStatement: reflection }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reflection && !formData.problemStatement) {
      setFormData(prev => ({ ...prev, problemStatement: reflection }));
    }
  }, [reflection, formData.problemStatement]);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        formData,
        currentPhase,
        completedPhases,
      })
    );
  }, [formData, currentPhase, completedPhases]);

  const updateFormData = (updates: Partial<WizardFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentPhase === 'complete') return;

    // Mark current phase as completed
    if (!completedPhases.includes(currentPhase as number)) {
      setCompletedPhases([...completedPhases, currentPhase as number]);
    }

    // Move to next phase
    if (currentPhase === 5) {
      setCurrentPhase('complete');
    } else {
      setCurrentPhase((currentPhase as number + 1) as Phase);
    }
  };

  const handleBack = () => {
    if (currentPhase === 'complete') {
      setCurrentPhase(5);
      return;
    }
    
    if (typeof currentPhase === 'number' && currentPhase > 1) {
      setCurrentPhase((currentPhase - 1) as Phase);
    }
  };

  const handleStartOver = () => {
    if (confirm("Are you sure? This will clear all your progress and start fresh.")) {
      setFormData(initialFormData);
      setCurrentPhase(1);
      setCompletedPhases([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleEditPhase = (phase: number) => {
    setCurrentPhase(phase as Phase);
  };

  useEffect(() => {
    const stepIndex = currentPhase === 'complete' ? 5 : ((currentPhase as number) - 1);
    updateModuleStep('prototype-planner', stepIndex);
    if (currentPhase === 'complete') {
      completeModule('prototype-planner');
    }
  }, [currentPhase, updateModuleStep, completeModule]);

  return (
    <Card className="w-full border-2 shadow-lg">
      <CardContent className="p-8">
        {currentPhase !== 'complete' && (
          <WizardProgress currentPhase={currentPhase} completedPhases={completedPhases} />
        )}

        {currentPhase === 1 && (
          <Phase1Empathize
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentPhase === 2 && (
          <Phase2Define
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentPhase === 3 && (
          <Phase3Ideate
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentPhase === 4 && (
          <Phase4Prototype
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentPhase === 5 && (
          <Phase5Test
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentPhase === 'complete' && (
          <FinalOutput
            formData={formData}
            onStartOver={handleStartOver}
            onEditPhase={handleEditPhase}
            onSubmitForFeedback={onSubmitForFeedback}
          />
        )}
      </CardContent>
    </Card>
  );
};
