import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import { Eye, EyeOff, GraduationCap, LogIn } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Kirish — Hisobchi" },
      { name: "description", content: "Hisobchi tizimiga kirish sahifasi" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useLang();
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect
  if (isAuthenticated && role) {
    const target = role === "superadmin" ? "/superadmin" : role === "admin" ? "/admin" : "/";
    navigate({ to: target });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a short delay for UX
    setTimeout(() => {
      const result = login(username.trim(), password);
      if (result.success) {
        // Re-read role from context after login
        const target =
          username.trim() === "superadmin"
            ? "/superadmin"
            : // Check if it's a phone number (student) or admin login
              /^\+?\d[\d\s-]{7,}$/.test(username.trim())
              ? "/"
              : "/admin";
        navigate({ to: target });
      } else {
        setError(result.error || "Xatolik yuz berdi");
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, var(--emerald) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">{t("loginTitle")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("loginSubtitle")}</p>
        </div>

        {/* Login Card */}
        <div className="paper-card overflow-hidden p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username / Phone */}
            <div className="space-y-2">
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-foreground"
              >
                {t("loginField")}
              </label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="superadmin / admin_login / +998..."
                required
                autoComplete="username"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-foreground"
              >
                {t("passwordField")}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  autoComplete="current-password"
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 pr-11 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-danger-soft px-4 py-3 text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  {t("loginButton")}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          O'quvchilar — o'quv markaz bergan havola orqali ro'yxatdan o'ting
        </p>
      </div>
    </div>
  );
}
