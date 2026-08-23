"use client";

import Link from "next/link";
import {
  Bell,
  CalendarDays,
  CheckCheck,
  Grid2X2,
  ListChecks,
  Menu,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

import { useAuth } from "@/components/auth/auth-context";

import { Sidebar } from "./sidebar";

const APP_NAME = "DailyWins";
const APP_SUBTITLE = "Operations Workspace";

type NotificationType = "success" | "info" | "warning" | "activity";

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  href?: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "success",
    title: "Evaluasi berhasil disimpan",
    message: "Susunan Evaluasi Harian berhasil diperbarui.",
    time: "Baru saja",
    href: "/evaluasi",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "Polling siap dikirim",
    message: "3 polling sudah memiliki minimal 2 opsi.",
    time: "10 menit lalu",
    href: "/polling",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "WhatsApp terhubung",
    message: "Channel delivery siap digunakan.",
    time: "24 menit lalu",
    href: "/whatsapp",
    read: false,
  },
  {
    id: 4,
    type: "activity",
    title: "Schedule diperbarui",
    message: "Weekly Review ditambahkan ke Jumat.",
    time: "32 menit lalu",
    href: "/schedule",
    read: true,
  },
  {
    id: 5,
    type: "warning",
    title: "Active group belum dipilih",
    message: "Pilih target WhatsApp sebelum melakukan delivery.",
    time: "1 jam lalu",
    href: "/whatsapp",
    read: true,
  },
];

function NotificationIcon({ type }: { type: NotificationType }) {
  const iconClassName = "h-4 w-4";
  const wrapperClassName = [
    "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
    type === "success" && "bg-emerald-50 text-emerald-600",
    type === "info" && "bg-indigo-50 text-indigo-600",
    type === "warning" && "bg-amber-50 text-amber-600",
    type === "activity" && "bg-violet-50 text-violet-600",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      {type === "success" && (
        <CheckCheck className={iconClassName} aria-hidden="true" />
      )}

      {type === "info" && (
        <ListChecks className={iconClassName} aria-hidden="true" />
      )}

      {type === "warning" && (
        <ShieldCheck className={iconClassName} aria-hidden="true" />
      )}

      {type === "activity" && (
        <CalendarDays className={iconClassName} aria-hidden="true" />
      )}
    </div>
  );
}

