import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { learningModules, orderedLearningModules } from "@/lib/learningModules";

type ModuleProgressState = {
  completed: boolean;
  lastVisitedStep: number | null;
  lastVisitedAt: string | null;
};

type ProgressState = {
  reflection: string;
  modules: Record<string, ModuleProgressState>;
  lastInteractionDate: string | null;
  streakCount: number;
};

type ProgressContextValue = {
  state: ProgressState;
  reflection: string;
  completionRate: number;
  completedCount: number;
  nextModuleId: string | null;
  lastVisitedModuleId: string | null;
  streakCount: number;
  moduleStates: Record<string, ModuleProgressState>;
  saveReflection: (value: string) => void;
  completeModule: (id: string) => void;
  updateModuleStep: (id: string, step: number) => void;
  registerVisit: (id: string) => void;
};

const STORAGE_KEY = "cpad-app-progress";

const createBaseModulesState = () => {
  const base: Record<string, ModuleProgressState> = {};
  learningModules.forEach((module) => {
    base[module.id] = {
      completed: module.id === "home",
      lastVisitedStep: null,
      lastVisitedAt: null,
    };
  });
  return base;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ProgressState>(() => {
    const baseState: ProgressState = {
      reflection: "",
      modules: createBaseModulesState(),
      lastInteractionDate: null,
      streakCount: 0,
    };

    if (typeof window === "undefined") {
      return baseState;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return baseState;
    }

    try {
      const parsed = JSON.parse(saved) as ProgressState;
      return {
        ...baseState,
        ...parsed,
        modules: {
          ...baseState.modules,
          ...parsed.modules,
        },
      };
    } catch (error) {
      console.warn("Unable to parse saved progress state", error);
      return baseState;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const saveReflection = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      reflection: value,
    }));
  }, []);

  const completeModule = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [id]: {
          ...prev.modules[id],
          completed: true,
          lastVisitedAt: new Date().toISOString(),
        },
      },
    }));
  }, []);

  const updateModuleStep = useCallback((id: string, step: number) => {
    setState((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [id]: {
          ...prev.modules[id],
          lastVisitedStep: step,
        },
      },
    }));
  }, []);

  const registerVisit = useCallback((id: string) => {
    setState((prev) => {
      const nowIso = new Date().toISOString();
      const today = nowIso.split("T")[0];
      const last = prev.lastInteractionDate;
      let streakCount = prev.streakCount;

      if (last) {
        const diff = differenceInCalendarDays(new Date(today), parseISO(last));
        if (diff === 1) {
          streakCount += 1;
        } else if (diff > 1) {
          streakCount = 1;
        }
      } else {
        streakCount = 1;
      }

      return {
        ...prev,
        lastInteractionDate: today,
        streakCount,
        modules: {
          ...prev.modules,
          [id]: {
            ...prev.modules[id],
            lastVisitedAt: nowIso,
          },
        },
      };
    });
  }, []);

  const completedCount = useMemo(
    () => Object.values(state.modules).filter((module) => module.completed).length,
    [state.modules]
  );

  const completionRate = useMemo(() => {
    const totalTrackable = orderedLearningModules.length;
    if (totalTrackable === 0) return 0;
    const completed = orderedLearningModules.filter((module) => state.modules[module.id]?.completed).length;
    return Math.round((completed / totalTrackable) * 100);
  }, [state.modules]);

  const lastVisitedModuleId = useMemo(() => {
    const sorted = Object.entries(state.modules)
      .filter(([, value]) => value.lastVisitedAt)
      .sort(([, a], [, b]) => {
        if (!a.lastVisitedAt || !b.lastVisitedAt) return 0;
        return new Date(b.lastVisitedAt).getTime() - new Date(a.lastVisitedAt).getTime();
      });
    return sorted[0]?.[0] ?? null;
  }, [state.modules]);

  const nextModuleId = useMemo(() => {
    for (const module of orderedLearningModules) {
      if (!state.modules[module.id]?.completed) {
        return module.id;
      }
    }
    return null;
  }, [state.modules]);

  const value = useMemo<ProgressContextValue>(() => ({
    state,
    reflection: state.reflection,
    completionRate,
    completedCount,
    nextModuleId,
    lastVisitedModuleId,
    streakCount: state.streakCount,
    moduleStates: state.modules,
    saveReflection,
    completeModule,
    updateModuleStep,
    registerVisit,
  }), [state, completionRate, completedCount, nextModuleId, lastVisitedModuleId, saveReflection, completeModule, updateModuleStep, registerVisit]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useAppProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useAppProgress must be used within a ProgressProvider");
  }
  return context;
};
