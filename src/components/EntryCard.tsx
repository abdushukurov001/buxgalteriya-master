import { Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";
import { ACCOUNT_MAP } from "@/data/accounts";
import type { Entry } from "@/data/modules";
import { REF_MAP } from "@/data/reference";
import { useLang } from "@/lib/i18n";

export function DtKt({ dt, kt }: { dt: string; kt: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
      <span className="rounded-md bg-emerald-soft px-2 py-1 text-emerald-ink">Dt {dt}</span>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="rounded-md bg-ink-soft px-2 py-1 text-ink">Kt {kt}</span>
    </div>
  );
}

export function EntryCard({ entry }: { entry: Entry }) {
  const { t, tr } = useLang();
  const ref = entry.ref ? REF_MAP[entry.ref] : undefined;
  const dtAcc = ACCOUNT_MAP[entry.dt];
  const ktAcc = ACCOUNT_MAP[entry.kt];

  return (
    <article className="paper-card space-y-3 p-4">
      <DtKt dt={entry.dt} kt={entry.kt} />
      <p className="text-[13px] text-muted-foreground">
        {dtAcc ? tr(dtAcc.name) : entry.dt} → {ktAcc ? tr(ktAcc.name) : entry.kt}
      </p>
      <p className="text-sm leading-relaxed">{tr(entry.op)}</p>
      <div className="rounded-md border border-border bg-secondary/60 p-3">
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase text-gold">
          <Lightbulb className="h-3.5 w-3.5" />
          {t("why")}
        </p>
        <p className="text-[13px] leading-relaxed">{tr(entry.why)}</p>
      </div>
      {ref && (
        <Link
          to="/reference"
          hash={ref.id}
          className="inline-flex items-center gap-1 text-xs font-medium text-emerald-ink underline underline-offset-4"
        >
          {t("more")}: {tr(ref.code)}
        </Link>
      )}
    </article>
  );
}