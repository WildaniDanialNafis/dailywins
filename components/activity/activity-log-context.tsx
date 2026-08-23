"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { type UserRole, useAuth } from "@/components/auth/auth-context";

export type ActivityModule =
  | "Evaluasi"
  | "Polling"
  | "Schedule"
  | "Daily Schedule"
  | "WhatsApp"
  | "Reports"
  | "Auth"
  | "System";

export type ActivityLog = {
  id: number;
  actor: string;
  role: UserRole;
  module: ActivityModule;
  action: string;
  description: string;
  time: string;
};

type AddActivityLogInput = {
  module: ActivityModule;
  action: string;
  description: string;
};

type ActivityLogContextValue = {
  logs: ActivityLog[];
  addActivityLog: (input: AddActivityLogInput) => void;
  clearActivityLogs: () => void;
};

const ActivityLogContext = createContext<ActivityLogContextValue | null>(null);

const initialActivityLogs: ActivityLog[] = [
  {
    id: 1,
    actor: "Admin User",
    role: "admin",
    module: "Evaluasi",
    action: "Updated",
    description: "Susunan Evaluasi Harian diperbarui.",
    time: "Baru saja",
  },
  {
    id: 2,
    actor: "Manager User",
    role: "manager",
    module: "Polling",
    action: "Created",
    description: "Polling Ibadah Wajib Hari Ini dibuat.",
    time: "10 menit lalu",
  },
  {
    id: 3,
    actor: "Admin User",
    role: "admin",
    module: "Schedule",
    action: "Updated",
    description: "Weekly Review ditambahkan ke Jumat.",
    time: "32 menit lalu",
  },
  {
    id: 4,
    actor: "Admin User",
    role: "admin",
    module: "Polling",
    action: "Sent",
    description: "Polling dikirim ke LittleWins Team.",
    time: "1 jam lalu",
  },
];

export function ActivityLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const [logs, setLogs] = useState<ActivityLog[]>(initialActivityLogs);

  const addActivityLog = useCallback(
    ({ module, action, description }: AddActivityLogInput) => {
      const nextId = Math.max(0, ...logs.map((log) => log.id)) + 1;

      const nextLog: ActivityLog = {
        id: nextId,
        actor: user?.name ?? "Unknown User",
        role: user?.role ?? "viewer",
        module,
        action,
        description,
        time: "Baru saja",
      };

      setLogs((current) => [nextLog, ...current].slice(0, 50));
    },
    [logs, user],
  );

  const clearActivityLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const value = useMemo<ActivityLogContextValue>(
    () => ({
      logs,
      addActivityLog,
      clearActivityLogs,
    }),
    [logs, addActivityLog, clearActivityLogs],
  );

  return (
    <ActivityLogContext.Provider value={value}>
      {children}
    </ActivityLogContext.Provider>
  );
}

export function useActivityLog() {
  const context = useContext(ActivityLogContext);

  if (!context) {
    throw new Error("useActivityLog must be used inside ActivityLogProvider.");
  }

  return context;
}
