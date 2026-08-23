"use client";

import type { ReactNode } from "react";

import { ActivityLogProvider } from "@/components/activity/activity-log-context";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AppShell } from "@/components/layout/app-shell";
import { WorkspaceProvider } from "@/components/workspace/workspace-context";

const APP_NAME = "DailyWins";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <ActivityLogProvider>
        <WorkspaceProvider>
          <div
            data-app={APP_NAME}
            className="min-h-svh overflow-x-clip bg-slate-50 text-slate-950 antialiased"
          >
            <AppShell>{children}</AppShell>
          </div>
        </WorkspaceProvider>
      </ActivityLogProvider>
    </ProtectedRoute>
  );
}
