import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

const prompts = [
  "Why does the moon sometimes look bigger when it rises?",
  "Explain quantum entanglement to a 10-year-old and to a physicist.",
  "Explain how the internet works using a sports analogy.",
  "If a train leaves New York at 60 mph and another leaves Chicago at 80 mph, when do they meet? Show your work.",
  "Explain climate change as if you were a stand-up comedian.",
  "Is social media helping or harming mental health? Defend your stance with evidence."
];

export default function ShowdownPrompts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPrompt = prompts[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prompts.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < prompts.length - 1 ? prev + 1 : 0));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-ink mb-2">Showdown Prompts</h3>
        <p className="text-ink-muted">
          Test these prompts across different reasoning models to compare their responses.
        </p>
      </div>

      {/* Horizontal Navigation Dots */}
      <div className="flex justify-center items-center gap-2 mb-4">
        {prompts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-primary scale-125" 
                : "bg-muted hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to prompt ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Prompt Card */}
      <Card className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center flex-1">
              <CardTitle className="text-lg font-medium text-ink flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                Prompt {currentIndex + 1}
              </CardTitle>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="bg-accent/10 rounded-lg p-6 border border-accent/20 text-center">
            <p className="text-ink text-lg leading-relaxed font-medium">
              "{currentPrompt}"
            </p>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            <span className="text-xs text-ink-muted">
              {currentIndex + 1} of {prompts.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={goToPrevious}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={goToNext}>
          Next
        </Button>
      </div>
    </div>
  );
}