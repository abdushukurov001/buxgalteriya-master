import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import {
  getCenters,
  addCenter,
  deleteCenter,
  getCenterStats,
  updateCenterPassword,
  type LearningCenter,
} from "@/lib/store";
import {
  Building2,
  Plus,
  Trash2,
  Users,
  Layers,
  LogOut,
  Shield,
  X,
  Eye,
  EyeOff,
  KeyRound,
  Search,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/superadmin")({
  head: () => ({
    meta: [
      { title: "SuperAdmin — Hisobchi" },
      { name: "description", content: "SuperAdmin boshqaruv paneli" },
    ],
  }),
  component: SuperAdminPage,
});

function SuperAdminPage() {
  const { t } = useLang();
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const [, setTick] = useState(0);
  const refresh = useCallback(() => setTick((t) => t + 1), []);
  const [query, setQuery] = useState("");

  // Guard: only superadmin — use effect to avoid hook-order violations
  useEffect(() => {
    if (role !== "superadmin") {
      navigate({ to: "/login" });
    }
  }, [role, navigate]);

  if (role !== "superadmin") return null;

  const centers = getCenters();
  const q = query.trim().toLowerCase();
  const visibleCenters = q
    ? centers.filter(
        (c) => c.name.toLowerCase().includes(q) || c.login.toLowerCase().includes(q),
      )
    : centers;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold leading-tight">{t("superadminDashboard")}</h1>
              <p className="text-xs text-muted-foreground">{t("learningCenters")}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            {t("logoutButton")}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 space-y-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Building2}
            label={t("learningCenters")}
            value={centers.length}
            color="emerald"
          />
          <StatCard
            icon={Layers}
            label={t("totalGroups")}
            value={centers.reduce((sum, c) => sum + getCenterStats(c.id).groupsCount, 0)}
            color="gold"
          />
          <StatCard
            icon={Users}
            label={t("totalStudents")}
            value={centers.reduce((sum, c) => sum + getCenterStats(c.id).studentsCount, 0)}
            color="primary"
          />
        </div>

        {/* Add Center Button + Dialog */}
        <AddCenterDialog onAdded={refresh} />

        {/* Search */}
        {centers.length > 0 && (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nomi yoki login bo'yicha qidirish..."
              className="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        )}

        {/* Centers List */}
        {centers.length === 0 ? (
          <div className="paper-card flex flex-col items-center gap-3 p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">{t("noCenters")}</p>
          </div>
        ) : visibleCenters.length === 0 ? (
          <div className="paper-card flex flex-col items-center gap-3 p-12 text-center">
            <Search className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Hech narsa topilmadi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleCenters.map((center) => (
              <CenterCard key={center.id} center={center} onDeleted={refresh} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Building2;
  label: string;
  value: number;
  color: "emerald" | "gold" | "primary";
}) {
  const bgMap = { emerald: "bg-emerald-soft", gold: "bg-gold-soft", primary: "bg-secondary" };
  const textMap = { emerald: "text-emerald-ink", gold: "text-gold", primary: "text-foreground" };

  return (
    <div className="paper-card flex items-center gap-3 p-4">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${bgMap[color]}`}>
        <Icon className={`h-5 w-5 ${textMap[color]}`} />
      </div>
      <div>
        <p className="font-mono text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

// ─── Center Card ───────────────────────────────────────────────────────────
function CenterCard({
  center,
  onDeleted,
}: {
  center: LearningCenter;
  onDeleted: () => void;
}) {
  const { t } = useLang();
  const stats = getCenterStats(center.id);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteCenter(center.id);
    toast.success(`"${center.name}" o'chirildi`);
    onDeleted();
  };

  return (
    <div className="paper-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4 p-5">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-soft text-emerald-ink">
          <Building2 className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="font-serif text-lg font-semibold">{center.name}</h3>
          <p className="text-xs text-muted-foreground">
            Login: <span className="font-mono font-medium text-foreground">{center.login}</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-soft px-2.5 py-1 text-xs font-medium text-emerald-ink">
              <Layers className="h-3.5 w-3.5" />
              {stats.groupsCount} {t("groups")}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2.5 py-1 text-xs font-medium text-gold">
              <Users className="h-3.5 w-3.5" />
              {stats.studentsCount} {t("studentsLabel")}
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <div className="flex items-center gap-1.5">
          <ResetPasswordDialog
            title="Admin parolini tiklash"
            subject={`${center.name} (${center.login})`}
            onSubmit={(pwd) => updateCenterPassword(center.id, pwd)}
          />
          {showConfirm ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
              <button
                onClick={handleDelete}
                className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
              >
                {t("delete")}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
              >
                {t("cancel")}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-danger-soft hover:text-destructive"
              title={t("delete")}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reset Password Dialog ─────────────────────────────────────────────────
export function ResetPasswordDialog({
  title,
  subject,
  onSubmit,
}: {
  title: string;
  subject: string;
  onSubmit: (password: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setPwd("");
    setPwd2("");
    setShow(false);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pwd.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }
    if (pwd !== pwd2) {
      setError("Parollar mos kelmadi");
      return;
    }
    try {
      onSubmit(pwd);
      toast.success("Parol yangilandi");
      reset();
      setOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); setOpen(v); }}>
      <DialogTrigger asChild>
        <button
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-gold-soft hover:text-gold"
          title={title}
        >
          <KeyRound className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground">{subject}</p>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Yangi parol</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="••••••"
                required
                minLength={6}
                autoFocus
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 pr-10 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Parolni tasdiqlang</label>
            <input
              type={show ? "text" : "password"}
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
              placeholder="••••••"
              required
              minLength={6}
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          {error && (
            <div className="rounded-lg bg-danger-soft px-4 py-2.5 text-sm font-medium text-destructive">
              {error}
            </div>
          )}
          <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => { reset(); setOpen(false); }}
              className="h-10 cursor-pointer rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="h-10 cursor-pointer rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Saqlash
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ─── Add Center Dialog ─────────────────────────────────────────────────────
function AddCenterDialog({ onAdded }: { onAdded: () => void }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setLogin("");
    setPassword("");
    setShowPwd(false);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(t("passwordMinLength"));
      return;
    }

    try {
      addCenter({ name: name.trim(), login: login.trim(), password });
      toast.success(`"${name.trim()}" yaratildi`);
      reset();
      setOpen(false);
      onAdded();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Xatolik yuz berdi";
      setError(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) reset(); setOpen(val); }}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          {t("addCenter")}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-bold">{t("addCenter")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="space-y-2">
            <label htmlFor="center-name" className="block text-sm font-medium text-foreground">{t("centerName")}</label>
            <input
              id="center-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Najot Ta'lim"
              required
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="center-login" className="block text-sm font-medium text-foreground">{t("centerLogin")}</label>
              <input
                id="center-login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="najot_talim"
                required
                className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="center-pwd" className="block text-sm font-medium text-foreground">{t("centerPassword")}</label>
              <div className="relative">
                <input
                  id="center-pwd"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  minLength={6}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 pr-10 text-sm transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-danger-soft px-4 py-2.5 text-sm font-medium text-destructive">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border mt-6">
            <button
              type="button"
              onClick={() => { reset(); setOpen(false); }}
              className="h-10 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] cursor-pointer"
            >
              {t("create")}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
