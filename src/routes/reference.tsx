import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LAWS, STANDARDS, type RefItem } from "@/data/reference";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Search, X, FileText, Scale, Info } from "lucide-react";

export const Route = createFileRoute("/reference")({
  head: () => ({
    meta: [
      { title: "Ma'lumotnoma — BHMS va qonunlar | Hisobchi" },
      {
        name: "description",
        content:
          "Buxgalteriya ҳисоби миллий стандартлари (БҲМС 1-24) ва солиқ, меҳнат, фуқаролик қонунчилиги моддалари бўйича тўлиқ маълумотнома.",
      },
      { property: "og:title", content: "Ma'lumotnoma — BHMS va qonunlar" },
      { property: "og:description", content: "Барча 22 та БҲМС ва қонун моддалари бўйича тушунтиришлар." },
    ],
  }),
  component: ReferencePage,
});

function RefCard({ item, highlight }: { item: RefItem; highlight: boolean }) {
  const { tr } = useLang();
  const regInfoText = item.regInfo ? tr(item.regInfo) : null;
  const articlesText = item.articles ? tr(item.articles) : null;

  return (
    <article
      id={item.id}
      className={cn(
        "paper-card scroll-mt-24 space-y-2.5 p-4 transition-all duration-200",
        highlight && "border-gold ring-2 ring-gold/40 bg-gold/5"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2">
        <span className="font-mono text-xs font-semibold tracking-wide text-gold uppercase bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
          {tr(item.code)}
        </span>
        {regInfoText && (
          <span className="flex items-center gap-1 font-sans text-[11px] text-muted-foreground bg-secondary px-2 py-0.5 rounded">
            <Info className="h-3 w-3 text-gold shrink-0" />
            <span>{regInfoText}</span>
          </span>
        )}
      </div>

      <h2 className="font-serif text-base font-semibold leading-snug text-foreground">
        {tr(item.title)}
      </h2>

      {articlesText && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
          <Scale className="h-3.5 w-3.5 shrink-0" />
          <span>{articlesText}</span>
        </div>
      )}

      <div className="text-[13px] leading-relaxed text-muted-foreground whitespace-pre-line space-y-1">
        {tr(item.body)}
      </div>
    </article>
  );
}

function ReferencePage() {
  const { t, tr } = useLang();
  const [tab, setTab] = useState<"bhms" | "laws">("bhms");
  const [query, setQuery] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    setHash(id);
    if (LAWS.some((l) => l.id === id)) setTab("laws");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  }, []);

  const rawItems = tab === "bhms" ? STANDARDS : LAWS;

  const filteredItems = rawItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const code = tr(item.code).toLowerCase();
    const title = tr(item.title).toLowerCase();
    const body = tr(item.body).toLowerCase();
    const reg = item.regInfo ? tr(item.regInfo).toLowerCase() : "";
    const art = item.articles ? tr(item.articles).toLowerCase() : "";
    return code.includes(q) || title.includes(q) || body.includes(q) || reg.includes(q) || art.includes(q);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="font-serif text-xl font-semibold flex items-center gap-2">
          {tab === "bhms" ? (
            <FileText className="h-5 w-5 text-gold shrink-0" />
          ) : (
            <Scale className="h-5 w-5 text-gold shrink-0" />
          )}
          {t("navReference")}
        </h1>
        <span className="text-xs text-muted-foreground font-mono">
          {filteredItems.length} / {rawItems.length} {tab === "bhms" ? t("standards") : t("laws")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1 rounded-md border border-border bg-secondary p-1">
        {(["bhms", "laws"] as const).map((k) => (
          <button
            key={k}
            onClick={() => {
              setTab(k);
              setQuery("");
            }}
            className={cn(
              "rounded-sm px-3 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2",
              tab === k ? "bg-card text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {k === "bhms" ? (
              <>
                <FileText className="h-4 w-4 shrink-0 text-gold" />
                <span>{t("standards")} (22)</span>
              </>
            ) : (
              <>
                <Scale className="h-4 w-4 shrink-0 text-gold" />
                <span>{t("laws")}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search")}
          className="w-full rounded-md border border-border bg-card pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* List items */}
      {filteredItems.length === 0 ? (
        <div className="paper-card p-8 text-center text-muted-foreground text-sm space-y-1">
          <p className="font-medium text-foreground">Hech narsa topilmadi / Ничего не найдено</p>
          <p className="text-xs text-muted-foreground">Қидирув сўзини ўзгартириб кўринг.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <RefCard key={item.id} item={item} highlight={hash === item.id} />
          ))}
        </div>
      )}
    </div>
  );
}