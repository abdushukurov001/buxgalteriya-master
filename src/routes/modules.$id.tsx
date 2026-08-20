import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, RotateCcw, Timer, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EntryCard } from "@/components/EntryCard";
import { MODULES } from "@/data/modules";
import { ambientPlayer } from "@/lib/ambient";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { generateTest, type Question } from "@/lib/questions";
import { playCorrect, playSuccess, playTick, playTimeUp, playWrong, primeAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/modules/$id")({
  head: () => ({
    meta: [
      { title: "Mavzu — schotlar, pravodkalar va test | Hisobchi" },
      {
        name: "description",
        content: "Mavzuga oid schotlar, pravodkalarning Dt/Kt mantiqi va 30 savoldan iborat test.",
      },
      { property: "og:title", content: "Mavzu — schotlar, pravodkalar va test" },
      { property: "og:description", content: "Har bir pravodka nega shunday yozilishini tushunib oling." },
    ],
  }),
  component: ModulePage,
});

function ModulePage() {
  const { id } = Route.useParams();
  const moduleId = Number(id);
  const mod = MODULES.find((m) => m.id === moduleId);
  const { t, tr } = useLang();
  const [tab, setTab] = useState<"read" | "test">("read");

  if (!mod) {
    return (
      <div className="paper-card p-6 text-center text-sm text-muted-foreground">
        <p>{t("lockedMsg")}</p>
        <Link to="/" className="mt-3 inline-block text-emerald-ink underline">
          {t("backToModules")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("backToModules")}
      </Link>

      <header className="space-y-1">
        <p className="font-mono text-xs text-gold">
          {t("navModules")} {mod.id}/{MODULES.length}
        </p>
        <h1 className="font-serif text-xl font-semibold">{tr(mod.title)}</h1>
        <p className="text-[13px] text-muted-foreground">{tr(mod.summary)}</p>
      </header>

      <div className="grid grid-cols-2 gap-1 rounded-md border border-border bg-secondary p-1">
        {(["read", "test"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
              tab === k ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            {k === "read" ? t("read") : t("test")}
          </button>
        ))}
      </div>

      {tab === "read" ? (
        <div className="space-y-5">
          <section className="space-y-3">
            <h2 className="font-serif text-base font-semibold">{t("entries")}</h2>
            {mod.entries.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </section>
        </div>
      ) : (
        <TestRunner moduleId={mod.id} onReview={() => setTab("read")} />
      )}
    </div>
  );
}

const TEST_SECONDS = 15 * 60;

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function TestRunner({ moduleId, onReview }: { moduleId: number; onReview: () => void }) {
  const { t, tr, lang } = useLang();
  const { saveResult, passMark } = useProgress();
  const navigate = useNavigate();

  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000000));
  const questions = useMemo(() => generateTest(moduleId, seed), [moduleId, seed]);

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<{ q: Question; chosen: number }[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [remaining, setRemaining] = useState(TEST_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const stateRef = useRef({ score: 0, wrong: [] as { q: Question; chosen: number }[] });
  stateRef.current = { score, wrong };

  // Auto-play ambient background music during test
  useEffect(() => {
    if (started && !finished) {
      ambientPlayer.start();
    } else {
      ambientPlayer.stop();
    }
    return () => {
      ambientPlayer.stop();
    };
  }, [started, finished]);

  const startTest = () => {
    primeAudio();
    setSeed(Math.floor(Math.random() * 1000000));
    setIndex(0);
    setPicked(null);
    setWrong([]);
    setScore(0);
    setFinished(false);
    setRemaining(TEST_SECONDS);
    setTimedOut(false);
    setStarted(true);
  };

  const q = questions[index];

  const finishTest = useCallback(
    (finalScore: number, finalWrong: { q: Question; chosen: number }[]) => {
      const percent = Math.round((finalScore / questions.length) * 100);
      saveResult(
        moduleId,
        percent,
        finalWrong.map((w) => w.q.tag),
      );
      setFinished(true);
      if (percent >= 90) setTimeout(() => playSuccess(), 250);
    },
    [moduleId, questions.length, saveResult],
  );

  useEffect(() => {
    if (!started || finished) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        const nr = r - 1;
        if (nr <= 0) {
          clearInterval(id);
          playTimeUp();
          setTimedOut(true);
          finishTest(stateRef.current.score, stateRef.current.wrong);
          return 0;
        }
        if (nr <= 10) playTick();
        return nr;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, finished, finishTest]);

  const promptTitle = (question: Question) => {
    switch (question.kind) {
      case "entry":
        return t("chooseEntry");
      case "op":
        return t("chooseOp");
      case "type":
        return t("chooseType");
      default:
        return t("findWrong");
    }
  };

  const reviewCount = useMemo(() => questions.filter((q) => q.isReview).length, [questions]);

  if (!started) {
    return (
      <div className="paper-card space-y-3 p-5 text-center">
        <p className="font-mono text-3xl">{questions.length}</p>
        <p className="text-sm text-muted-foreground">
          {t("question")} · {passMark}% = {t("done")}
        </p>
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Timer className="h-3.5 w-3.5" />
          {t("timeLimit")}
        </p>
        {reviewCount > 0 && (
          <p className="flex items-center justify-center gap-1.5 text-xs text-amber-600">
            <RotateCcw className="h-3.5 w-3.5" />
            {reviewCount} {t("reviewQuestions")}
          </p>
        )}
        <button
          onClick={startTest}
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
        >
          {t("startTest")}
        </button>
      </div>
    );
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= passMark;
    return (
      <div className="space-y-4">
        <div className={cn("paper-card space-y-2 p-6 text-center", passed && "border-emerald-ink/50")}>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">{t("result")}</p>
          <p className={cn("font-mono text-5xl", passed ? "text-emerald-ink" : "text-destructive")}>
            {percent}%
          </p>
          <p className="text-sm">{passed ? t("passed") : t("failed")}</p>
          {timedOut && <p className="text-[13px] text-destructive">{t("timeUpMsg")}</p>}
        </div>

        {!passed && wrong.length > 0 && (
          <section className="space-y-2">
            <h3 className="font-serif text-base font-semibold">{t("mistakes")}</h3>
            {wrong.map(({ q: wq }, i) => (
              <div key={`${wq.id}-${i}`} className="paper-card space-y-2 p-3">
                <p className="text-[13px]">{tr(wq.prompt)}</p>
                <p className="rounded bg-emerald-soft px-2 py-1 font-mono text-xs text-emerald-ink">
                  {wq.options[wq.correct]?.[lang]}
                </p>
                <p className="text-[12px] text-muted-foreground">{tr(wq.explain)}</p>
              </div>
            ))}
          </section>
        )}

        <div className="grid gap-2">
          <button
            onClick={startTest}
            className="rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
          >
            {t("retryTest")}
          </button>
          {!passed && (
            <button
              onClick={onReview}
              className="rounded-md border border-border px-4 py-3 text-sm font-medium"
            >
              {t("reviewMaterial")}
            </button>
          )}
          <button
            onClick={() => navigate({ to: "/" })}
            className="rounded-md border border-border px-4 py-3 text-sm"
          >
            {t("backToModules")}
          </button>
        </div>
      </div>
    );
  }

  if (!q) return null;

  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      setWrong((w) => [...w, { q, chosen: i }]);
      playWrong();
    }
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      finishTest(score, wrong);
      return;
    }
    setIndex((n) => n + 1);
    setPicked(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex items-center justify-center gap-2 rounded-md border px-3 py-2 font-mono transition-all",
          remaining <= 10
            ? "animate-pulse border-destructive bg-danger-soft text-2xl font-bold text-destructive"
            : remaining <= 60
              ? "border-destructive/40 text-base text-destructive"
              : "border-border text-sm text-muted-foreground",
        )}
      >
        <Timer className={cn("shrink-0", remaining <= 10 ? "h-6 w-6" : "h-4 w-4")} />
        {fmtTime(remaining)}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gold transition-all"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {index + 1}/{questions.length}
        </span>
      </div>

      <div className="paper-card space-y-3 p-4">
        <div className="flex items-center gap-2">
          <p className="text-[11px] tracking-wide text-gold uppercase">{promptTitle(q)}</p>
          {q.isReview && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <RotateCcw className="h-2.5 w-2.5" />
              {t("review")}
            </span>
          )}
        </div>
        <p className={cn("text-sm leading-relaxed", q.kind === "op" && "font-mono text-base")}>
          {tr(q.prompt)}
        </p>
      </div>

      <ul className="space-y-2">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const chosen = picked === i;
          return (
            <li key={i}>
              <button
                onClick={() => answer(i)}
                disabled={picked !== null}
                className={cn(
                  "paper-card grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 p-3 text-left text-sm transition-colors",
                  opt.mono && "font-mono",
                  picked !== null && isCorrect && "border-emerald-ink bg-emerald-soft",
                  picked !== null && chosen && !isCorrect && "border-destructive bg-danger-soft",
                )}
              >
                <span className="min-w-0">{opt[lang]}</span>
                {picked !== null && isCorrect && <Check className="h-4 w-4 shrink-0 text-emerald-ink" />}
                {picked !== null && chosen && !isCorrect && (
                  <X className="h-4 w-4 shrink-0 text-destructive" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {picked !== null && (
        <div className="space-y-3">
          <div
            className={cn(
              "rounded-md border p-3 text-[13px]",
              picked === q.correct
                ? "border-emerald-ink/40 bg-emerald-soft text-emerald-ink"
                : "border-destructive/40 bg-danger-soft text-destructive",
            )}
          >
            <p className="mb-1 font-semibold">{picked === q.correct ? t("correct") : t("wrong")}</p>
            <p className="text-foreground/80">{tr(q.explain)}</p>
          </div>
          <button
            onClick={next}
            className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
          >
            {index + 1 >= questions.length ? t("finish") : t("next")}
          </button>
        </div>
      )}
    </div>
  );
}