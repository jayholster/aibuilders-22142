import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Phase } from "./types";

interface WizardProgressProps {
  currentPhase: Phase;
  completedPhases: number[];
}

const phases = [
  { number: 1, name: "Empathize" },
  { number: 2, name: "Define" },
  { number: 3, name: "Ideate" },
  { number: 4, name: "Prototype" },
  { number: 5, name: "Test" },
];

export const WizardProgress = ({ currentPhase, completedPhases }: WizardProgressProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        {phases.map((phase, index) => {
          const isActive = currentPhase === phase.number;
          const isCompleted = completedPhases.includes(phase.number);
          const isLast = index === phases.length - 1;

          return (
            <div key={phase.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110",
                    isCompleted && !isActive && "bg-primary/20 text-primary",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{phase.number}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium hidden sm:block",
                    isActive && "text-primary",
                    !isActive && "text-muted-foreground"
                  )}
                >
                  {phase.name}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-300",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
