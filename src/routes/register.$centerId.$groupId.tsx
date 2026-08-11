import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import {
  getCenterById,
  getGroupById,
  addStudent,
} from "@/lib/store";
import { UserPlus, Eye, EyeOff, GraduationCap, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register/$centerId/$groupId")({
  head: () => ({
    meta: [
      { title: "Ro'yxatdan o'tish — Hisobchi" },
      { name: "description", content: "O'quv markaz tizimiga ro'yxatdan o'tish" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useLang();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { centerId, groupId } = Route.useParams();

  const center = getCenterById(centerId);
  const group = getGroupById(groupId);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If center or group not found, show error
  if (!center || !group) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="paper-card max-w-md p-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-danger-soft">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <h1 className="font-serif text-xl font-bold">{!center ? t("centerNotFound") : t("groupNotFound")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Havola noto'g'ri yoki eskirgan bo'lishi mumkin.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("loginButton")}
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(t("passwordMinLength"));
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        addStudent({
          centerId,
          groupId,
          fullName: fullName.trim(),
          phone: phone.trim(),
          password,
        });

        // Auto-login the student
        const result = login(phone.trim(), password);
        if (result.success) {
          toast.success(t("registerSuccess"));
          navigate({ to: "/" });
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Xatolik yuz berdi";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, var(--emerald) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-ink text-primary-foreground shadow-lg">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">{t("registerTitle")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("registerSubtitle")}</p>

          {/* Center & Group info badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-soft px-4 py-2 text-sm font-medium text-emerald-ink">
            <span>{center.name}</span>
            <span className="h-1 w-1 rounded-full bg-emerald-ink/40" />
            <span>{group.name}</span>
          </div>
        </div>

        {/* Register Card */}
        <div className="paper-card overflow-hidden p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="reg-name" className="block text-sm font-medium text-foreground">
                {t("fullNameField")}
              </label>
              <input
                id="reg-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Abdullayev Jasur"
                required
                autoComplete="name"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="reg-phone" className="block text-sm font-medium text-foreground">
                {t("phoneField")}
              </label>
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                required
                autoComplete="tel"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="reg-password" className="block text-sm font-medium text-foreground">
                {t("passwordField")}
                <span className="ml-1 text-xs text-muted-foreground">(kamida 6 ta belgi)</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
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
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-ink font-medium text-primary-foreground shadow-sm transition-all hover:bg-emerald-ink/90 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  {t("registerButton")}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Already registered */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t("alreadyRegistered")}{" "}
          <Link to="/login" className="font-medium text-emerald-ink transition-colors hover:underline">
            {t("loginButton")}
          </Link>
        </p>
      </div>
    </div>
  );
}
