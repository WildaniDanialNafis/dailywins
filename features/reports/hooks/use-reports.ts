"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { useWorkspace } from "@/components/workspace/workspace-context";

import { initialReports, PAGE_SIZE } from "../data/initial-data";
import { parseReportDate, simulateDelay } from "../utils";
import type {
  DeliveryState,
  Report,
  ReportStatus,
  ReportType,
  SortDirection,
  SortKey,
  ToastState,
} from "../types";

export function useReports() {
  const { hasPermission } = useAuth();

  const { whatsappConnected, activeGroup } = useWorkspace();

  const canSend =
    hasPermission("evaluasi.send") ||
    hasPermission("polling.send") ||
    hasPermission("schedule.send");

  const canManage = hasPermission("reports.manage");

  const [reports, setReports] = useState<Report[]>(
    initialReports.map((report) => ({
      ...report,
    })),
  );

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState<"Semua" | ReportType>("Semua");

  const [statusFilter, setStatusFilter] = useState<"Semua" | ReportStatus>(
    "Semua",
  );

  const [sortKey, setSortKey] = useState<SortKey>("date");

  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [page, setPage] = useState(1);

  const [menuId, setMenuId] = useState<number | null>(null);

  const [sendingId, setSendingId] = useState<number | null>(null);

  const [deliveryStates, setDeliveryStates] = useState<
    Record<number, DeliveryState>
  >({});

  const [deliveryErrors, setDeliveryErrors] = useState<
    Record<number, string | undefined>
  >({});

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [toast, setToast] = useState<ToastState | null>(null);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        report.title.toLowerCase().includes(query) ||
        report.target.toLowerCase().includes(query);

      const matchesType = typeFilter === "Semua" || report.type === typeFilter;

      const matchesStatus =
        statusFilter === "Semua" || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, search, typeFilter, statusFilter]);

  const sortedReports = useMemo(() => {
    const direction = sortDirection === "asc" ? 1 : -1;

    return [...filteredReports].sort((a, b) => {
      if (sortKey === "title") {
        return a.title.localeCompare(b.title, "id") * direction;
      }

      if (sortKey === "type") {
        return a.type.localeCompare(b.type, "id") * direction;
      }

      if (sortKey === "status") {
        return a.status.localeCompare(b.status, "id") * direction;
      }

      return (parseReportDate(a) - parseReportDate(b)) * direction;
    });
  }, [filteredReports, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedReports.length / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);

  const paginatedReports = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;

    return sortedReports.slice(start, start + PAGE_SIZE);
  }, [safePage, sortedReports]);

  const totalSent = reports.filter(
    (report) => report.status === "Terkirim",
  ).length;

  const totalScheduled = reports.filter(
    (report) => report.status === "Terjadwal",
  ).length;

  const totalDraft = reports.filter(
    (report) => report.status === "Draft",
  ).length;

  const hasActiveFilters =
    Boolean(search.trim()) ||
    typeFilter !== "Semua" ||
    statusFilter !== "Semua";

  const pageStart =
    sortedReports.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;

  const pageEnd = Math.min(safePage * PAGE_SIZE, sortedReports.length);

  const reportToDelete =
    confirmDeleteId === null
      ? null
      : (reports.find((report) => report.id === confirmDeleteId) ?? null);

  const busy = sendingId !== null || deletingId !== null || confirmingDelete;

  function showToast(type: ToastState["type"], title: string, message: string) {
    setToast({
      type,
      title,
      message,
    });
  }

  function clearFilters() {
    setSearch("");
    setTypeFilter("Semua");
    setStatusFilter("Semua");
    setPage(1);
    setMenuId(null);
  }

  function setSearchValue(value: string) {
    setSearch(value);
    setPage(1);
  }

  function setTypeFilterValue(value: "Semua" | ReportType) {
    setTypeFilter(value);
    setPage(1);
  }

  function setStatusFilterValue(value: "Semua" | ReportStatus) {
    setStatusFilter(value);
    setPage(1);
  }

  function handleSortChange(value: SortKey) {
    if (value === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(value);
      setSortDirection("desc");
    }

    setPage(1);
  }

  function getDeliveryState(id: number) {
    return deliveryStates[id] ?? "idle";
  }

  async function sendReport(id: number) {
    if (
      !canSend ||
      sendingId !== null ||
      deletingId !== null ||
      confirmingDelete
    ) {
      return;
    }

    if (!whatsappConnected || !activeGroup) {
      showToast(
        "error",
        "WhatsApp belum siap",
        "Hubungkan WhatsApp dan pilih active group terlebih dahulu.",
      );

      return;
    }

    const report = reports.find((item) => item.id === id);

    if (!report) {
      return;
    }

    setSendingId(id);
    setMenuId(null);

    setDeliveryErrors((current) => ({
      ...current,
      [id]: undefined,
    }));

    setDeliveryStates((current) => ({
      ...current,
      [id]: "preparing",
    }));

    try {
      await simulateDelay(500);

      setDeliveryStates((current) => ({
        ...current,
        [id]: "sending",
      }));

      await simulateDelay(1200);

      setReports((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "Terkirim",
                target: activeGroup.name,
              }
            : item,
        ),
      );

      setDeliveryStates((current) => ({
        ...current,
        [id]: "sent",
      }));

      showToast(
        "success",
        "Laporan dikirim",
        `"${report.title}" dikirim ke ${activeGroup.name}.`,
      );
    } catch {
      const message = "Laporan gagal dikirim. Periksa koneksi lalu coba lagi.";

      setDeliveryStates((current) => ({
        ...current,
        [id]: "failed",
      }));

      setDeliveryErrors((current) => ({
        ...current,
        [id]: message,
      }));

      showToast("error", "Pengiriman gagal", message);
    } finally {
      setSendingId(null);
    }
  }

  async function deleteReport(id: number) {
    if (!canManage || deletingId !== null || sendingId !== null) {
      return;
    }

    const report = reports.find((item) => item.id === id);

    if (!report) {
      return;
    }

    setDeletingId(id);

    try {
      await simulateDelay(600);

      setReports((current) => current.filter((item) => item.id !== id));

      setDeliveryStates((current) => {
        const next = {
          ...current,
        };

        delete next[id];

        return next;
      });

      setDeliveryErrors((current) => {
        const next = {
          ...current,
        };

        delete next[id];

        return next;
      });

      setMenuId(null);

      showToast(
        "success",
        "Laporan dihapus",
        `"${report.title}" berhasil dihapus.`,
      );

      setPage((current) =>
        current > 1 && paginatedReports.length === 1 ? current - 1 : current,
      );
    } finally {
      setDeletingId(null);
    }
  }

  function requestDeleteReport(id: number) {
    if (!canManage || deletingId !== null || sendingId !== null) {
      return;
    }

    setMenuId(null);
    setConfirmDeleteId(id);
  }

  function closeDeleteDialog() {
    if (confirmingDelete) {
      return;
    }

    setConfirmDeleteId(null);
  }

  async function confirmDeleteReport() {
    if (confirmDeleteId === null || confirmingDelete || !canManage) {
      return;
    }

    setConfirmingDelete(true);

    try {
      await deleteReport(confirmDeleteId);

      setConfirmDeleteId(null);
    } finally {
      setConfirmingDelete(false);
    }
  }

  return {
    reports,
    sortedReports,
    paginatedReports,

    totalSent,
    totalScheduled,
    totalDraft,

    search,
    setSearchValue,

    typeFilter,
    setTypeFilterValue,

    statusFilter,
    setStatusFilterValue,

    sortKey,
    sortDirection,
    handleSortChange,

    page: safePage,
    totalPages,
    pageStart,
    pageEnd,

    setPage,

    hasActiveFilters,
    clearFilters,

    menuId,
    setMenuId,

    sendingId,
    deletingId,
    busy,

    getDeliveryState,
    deliveryErrors,

    sendReport,

    requestDeleteReport,
    reportToDelete,
    confirmingDelete,
    closeDeleteDialog,
    confirmDeleteReport,

    toast,
    setToast,

    canSend,
    canManage,

    whatsappConnected,
    activeGroup,
  };
}
