"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { useWorkspace } from "@/components/workspace/workspace-context";
import { simulateDelay } from "@/shared/utils/simulate-delay";

import { emptyDraft, initialSchedule } from "../data/initial-data";
import {
  formatTime,
  getDuration,
  getNextScheduleId,
  hasDuplicateActivity,
  hasOverlappingSchedule,
  isValidTime,
  normalizeTime,
  sortSchedule,
  toMinutes,
} from "../utils";
import type {
  DeleteTarget,
  DeliveryState,
  DraftState,
  ScheduleBlock,
  ToastState,
} from "../types";

export function useDailySchedule() {
  const { hasPermission } = useAuth();

  const { whatsappConnected, activeGroup } = useWorkspace();

  const canManage = hasPermission("daily-schedule.manage");

  const canSend = hasPermission("daily-schedule.send");

  const [schedule, setSchedule] = useState<ScheduleBlock[]>(initialSchedule);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [draft, setDraft] = useState<DraftState>(emptyDraft);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [draggedId, setDraggedId] = useState<number | null>(null);

  const [menuId, setMenuId] = useState<number | null>(null);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [deletingSelected, setDeletingSelected] = useState(false);

  const [duplicatingId, setDuplicatingId] = useState<number | null>(null);

  const [resetting, setResetting] = useState(false);

  const [exporting, setExporting] = useState(false);

  const [deliveryState, setDeliveryState] = useState<DeliveryState>("idle");

  const [deliveryError, setDeliveryError] = useState<string | null>(null);

  const [deliveryGateOpen, setDeliveryGateOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [toast, setToast] = useState<ToastState | null>(null);

  const sortedSchedule = useMemo(() => sortSchedule(schedule), [schedule]);

  const allSelected =
    schedule.length > 0 && selectedIds.length === schedule.length;

  const deliveryBusy =
    deliveryState === "preparing" || deliveryState === "sending";

  const totalDuration = useMemo(
    () =>
      schedule.reduce(
        (total, item) => total + (getDuration(item.start, item.end) ?? 0),
        0,
      ),
    [schedule],
  );

  const averageDuration =
    schedule.length > 0 ? Math.round(totalDuration / schedule.length) : 0;

  const canSendSchedule = canSend && schedule.length > 0;

  function showToast(type: ToastState["type"], title: string, message: string) {
    setToast({
      type,
      title,
      message,
    });
  }

  function clearToast() {
    setToast(null);
  }

  function openCreate() {
    if (!canManage || saving || resetting) {
      return;
    }

    setEditingId(null);
    setDraft(emptyDraft);
    setMenuId(null);
    setModalOpen(true);
  }

  function openEdit(item: ScheduleBlock) {
    if (!canManage || saving || resetting) {
      return;
    }

    setEditingId(item.id);

    setDraft({
      start: item.start,
      end: item.end,
      activity: item.activity,
    });

    setMenuId(null);
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditingId(null);
    setDraft(emptyDraft);
  }

  function handleDraftChange(field: keyof DraftState, value: string) {
    if (field === "start" || field === "end") {
      value = normalizeTime(value);
    }

    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveSchedule() {
    if (!canManage || saving) {
      return;
    }

    const activity = draft.activity.trim();

    if (!activity || !isValidTime(draft.start) || !isValidTime(draft.end)) {
      showToast(
        "error",
        "Data belum lengkap",
        "Lengkapi aktivitas dan waktu dengan format 24 jam.",
      );
      return;
    }

    const start = toMinutes(draft.start);
    const end = toMinutes(draft.end);

    if (start >= end) {
      showToast(
        "error",
        "Waktu tidak valid",
        "Waktu selesai harus setelah waktu mulai.",
      );
      return;
    }

    if (hasDuplicateActivity(schedule, activity, editingId)) {
      showToast(
        "error",
        "Aktivitas sudah ada",
        "Gunakan nama aktivitas yang berbeda.",
      );
      return;
    }

    if (hasOverlappingSchedule(schedule, start, end, editingId)) {
      showToast(
        "error",
        "Jadwal bertabrakan",
        "Gunakan waktu yang tidak bertabrakan dengan jadwal lain.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(700);

      if (editingId !== null) {
        setSchedule((current) =>
          current.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  start: draft.start,
                  end: draft.end,
                  activity,
                }
              : item,
          ),
        );

        showToast(
          "success",
          "Jadwal diperbarui",
          `"${activity}" berhasil diperbarui.`,
        );
      } else {
        const nextId = getNextScheduleId(schedule);

        setSchedule((current) => [
          ...current,
          {
            id: nextId,
            start: draft.start,
            end: draft.end,
            activity,
          },
        ]);

        showToast(
          "success",
          "Jadwal ditambahkan",
          `"${activity}" berhasil ditambahkan.`,
        );
      }

      closeModal();
    } finally {
      setSaving(false);
    }
  }

  function toggleSelected(id: number) {
    if (!canManage || deletingSelected || confirmingDelete) {
      return;
    }

    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleAll() {
    if (!canManage || deletingSelected || confirmingDelete) {
      return;
    }

    setSelectedIds(allSelected ? [] : schedule.map((item) => item.id));
  }

  function clearSelection() {
    if (deletingSelected || confirmingDelete) {
      return;
    }

    setSelectedIds([]);
  }

  async function deleteSelected() {
    if (!canManage || selectedIds.length === 0 || deletingSelected) {
      return;
    }

    const count = selectedIds.length;

    setDeletingSelected(true);

    try {
      await simulateDelay(700);

      setSchedule((current) =>
        current.filter((item) => !selectedIds.includes(item.id)),
      );

      setSelectedIds([]);

      showToast(
        "success",
        "Jadwal dihapus",
        `${count} jadwal berhasil dihapus.`,
      );
    } finally {
      setDeletingSelected(false);
    }
  }

  async function deleteItem(id: number) {
    if (!canManage || deletingId !== null) {
      return;
    }

    const item = schedule.find((entry) => entry.id === id);

    if (!item) {
      return;
    }

    setDeletingId(id);

    try {
      await simulateDelay(600);

      setSchedule((current) => current.filter((entry) => entry.id !== id));

      setSelectedIds((current) =>
        current.filter((selectedId) => selectedId !== id),
      );

      setMenuId(null);

      showToast(
        "success",
        "Jadwal dihapus",
        `"${item.activity}" berhasil dihapus.`,
      );
    } finally {
      setDeletingId(null);
    }
  }

  function requestDeleteItem(item: ScheduleBlock) {
    if (!canManage || deletingId !== null || deletingSelected) {
      return;
    }

    setMenuId(null);

    setDeleteTarget({
      type: "item",
      id: item.id,
      activity: item.activity,
    });
  }

  function requestDeleteSelected() {
    if (!canManage || selectedIds.length === 0 || deletingSelected) {
      return;
    }

    setDeleteTarget({
      type: "selected",
      count: selectedIds.length,
    });
  }

  function requestReset() {
    if (!canManage || resetting || schedule.length === 0) {
      return;
    }

    setDeleteTarget({
      type: "reset",
    });
  }

  function closeDeleteDialog() {
    if (confirmingDelete) {
      return;
    }

    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!canManage || !deleteTarget || confirmingDelete) {
      return;
    }

    setConfirmingDelete(true);

    try {
      if (deleteTarget.type === "item") {
        await deleteItem(deleteTarget.id);
      }

      if (deleteTarget.type === "selected") {
        await deleteSelected();
      }

      if (deleteTarget.type === "reset") {
        await resetSchedule();
      }

      setDeleteTarget(null);
    } finally {
      setConfirmingDelete(false);
    }
  }

  async function duplicateItem(item: ScheduleBlock) {
    if (!canManage || duplicatingId !== null) {
      return;
    }

    const start = toMinutes(item.start);
    const end = toMinutes(item.end);

    if (Number.isNaN(start) || Number.isNaN(end)) {
      return;
    }

    const duration = end - start;

    const newStart = end + 30;
    const newEnd = newStart + duration;

    if (newEnd > 24 * 60) {
      showToast(
        "error",
        "Tidak ada slot kosong",
        "Tidak cukup ruang untuk membuat duplikat.",
      );
      return;
    }

    const duplicatedStart = formatTime(newStart);

    const duplicatedEnd = formatTime(newEnd);

    const targetStart = toMinutes(duplicatedStart);

    const targetEnd = toMinutes(duplicatedEnd);

    if (hasOverlappingSchedule(schedule, targetStart, targetEnd)) {
      showToast(
        "error",
        "Slot bentrok",
        "Duplikat tidak dapat dibuat karena waktunya bertabrakan.",
      );
      return;
    }

    setDuplicatingId(item.id);

    try {
      await simulateDelay(600);

      const nextId = getNextScheduleId(schedule);

      setSchedule((current) => [
        ...current,
        {
          id: nextId,
          start: duplicatedStart,
          end: duplicatedEnd,
          activity: `${item.activity} (copy)`,
        },
      ]);

      setMenuId(null);

      showToast(
        "success",
        "Jadwal diduplikasi",
        `"${item.activity}" berhasil diduplikasi.`,
      );
    } finally {
      setDuplicatingId(null);
    }
  }

  function reorder(sourceId: number, targetId: number) {
    if (!canManage || sourceId === targetId) {
      setDraggedId(null);
      return;
    }

    const sourceIndex = schedule.findIndex((item) => item.id === sourceId);

    const targetIndex = schedule.findIndex((item) => item.id === targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
      setDraggedId(null);
      return;
    }

    const next = [...schedule];

    const [moved] = next.splice(sourceIndex, 1);

    if (!moved) {
      setDraggedId(null);
      return;
    }

    next.splice(targetIndex, 0, moved);

    setSchedule(next);
    setDraggedId(null);

    showToast(
      "success",
      "Urutan diperbarui",
      "Urutan Daily Schedule berhasil diperbarui.",
    );
  }

  function setDragged(id: number | null) {
    if (!canManage) {
      return;
    }

    setDraggedId(id);
  }

  async function resetSchedule() {
    if (!canManage || resetting) {
      return;
    }

    setResetting(true);

    try {
      await simulateDelay(700);

      setSchedule(initialSchedule);
      setSelectedIds([]);

      showToast(
        "success",
        "Schedule direset",
        "Daily Schedule kembali ke data awal.",
      );
    } finally {
      setResetting(false);
    }
  }

  async function exportSchedule() {
    if (schedule.length === 0 || exporting) {
      return;
    }

    setExporting(true);

    try {
      await simulateDelay(350);

      const content = sortedSchedule
        .map(
          (item, index) =>
            `${index + 1}. ${item.start} - ${item.end} | ${item.activity}`,
        )
        .join("\n");

      const blob = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = "dailywins-daily-schedule.txt";

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

      showToast(
        "success",
        "Export selesai",
        "Daily Schedule berhasil diexport.",
      );
    } finally {
      setExporting(false);
    }
  }

  async function requestSend() {
    if (!canSend || deliveryBusy) {
      return;
    }

    if (schedule.length === 0) {
      showToast(
        "error",
        "Schedule masih kosong",
        "Tambahkan minimal satu aktivitas.",
      );
      return;
    }

    if (!whatsappConnected || !activeGroup) {
      setDeliveryGateOpen(true);
      return;
    }

    setDeliveryGateOpen(false);
    setDeliveryError(null);
    setDeliveryState("preparing");

    try {
      await simulateDelay(500);

      setDeliveryState("sending");

      await simulateDelay(1200);

      setDeliveryState("sent");

      showToast(
        "success",
        "Berhasil dikirim",
        `Daily Schedule dikirim ke ${activeGroup.name}.`,
      );
    } catch {
      const message =
        "Daily Schedule gagal dikirim. Periksa koneksi lalu coba lagi.";

      setDeliveryState("failed");
      setDeliveryError(message);

      showToast("error", "Pengiriman gagal", message);
    }
  }

  function resetDeliveryState() {
    if (deliveryBusy) {
      return;
    }

    setDeliveryState("idle");
    setDeliveryError(null);
  }

  return {
    canManage,
    canSend,

    whatsappConnected,
    activeGroup,

    schedule,
    sortedSchedule,

    selectedIds,
    allSelected,

    draft,
    editingId,
    modalOpen,

    draggedId,
    menuId,

    saving,
    deletingId,
    deletingSelected,
    duplicatingId,
    resetting,
    exporting,

    deliveryState,
    deliveryBusy,
    deliveryError,
    deliveryGateOpen,

    deleteTarget,
    confirmingDelete,

    toast,

    totalDuration,
    averageDuration,
    canSendSchedule,

    openCreate,
    openEdit,
    closeModal,
    handleDraftChange,
    saveSchedule,

    toggleSelected,
    toggleAll,
    clearSelection,

    requestDeleteItem,
    requestDeleteSelected,
    requestReset,
    closeDeleteDialog,
    confirmDelete,

    duplicateItem,

    reorder,
    setDragged,
    setMenuId,

    resetSchedule,
    exportSchedule,

    requestSend,
    resetDeliveryState,

    setDeliveryGateOpen,

    clearToast,

    getDuration,
    showToast,
  };
}
