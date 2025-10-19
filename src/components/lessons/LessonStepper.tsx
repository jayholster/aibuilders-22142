import { ReactNode, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useAppProgress } from "@/hooks/useAppProgress";

export type LessonBlock = {
  id: string;
  title: string;
  summary: string;
  content: ReactNode;
  estimatedTime?: string;
};

interface LessonStepperProps {
  lessonId: string;
  blocks: LessonBlock[];
  onComplete?: () => void;
}

const LessonStepper = ({ lessonId, blocks, onComplete }: LessonStepperProps) => {
  const { updateModuleStep, completeModule, moduleStates } = useAppProgress();
  const [activeIndex, setActiveIndex] = useState(0);

  const total = blocks.length;
  const activeBlock = blocks[activeIndex];

  useEffect(() => {
    const lastStep = moduleStates[lessonId]?.lastVisitedStep;
    if (typeof lastStep === "number" && lastStep < blocks.length) {
      setActiveIndex(lastStep);
    }
  }, [blocks.length, lessonId, moduleStates]);

  useEffect(() => {
    updateModuleStep(lessonId, activeIndex);
  }, [activeIndex, lessonId, updateModuleStep]);

  const progress = useMemo(() => Math.round(((activeIndex + 1) / total) * 100), [activeIndex, total]);

  const goToNext = () => {
    if (activeIndex === blocks.length - 1) {
      completeModule(lessonId);
      onComplete?.();
      return;
    }
    setActiveIndex((index) => Math.min(blocks.length - 1, index + 1));
  };

  const goToPrevious = () => {
    setActiveIndex((index) => Math.max(0, index - 1));
  };

  return (
    <div className="md:hidden">
      <Card className="border-border/60 bg-background/95 shadow-xl">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wide">
                {progress}% complete
              </Badge>
              <h2 className="text-xl font-semibold leading-tight">{activeBlock.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{activeBlock.summary}</p>
              {activeBlock.estimatedTime && (
                <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                  {activeBlock.estimatedTime}
                </p>
              )}
            </div>
            {moduleStates[lessonId]?.completed && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Done
              </Badge>
            )}
          </div>

          <Progress value={progress} className="h-1.5" />

          <div className="space-y-4">
            {activeBlock.content}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button variant="ghost" size="sm" onClick={goToPrevious} disabled={activeIndex === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <Button size="sm" className="ml-auto" onClick={goToNext}>
              {activeIndex === blocks.length - 1 ? "Mark complete" : "Next"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonStepper;
