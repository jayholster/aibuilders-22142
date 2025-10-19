import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { learningModules } from "@/lib/learningModules";
import { useAppProgress } from "@/hooks/useAppProgress";
import { ChevronRight, X } from "lucide-react";

const ONBOARDING_KEY = "mobile-shell-onboarded";

const isMobileViewport = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
};

const getModuleLabel = (moduleId: string | null) =>
  learningModules.find((module) => module.id === moduleId)?.title ?? null;

export const MobileAppShell = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { completionRate, nextModuleId, lastVisitedModuleId, streakCount, registerVisit } = useAppProgress();
  const [isOnboardingVisible, setIsOnboardingVisible] = useState(false);
  const [renderMobileChrome, setRenderMobileChrome] = useState(false);

  useEffect(() => {
    setRenderMobileChrome(isMobileViewport());
  }, []);

  useEffect(() => {
    if (renderMobileChrome) {
      registerVisit(
        learningModules.find((module) => module.route === location.pathname)?.id ?? "home"
      );
    }
  }, [location.pathname, registerVisit, renderMobileChrome]);

  useEffect(() => {
    if (!renderMobileChrome) return;
    if (typeof window === "undefined") return;

    const seen = localStorage.getItem(ONBOARDING_KEY);
    if (!seen) {
      setIsOnboardingVisible(true);
      localStorage.setItem(ONBOARDING_KEY, "viewed");
    }
  }, [renderMobileChrome]);

  const mobileModules = useMemo(
    () => learningModules.filter((module) => module.id !== "gallery"),
    []
  );

  const activeModuleId = useMemo(
    () => learningModules.find((module) => module.route === location.pathname)?.id ?? "home",
    [location.pathname]
  );

  const activeIndex = useMemo(
    () => mobileModules.findIndex((module) => module.id === activeModuleId),
    [mobileModules, activeModuleId]
  );

  const activeLabel = getModuleLabel(activeModuleId);
  const nextLabel = getModuleLabel(nextModuleId);
  const resumeLabel = getModuleLabel(lastVisitedModuleId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="pb-28 md:pb-0">{children}</div>

      {renderMobileChrome && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
            <div className="flex items-center justify-between px-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Progress</span>
                <Badge variant="outline" className="border-white/15 text-[10px] uppercase tracking-wide text-white">
                  {streakCount > 0 ? `${streakCount}-day streak` : "Let's begin"}
                </Badge>
              </div>
              {resumeLabel && resumeLabel !== activeLabel && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-200 hover:bg-white/10"
                  onClick={() => {
                    const resumeModule = learningModules.find((module) => module.id === lastVisitedModuleId);
                    if (resumeModule) {
                      navigate(resumeModule.route);
                    }
                  }}
                >
                  Resume {resumeLabel}
                </Button>
              )}
            </div>

            <div className="px-3 pb-3">
              <Progress value={completionRate} className="h-1.5 bg-slate-800" />
              <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-400">
                <span className="text-slate-200">{activeLabel}</span>
                <span>{completionRate}% complete</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-1 px-2 pb-3">
              {mobileModules.map((module, index) => {
                const isActive = index === activeIndex;
                const Icon = module.icon;

                return (
                  <Button
                    key={module.id}
                    variant="ghost"
                    size="sm"
                    className={`flex-1 flex-col gap-1 rounded-2xl py-2 text-[11px] font-medium leading-tight transition ${
                      isActive ? "bg-white/15 text-white" : "text-slate-400 hover:bg-white/5"
                    }`}
                    onClick={() => navigate(module.route)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-[10px] leading-tight text-center">{module.title.split(" ")[0]}</span>
                  </Button>
                );
              })}
            </div>

            {nextModuleId && nextModuleId !== activeModuleId && (
              <div className="border-t border-slate-800/70 bg-slate-900/80 px-3 py-2">
                <Button
                  className="w-full rounded-2xl bg-white text-slate-900 hover:bg-white/90"
                  onClick={() => {
                    const nextModule = learningModules.find((module) => module.id === nextModuleId);
                    if (nextModule) {
                      navigate(nextModule.route);
                    }
                  }}
                >
                  Continue with {nextLabel}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {isOnboardingVisible && (
            <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm transition-opacity">
              <div className="absolute inset-x-4 bottom-32 space-y-4">
                <Card className="border-white/10 bg-slate-900/95 text-white shadow-xl">
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">CPAD Learning Companion</p>
                        <h2 className="text-lg font-semibold">One tap at a time</h2>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10"
                        onClick={() => setIsOnboardingVisible(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-300">
                      Cycle through the cards, capture reflections, and open the support form whenever you want CPAD to jump in.
                    </p>
                    <Button
                      className="mt-4 w-full rounded-2xl bg-white text-slate-900 hover:bg-white/90"
                      onClick={() => setIsOnboardingVisible(false)}
                    >
                      Start exploring
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileAppShell;
