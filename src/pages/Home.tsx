import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import InteractiveBackground from "@/components/InteractiveBackground";
import { PrototypeSubmissionForm } from "@/components/PrototypeSubmissionForm";
import { SkillCardStack } from "@/components/home/SkillCardStack";
import cpadLogo from "@/assets/cpad-logo-new.png";
import { learningModules } from "@/lib/learningModules";
import { useAppProgress } from "@/hooks/useAppProgress";
import {
  ArrowRight,
  Lightbulb,
  Clock,
  Palette,
  Users,
  BookOpenCheck,
  Target,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

const reflectionPrompts = [
  {
    icon: Lightbulb,
    text: "What's the teaching challenge you're energized to solve this semester?",
  },
  {
    icon: Clock,
    text: "Where could AI help you reclaim time for deeper feedback or creative work?",
  },
  {
    icon: Palette,
    text: "If you had a co-designer, what kind of experience would you craft for your learners?",
  },
  {
    icon: Users,
    text: "How might students benefit if a prototype removed one major barrier they face today?",
  },
];

const moduleCards = learningModules.filter((module) => module.id !== "home" && module.id !== "gallery");

const Home = () => {
  const { reflection, saveReflection, nextModuleId, completionRate, streakCount } = useAppProgress();
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [isReflectionExpanded, setIsReflectionExpanded] = useState(false);

  const nextModule = useMemo(
    () => (nextModuleId ? learningModules.find((module) => module.id === nextModuleId) : null),
    [nextModuleId]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <DesktopNavigation />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 opacity-70">
            <InteractiveBackground />
          </div>
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-24 md:flex-row md:items-center md:gap-24">
          <div className="space-y-6">
            <Badge className="bg-white/15 text-white">
              CPAD Learning Companion
            </Badge>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">AI Builders Toolkit</h1>
            <p className="text-lg text-slate-200 md:text-xl">
              Move through focused cards, capture your insights, and rally CPAD support to bring an AI-enabled prototype to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90"
                onClick={() => document.getElementById("skill-pane")?.scrollIntoView({ behavior: "smooth" })}
              >
                Launch the deck
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="https://forms.gle/71sL56MFsKo1WTKR8" target="_blank" rel="noopener noreferrer">
                  Request CPAD coaching
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <Card className="w-full max-w-md border-white/20 bg-white/10 text-white backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Your momentum</CardTitle>
              <CardDescription className="text-slate-200/80">
                {streakCount > 0
                  ? `Day ${streakCount} and counting. The next card keeps the streak going.`
                  : "Take the first card and we’ll track your streak."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Completion</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-4xl font-semibold text-white">{completionRate}%</span>
                  <span className="text-sm text-white/70">of the pathway</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white">
                <p className="text-xs uppercase tracking-wide text-white/60">Next up</p>
                <p className="mt-2 text-base font-medium">
                  {nextModule ? nextModule.title : "Prototype Planner"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24">
        <section id="skill-pane" className="-mt-12 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur">
          <div className="flex flex-col gap-3 pb-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-white">Single-pane skill deck</h2>
              <p className="max-w-2xl text-sm text-slate-300 md:text-base">
                Tap a card to dive in, shuffle for a fresh spark, or run the modules in sequence. Every card jumps straight to the full lesson or planner move it references.
              </p>
            </div>
            <Badge variant="outline" className="border-white/30 text-white">
              <Sparkles className="mr-2 h-4 w-4" /> Bite-sized actions
            </Badge>
          </div>
          <SkillCardStack />
        </section>

        <section id="reflection-section" className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur md:grid-cols-[1.15fr,1fr]">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white">Lock in your focus</h2>
                <p className="text-slate-300">
                  Capture the challenge you want to work on. Your notes follow you into every module.
                </p>
              </div>
              <Badge variant="outline" className="border-white/20 text-white">
                <BookOpenCheck className="mr-2 h-4 w-4" /> Guided reflection
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {reflectionPrompts.map((prompt) => (
                <Card key={prompt.text} className="border-white/10 bg-slate-950/60 text-white">
                  <CardContent className="flex items-start gap-3 p-4">
                    <prompt.icon className="h-5 w-5 text-primary" />
                    <p className="text-sm text-slate-200">{prompt.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <label htmlFor="reflection" className="text-sm font-medium text-white">
                Your notes
              </label>
              <Textarea
                id="reflection"
                value={reflection}
                onChange={(event) => saveReflection(event.target.value)}
                placeholder="I'm noticing my students need..."
                className="min-h-[160px] border-white/10 bg-slate-950/70 text-white placeholder:text-slate-500 focus:border-white/40 focus:ring-white/30"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="border-white/10 bg-slate-950/70 text-white">
              <CardContent className="space-y-3 p-6">
                <h3 className="text-lg font-semibold">Pocket preview</h3>
                <p className="text-sm text-slate-300">
                  The reflection collapses into a single card inside the deck. Toggle the preview to check how it appears.
                </p>
                <Button
                  variant="secondary"
                  className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setIsReflectionExpanded(!isReflectionExpanded)}
                >
                  {isReflectionExpanded ? "Hide preview" : "Preview reflection card"}
                </Button>
                {isReflectionExpanded && (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200">
                    <p className="font-medium text-white">Your focus</p>
                    <p className="mt-2">
                      {reflection ? reflection : "Capture a sentence above and it will appear here across the toolkit."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 text-white">
              <CardContent className="flex items-center gap-4 p-6">
                <img
                  src={cpadLogo}
                  alt="CPAD"
                  className="h-16 w-16 rounded-2xl border border-white/20 bg-white/90 p-3"
                />
                <div>
                  <h3 className="text-lg font-semibold">Design with CPAD</h3>
                  <p className="text-sm text-slate-200">
                    Share where you're stuck and request feedback. The support form routes your note directly to the CPAD team.
                  </p>
                </div>
              </CardContent>
              <div className="border-t border-white/10 bg-white/5 p-4">
                <Button asChild className="w-full bg-white text-slate-900 hover:bg-white/90">
                  <a href="https://forms.gle/71sL56MFsKo1WTKR8" target="_blank" rel="noopener noreferrer">
                    Open the CPAD support form
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <section className="space-y-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-white">Full modules</h2>
              <p className="text-slate-300">
                Use the deck for fast actions and open these modules when you're ready to unpack the full experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-white/20 text-white">
                <Target className="mr-2 h-4 w-4" /> Sequential path
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white">
                <MessageCircle className="mr-2 h-4 w-4" /> Project prompts
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {moduleCards.map((module) => {
              const Icon = module.icon;
              return (
                <Card
                  key={module.id}
                  className="border-white/10 bg-slate-950/70 text-white transition-transform hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(15,23,42,1)]"
                >
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{module.title}</h3>
                        <p className="text-sm text-slate-300">{module.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{module.estimatedTime}</span>
                      <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20" asChild>
                        <Link to={module.route} className="flex items-center gap-2 text-sm font-medium">
                          Open module
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur md:grid-cols-[1.1fr,1fr]">
          <Card className="border-white/10 bg-slate-950/70 text-white">
            <CardHeader>
              <CardTitle>Submit your prototype for feedback</CardTitle>
              <CardDescription className="text-slate-300">
                When you're ready, share your progress. CPAD will review your concept, connect you with collaborators, and help you iterate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-300">
                Attach lesson materials, prototypes, or reflections. We'll respond with tailored support that keeps your project moving.
              </p>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" onClick={() => setIsSubmissionOpen(true)}>
                Launch submission form
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-slate-950/70 text-white">
            <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">What happens after you submit?</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• CPAD reviews your materials within 2–3 days.</li>
                  <li>• You'll receive tailored resources or an invite for a design consult.</li>
                  <li>• Your project can be featured in the gallery when you're ready.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-dashed border-white/20 p-4 text-sm text-slate-200">
                Prefer email? Reach us at
                {" "}
                <a className="font-medium text-white" href="mailto:jbh6331@psu.edu">
                  jbh6331@psu.edu
                </a>
                .
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Dialog open={isSubmissionOpen} onOpenChange={setIsSubmissionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit your prototype</DialogTitle>
            <DialogDescription>
              Share a snapshot of your work so CPAD can provide targeted support.
            </DialogDescription>
          </DialogHeader>
          <PrototypeSubmissionForm onSuccess={() => setIsSubmissionOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
