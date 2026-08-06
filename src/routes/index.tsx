import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Flame, Lock } from "lucide-react";
import { toast } from "sonner";
import { MODULES } from "@/data/modules";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mavzular — Hisobchi" },
      {
        name: "description",
        content:
          "10 ta mavzudan iborat buxgalteriya kursi: schotlar, pravodkalar va har bir yozuvning mantiqiy izohi.",
      },
      { property: "og:title", content: "Mavzular — Hisobchi" },
      { property: "og:description", content: "Buxgalteriya kursining 10 ta interaktiv mavzusi." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, tr } = useLang();
  const { state, isUnlocked, overallPercent } = useProgress();
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <section className="paper-card ledger-lines space-y-3 p-5">
        <h1 className="font-serif text-2xl leading-tight font-semibold">{t("appName")}</h1>
        <p className="text-sm text-muted-foreground">{t("tagline")}</p>
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-emerald-ink transition-all"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <span className="font-mono text-sm">{overallPercent}%</span>
        </div>
        {state.streak > 0 && (
          <p className="flex items-center gap-1.5 text-xs text-gold">
            <Flame className="h-4 w-4" />
            {state.streak} {t("streak")}
          </p>
        )}
      </section>

      <ul className="space-y-3">
        {MODULES.map((m) => {
          const unlocked = isUnlocked(m.id);
          const res = state.results[m.id];
          const passed = Boolean(res?.passed);
          const percent = res?.bestPercent ?? 0;

          return (
            <li key={m.id}>
              <button
                onClick={() => {
                  if (!unlocked) {
                    toast(t("locked"), { description: t("lockedMsg") });
                    return;
                  }
                  navigate({ to: "/modules/$id", params: { id: String(m.id) } });
                }}
                className={cn(
                  "paper-card grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-3 p-4 text-left transition-colors",
                  !unlocked && "opacity-60",
                  passed && "border-emerald-ink/40",
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-md font-mono text-sm",
                    passed
                      ? "bg-emerald-ink text-primary-foreground"
                      : unlocked
                        ? "bg-gold-soft text-gold"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {passed ? <Check className="h-4 w-4" /> : !unlocked ? <Lock className="h-4 w-4" /> : m.id}
                </span>
                <span className="min-w-0 space-y-1.5">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-base font-semibold">{tr(m.title)}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] tracking-wide uppercase",
                        passed
                          ? "bg-emerald-soft text-emerald-ink"
                          : unlocked
                            ? "bg-gold-soft text-gold"
                            : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {passed ? t("done") : unlocked ? t("current") : t("locked")}
                    </span>
                  </span>
                  <span className="block text-[13px] text-muted-foreground">{tr(m.summary)}</span>
                  <span className="flex items-center gap-2 pt-1">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <span
                        className="block h-full rounded-full bg-emerald-ink"
                        style={{ width: `${percent}%` }}
                      />
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {m.entries.length} {t("entriesCount")}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
