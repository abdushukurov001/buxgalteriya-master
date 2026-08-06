import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LAWS, STANDARDS, type RefItem } from "@/data/reference";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reference")({
  head: () => ({
    meta: [
      { title: "Ma'lumotnoma — BHMS va qonunlar | Hisobchi" },
      {
        name: "description",
        content:
          "Buxgalteriya hisobi milliy standartlari (BHMS) va soliq, mehnat, kassa qoidalari bo'yicha qisqa tushuntirishlar.",
      },
      { property: "og:title", content: "Ma'lumotnoma — BHMS va qonunlar" },
      { property: "og:description", content: "BHMS va qonun moddalari bo'yicha qisqa izohlar." },
    ],
  }),
  component: ReferencePage,
});

function RefCard({ item, highlight }: { item: RefItem; highlight: boolean }) {
  const { tr } = useLang();
  return (
    <article
      id={item.id}
      className={cn("paper-card scroll-mt-24 space-y-2 p-4", highlight && "border-gold ring-1 ring-gold/40")}
    >
      <p className="font-mono text-xs tracking-wide text-gold uppercase">{tr(item.code)}</p>
      <h2 className="font-serif text-base font-semibold">{tr(item.title)}</h2>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{tr(item.body)}</p>
    </article>
  );
}

function ReferencePage() {
  const { t } = useLang();
  const [tab, setTab] = useState<"bhms" | "laws">("bhms");
  const [hash, setHash] = useState("");

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    setHash(id);
    if (LAWS.some((l) => l.id === id)) setTab("laws");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  }, []);

  const items = tab === "bhms" ? STANDARDS : LAWS;

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-xl font-semibold">{t("navReference")}</h1>
      <div className="grid grid-cols-2 gap-1 rounded-md border border-border bg-secondary p-1">
        {(["bhms", "laws"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              "rounded-sm px-3 py-2 text-sm font-medium transition-colors",
              tab === k ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            {k === "bhms" ? t("standards") : t("laws")}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <RefCard key={item.id} item={item} highlight={hash === item.id} />
        ))}
      </div>
    </div>
  );
}