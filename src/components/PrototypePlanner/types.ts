export interface AccessChecklist {
  noPII: boolean;
  captions: boolean;
  altText: boolean;
  citeSources: boolean;
}

export interface StudentFlow {
  start: string;
  do: string;
  finish: string;
}

export interface RecommendedTool {
  name: string;
  badges: string[];
  description?: string;
  route?: string;
}

export interface WizardFormData {
  // Phase 1: Empathize
  targetAudience: string;
  context: string;
  priorKnowledge: string;
  accessChecklist: AccessChecklist;
  
  // Phase 2: Define
  problemStatement: string;
  becauseStatement: string;
  hmwStatements: string[];
  
  // Phase 3: Ideate
  ideaStarters: Array<{
    title: string;
    description: string;
    module?: string;
    route?: string;
  }>;
  selectedConcept: string;
  customConcept: string;
  successMeasures: string[];
  
  // Phase 4: Prototype
  thinSlice: string;
  recommendedTools: RecommendedTool[];
  studentFlow: StudentFlow;
  buildSteps: string[];
  
  // Phase 5: Test
  testNotes: string;
  revisionActions: string[];
}

export type Phase = 1 | 2 | 3 | 4 | 5 | 'complete';

export interface PhaseComponentProps {
  formData: WizardFormData;
  updateFormData: (updates: Partial<WizardFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}
