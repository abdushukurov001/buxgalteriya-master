import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Library, User } from "lucide-react";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex shrink-0 items-center rounded-full border border-border bg-secondary p-0.5 font-mono text-xs">
      {(["uz", "ru"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-3 py-1 uppercase transition-colors",
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/", label: t("navModules"), icon: BookOpen, match: (p: string) => p === "/" || p.startsWith("/modules") },
    { to: "/reference", label: t("navReference"), icon: Library, match: (p: string) => p.startsWith("/reference") },
    { to: "/profile", label: t("navProfile"), icon: User, match: (p: string) => p.startsWith("/profile") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary font-mono text-sm text-primary-foreground">
              Dt
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-lg leading-tight font-semibold">
                {t("appName")}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">{t("tagline")}</span>
            </span>
          </Link>
          <LangSwitch />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 pb-28">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-3">
          {nav.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] transition-colors",
                  active ? "text-emerald-ink" : "text-muted-foreground",
                )}
              >
                <item.icon className={cn("h-5 w-5", active && "stroke-[2.4]")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}