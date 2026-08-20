import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, ClipboardList, Timer, Award, Building2, ChevronDown, HelpCircle, X, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PRACTICE_CASES, type PracticeCase, type PracticeStep } from "@/data/practicesData";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { playCorrect, playSuccess, playWrong, primeAudio } from "@/lib/sfx";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practices")({
  head: () => ({
    meta: [
      { title: "Amaliy mashqlar — To'liq buxgalteriya case'lari | Hisobchi" },
      {
        name: "description",
        content: "20-25 ta bir-biriga bog'liq xo'jalik operatsiyasidan iborat to'liq amaliy imtihon va case mashqlari.",
      },
      { property: "og:title", content: "Amaliy mashqlar — To'liq buxgalteriya case'lari" },
      { property: "og:description", content: "Dt, Kt va Summalarni ketma-ket bog'liq zanjirda hisoblab toping." },
    ],
  }),
  component: PracticesPage,
});

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function parseSummaInput(str: string): number {
  const digits = str.replace(/\D/g, "");
  return parseInt(digits, 10) || 0;
}

function formatSummaDisplay(str: string): string {
  const digits = str.replace(/\D/g, "");
  if (!digits) return "";
  return parseInt(digits, 10).toLocaleString("de-DE");
}

function PracticesPage() {
  const { t, tr } = useLang();
  const { state } = useProgress();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const selectedCase = PRACTICE_CASES.find((c) => c.id === selectedCaseId);

  if (selectedCase) {
    return <CasePracticeRunner practiceCase={selectedCase} onBack={() => setSelectedCaseId(null)} />;
  }

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <div className="flex items-center gap-2 text-gold">
          <ClipboardList className="h-5 w-5 text-emerald-ink" />
          <span className="font-mono text-xs uppercase tracking-wider">{t("navPractices")}</span>
        </div>
        <h1 className="font-serif text-xl font-semibold">{t("practiceScoreLabel")}</h1>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Real korxona faoliyatining to'liq xo'jalik operatsiyalari zanjiri. Debet, Kredit va Summalarni ketma-ket hisoblang. Barcha savollar bitta ro'yxatda berilgan bo'lib, xohlagancha tepaga scroll qilib avvalgi hisob-kitoblarni ko'rishingiz mumkin.
        </p>
      </header>

      {/* Cases List */}
      <div className="space-y-4">
        {PRACTICE_CASES.map((c) => {
          const res = state.practiceResults[c.id];
          return (
            <div
              key={c.id}
              className="paper-card space-y-3 p-5 transition-all hover:border-emerald-ink/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-emerald-ink shrink-0" />
                    <span className="font-mono text-xs font-semibold text-emerald-ink">{c.company}</span>
                  </div>
                  <h2 className="font-serif text-base font-semibold truncate">{tr(c.title)}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tr(c.subtitle)}</p>
                </div>
                {res && (
                  <div className="shrink-0 rounded-md bg-emerald-soft border border-emerald-ink/30 px-3 py-1.5 text-center font-mono">
                    <p className="text-[10px] text-emerald-ink uppercase font-sans">Eng yaxshi ball</p>
                    <p className="text-base font-bold text-emerald-ink">
                      {res.firstTryCorrect}/{res.totalSteps}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="font-mono">{c.steps.length} ta bog'liq operatsiya</span>
                <button
                  onClick={() => {
                    primeAudio();
                    setSelectedCaseId(c.id);
                  }}
                  className="rounded-md bg-emerald-ink px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-emerald-ink/90"
                >
                  Case'ni boshlash →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type StepState = {
  dt: string;
  kt: string;
  summa: string;
  attempts: number;
  checked: boolean;
  isCorrect: boolean;
  firstTryCorrect: boolean;
};

function CasePracticeRunner({
  practiceCase,
  onBack,
}: {
  practiceCase: PracticeCase;
  onBack: () => void;
}) {
  const { t, tr } = useLang();
  const { savePracticeResult } = useProgress();
  const draftKey = `hisobchi.caseDraft.${practiceCase.id}`;

  const [seconds, setSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  // Map of step index -> StepState
  const [stepsState, setStepsState] = useState<Record<number, StepState>>(() => {
    const initial: Record<number, StepState> = {};
    practiceCase.steps.forEach((_, idx) => {
      initial[idx] = {
        dt: "",
        kt: "",
        summa: "",
        attempts: 0,
        checked: false,
        isCorrect: false,
        firstTryCorrect: false,
      };
    });
    return initial;
  });

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ktRefs = useRef<(HTMLInputElement | null)[]>([]);
  const summaRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Restore draft state from localStorage if available
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.stepsState && typeof parsed.seconds === "number") {
          setStepsState(parsed.stepsState);
          setSeconds(parsed.seconds);
        }
      }
    } catch {
      /* ignore */
    }
  }, [draftKey]);

  // Save draft state to localStorage on state changes
  useEffect(() => {
    if (typeof window === "undefined" || finished) return;
    try {
      localStorage.setItem(
        draftKey,
        JSON.stringify({
          stepsState,
          seconds,
        }),
      );
    } catch {
      /* ignore */
    }
  }, [stepsState, seconds, finished, draftKey]);

  // Stopwatch timer counting UP
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  const scrollToStep = (stepIdx: number) => {
    if (stepIdx < practiceCase.steps.length && stepRefs.current[stepIdx]) {
      stepRefs.current[stepIdx]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleStepCheck = (stepIdx: number, step: PracticeStep) => {
    const st = stepsState[stepIdx];
    if (!st || st.isCorrect) return;

    const dtClean = st.dt.trim();
    const ktClean = st.kt.trim();
    const numSumma = parseSummaInput(st.summa);

    const dtOk = dtClean === step.dt;
    const ktOk = ktClean === step.kt;
    const summaOk = numSumma === step.summa;
    const correct = dtOk && ktOk && summaOk;

    const newAttempts = st.attempts + 1;
    const isFirstTry = st.attempts === 0 && correct;

    setStepsState((prev) => ({
      ...prev,
      [stepIdx]: {
        ...prev[stepIdx]!,
        checked: true,
        isCorrect: correct,
        attempts: newAttempts,
        firstTryCorrect: isFirstTry,
      },
    }));

    if (correct) {
      playCorrect();
      // Auto-scroll to next step after brief delay
      setTimeout(() => {
        if (stepIdx + 1 < practiceCase.steps.length) {
          scrollToStep(stepIdx + 1);
        }
      }, 400);
    } else {
      playWrong();
    }
  };

  const handleFinish = () => {
    let firstTryCount = 0;
    practiceCase.steps.forEach((step, idx) => {
      const st = stepsState[idx];
      if (st) {
        const dtClean = st.dt.trim();
        const ktClean = st.kt.trim();
        const numSumma = parseSummaInput(st.summa);
        const correct = dtClean === step.dt && ktClean === step.kt && numSumma === step.summa;
        if (correct && st.attempts <= 1) {
          firstTryCount++;
        }
      }
    });

    savePracticeResult(practiceCase.id, firstTryCount, practiceCase.steps.length, seconds);
    setFinished(true);
    playSuccess();
  };

  if (finished) {
    let firstTryCount = 0;
    practiceCase.steps.forEach((step, idx) => {
      const st = stepsState[idx];
      if (st) {
        const dtClean = st.dt.trim();
        const ktClean = st.kt.trim();
        const numSumma = parseSummaInput(st.summa);
        const correct = dtClean === step.dt && ktClean === step.kt && numSumma === step.summa;
        if (correct && st.attempts <= 1) {
          firstTryCount++;
        }
      }
    });
    const percent = Math.round((firstTryCount / practiceCase.steps.length) * 100);

    return (
      <div className="space-y-6">
        <button onClick={onBack} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          Case'lar ro'yxatiga qaytish
        </button>

        <div className="paper-card space-y-4 p-6 text-center border-emerald-ink/50">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-soft text-emerald-ink">
            <Award className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">{t("finalReviewTitle")}</p>
            <h2 className="font-serif text-xl font-bold">{tr(practiceCase.title)}</h2>
          </div>

          <div className="rounded-lg bg-secondary p-4 space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono font-semibold">
              "Amaliy Mashq Balli" (Birinchi urinishda to'g'ri)
            </p>
            <p className="font-mono text-5xl font-bold text-emerald-ink">
              {firstTryCount} / {practiceCase.steps.length}
            </p>
            <p className="text-sm font-semibold text-foreground/80">{percent}% aniqlik</p>
          </div>

          <div className="flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
            <Timer className="h-4 w-4 text-emerald-ink" />
            Sarflangan vaqt: {fmtTime(seconds)}
          </div>
        </div>

        {/* Full Review Breakdown for every step */}
        <section className="space-y-3">
          <h3 className="font-serif text-base font-semibold text-foreground">Barcha operatsiyalar tahlili va kalitlar</h3>
          <div className="space-y-3">
            {practiceCase.steps.map((st, idx) => {
              const uSt = stepsState[idx];
              const dtClean = uSt?.dt.trim() || "";
              const ktClean = uSt?.kt.trim() || "";
              const numSumma = parseSummaInput(uSt?.summa || "0");
              const isCorrectStep = dtClean === st.dt && ktClean === st.kt && numSumma === st.summa;

              return (
                <div
                  key={st.id}
                  className={cn(
                    "paper-card space-y-2 p-4 border-l-4",
                    isCorrectStep ? "border-l-emerald-ink bg-emerald-soft/10" : "border-l-destructive bg-danger-soft/10",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                      Operatsiya #{st.id}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold",
                        isCorrectStep
                          ? "bg-emerald-soft text-emerald-ink"
                          : "bg-danger-soft text-destructive",
                      )}
                    >
                      {isCorrectStep ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      {isCorrectStep ? "To'g'ri" : "Xato / To'liq emas"}
                    </span>
                  </div>

                  <p className="text-sm font-medium">{tr(st.text)}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-md bg-card p-3 text-xs font-mono border border-border">
                    <div>
                      <p className="text-[11px] text-muted-foreground mb-0.5">Sizning javobingiz:</p>
                      <p className={cn(isCorrectStep ? "text-emerald-ink font-semibold" : "text-destructive")}>
                        Dt: {dtClean || "—"} | Kt: {ktClean || "—"} | Summa: {numSumma ? numSumma.toLocaleString("uz-UZ") : "—"} so'm
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground mb-0.5">To'g'ri javob kaliti:</p>
                      <p className="text-emerald-ink font-bold">
                        Dt: {st.dt} | Kt: {st.kt} | Summa: {st.summa.toLocaleString("uz-UZ")} so'm
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground pt-1 border-t border-border">{tr(st.explain)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid gap-2">
          <button
            onClick={() => {
              const resetObj: Record<number, StepState> = {};
              practiceCase.steps.forEach((_, idx) => {
                resetObj[idx] = { dt: "", kt: "", summa: "", attempts: 0, checked: false, isCorrect: false, firstTryCorrect: false };
              });
              setStepsState(resetObj);
              setSeconds(0);
              setFinished(false);
            }}
            className="rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Case'ni qayta topshirish
          </button>
          <button onClick={onBack} className="rounded-md border border-border px-4 py-3 text-sm">
            Boshqa case'ni tanlash
          </button>
        </div>
      </div>
    );
  }

  const handleResetDraft = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(draftKey);
      } catch {
        /* ignore */
      }
    }
    const resetObj: Record<number, StepState> = {};
    practiceCase.steps.forEach((_, idx) => {
      resetObj[idx] = { dt: "", kt: "", summa: "", attempts: 0, checked: false, isCorrect: false, firstTryCorrect: false };
    });
    setStepsState(resetObj);
    setSeconds(0);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Sticky Top Header */}
      <div className="sticky top-14 z-10 space-y-3 rounded-lg border border-border bg-background/95 p-3.5 backdrop-blur shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              Orqaga
            </button>
            <button
              onClick={handleResetDraft}
              className="inline-flex items-center gap-1 text-xs text-amber-600 hover:underline dark:text-amber-400"
              title="Qayta noldan boshlash va saqlangan qoralanmani tozalash"
            >
              <RotateCcw className="h-3 w-3" />
              Noldan boshlash
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Timer className="h-4 w-4 text-emerald-ink animate-pulse" />
            <span>Vaqt: {fmtTime(seconds)}</span>
          </div>

          <button
            onClick={handleFinish}
            className="rounded-md bg-emerald-ink px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-ink/90"
          >
            {t("finishCase")}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-emerald-ink font-semibold">{practiceCase.company}</span>
          <span className="text-muted-foreground">{practiceCase.steps.length} ta operatsiya</span>
        </div>
      </div>

      <div className="paper-card space-y-2 p-4 border-l-4 border-l-gold bg-amber-50/40 dark:bg-amber-950/20">
        <h2 className="font-serif text-base font-bold">{tr(practiceCase.title)}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">{tr(practiceCase.context)}</p>
      </div>

      {/* FULL LIST OF STEPS (All steps rendered sequentially) */}
      <div className="space-y-5">
        {practiceCase.steps.map((step, idx) => {
          const uSt = stepsState[idx] || {
            dt: "",
            kt: "",
            summa: "",
            attempts: 0,
            checked: false,
            isCorrect: false,
            firstTryCorrect: false,
          };

          const dtClean = uSt.dt.trim();
          const ktClean = uSt.kt.trim();
          const numSumma = parseSummaInput(uSt.summa);

          const dtOk = dtClean === step.dt;
          const ktOk = ktClean === step.kt;
          const summaOk = numSumma === step.summa;

          return (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              className={cn(
                "paper-card space-y-3 p-4 transition-all border-l-4",
                uSt.checked && uSt.isCorrect && "border-l-emerald-ink bg-emerald-soft/10",
                uSt.checked && !uSt.isCorrect && "border-l-destructive bg-danger-soft/10",
                !uSt.checked && "border-l-muted-foreground/30",
              )}
            >
              {/* Step Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-emerald-ink uppercase">
                  #{step.id} - Operatsiya
                </span>
                {uSt.checked && uSt.isCorrect && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-ink">
                    <Check className="h-3.5 w-3.5" /> To'g'ri
                  </span>
                )}
              </div>

              {/* Step Description */}
              <p className="text-sm font-medium leading-relaxed">{tr(step.text)}</p>

              {/* Step Input Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Dt Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-semibold text-emerald-ink">
                    Debet (Dt) schot:
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Masalan: 5110"
                    value={uSt.dt}
                    onChange={(e) => {
                      const val = e.target.value;
                      setStepsState((prev) => ({
                        ...prev,
                        [idx]: { ...prev[idx]!, dt: val, checked: false },
                      }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        ktRefs.current[idx]?.focus();
                      }
                    }}
                    disabled={uSt.isCorrect}
                    className={cn(
                      "w-full rounded-md border px-3 py-2.5 font-mono text-sm shadow-sm transition-all focus:outline-none focus:ring-2",
                      uSt.checked && dtOk && "border-emerald-ink bg-emerald-soft text-emerald-ink focus:ring-emerald-ink",
                      uSt.checked && !dtOk && "border-destructive bg-danger-soft text-destructive focus:ring-destructive",
                      !uSt.checked && "border-input bg-background focus:ring-primary",
                    )}
                  />
                </div>

                {/* Kt Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-semibold text-rose-600 dark:text-rose-400">
                    Kredit (Kt) schot:
                  </label>
                  <input
                    ref={(el) => {
                      ktRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    placeholder="Masalan: 4610"
                    value={uSt.kt}
                    onChange={(e) => {
                      const val = e.target.value;
                      setStepsState((prev) => ({
                        ...prev,
                        [idx]: { ...prev[idx]!, kt: val, checked: false },
                      }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        summaRefs.current[idx]?.focus();
                      }
                    }}
                    disabled={uSt.isCorrect}
                    className={cn(
                      "w-full rounded-md border px-3 py-2.5 font-mono text-sm shadow-sm transition-all focus:outline-none focus:ring-2",
                      uSt.checked && ktOk && "border-emerald-ink bg-emerald-soft text-emerald-ink focus:ring-emerald-ink",
                      uSt.checked && !ktOk && "border-destructive bg-danger-soft text-destructive focus:ring-destructive",
                      !uSt.checked && "border-input bg-background focus:ring-primary",
                    )}
                  />
                </div>

                {/* Summa Input */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-semibold text-gold">
                    Summa (so'mda):
                  </label>
                  <input
                    ref={(el) => {
                      summaRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    placeholder="Masalan: 100.000.000"
                    value={uSt.summa}
                    onChange={(e) => {
                      const formatted = formatSummaDisplay(e.target.value);
                      setStepsState((prev) => ({
                        ...prev,
                        [idx]: { ...prev[idx]!, summa: formatted, checked: false },
                      }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (!uSt.isCorrect && uSt.dt.trim() && uSt.kt.trim() && uSt.summa.trim()) {
                          handleStepCheck(idx, step);
                        } else if (idx + 1 < practiceCase.steps.length) {
                          scrollToStep(idx + 1);
                        }
                      }
                    }}
                    disabled={uSt.isCorrect}
                    className={cn(
                      "w-full rounded-md border px-3 py-2.5 font-mono text-sm shadow-sm transition-all focus:outline-none focus:ring-2",
                      uSt.checked && summaOk && "border-emerald-ink bg-emerald-soft text-emerald-ink focus:ring-emerald-ink",
                      uSt.checked && !summaOk && "border-destructive bg-danger-soft text-destructive focus:ring-destructive",
                      !uSt.checked && "border-input bg-background focus:ring-primary",
                    )}
                  />
                </div>
              </div>

              {/* Step Feedback & Gradual Hints */}
              {uSt.checked && !uSt.isCorrect && (
                <div className="rounded-md border border-destructive/40 bg-danger-soft p-3 text-xs space-y-1.5 text-destructive">
                  <p className="font-bold">
                    {uSt.attempts >= 3 ? (
                      dtOk && ktOk && !summaOk
                        ? "Dt va Kt schotlari to'g'ri, lekin Summa xato kiritildi!"
                        : dtOk && !ktOk && summaOk
                          ? "Dt va Summa to'g'ri, lekin Kt schot raqami xato!"
                          : !dtOk && ktOk && summaOk
                            ? "Kt va Summa to'g'ri, lekin Dt schot raqami xato!"
                            : "Kiritilgan Dt/Kt schotlar yoki Summa noto'g'ri!"
                    ) : (
                      "Xato! Ba'zi kataklar noto'g'ri to'ldirildi. Qayta urining."
                    )}
                  </p>

                  {uSt.attempts >= 5 && (
                    <div className="border-t border-destructive/20 pt-1.5 text-foreground/80 space-y-1">
                      <p className="font-semibold text-gold flex items-center gap-1">
                        <HelpCircle className="h-3.5 w-3.5 text-gold" /> Maslahat:
                      </p>
                      <p className="font-serif text-[13px]">{tr(step.hint)}</p>
                    </div>
                  )}
                </div>
              )}

              {uSt.isCorrect && (
                <div className="rounded-md border border-emerald-ink/40 bg-emerald-soft p-3 text-xs text-emerald-ink space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <Check className="h-4 w-4" /> To'g'ri bajarildi!
                  </p>
                  <p className="text-foreground/80 text-[12px]">{tr(step.explain)}</p>
                </div>
              )}

              {/* Step Buttons: Inline Check and Next/Skip */}
              <div className="flex items-center justify-end gap-2 pt-1">
                {!uSt.isCorrect && (
                  <button
                    type="button"
                    onClick={() => handleStepCheck(idx, step)}
                    disabled={!uSt.dt.trim() || !uSt.kt.trim() || !uSt.summa.trim()}
                    className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    Tekshirish (Enter)
                  </button>
                )}
                {idx + 1 < practiceCase.steps.length && (
                  <button
                    type="button"
                    onClick={() => scrollToStep(idx + 1)}
                    className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary"
                  >
                    Keyingi operatsiya ↓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-10 rounded-lg border border-border bg-card/95 p-3 shadow-lg backdrop-blur flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground font-mono">
          Barcha {practiceCase.steps.length} ta operatsiya to'ldirilgach, yakunlash tugmasini bosing:
        </p>
        <button
          onClick={handleFinish}
          className="shrink-0 rounded-md bg-emerald-ink px-5 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-emerald-ink/90"
        >
          {t("finishCase")}
        </button>
      </div>
    </div>
  );
}
