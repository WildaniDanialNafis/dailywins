"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarClock,
  CalendarDays,
  FileText,
  Grid2X2,
  ListChecks,
  LogOut,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useMemo } from "react";

import { type Permission, useAuth } from "@/components/auth/auth-context";
import { useWorkspace } from "@/components/workspace/workspace-context";

const APP_NAME = "DailyWins";
const APP_SUBTITLE = "Operations Workspace";

const primaryNavigation = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart3,
    permission: "dashboard.view" as Permission,
  },
  {
    href: "/evaluasi",
    label: "Evaluasi",
    icon: ListChecks,
    permission: "evaluasi.view" as Permission,
  },
  {
    href: "/schedule",
    label: "Schedule",
    icon: CalendarDays,
    permission: "schedule.view" as Permission,
  },
  {
    href: "/daily-schedule",
    label: "Daily Schedule",
    icon: CalendarClock,
    permission: "daily-schedule.view" as Permission,
  },
  {
    href: "/polling",
    label: "Polling",
    icon: ListChecks,
    permission: "polling.view" as Permission,
  },
];

const secondaryNavigation = [
  {
    href: "/reports",
    label: "Laporan",
    icon: FileText,
    permission: "reports.view" as Permission,
  },
  {
    href: "/whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    permission: "whatsapp.view" as Permission,
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getInitials(name?: string | null) {
  if (!name) {
    return "DW";
  }

  return (
    name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "DW"
  );
}

function UserProfile({ compact = false }: { compact?: boolean }) {
  const { user, logout, loading } = useAuth();

  const initials = getInitials(user?.name);

  return (
    <div
      className={[
        "flex min-w-0 items-center gap-3",
        compact ? "rounded-2xl border border-white/8 bg-white/4 px-3 py-3" : "",
      ].join(" ")}
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm shadow-indigo-950/20">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {user?.name ?? "DailyWins User"}
        </p>

        <p className="truncate text-xs text-slate-400">
          {user?.email ?? "user@dailywins.app"}
        </p>

        {user?.role && (
          <div className="mt-1 inline-flex max-w-full items-center rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-semibold capitalize text-slate-500 ring-1 ring-white/5">
            <span className="truncate">{user.role}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => void logout()}
        disabled={loading}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-4 focus:ring-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Logout"
        title="Logout"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}

function WhatsAppStatus({ onNavigate }: { onNavigate?: () => void }) {
  const { whatsappConnected, activeGroup } = useWorkspace();

  const ready = whatsappConnected && Boolean(activeGroup);

  return (
    <Link
      href="/whatsapp"
      onClick={onNavigate}
      className={[
        "group block rounded-2xl border p-3.5 transition duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
        ready
          ? "border-emerald-400/10 bg-emerald-500/5 hover:bg-emerald-500/10"
          : "border-white/8 bg-white/4 hover:bg-white/7",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className={[
              "h-1.5 w-1.5 shrink-0 rounded-full",
              ready
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                : whatsappConnected
                  ? "bg-amber-400"
                  : "bg-slate-500",
            ].join(" ")}
          />

          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            WhatsApp
          </p>
        </div>

        <MessageCircle className="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:text-slate-300" />
      </div>

      <p className="mt-1.5 truncate text-xs font-semibold text-slate-200">
        {whatsappConnected
          ? (activeGroup?.name ?? "Belum ada grup aktif")
          : "Belum terhubung"}
      </p>

      <p className="mt-0.5 truncate text-[10px] text-slate-500">
        {ready
          ? "Target distribusi aktif"
          : whatsappConnected
            ? "Pilih grup aktif"
            : "Hubungkan WhatsApp"}
      </p>
    </Link>
  );
}

function NavigationLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const { hasPermission } = useAuth();

  const visiblePrimaryNavigation = useMemo(
    () => primaryNavigation.filter((item) => hasPermission(item.permission)),
    [hasPermission],
  );

  const visibleSecondaryNavigation = useMemo(
    () => secondaryNavigation.filter((item) => hasPermission(item.permission)),
    [hasPermission],
  );

  function renderNavigationItem(
    item:
      | (typeof primaryNavigation)[number]
      | (typeof secondaryNavigation)[number],
    variant: "primary" | "secondary",
  ) {
    const Icon = item.icon;

    const active = isActivePath(pathname, item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={[
          "group relative flex min-h-11 w-full items-center gap-3 rounded-2xl px-3.5",
          "text-sm font-medium transition-all duration-150",
          "focus:outline-none focus:ring-4 focus:ring-indigo-500/10",
          active
            ? "bg-white/10 text-white shadow-sm ring-1 ring-white/8"
            : "text-slate-300 hover:bg-white/6 hover:text-white",
        ].join(" ")}
      >
        {active && (
          <span
            aria-hidden="true"
            className={[
              "absolute bottom-2.5 left-0 top-2.5 w-0.5 rounded-full",
              variant === "primary" ? "bg-indigo-400" : "bg-slate-300",
            ].join(" ")}
          />
        )}

        <span
          className={[
            "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-all duration-150",
            active
              ? variant === "primary"
                ? "bg-indigo-500/18 text-indigo-200"
                : "bg-white/8 text-slate-200"
              : "bg-white/4 text-slate-400 group-hover:bg-white/7 group-hover:text-slate-200",
          ].join(" ")}
        >
          <Icon className="h-4 w-4" />
        </span>

        <span className="min-w-0 flex-1 truncate">{item.label}</span>

        {active && (
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80"
          />
        )}
      </Link>
    );
  }

  return (
    <div className="space-y-6">
      {visiblePrimaryNavigation.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between px-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Main
            </p>

            <span className="text-[9px] font-medium text-slate-600">
              {visiblePrimaryNavigation.length}
            </span>
          </div>

          <nav aria-label="Navigasi utama" className="space-y-1">
            {visiblePrimaryNavigation.map((item) =>
              renderNavigationItem(item, "primary"),
            )}
          </nav>
        </div>
      )}

      {visibleSecondaryNavigation.length > 0 && (
        <div className="border-t border-white/8 pt-5">
          <div className="mb-2 px-3.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Workspace
            </p>
          </div>

          <nav aria-label="Workspace" className="space-y-1">
            {visibleSecondaryNavigation.map((item) =>
              renderNavigationItem(item, "secondary"),
            )}
          </nav>
        </div>
      )}

      <div className="border-t border-white/8 pt-5">
        <WhatsAppStatus onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function CreateEvaluationButton({ onNavigate }: { onNavigate?: () => void }) {
  const { hasPermission } = useAuth();

  if (!hasPermission("evaluasi.manage")) {
    return null;
  }

  return (
    <div className="px-3 pt-4">
      <Link
        href="/evaluasi"
        onClick={onNavigate}
        className="group flex min-h-14 items-center gap-3 rounded-2xl border border-white/8 bg-linear-to-r from-white/5 to-white/[0.025] px-3.5 py-3 transition duration-200 hover:border-indigo-400/10 hover:bg-white/7 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300 transition group-hover:bg-indigo-500/20">
          <Plus className="h-4 w-4" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-semibold text-slate-200">
            Buat evaluasi
          </span>

          <span className="mt-0.5 block truncate text-[10px] text-slate-500">
            Susun evaluasi baru
          </span>
        </span>

        <Plus className="h-3.5 w-3.5 shrink-0 text-slate-600 transition group-hover:text-indigo-300" />
      </Link>
    </div>
  );
}

function SidebarBrand({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={[
        "flex shrink-0 items-center border-b border-white/8",
        mobile ? "h-18 justify-between px-4" : "h-18 px-5",
      ].join(" ")}
    >
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="group flex min-w-0 items-center gap-3"
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-indigo-500/12 text-indigo-300 ring-1 ring-indigo-400/10 transition group-hover:bg-indigo-500/16">
          <Grid2X2 className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-tight text-white">
            {APP_NAME}
          </p>

          <p className="truncate text-[10px] font-medium text-slate-500">
            {APP_SUBTITLE}
          </p>
        </div>
      </Link>

      {mobile && (
        <button
          type="button"
          onClick={() => onNavigate?.()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-white/8 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/10"
          aria-label="Tutup navigasi"
          title="Tutup navigasi"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export function Sidebar({
  mobileOpen,
  onMobileOpenChange,
}: {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const bodyOverflow = document.body.style.overflow;

    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;

      document.documentElement.style.overflow = htmlOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onMobileOpenChange(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, onMobileOpenChange]);

  function closeMobile() {
    onMobileOpenChange(false);
  }

  return (
    <>
      <aside className="sticky top-0 hidden h-svh w-[280px] shrink-0 flex-col overflow-hidden bg-[#0b1220] text-white lg:flex">
        <SidebarBrand />

        <CreateEvaluationButton />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 [scrollbar-color:rgba(148,163,184,0.25)_transparent] [scrollbar-width:thin]">
          <NavigationLinks pathname={pathname} />
        </div>

        <div className="shrink-0 border-t border-white/8 bg-[#0b1220] px-5 py-4">
          <UserProfile compact />
        </div>
      </aside>

      <div
        aria-hidden={!mobileOpen}
        className={[
          "fixed inset-0 z-60 bg-slate-950/55 backdrop-blur-sm lg:hidden",
          "transition-opacity duration-200",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={closeMobile}
      />

      <aside
        id="mobile-sidebar"
        aria-label="Navigasi utama"
        className={[
          "fixed inset-y-0 left-0 z-70 flex w-[min(21rem,88vw)] flex-col overflow-hidden bg-[#0b1220] text-white shadow-2xl lg:hidden",
          "transition-transform duration-200 ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarBrand mobile onNavigate={closeMobile} />

        <CreateEvaluationButton onNavigate={closeMobile} />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 [scrollbar-color:rgba(148,163,184,0.25)_transparent] [scrollbar-width:thin]">
          <NavigationLinks pathname={pathname} onNavigate={closeMobile} />
        </div>

        <div className="shrink-0 border-t border-white/8 bg-[#0b1220] px-4 py-4">
          <UserProfile compact />
        </div>
      </aside>
    </>
  );
}
