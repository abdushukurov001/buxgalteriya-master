// ─── Data Store (localStorage-based) ───────────────────────────────────────
// Hozircha statik — keyinchalik backend bilan almashtiriladi.

export type Role = "superadmin" | "admin" | "student";

export interface LearningCenter {
  id: string;
  name: string;
  login: string;
  password: string;
  createdAt: string;
}

export interface Group {
  id: string;
  centerId: string;
  name: string;
  createdAt: string;
}

export interface Student {
  id: string;
  centerId: string;
  groupId: string;
  fullName: string;
  phone: string;
  password: string;
  createdAt: string;
}

// ─── Keys ──────────────────────────────────────────────────────────────────
const CENTERS_KEY = "hisobchi.centers";
const GROUPS_KEY = "hisobchi.groups";
const STUDENTS_KEY = "hisobchi.students";
const SESSION_KEY = "hisobchi.session";

// ─── Default Demo Seed Data ───────────────────────────────────────────────
const DEFAULT_CENTERS: LearningCenter[] = [
  {
    id: "demo-center-1",
    name: "Toshkent Buxgalteriya Maktabi",
    login: "admin",
    password: "admin123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-center-2",
    name: "Pro-Finance O'quv Markazi",
    login: "teacher",
    password: "teacher123",
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_GROUPS: Group[] = [
  {
    id: "demo-group-1",
    centerId: "demo-center-1",
    name: "Buxgalteriya 2026 (A-guruh)",
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-group-2",
    centerId: "demo-center-2",
    name: "Intensiv Pravodkalar kursi",
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_STUDENTS: Student[] = [
  {
    id: "demo-student-1",
    centerId: "demo-center-1",
    groupId: "demo-group-1",
    fullName: "Jasurbek Umarov",
    phone: "+998901234567",
    password: "student123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-student-2",
    centerId: "demo-center-2",
    groupId: "demo-group-2",
    fullName: "Malika Saidova",
    phone: "+998909876543",
    password: "student123",
    createdAt: new Date().toISOString(),
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function setItem<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function getItem<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// ─── Seed Initialization (runs once on module load) ────────────────────────
// Ensures demo accounts always exist in localStorage.
// Uses a version key — increment SEED_VERSION to force re-seed on next load.
const SEED_VERSION_KEY = "hisobchi.seedVersion";
const SEED_VERSION = "3"; // bump this to force re-seeding

function initSeedData(): void {
  const currentVersion = localStorage.getItem(SEED_VERSION_KEY);
  if (currentVersion === SEED_VERSION) return; // already seeded at this version

  // Merge seed centers — keep existing user-created centers, add missing demo ones
  const existingCenters = getItem<LearningCenter>(CENTERS_KEY);
  const demoIds = DEFAULT_CENTERS.map((c) => c.id);
  const withoutOldDemos = existingCenters.filter((c) => !demoIds.includes(c.id));
  setItem(CENTERS_KEY, [...DEFAULT_CENTERS, ...withoutOldDemos]);

  // Merge seed groups
  const existingGroups = getItem<Group>(GROUPS_KEY);
  const demoGroupIds = DEFAULT_GROUPS.map((g) => g.id);
  const withoutOldGroups = existingGroups.filter((g) => !demoGroupIds.includes(g.id));
  setItem(GROUPS_KEY, [...DEFAULT_GROUPS, ...withoutOldGroups]);

  // Merge seed students
  const existingStudents = getItem<Student>(STUDENTS_KEY);
  const demoStudentIds = DEFAULT_STUDENTS.map((s) => s.id);
  const withoutOldStudents = existingStudents.filter((s) => !demoStudentIds.includes(s.id));
  setItem(STUDENTS_KEY, [...DEFAULT_STUDENTS, ...withoutOldStudents]);

  localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
}

// Run seed on module load
try {
  initSeedData();
} catch {
  /* silently ignore in SSR or private browsing */
}

// ─── Learning Centers (Admins) ─────────────────────────────────────────────
export function getCenters(): LearningCenter[] {
  return getItem<LearningCenter>(CENTERS_KEY);
}

export function getCenterById(id: string): LearningCenter | undefined {
  return getCenters().find((c) => c.id === id);
}

export function getCenterByLogin(login: string): LearningCenter | undefined {
  const clean = login.trim().toLowerCase();
  return getCenters().find((c) => c.login.trim().toLowerCase() === clean);
}

export function addCenter(data: { name: string; login: string; password: string }): LearningCenter {
  const centers = getCenters();
  // Check for duplicate login
  if (centers.some((c) => c.login === data.login)) {
    throw new Error("Bu login allaqachon mavjud");
  }
  const center: LearningCenter = {
    id: generateId(),
    name: data.name,
    login: data.login,
    password: data.password,
    createdAt: new Date().toISOString(),
  };
  centers.push(center);
  setItem(CENTERS_KEY, centers);
  return center;
}

export function deleteCenter(id: string): void {
  const centers = getCenters().filter((c) => c.id !== id);
  setItem(CENTERS_KEY, centers);
  // Also delete related groups and students
  const groups = getGroups().filter((g) => g.centerId !== id);
  setItem(GROUPS_KEY, groups);
  const students = getStudents().filter((s) => s.centerId !== id);
  setItem(STUDENTS_KEY, students);
}

// ─── Groups ────────────────────────────────────────────────────────────────
export function getGroups(): Group[] {
  return getItem<Group>(GROUPS_KEY);
}

export function getGroupsByCenter(centerId: string): Group[] {
  return getGroups().filter((g) => g.centerId === centerId);
}

export function getGroupById(id: string): Group | undefined {
  return getGroups().find((g) => g.id === id);
}

export function addGroup(data: { centerId: string; name: string }): Group {
  const groups = getGroups();
  const group: Group = {
    id: generateId(),
    centerId: data.centerId,
    name: data.name,
    createdAt: new Date().toISOString(),
  };
  groups.push(group);
  setItem(GROUPS_KEY, groups);
  return group;
}

export function deleteGroup(id: string): void {
  const groups = getGroups().filter((g) => g.id !== id);
  setItem(GROUPS_KEY, groups);
  // Also delete related students
  const students = getStudents().filter((s) => s.groupId !== id);
  setItem(STUDENTS_KEY, students);
}

// ─── Students ──────────────────────────────────────────────────────────────
export function getStudents(): Student[] {
  return getItem<Student>(STUDENTS_KEY);
}

export function getStudentsByCenter(centerId: string): Student[] {
  return getStudents().filter((s) => s.centerId === centerId);
}

export function getStudentsByGroup(groupId: string): Student[] {
  return getStudents().filter((s) => s.groupId === groupId);
}

export function getStudentByPhone(phone: string): Student | undefined {
  const queryDigits = phone.replace(/\D/g, "");
  return getStudents().find((s) => {
    const sDigits = s.phone.replace(/\D/g, "");
    return s.phone === phone || (queryDigits.length > 0 && (sDigits.endsWith(queryDigits) || queryDigits.endsWith(sDigits)));
  });
}

export function addStudent(data: {
  centerId: string;
  groupId: string;
  fullName: string;
  phone: string;
  password: string;
}): Student {
  const students = getStudents();
  // Check for duplicate phone
  if (students.some((s) => s.phone === data.phone)) {
    throw new Error("Bu telefon raqam allaqachon ro'yxatdan o'tgan");
  }
  const student: Student = {
    id: generateId(),
    centerId: data.centerId,
    groupId: data.groupId,
    fullName: data.fullName,
    phone: data.phone,
    password: data.password,
    createdAt: new Date().toISOString(),
  };
  students.push(student);
  setItem(STUDENTS_KEY, students);
  return student;
}

export function deleteStudent(id: string): void {
  const students = getStudents().filter((s) => s.id !== id);
  setItem(STUDENTS_KEY, students);
}

// ─── Password reset ────────────────────────────────────────────────────────
export function updateCenterPassword(centerId: string, newPassword: string): void {
  if (newPassword.length < 6) throw new Error("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
  const centers = getCenters();
  const idx = centers.findIndex((c) => c.id === centerId);
  const found = centers[idx];
  if (!found) throw new Error("O'quv markaz topilmadi");
  centers[idx] = { ...found, password: newPassword };
  setItem(CENTERS_KEY, centers);
}

export function updateStudentPassword(
  studentId: string,
  newPassword: string,
  centerId?: string,
): void {
  if (newPassword.length < 6) throw new Error("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
  const students = getStudents();
  const idx = students.findIndex((s) => s.id === studentId);
  const found = students[idx];
  if (!found) throw new Error("O'quvchi topilmadi");
  // Admin faqat o'z markazidagi o'quvchi parolini yangilay oladi
  if (centerId && found.centerId !== centerId) {
    throw new Error("Bu o'quvchi sizning markazingizga tegishli emas");
  }
  students[idx] = { ...found, password: newPassword };
  setItem(STUDENTS_KEY, students);
}

export function searchStudents(centerId: string, query: string): Student[] {
  const q = query.trim().toLowerCase();
  const list = getStudentsByCenter(centerId);
  if (!q) return list;
  const digits = q.replace(/\D/g, "");
  return list.filter(
    (s) =>
      s.fullName.toLowerCase().includes(q) ||
      s.phone.toLowerCase().includes(q) ||
      (digits.length > 0 && s.phone.replace(/\D/g, "").includes(digits)),
  );
}

// ─── Registration Link ────────────────────────────────────────────────────
export function generateRegistrationLink(centerId: string, groupId: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  return `${base}/register/${centerId}/${groupId}`;
}

// ─── Session ───────────────────────────────────────────────────────────────
export interface Session {
  role: Role;
  userId: string; // centerId for admin, id for student, "superadmin" for superadmin
  centerName?: string;
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Statistics ────────────────────────────────────────────────────────────
export function getCenterStats(centerId: string) {
  const groups = getGroupsByCenter(centerId);
  const students = getStudentsByCenter(centerId);
  return {
    groupsCount: groups.length,
    studentsCount: students.length,
    groups,
    students,
  };
}
