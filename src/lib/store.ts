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

// ─── Helpers ───────────────────────────────────────────────────────────────
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getItem<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setItem<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Learning Centers (Admins) ─────────────────────────────────────────────
export function getCenters(): LearningCenter[] {
  return getItem<LearningCenter>(CENTERS_KEY);
}

export function getCenterById(id: string): LearningCenter | undefined {
  return getCenters().find((c) => c.id === id);
}

export function getCenterByLogin(login: string): LearningCenter | undefined {
  return getCenters().find((c) => c.login === login);
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
  return getStudents().find((s) => s.phone === phone);
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
  if (idx === -1) throw new Error("O'quv markaz topilmadi");
  centers[idx] = { ...centers[idx], password: newPassword };
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
  if (idx === -1) throw new Error("O'quvchi topilmadi");
  // Admin faqat o'z markazidagi o'quvchi parolini yangilay oladi
  if (centerId && students[idx].centerId !== centerId) {
    throw new Error("Bu o'quvchi sizning markazingizga tegishli emas");
  }
  students[idx] = { ...students[idx], password: newPassword };
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
