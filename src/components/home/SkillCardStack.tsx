import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { skillCards } from "@/data/skillCards";
import { learningModules } from "@/lib/learningModules";
import { cn } from "@/lib/utils";
import { Shuffle, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const moduleThemes: Record<
  string,
  {
    gradient: string;
    accent: string;
    label: string;
  }
> = {
  "ai-literacy": {
    gradient: "from-indigo-500 via-sky-500 to-blue-500",
    accent: "bg-white/15",
    label: "AI Literacy",
  },
  "ai-ethics": {
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accent: "bg-white/15",
    label: "AI Ethics & Bias",
  },
  storytelling: {
    gradient: "from-fuchsia-500 via-rose-500 to-amber-500",
    accent: "bg-white/15",
    label: "Storytelling",
  },
  vibecoding: {
    gradient: "from-purple-500 via-indigo-500 to-slate-500",
    accent: "bg-white/15",
    label: "Vibecoding",
  },
  "custom-gpts": {
    gradient: "from-slate-500 via-blue-500 to-cyan-500",
    accent: "bg-white/15",
    label: "Custom GPTs",
  },
  "prototype-planner": {
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    accent: "bg-white/15",
    label: "Prototype Planner",
  },
};

const filters = [
  { id: "all", label: "All cards" },
  ...learningModules
    .filter((module) => module.id !== "home" && module.id !== "gallery")
    .map((module) => ({ id: module.id, label: module.title })),
];

type Mode = "sequence" | "shuffle";

export const SkillCardStack = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("sequence");
  const [filter, setFilter] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());

  const filteredCards = useMemo(() => {
    const subset = filter === "all" ? skillCards : skillCards.filter((card) => card.moduleId === filter);
    return subset;
  }, [filter]);

  const currentCard = filteredCards[index % filteredCards.length];

  const onAdvance = () => {
    if (filteredCards.length <= 1) return;

    if (mode === "shuffle") {
      const otherCards = filteredCards.filter((card) => card.id !== currentCard.id);
      const nextCard = otherCards[Math.floor(Math.random() * otherCards.length)];
      const nextIndex = filteredCards.findIndex((card) => card.id === nextCard.id);
      setIndex(nextIndex >= 0 ? nextIndex : 0);
    } else {
      setIndex((prev) => (prev + 1) % filteredCards.length);
    }
  };

  const toggleCompletion = (cardId: string) => {
    setCompletedCards((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  if (!currentCard) {
    return null;
  }

  const theme = moduleThemes[currentCard.moduleId];

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full border px-4",
              item.id === filter
                ? "border-white/30 bg-white/20 text-white"
                : "border-white/10 text-slate-300 hover:bg-white/10"
            )}
            onClick={() => {
              setFilter(item.id);
              setIndex(0);
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <Card className="relative overflow-hidden border-none shadow-xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme?.gradient ?? "from-slate-600 via-slate-700 to-slate-900"}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
        </div>

        <div className="relative flex flex-col gap-6 p-8 text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {theme?.label ?? "Learning card"}
              </Badge>
              <Badge variant="outline" className="border-white/40 text-xs uppercase tracking-wide text-white">
                {mode === "shuffle" ? "Shuffle" : "Sequence"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:bg-white/20"
                onClick={() => setMode((prev) => (prev === "sequence" ? "shuffle" : "sequence"))}
              >
                <Shuffle className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "text-white/80 hover:bg-white/20",
                  completedCards.has(currentCard.id) && "bg-white/20 text-white"
                )}
                onClick={() => toggleCompletion(currentCard.id)}
              >
                <CheckCircle2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div key={currentCard.id} className="space-y-6 transition-all">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">{currentCard.headline}</p>
              <h3 className="text-3xl font-semibold leading-tight md:text-4xl">{currentCard.title}</h3>
              <p className="text-base text-white/80 md:text-lg">{currentCard.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentCard.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide text-white",
                    theme?.accent ?? "bg-white/15"
                  )}
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 bg-white text-slate-900 hover:bg-white/90"
                onClick={() => navigate(currentCard.route)}
              >
                {currentCard.actionLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1 bg-white/20 text-white hover:bg-white/30"
                onClick={onAdvance}
              >
                {mode === "shuffle" ? "Deal a new card" : "Next card"}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-2 rounded-2xl border border-border/40 bg-muted/40 p-4 text-sm text-muted-foreground backdrop-blur">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          One tap puts you into the right module with a concrete move.
        </div>
        <p>
          Shuffle for inspiration or work the cards in order. Each action pulls from the original module so your progress stays grounded in the full experience.
        </p>
      </div>
    </div>
  );
};
