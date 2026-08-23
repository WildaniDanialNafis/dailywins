"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type UserRole = "admin" | "manager" | "viewer";

export type Permission =
  | "dashboard.view"
  | "evaluasi.view"
  | "evaluasi.manage"
  | "evaluasi.send"
  | "polling.view"
  | "polling.manage"
  | "polling.send"
  | "schedule.view"
  | "schedule.manage"
  | "schedule.send"
  | "daily-schedule.view"
  | "daily-schedule.manage"
  | "daily-schedule.send"
  | "whatsapp.view"
  | "whatsapp.manage"
  | "reports.view"
  | "reports.manage";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AuthSession = {
  userId: string;
  issuedAt: number;
  expiresAt: number;
};

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "expired";

type StaticUser = AuthUser & {
  password: string;
};

type LoginResult = {
  success: boolean;
  message: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  isAuthenticated: boolean;
  authStatus: AuthStatus;

  login: (
    email: string,
    password: string,
    remember?: boolean,
  ) => Promise<LoginResult>;

  logout: () => void;

  hasPermission: (permission: Permission) => boolean;

  hasAnyPermission: (permissions: Permission[]) => boolean;

  hasAllPermissions: (permissions: Permission[]) => boolean;
};

const SESSION_KEY = "littlewins.session";

const SESSION_DURATION = {
  standard: 8 * 60 * 60 * 1000,
  remembered: 30 * 24 * 60 * 60 * 1000,
} as const;

const staticUsers: readonly StaticUser[] = [
  {
    id: "user-admin",
    name: "Admin User",
    email: "admin@myapp.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "user-manager",
    name: "Manager User",
    email: "manager@myapp.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: "user-viewer",
    name: "Viewer User",
    email: "viewer@myapp.com",
    password: "viewer123",
    role: "viewer",
  },
];

const rolePermissions: Record<UserRole, readonly Permission[]> = {
  admin: [
    "dashboard.view",

    "evaluasi.view",
    "evaluasi.manage",
    "evaluasi.send",

    "polling.view",
    "polling.manage",
    "polling.send",

    "schedule.view",
    "schedule.manage",
    "schedule.send",

    "daily-schedule.view",
    "daily-schedule.manage",
    "daily-schedule.send",

    "whatsapp.view",
    "whatsapp.manage",

    "reports.view",
    "reports.manage",
  ],

  manager: [
    "dashboard.view",

    "evaluasi.view",
    "evaluasi.manage",
    "evaluasi.send",

    "polling.view",
    "polling.manage",
    "polling.send",

    "schedule.view",
    "schedule.manage",
    "schedule.send",

    "daily-schedule.view",
    "daily-schedule.manage",
    "daily-schedule.send",

    "whatsapp.view",
    "whatsapp.manage",

    "reports.view",
  ],

  viewer: [
    "dashboard.view",
    "evaluasi.view",
    "polling.view",
    "schedule.view",
    "daily-schedule.view",
    "whatsapp.view",
    "reports.view",
  ],
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(user: StaticUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function getUserById(userId: string): StaticUser | null {
  return staticUsers.find((user) => user.id === userId) ?? null;
}

function isSessionShapeValid(
  value: Partial<AuthSession>,
): value is AuthSession {
  return (
    typeof value.userId === "string" &&
    value.userId.length > 0 &&
    typeof value.issuedAt === "number" &&
    Number.isFinite(value.issuedAt) &&
    typeof value.expiresAt === "number" &&
    Number.isFinite(value.expiresAt) &&
    value.issuedAt >= 0 &&
    value.expiresAt > value.issuedAt
  );
}

function isSessionExpired(session: AuthSession) {
  return session.expiresAt <= Date.now();
}

function getStoredSession(): AuthSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<AuthSession>;

    if (!isSessionShapeValid(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function removeStoredSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // Keep in-memory auth usable when storage is unavailable.
  }
}

function storeSession(session: AuthSession) {
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Keep the session active in memory.
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [session, setSession] = useState<AuthSession | null>(null);

  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

  const loading = authStatus === "loading";

  const clearAuth = useCallback(
    (status: Exclude<AuthStatus, "loading" | "authenticated">) => {
      removeStoredSession();

      setUser(null);
      setSession(null);
      setAuthStatus(status);
    },
    [],
  );

  const restoreSession = useCallback(() => {
    const storedSession = getStoredSession();

    if (!storedSession) {
      clearAuth("unauthenticated");
      return;
    }

    if (isSessionExpired(storedSession)) {
      clearAuth("expired");
      return;
    }

    const storedUser = getUserById(storedSession.userId);

    if (!storedUser) {
      clearAuth("unauthenticated");
      return;
    }

    setSession(storedSession);
    setUser(toAuthUser(storedUser));
    setAuthStatus("authenticated");
  }, [clearAuth]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      restoreSession();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [restoreSession]);

  useEffect(() => {
    if (!session || authStatus !== "authenticated") {
      return;
    }

    const remaining = session.expiresAt - Date.now();

    const timer = window.setTimeout(
      () => {
        clearAuth("expired");
      },
      Math.max(0, remaining),
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [session, authStatus, clearAuth]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== SESSION_KEY) {
        return;
      }

      restoreSession();
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [restoreSession]);

  const login = useCallback(
    async (
      email: string,
      password: string,
      remember = false,
    ): Promise<LoginResult> => {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail || !password) {
        return {
          success: false,
          message: "Email dan password wajib diisi.",
        };
      }

      const foundUser = staticUsers.find(
        (item) =>
          item.email.toLowerCase() === normalizedEmail &&
          item.password === password,
      );

      if (!foundUser) {
        return {
          success: false,
          message: "Email atau password salah.",
        };
      }

      const now = Date.now();

      const nextSession: AuthSession = {
        userId: foundUser.id,
        issuedAt: now,
        expiresAt:
          now +
          (remember ? SESSION_DURATION.remembered : SESSION_DURATION.standard),
      };

      storeSession(nextSession);

      setSession(nextSession);
      setUser(toAuthUser(foundUser));
      setAuthStatus("authenticated");

      return {
        success: true,
        message: "Login berhasil.",
      };
    },
    [],
  );

  const logout = useCallback(() => {
    clearAuth("unauthenticated");
  }, [clearAuth]);

  const hasPermission = useCallback(
    (permission: Permission) => {
      if (!user || authStatus !== "authenticated") {
        return false;
      }

      return rolePermissions[user.role].includes(permission);
    },
    [user, authStatus],
  );

  const hasAnyPermission = useCallback(
    (permissions: Permission[]) =>
      permissions.some((permission) => hasPermission(permission)),
    [hasPermission],
  );

  const hasAllPermissions = useCallback(
    (permissions: Permission[]) =>
      permissions.every((permission) => hasPermission(permission)),
    [hasPermission],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      isAuthenticated:
        authStatus === "authenticated" && user !== null && session !== null,
      authStatus,
      login,
      logout,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
    }),
    [
      user,
      session,
      loading,
      authStatus,
      login,
      logout,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

export const demoAccounts = staticUsers.map(({ role, email, password }) => ({
  role: role.charAt(0).toUpperCase() + role.slice(1),
  email,
  password,
}));