function NotificationPanel({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClose,
}: {
  notifications: NotificationItem[];
  onMarkRead: (id: number) => void;
  onMarkAllRead: () => void;
  onClose: () => void;
}) {
  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div
      className={[
        "absolute right-0 top-[calc(100%+0.65rem)] z-90",
        "w-[min(25rem,calc(100vw-1.5rem))]",
        "overflow-hidden rounded-2xl border border-slate-200 bg-white",
        "shadow-2xl shadow-slate-900/10",
      ].join(" ")}
      role="dialog"
      aria-modal="false"
      aria-label="Notifikasi"
    >
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Notifikasi</h2>

            {unreadCount > 0 && (
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                {unreadCount} baru
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[10px] text-slate-400">
            Aktivitas terbaru {APP_NAME}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="min-h-8 rounded-lg px-2.5 text-[10px] font-semibold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              Tandai semua
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-100"
            aria-label="Tutup notifikasi"
            title="Tutup notifikasi"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="max-h-[min(30rem,72vh)] overflow-y-auto overscroll-contain">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => {
              const content = (
                <div
                  className={[
                    "flex items-start gap-3 px-4 py-3.5 text-left transition sm:px-5",
                    notification.read
                      ? "bg-white hover:bg-slate-50"
                      : "bg-indigo-50/25 hover:bg-indigo-50/50",
                  ].join(" ")}
                >
                  <NotificationIcon type={notification.type} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={[
                          "text-xs leading-5",
                          notification.read
                            ? "font-semibold text-slate-700"
                            : "font-bold text-slate-900",
                        ].join(" ")}
                      >
                        {notification.title}
                      </p>

                      {!notification.read && (
                        <span
                          aria-label="Belum dibaca"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                        />
                      )}
                    </div>

                    <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                      {notification.message}
                    </p>

                    <p className="mt-1.5 text-[10px] font-medium text-slate-400">
                      {notification.time}
                    </p>
                  </div>
                </div>
              );

              if (notification.href) {
                return (
                  <Link
                    key={notification.id}
                    href={notification.href}
                    onClick={() => {
                      onMarkRead(notification.id);
                      onClose();
                    }}
                    className="block focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => onMarkRead(notification.id)}
                  className="block w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                >
                  {content}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-slate-50 text-slate-300">
              <Bell className="h-5 w-5" aria-hidden="true" />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700">
              Tidak ada notifikasi
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Aktivitas baru akan muncul di sini.
            </p>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 sm:px-5">
          <p className="text-center text-[10px] text-slate-400">
            Menampilkan aktivitas workspace terbaru
          </p>
        </div>
      )}
    </div>
  );
}

function NotificationButton({
  open,
  unreadCount,
  onClick,
  notificationRef,
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClose,
}: {
  open: boolean;
  unreadCount: number;
  onClick: () => void;
  notificationRef: RefObject<HTMLDivElement | null>;
  notifications: NotificationItem[];
  onMarkRead: (id: number) => void;
  onMarkAllRead: () => void;
  onClose: () => void;
}) {
  return (
    <div ref={notificationRef} className="relative">
      <button
        type="button"
        onClick={onClick}
        className={[
          "relative grid h-10 w-10 place-items-center rounded-xl border shadow-sm transition duration-150",
          "focus:outline-none focus:ring-4 focus:ring-indigo-100",
          open
            ? "border-indigo-200 bg-indigo-50 text-indigo-600"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
        ].join(" ")}
        aria-label={
          unreadCount > 0
            ? `Notifikasi, ${unreadCount} belum dibaca`
            : "Notifikasi"
        }
        aria-expanded={open}
        aria-controls={open ? "notification-panel" : undefined}
        title="Notifikasi"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />

        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white ring-2 ring-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div id="notification-panel">
          <NotificationPanel
            notifications={notifications}
            onMarkRead={onMarkRead}
            onMarkAllRead={onMarkAllRead}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
}

function MobileHeaderBrand() {
  return (
    <Link
      href="/dashboard"
      className="group flex min-w-0 items-center gap-2.5"
      aria-label={`${APP_NAME} dashboard`}
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition group-hover:bg-indigo-100">
        <Grid2X2 className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-bold tracking-tight text-slate-900">
          {APP_NAME}
        </p>

        <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400">
          {APP_SUBTITLE}
        </p>
      </div>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement | null>(null);

  const { hasPermission } = useAuth();

  const canCreateEvaluation = hasPermission("evaluasi.manage");

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  useEffect(() => {
    if (!notificationOpen && !mobileOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      if (notificationOpen) {
        setNotificationOpen(false);
        return;
      }

      if (mobileOpen) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, notificationOpen]);

  useEffect(() => {
    if (!notificationOpen) {
      return;
    }

    function handleOutsideClick(event: MouseEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        !notificationRef.current?.contains(target)
      ) {
        setNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [notificationOpen]);

  function markNotificationRead(id: number) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    );
  }

  function markAllNotificationsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }

  function toggleNotifications() {
    setNotificationOpen((current) => !current);
  }

  function closeNotifications() {
    setNotificationOpen(false);
  }

  function openMobileSidebar() {
    setNotificationOpen(false);
    setMobileOpen(true);
  }

  return (
    <div className="min-h-svh w-full bg-slate-50">
      <div className="flex min-h-svh w-full">
        <Sidebar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.02)] backdrop-blur-xl">
            <div className="mx-auto flex min-h-16 w-full max-w-370 items-center gap-3 px-4 sm:px-6 xl:px-8">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="lg:hidden">
                  <button
                    type="button"
                    onClick={openMobileSidebar}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                    aria-label="Buka navigasi"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-sidebar"
                    title="Buka navigasi"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="lg:hidden">
                  <MobileHeaderBrand />
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {canCreateEvaluation && (
                  <Link
                    href="/evaluasi"
                    className="hidden min-h-10 items-center gap-2 rounded-xl bg-indigo-600 px-3.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:inline-flex"
                  >
                    <Plus
                      className="h-3.5 w-3.5 text-white"
                      aria-hidden="true"
                    />

                    <span className="text-white">Buat Evaluasi</span>
                  </Link>
                )}

                <NotificationButton
                  open={notificationOpen}
                  unreadCount={unreadCount}
                  onClick={toggleNotifications}
                  notificationRef={notificationRef}
                  notifications={notifications}
                  onMarkRead={markNotificationRead}
                  onMarkAllRead={markAllNotificationsRead}
                  onClose={closeNotifications}
                />

                <div className="hidden h-8 w-px bg-slate-200 lg:block" />

                <div className="hidden items-center gap-2.5 lg:flex">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <div className="hidden xl:block">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Workspace
                    </p>

                    <p className="text-xs font-semibold text-slate-700">
                      Protected
                    </p>
                  </div>
                </div>

                {canCreateEvaluation && (
                  <div className="sm:hidden">
                    <Link
                      href="/evaluasi"
                      className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      aria-label="Buat evaluasi"
                      title="Buat evaluasi"
                    >
                      <Plus className="h-4 w-4 text-white" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>

          <footer className="hidden border-t border-slate-200/70 bg-white/60 px-4 py-3 lg:block">
            <div className="mx-auto flex w-full max-w-370 items-center justify-between gap-4 px-0 text-[10px] text-slate-400 sm:px-2 xl:px-0">
              <span>
                © {new Date().getFullYear()} {APP_NAME}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Workspace active
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
