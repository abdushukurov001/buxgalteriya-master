import { createFileRoute } from "@tanstack/react-router";
import { Search, ChevronDown, ChevronRight, Layers, Hash, ArrowRightLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { FULL_CHART_OF_ACCOUNTS, type AccountType } from "@/data/fullChartOfAccounts";
import { TOP_100_ENTRIES } from "@/data/entries100";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/accounts")({
  head: () => ({
    meta: [
      { title: "Schotlar va Pravodkalar (План счетов и Проводки) — Hisobchi" },
      {
        name: "description",
        content:
          "O'zbekiston Respublikasi buxgalteriya hisobi schyotlar rejasi (21-son BHMS) hamda eng muhim 100 ta pravodkalar va ularning izohlari.",
      },
      { property: "og:title", content: "Schotlar va Pravodkalar — Hisobchi" },
      { property: "og:description", content: "Barcha 4 xonali schotlar va eng asosiy 100 ta buxgalteriya pravodkalari." },
    ],
  }),
  component: AccountsPage,
});

function getTypeBadge(type: AccountType) {
  switch (type) {
    case "A":
      return { label: "Aktiv", bg: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800" };
    case "P":
      return { label: "Passiv", bg: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800" };
    case "KA":
      return { label: "Kontr-aktiv", bg: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800" };
    case "KP":
      return { label: "Kontr-passiv", bg: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800" };
    case "D":
      return { label: "Daromad", bg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" };
    case "KD":
      return { label: "Kontr-daromad", bg: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800" };
    case "X":
      return { label: "Xarajat", bg: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800" };
  }
}

function AccountsPage() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState<"accounts" | "entries">("accounts");
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"ALL" | AccountType>("ALL");
  const [expandedParts, setExpandedParts] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const [expandedEntrySections, setExpandedEntrySections] = useState<Record<string, boolean>>({
    I: true,
    II: true,
    III: true,
    IV: true,
    V: true,
    VI: true,
    VII: true,
    VIII: true,
  });

  const togglePart = (partId: number) => {
    setExpandedParts((prev) => ({ ...prev, [partId]: !prev[partId] }));
  };

  const toggleEntrySection = (sectionId: string) => {
    setExpandedEntrySections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const toggleAllParts = (expand: boolean) => {
    setExpandedParts({
      1: expand,
      2: expand,
      3: expand,
      4: expand,
      5: expand,
    });
  };

  const toggleAllEntries = (expand: boolean) => {
    setExpandedEntrySections({
      I: expand,
      II: expand,
      III: expand,
      IV: expand,
      V: expand,
      VI: expand,
      VII: expand,
      VIII: expand,
    });
  };

  // Filter Chart of Accounts
  const filteredAccountsData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && selectedType === "ALL") return FULL_CHART_OF_ACCOUNTS;

    return FULL_CHART_OF_ACCOUNTS.map((part) => {
      const filteredDivisions = part.divisions
        .map((division) => {
          const filteredGroups = division.groups
            .map((group) => {
              const filteredAccounts = group.accounts.filter((acc) => {
                const matchesType = selectedType === "ALL" || acc.type === selectedType;
                const matchesQuery =
                  !q ||
                  acc.code.includes(q) ||
                  acc.name.uz.toLowerCase().includes(q) ||
                  acc.name.ru.toLowerCase().includes(q);
                return matchesType && matchesQuery;
              });

              const matchesGroupHeader =
                !q ||
                group.headerCode.includes(q) ||
                group.headerName.uz.toLowerCase().includes(q) ||
                group.headerName.ru.toLowerCase().includes(q);

              if (matchesGroupHeader && selectedType === "ALL") {
                return group;
              }

              if (filteredAccounts.length > 0) {
                return { ...group, accounts: filteredAccounts };
              }

              return null;
            })
            .filter(Boolean) as typeof division.groups;

          if (filteredGroups.length > 0) {
            return { ...division, groups: filteredGroups };
          }
          return null;
        })
        .filter(Boolean) as typeof part.divisions;

      if (filteredDivisions.length > 0) {
        return { ...part, divisions: filteredDivisions };
      }
      return null;
    }).filter(Boolean) as typeof FULL_CHART_OF_ACCOUNTS;
  }, [query, selectedType]);

  const totalFilteredAccounts = useMemo(() => {
    let count = 0;
    filteredAccountsData.forEach((p) =>
      p.divisions.forEach((d) =>
        d.groups.forEach((g) => {
          count += g.accounts.length;
        })
      )
    );
    return count;
  }, [filteredAccountsData]);

  // Filter 100 Provodkalar
  const filteredEntriesData = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOP_100_ENTRIES;

    return TOP_100_ENTRIES.map((sec) => {
      const filteredEntries = sec.entries.filter((entry) => {
        return (
          entry.id.toString() === q ||
          entry.debit.toLowerCase().includes(q) ||
          entry.credit.toLowerCase().includes(q) ||
          entry.description.uz.toLowerCase().includes(q) ||
          entry.description.ru.toLowerCase().includes(q)
        );
      });

      if (
        filteredEntries.length > 0 ||
        sec.title.uz.toLowerCase().includes(q) ||
        sec.title.ru.toLowerCase().includes(q) ||
        sec.accounts.includes(q)
      ) {
        return {
          ...sec,
          entries: filteredEntries.length > 0 ? filteredEntries : sec.entries,
        };
      }

      return null;
    }).filter(Boolean) as typeof TOP_100_ENTRIES;
  }, [query]);

  const totalFilteredEntries = useMemo(() => {
    let count = 0;
    filteredEntriesData.forEach((s) => {
      count += s.entries.length;
    });
    return count;
  }, [filteredEntriesData]);

  const typeFilters: { id: "ALL" | AccountType; label: { uz: string; ru: string } }[] = [
    { id: "ALL", label: { uz: "Barchasi", ru: "Все" } },
    { id: "A", label: { uz: "Aktiv (A)", ru: "Активные (А)" } },
    { id: "P", label: { uz: "Passiv (P)", ru: "Пассивные (П)" } },
    { id: "KA", label: { uz: "Kontr-aktiv (KA)", ru: "Контр-активные (КА)" } },
    { id: "KP", label: { uz: "Kontr-passiv (KP)", ru: "Контр-пассивные (КП)" } },
    { id: "D", label: { uz: "Daromad (D)", ru: "Доходы (Д)" } },
    { id: "X", label: { uz: "Xarajat (X)", ru: "Расходы (Р)" } },
  ];

  return (
    <div className="space-y-5">
      {/* Page Title Header */}
      <header className="paper-card ledger-lines space-y-3 p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary font-mono text-sm text-primary-foreground shadow-sm">
            0100
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold leading-tight">
              {lang === "uz" ? "Schotlar va Pravodkalar" : "Счета и Проводки"}
            </h1>
            <p className="text-xs text-muted-foreground">{t("chartSub")}</p>
          </div>
        </div>

        {/* Main Tab Switcher: Schotlar vs Pravodkalar */}
        <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-secondary/70 p-1">
          <button
            onClick={() => setActiveTab("accounts")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold transition-all",
              activeTab === "accounts"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Hash className="h-4 w-4 text-emerald-ink" />
            <span>{t("accounts")} (21-BHMS)</span>
          </button>
          <button
            onClick={() => setActiveTab("entries")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold transition-all",
              activeTab === "entries"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowRightLeft className="h-4 w-4 text-emerald-ink" />
            <span>{t("entries")} (100 ta)</span>
          </button>
        </div>
      </header>

      {/* Search Input & Filter Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              activeTab === "accounts"
                ? lang === "uz"
                  ? "Schot kodi yoki nomini qidiring (masalan: 0130, Kassa, 5110)..."
                  : "Поиск по коду или названию (например: 0130, Касса, 5110)..."
                : lang === "uz"
                ? "Pravodka raqami, schot kodi yoki operatsiya izohini qidiring (masalan: 8710, QQS, 100)..."
                : "Поиск по номеру, счёту или описанию операции (например: 8710, НДС, 100)..."
            }
            className="w-full rounded-md border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-emerald-ink focus:outline-none focus:ring-1 focus:ring-emerald-ink"
          />
        </div>

        {/* Filter Pills (only for Schotlar tab) */}
        {activeTab === "accounts" && (
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {typeFilters.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setSelectedType(tf.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors shrink-0 border",
                  selectedType === tf.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary/60 text-muted-foreground border-border hover:bg-secondary"
                )}
              >
                {tf.label[lang]}
              </button>
            ))}
          </div>
        )}

        {/* Action toolbar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            {activeTab === "accounts"
              ? lang === "uz"
                ? `${totalFilteredAccounts} ta schot topildi`
                : `Найдено счетов: ${totalFilteredAccounts}`
              : lang === "uz"
              ? `${totalFilteredEntries} ta pravodka topildi`
              : `Найдено проводок: ${totalFilteredEntries}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => (activeTab === "accounts" ? toggleAllParts(true) : toggleAllEntries(true))}
              className="text-emerald-ink hover:underline text-xs"
            >
              {lang === "uz" ? "Barchasini ochish" : "Раскрыть все"}
            </button>
            <span>·</span>
            <button
              onClick={() => (activeTab === "accounts" ? toggleAllParts(false) : toggleAllEntries(false))}
              className="text-muted-foreground hover:underline text-xs"
            >
              {lang === "uz" ? "Barchasini yopish" : "Свернуть все"}
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: CHART OF ACCOUNTS */}
      {activeTab === "accounts" && (
        <>
          {filteredAccountsData.length === 0 ? (
            <div className="paper-card p-6 text-center text-sm text-muted-foreground">
              {lang === "uz" ? "Hech qanday schot topilmadi" : "Счета не найдены"}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAccountsData.map((part) => {
                const isExpanded = expandedParts[part.id] ?? true;
                return (
                  <section key={part.id} className="paper-card overflow-hidden">
                    {/* Part Header */}
                    <button
                      onClick={() => togglePart(part.id)}
                      className="flex w-full items-center justify-between bg-secondary/80 px-4 py-3 text-left transition-colors hover:bg-secondary"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Layers className="h-4 w-4 shrink-0 text-emerald-ink" />
                        <h2 className="font-serif text-sm font-bold tracking-tight text-foreground truncate">
                          {part.title[lang]}
                        </h2>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>

                    {/* Part Content */}
                    {isExpanded && (
                      <div className="divide-y divide-border/60">
                        {part.divisions.map((division) => (
                          <div key={division.id} className="p-4 space-y-4">
                            <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-emerald-ink/90 border-b border-border/40 pb-1.5">
                              {division.title[lang]}
                            </h3>

                            {/* Groups */}
                            <div className="space-y-4">
                              {division.groups.map((group) => {
                                const groupBadge = getTypeBadge(group.type);
                                return (
                                  <div key={group.headerCode} className="space-y-2">
                                    {/* Group Header Code Title */}
                                    <div className="flex items-center justify-between gap-2 bg-muted/40 rounded-md px-3 py-1.5 font-mono text-xs border border-border/50">
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="font-bold text-foreground shrink-0">{group.headerCode}</span>
                                        <span className="truncate text-foreground/90 font-sans font-medium">
                                          {group.headerName[lang]}
                                        </span>
                                      </div>
                                      <span
                                        className={cn(
                                          "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-sans font-bold border",
                                          groupBadge.bg
                                        )}
                                      >
                                        {group.type}
                                      </span>
                                    </div>

                                    {/* Accounts Table / List */}
                                    <div className="grid gap-1.5 pl-2 sm:pl-3">
                                      {group.accounts.map((acc) => {
                                        const badge = getTypeBadge(acc.type);
                                        return (
                                          <div
                                            key={acc.code}
                                            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-md border border-border/60 bg-card p-2.5 text-xs transition-colors hover:border-emerald-ink/40"
                                          >
                                            <span className="shrink-0 rounded bg-secondary px-2 py-1 font-mono font-bold text-foreground">
                                              {acc.code}
                                            </span>
                                            <span className="min-w-0 font-medium text-foreground leading-snug">
                                              {acc.name[lang]}
                                            </span>
                                            <span
                                              className={cn(
                                                "shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold border",
                                                badge.bg
                                              )}
                                            >
                                              {badge.label}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* TAB 2: TOP 100 PROVODKALAR */}
      {activeTab === "entries" && (
        <>
          {filteredEntriesData.length === 0 ? (
            <div className="paper-card p-6 text-center text-sm text-muted-foreground">
              {lang === "uz" ? "Hech qanday pravodka topilmadi" : "Проводки не найдены"}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntriesData.map((section) => {
                const isExpanded = expandedEntrySections[section.id] ?? true;
                return (
                  <section key={section.id} className="paper-card overflow-hidden">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleEntrySection(section.id)}
                      className="flex w-full items-center justify-between bg-secondary/80 px-4 py-3 text-left transition-colors hover:bg-secondary"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <ArrowRightLeft className="h-4 w-4 shrink-0 text-emerald-ink" />
                        <div className="min-w-0">
                          <h2 className="font-serif text-sm font-bold tracking-tight text-foreground truncate">
                            {section.title[lang]}
                          </h2>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            ({section.accounts})
                          </span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>

                    {/* Section Entries List */}
                    {isExpanded && (
                      <div className="p-3 space-y-2 divide-y divide-border/40">
                        {section.entries.map((entry) => (
                          <div
                            key={entry.id}
                            className="pt-2 first:pt-0 space-y-1.5"
                          >
                            <div className="flex items-start gap-2 text-xs">
                              {/* ID Number */}
                              <span className="shrink-0 rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                                {entry.id})
                              </span>

                              {/* Dt / Kt Badges */}
                              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-semibold">
                                <span className="rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
                                  Dt {entry.debit}
                                </span>
                                <span className="text-muted-foreground">→</span>
                                <span className="rounded border border-purple-200 bg-purple-50 px-2 py-0.5 text-purple-700 dark:border-purple-900 dark:bg-purple-950/60 dark:text-purple-300">
                                  Kt {entry.credit}
                                </span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="pl-8 text-xs font-medium leading-relaxed text-foreground/90">
                              {entry.description[lang]}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
