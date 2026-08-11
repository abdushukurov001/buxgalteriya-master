import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { useLang } from "@/lib/i18n";
import {
  getGroupsByCenter,
  getStudentsByCenter,
  getStudentsByGroup,
  addGroup,
  deleteGroup,
  deleteStudent,
  generateRegistrationLink,
  getGroupById,
  type Group,
  type Student,
} from "@/lib/store";
import {
  Layers,
  Users,
  Plus,
  Trash2,
  Link2,
  LogOut,
  GraduationCap,
  X,
  ChevronDown,
  User,
  Phone,
  Calendar,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Hisobchi" },
      { name: "description", content: "O'quv markaz boshqaruv paneli" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { t } = useLang();
  const { session, role, logout } = useAuth();
  const navigate = useNavigate();
  const [, setTick] = useState(0);
  const refresh = useCallback(() => setTick((prev) => prev + 1), []);
  const [activeTab, setActiveTab] = useState<"groups" | "students">("groups");
  const [filterGroup, setFilterGroup] = useState<string>("all");

  // Guard: only admin
  if (role !== "admin" || !session) {
    navigate({ to: "/login" });
    return null;
  }

  const centerId = session.userId;
  const centerName = session.centerName || "O'quv Markaz";
  const groups = getGroupsByCenter(centerId);
  const students = getStudentsByCenter(centerId);

  const filteredStudents =
    filterGroup === "all" ? students : getStudentsByGroup(filterGroup);

  const tabs = [
    { key: "groups" as const, label: t("groups"), icon: Layers, count: groups.length },
    { key: "students" as const, label: t("studentsLabel"), icon: Users, count: students.length },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-ink text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold leading-tight">{centerName}</h1>
              <p className="text-xs text-muted-foreground">{t("adminDashboard")}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            {t("logoutButton")}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="paper-card flex items-center gap-3 p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-soft">
              <Layers className="h-5 w-5 text-emerald-ink" />
            </div>
            <div>
              <p className="font-mono text-2xl font-bold">{groups.length}</p>
              <p className="text-xs text-muted-foreground">{t("groups")}</p>
            </div>
          </div>
          <div className="paper-card flex items-center gap-3 p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-soft">
              <Users className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="font-mono text-2xl font-bold">{students.length}</p>
              <p className="text-xs text-muted-foreground">{t("studentsLabel")}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-secondary p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  activeTab === tab.key
                    ? "bg-emerald-soft text-emerald-ink"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "groups" ? (
          <GroupsTab centerId={centerId} groups={groups} onChanged={refresh} />
        ) : (
          <StudentsTab
            students={filteredStudents}
            groups={groups}
            filterGroup={filterGroup}
            onFilterChange={setFilterGroup}
            onChanged={refresh}
          />
        )}
      </main>
    </div>
  );
}

// ─── Groups Tab ────────────────────────────────────────────────────────────
function GroupsTab({
  centerId,
  groups,
  onChanged,
}: {
  centerId: string;
  groups: Group[];
  onChanged: () => void;
}) {
  const { t } = useLang();

  return (
    <div className="space-y-4">
      <AddGroupDialog centerId={centerId} onAdded={onChanged} />

      {groups.length === 0 ? (
        <div className="paper-card flex flex-col items-center gap-3 p-12 text-center">
          <Layers className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">{t("noGroups")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} centerId={centerId} onDeleted={onChanged} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Group Card ────────────────────────────────────────────────────────────
function GroupCard({
  group,
  centerId,
  onDeleted,
}: {
  group: Group;
  centerId: string;
  onDeleted: () => void;
}) {
  const { t } = useLang();
  const students = getStudentsByGroup(group.id);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCopyLink = () => {
    const link = generateRegistrationLink(centerId, group.id);
    navigator.clipboard.writeText(link);
    toast.success(t("linkCopied"));
  };

  const handleDelete = () => {
    deleteGroup(group.id);
    toast.success(`"${group.name}" o'chirildi`);
    onDeleted();
  };

  return (
    <div className="paper-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4 p-5">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-soft text-emerald-ink">
          <Layers className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base font-semibold">{group.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {students.length} {t("studentsLabel")}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(group.createdAt).toLocaleDateString("uz-UZ")}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-soft px-3 py-2 text-xs font-medium text-emerald-ink transition-colors hover:bg-emerald-soft/80"
            title={t("copyLink")}
          >
            <Link2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("copyLink")}</span>
            <Copy className="h-3 w-3 sm:hidden" />
          </button>

          {/* Delete */}
          {showConfirm ? (
            <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2">
              <button
                onClick={handleDelete}
                className="rounded-lg bg-destructive px-2.5 py-2 text-xs font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
              >
                {t("delete")}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-border px-2.5 py-2 text-xs font-medium transition-colors hover:bg-secondary"
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
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ─── Add Group Dialog ──────────────────────────────────────────────────────
function AddGroupDialog({
  centerId,
  onAdded,
}: {
  centerId: string;
  onAdded: () => void;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGroup({ centerId, name: name.trim() });
    toast.success(`"${name.trim()}" guruhi yaratildi`);
    setName("");
    setOpen(false);
    onAdded();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) setName(""); setOpen(val); }}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-lg bg-emerald-ink px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-emerald-ink/90 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          {t("addGroup")}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-bold">{t("addGroup")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="space-y-2">
            <label htmlFor="group-name" className="block text-sm font-medium text-foreground">{t("groupName")}</label>
            <input
              id="group-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Frontend 15"
              required
              autoFocus
              className="flex h-11 w-full rounded-lg border border-input bg-background px-4 text-sm transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border mt-6">
            <button
              type="button"
              onClick={() => { setName(""); setOpen(false); }}
              className="h-10 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-emerald-ink px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-emerald-ink/90 active:scale-[0.98] cursor-pointer"
            >
              {t("create")}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Students Tab ──────────────────────────────────────────────────────────
function StudentsTab({
  students,
  groups,
  filterGroup,
  onFilterChange,
  onChanged,
}: {
  students: Student[];
  groups: Group[];
  filterGroup: string;
  onFilterChange: (v: string) => void;
  onChanged: () => void;
}) {
  const { t } = useLang();

  return (
    <div className="space-y-4">
      {/* Group filter */}
      {groups.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{t("group")}:</span>
          <div className="relative">
            <select
              value={filterGroup}
              onChange={(e) => onFilterChange(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-input bg-background pl-3 pr-8 text-sm transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="all">{t("allGroups")}</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      )}

      {students.length === 0 ? (
        <div className="paper-card flex flex-col items-center gap-3 p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">{t("noStudents")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} onDeleted={onChanged} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Student Card ──────────────────────────────────────────────────────────
function StudentCard({
  student,
  onDeleted,
}: {
  student: Student;
  onDeleted: () => void;
}) {
  const { t } = useLang();
  const group = getGroupById(student.groupId);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteStudent(student.id);
    toast.success(`"${student.fullName}" o'chirildi`);
    onDeleted();
  };

  return (
    <div className="paper-card flex items-center gap-4 p-4 transition-shadow hover:shadow-md">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-soft text-gold">
        <User className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{student.fullName}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {student.phone}
          </span>
          {group && (
            <span className="inline-flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {group.name}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(student.createdAt).toLocaleDateString("uz-UZ")}
          </span>
        </div>
      </div>
      <div className="shrink-0">
        {showConfirm ? (
          <div className="flex items-center gap-1.5 animate-in fade-in">
            <button
              onClick={handleDelete}
              className="rounded-lg bg-destructive px-2.5 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              {t("delete")}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-secondary"
            >
              {t("cancel")}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-danger-soft hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
