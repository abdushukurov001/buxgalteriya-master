import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  type Role,
  type Session,
  getSession,
  setSession,
  clearSession,
  getCenterByLogin,
  getStudentByPhone,
  getCenterById,
} from "./store";

// ─── SuperAdmin Credentials (Hardcoded) ────────────────────────────────────
const SUPERADMIN_LOGIN = "superadmin";
const SUPERADMIN_PASSWORD = "admin123";

// ─── Context ───────────────────────────────────────────────────────────────
interface AuthContextValue {
  session: Session | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  role: null,
  isAuthenticated: false,
  login: () => ({ success: false }),
  logout: () => {},
});

// ─── Provider ──────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load session from localStorage on mount
  useEffect(() => {
    const saved = getSession();
    if (saved) setSessionState(saved);
    setLoaded(true);
  }, []);

  const login = useCallback(
    (username: string, password: string): { success: boolean; error?: string } => {
      // 1. Check SuperAdmin
      if (username === SUPERADMIN_LOGIN && password === SUPERADMIN_PASSWORD) {
        const s: Session = { role: "superadmin", userId: "superadmin" };
        setSession(s);
        setSessionState(s);
        return { success: true };
      }

      // 2. Check Admin (learning center login)
      const center = getCenterByLogin(username);
      if (center) {
        if (center.password === password) {
          const s: Session = { role: "admin", userId: center.id, centerName: center.name };
          setSession(s);
          setSessionState(s);
          return { success: true };
        }
        return { success: false, error: "Parol noto'g'ri" };
      }

      // 3. Check Student (phone number login)
      const student = getStudentByPhone(username);
      if (student) {
        if (student.password === password) {
          const centerInfo = getCenterById(student.centerId);
          const s: Session = {
            role: "student",
            userId: student.id,
            ...(centerInfo ? { centerName: centerInfo.name } : {}),
          };
          setSession(s);
          setSessionState(s);
          return { success: true };
        }
        return { success: false, error: "Parol noto'g'ri" };
      }

      return { success: false, error: "Foydalanuvchi topilmadi" };
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setSessionState(null);
  }, []);

  // Don't render children until session is loaded from localStorage
  if (!loaded) return null;

  return (
    <AuthContext.Provider
      value={{
        session,
        role: session?.role ?? null,
        isAuthenticated: session !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}
