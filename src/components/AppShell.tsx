import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { BookOpen, Hash, Library, User, LogOut, ClipboardList } from "lucide-react";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
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
  const { logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/accounts", label: t("navAccounts"), icon: Hash, match: (p: string) => p.startsWith("/accounts") },
    { to: "/", label: t("navModules"), icon: BookOpen, match: (p: string) => p === "/" || p.startsWith("/modules") },
    { to: "/practices", label: "Mashqlar", icon: ClipboardList, match: (p: string) => p.startsWith("/practices") },
    { to: "/reference", label: t("navReference"), icon: Library, match: (p: string) => p.startsWith("/reference") },
    { to: "/profile", label: t("navProfile"), icon: User, match: (p: string) => p.startsWith("/profile") },
  ];

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2">
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
          <div className="flex items-center gap-2">
            <LangSwitch />
            <button
              onClick={handleLogout}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title={t("logoutButton")}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 pb-28">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          {nav.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 text-[10px] leading-tight transition-colors",
                  active ? "text-emerald-ink font-semibold" : "text-muted-foreground",
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", active && "stroke-[2.4]")} />
                <span className="text-center leading-tight max-w-[52px] truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}