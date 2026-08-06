import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MODULES } from "@/data/modules";

export type ModuleResult = {
  bestPercent: number;
  attempts: number;
  passed: boolean;
};

export type ProgressState = {
  results: Record<number, ModuleResult>;
  mistakes: Record<string, number>;
  lastActiveDay: string | null;
  streak: number;
};

const EMPTY: ProgressState = { results: {}, mistakes: {}, lastActiveDay: null, streak: 0 };
const KEY = "hisobchi.progress.v1";
const PASS_MARK = 90;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak(state: ProgressState): ProgressState {
  const d = today();
  if (state.lastActiveDay === d) return state;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return {
    ...state,
    streak: state.lastActiveDay === yesterday ? state.streak + 1 : 1,
    lastActiveDay: d,
  };
}

type Ctx = {
  state: ProgressState;
  isUnlocked: (moduleId: number) => boolean;
  saveResult: (moduleId: number, percent: number, wrongTags: string[]) => void;
  reset: () => void;
  overallPercent: number;
  passMark: number;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...(JSON.parse(raw) as ProgressState) });
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const saveResult = useCallback(
    (moduleId: number, percent: number, wrongTags: string[]) => {
      setState((prev) => {
        const old = prev.results[moduleId];
        const mistakes = { ...prev.mistakes };
        wrongTags.forEach((tag) => {
          mistakes[tag] = (mistakes[tag] ?? 0) + 1;
        });
        const next = bumpStreak({
          ...prev,
          mistakes,
          results: {
            ...prev.results,
            [moduleId]: {
              bestPercent: Math.max(old?.bestPercent ?? 0, percent),
              attempts: (old?.attempts ?? 0) + 1,
              passed: (old?.passed ?? false) || percent >= PASS_MARK,
            },
          },
        });
        try {
          window.localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [],
  );

  const isUnlocked = useCallback(
    (moduleId: number) => moduleId === 1 || Boolean(state.results[moduleId - 1]?.passed),
    [state.results],
  );

  const overallPercent = useMemo(() => {
    const passed = MODULES.filter((m) => state.results[m.id]?.passed).length;
    return Math.round((passed / MODULES.length) * 100);
  }, [state.results]);

  const value: Ctx = {
    state,
    isUnlocked,
    saveResult,
    reset: () => persist(EMPTY),
    overallPercent,
    passMark: PASS_MARK,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}