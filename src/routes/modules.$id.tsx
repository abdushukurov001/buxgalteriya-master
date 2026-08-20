import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, RotateCcw, Timer, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EntryCard } from "@/components/EntryCard";
import { MODULES } from "@/data/modules";
import { ambientPlayer } from "@/lib/ambient";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { generateTest, generateModulePracticeQuestions, type Question } from "@/lib/questions";
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
  const [tab, setTab] = useState<"read" | "test" | "practice">("read");

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

      <div className="grid grid-cols-3 gap-1 rounded-md border border-border bg-secondary p-1">
        {(["read", "test", "practice"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              "rounded-sm px-2 py-2 text-xs sm:text-sm font-medium transition-colors truncate",
              tab === k ? "bg-card text-foreground shadow-sm font-semibold" : "text-muted-foreground",
            )}
          >
            {k === "read" ? t("read") : k === "test" ? t("test") : t("practiceTab")}
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
      ) : tab === "test" ? (
        <TestRunner moduleId={mod.id} onReview={() => setTab("read")} />
      ) : (
        <ModulePracticeRunner moduleId={mod.id} onReview={() => setTab("read")} />
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

const STEP3_PRACTICE_SECONDS = 20 * 60; // 20 minutes

function ModulePracticeRunner({ moduleId, onReview }: { moduleId: number; onReview: () => void }) {
  const { t, tr } = useLang();
  const navigate = useNavigate();
  const ktRef = useRef<HTMLInputElement>(null);

  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1000000));
  const questions = useMemo(() => generateModulePracticeQuestions(moduleId, seed), [moduleId, seed]);

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [dtInput, setDtInput] = useState("");
  const [ktInput, setKtInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [remaining, setRemaining] = useState(STEP3_PRACTICE_SECONDS);
  const [timedOut, setTimedOut] = useState(false);
  const [finished, setFinished] = useState(false);

  // 20-minute Countdown timer (counts DOWN to 00:00)
  useEffect(() => {
    if (!started || finished) return;
    const interval = setInterval(() => {
      setRemaining((r) => {
        const nr = r - 1;
        if (nr <= 0) {
          clearInterval(interval);
          playTimeUp();
          setTimedOut(true);
          setFinished(true);
          return 0;
        }
        if (nr <= 10) playTick();
        return nr;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, finished]);

  const startPractice = () => {
    primeAudio();
    setSeed(Math.floor(Math.random() * 1000000));
    setIndex(0);
    setDtInput("");
    setKtInput("");
    setAttempts(0);
    setChecked(false);
    setIsCorrect(false);
    setFirstTryCorrect(0);
    setRemaining(STEP3_PRACTICE_SECONDS);
    setTimedOut(false);
    setFinished(false);
    setStarted(true);
  };

  const q = questions[index];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q || isCorrect) return;

    const dtClean = dtInput.trim();
    const ktClean = ktInput.trim();
    const dtOk = dtClean === q.expectedDt;
    const ktOk = ktClean === q.expectedKt;
    const correct = dtOk && ktOk;

    setChecked(true);
    if (correct) {
      setIsCorrect(true);
      if (attempts === 0) {
        setFirstTryCorrect((c) => c + 1);
      }
      playCorrect();
    } else {
      setAttempts((a) => a + 1);
      playWrong();
    }
  };

  const nextQuestion = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      playSuccess();
      return;
    }
    setIndex((n) => n + 1);
    setDtInput("");
    setKtInput("");
    setAttempts(0);
    setChecked(false);
    setIsCorrect(false);
  };

  if (!started) {
    return (
      <div className="paper-card space-y-4 p-5 text-center">
        <p className="font-mono text-3xl font-bold">{questions.length}</p>
        <p className="text-sm font-medium">{t("practiceTab")} · 20 {t("question")}</p>
        <div className="rounded-md bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          <p className="font-semibold mb-1">⚡ Faqat Dt va Kt (pravodka) kiritiladi — SUMMA yo'q</p>
          <p>{t("practiceNotice")}</p>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-xs text-destructive font-mono font-semibold">
          <Timer className="h-4 w-4" />
          {t("countdownTimer")}: 20:00 (ulurmasangiz qayta boshlanadi)
        </p>
        <button
          onClick={startPractice}
          className="w-full rounded-md bg-emerald-ink px-4 py-3 text-sm font-medium text-white shadow transition-all hover:bg-emerald-ink/90"
        >
          {t("startPractice")}
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="space-y-4">
        <div className={cn("paper-card space-y-3 p-6 text-center", timedOut ? "border-destructive/50" : "border-emerald-ink/50")}>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">{t("result")}</p>
          {timedOut ? (
            <div className="space-y-2">
              <p className="font-mono text-4xl font-bold text-destructive">00:00</p>
              <p className="text-sm font-semibold text-destructive">{t("timeUpFail")}</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-mono text-5xl font-bold text-emerald-ink">
                {firstTryCorrect} / {questions.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Birinchi urinishda to'g'ri berilgan pravodkalar soni
              </p>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
                <Timer className="h-4 w-4 text-emerald-ink" />
                Qolgan vaqt: {fmtTime(remaining)}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-2">
          <button
            onClick={startPractice}
            className="rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
          >
            {timedOut ? t("restartPractice") : "Qayta mashq qilish"}
          </button>
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

  const dtClean = dtInput.trim();
  const ktClean = ktInput.trim();
  const dtOk = dtClean === q.expectedDt;
  const ktOk = ktClean === q.expectedKt;

  return (
    <div className="space-y-4">
      {/* Countdown Timer Display */}
      <div className="flex items-center justify-between gap-3">
        <div
          className={cn(
            "flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-all",
            remaining <= 60
              ? "animate-pulse border-destructive bg-danger-soft font-bold text-destructive"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          <Timer className="h-4 w-4 text-emerald-ink" />
          <span>Qolgan vaqt: {fmtTime(remaining)}</span>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {index + 1}/{questions.length}
        </span>
      </div>

      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-emerald-ink transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="paper-card space-y-3 p-4">
        <div className="flex items-center gap-2">
          <p className="text-[11px] tracking-wide text-gold uppercase font-mono">Pravodkani kiritish</p>
          {q.isReview && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <RotateCcw className="h-2.5 w-2.5" />
              {t("review")}
            </span>
          )}
        </div>
        <p className="text-sm font-medium leading-relaxed">{tr(q.prompt)}</p>
      </div>

      <form onSubmit={handleCheck} className="paper-card space-y-4 p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-xs font-mono font-semibold text-emerald-ink">
              Debet (Dt) schot:
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Masalan: 5110"
              value={dtInput}
              onChange={(e) => {
                setDtInput(e.target.value);
                setChecked(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  ktRef.current?.focus();
                }
              }}
              disabled={isCorrect}
              className={cn(
                "w-full rounded-md border px-3 py-2.5 font-mono text-sm shadow-sm transition-all focus:outline-none focus:ring-2",
                checked && dtOk && "border-emerald-ink bg-emerald-soft text-emerald-ink focus:ring-emerald-ink",
                checked && !dtOk && "border-destructive bg-danger-soft text-destructive focus:ring-destructive",
                !checked && "border-input bg-background focus:ring-primary",
              )}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono font-semibold text-rose-600 dark:text-rose-400">
              Kredit (Kt) schot:
            </label>
            <input
              ref={ktRef}
              type="text"
              inputMode="numeric"
              placeholder="Masalan: 4610"
              value={ktInput}
              onChange={(e) => {
                setKtInput(e.target.value);
                setChecked(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!isCorrect && dtInput.trim() && ktInput.trim()) {
                    handleCheck(e);
                  } else if (isCorrect) {
                    nextQuestion();
                  }
                }
              }}
              disabled={isCorrect}
              className={cn(
                "w-full rounded-md border px-3 py-2.5 font-mono text-sm shadow-sm transition-all focus:outline-none focus:ring-2",
                checked && ktOk && "border-emerald-ink bg-emerald-soft text-emerald-ink focus:ring-emerald-ink",
                checked && !ktOk && "border-destructive bg-danger-soft text-destructive focus:ring-destructive",
                !checked && "border-input bg-background focus:ring-primary",
              )}
            />
          </div>
        </div>

        {checked && !isCorrect && (
          <div className="rounded-md border border-destructive/40 bg-danger-soft p-3 text-xs space-y-1 text-destructive">
            <p className="font-semibold">
              {attempts >= 3 ? (
                !dtOk && !ktOk
                  ? t("dtKtError")
                  : !dtOk
                    ? t("dtError")
                    : t("ktError")
              ) : (
                t("wrong")
              )}
            </p>
            {attempts >= 5 && (
              <p className="mt-1 text-foreground/80 font-serif text-[13px] border-t border-destructive/20 pt-1.5">
                💡 <b>Mantiqiy yordam:</b> {tr(q.explain)}
              </p>
            )}
          </div>
        )}

        {isCorrect && (
          <div className="rounded-md border border-emerald-ink/40 bg-emerald-soft p-3 text-xs text-emerald-ink space-y-1">
            <p className="font-bold flex items-center gap-1">
              <Check className="h-4 w-4" /> {t("correct")}!
            </p>
            <p className="text-foreground/80 font-mono">
              Pravodka: Dt {q.expectedDt} — Kt {q.expectedKt}
            </p>
            <p className="text-foreground/80 text-[12px]">{tr(q.explain)}</p>
          </div>
        )}

        {!isCorrect ? (
          <button
            type="submit"
            disabled={!dtInput.trim() || !ktInput.trim()}
            className="w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-all disabled:opacity-50 hover:bg-primary/90"
          >
            {t("checkAnswer")} (Enter)
          </button>
        ) : (
          <button
            type="button"
            onClick={nextQuestion}
            className="w-full rounded-md bg-emerald-ink py-3 text-sm font-medium text-white shadow transition-all hover:bg-emerald-ink/90"
          >
            {index + 1 >= questions.length ? t("finish") : `${t("next")} (Enter)`}
          </button>
        )}
      </form>
    </div>
  );
}