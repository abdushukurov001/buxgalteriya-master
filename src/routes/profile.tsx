import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { ACCOUNT_MAP } from "@/data/accounts";
import { ALL_ENTRIES, MODULES } from "@/data/modules";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profil va statistika — Hisobchi" },
      {
        name: "description",
        content: "Umumiy progress, mavzular bo'yicha ballar, zaif joylar va kunlik streak statistikasi.",
      },
      { property: "og:title", content: "Profil va statistika — Hisobchi" },
      { property: "og:description", content: "Progress, ballar va zaif joylaringizni kuzating." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, tr } = useLang();
  const { state, overallPercent, reset } = useProgress();

  const weak = Object.entries(state.mistakes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag, count]) => {
      const entry = ALL_ENTRIES.find((e) => e.id === tag);
      const acc = ACCOUNT_MAP[tag];
      const label = entry
        ? `Dt ${entry.dt} — Kt ${entry.kt}`
        : acc
          ? `${acc.code} · ${tr(acc.name)}`
          : tag;
      return { tag, count, label };
    });

  return (
    <div className="space-y-5">
      <h1 className="font-serif text-xl font-semibold">{t("navProfile")}</h1>

      <section className="paper-card space-y-3 p-5">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{t("overallProgress")}</p>
        <p className="font-mono text-4xl">{overallPercent}%</p>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-emerald-ink" style={{ width: `${overallPercent}%` }} />
        </div>
        <p className="flex items-center gap-1.5 text-sm text-gold">
          <Flame className="h-4 w-4" />
          {state.streak} {t("streak")}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-base font-semibold">{t("moduleStats")}</h2>
        <ul className="paper-card divide-y divide-border">
          {MODULES.map((m) => {
            const r = state.results[m.id];
            return (
              <li key={m.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3">
                <span className="min-w-0 truncate text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{m.id}.</span> {tr(m.title)}
                </span>
                <span className="shrink-0 font-mono text-xs">
                  {r ? `${r.bestPercent}%` : t("notPassed")}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-base font-semibold">{t("weakSpots")}</h2>
        {weak.length === 0 ? (
          <p className="paper-card p-4 text-sm text-muted-foreground">{t("weakEmpty")}</p>
        ) : (
          <ul className="paper-card divide-y divide-border">
            {weak.map((w) => (
              <li key={w.tag} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3">
                <span className="min-w-0 truncate font-mono text-sm">{w.label}</span>
                <span className="shrink-0 rounded-full bg-danger-soft px-2 py-0.5 font-mono text-xs text-destructive">
                  {w.count} {t("errorsCount")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        onClick={reset}
        className="w-full rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground"
      >
        {t("resetProgress")}
      </button>
    </div>
  );
}