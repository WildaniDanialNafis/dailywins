"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { useWorkspace } from "@/components/workspace/workspace-context";

import { days, initialItems } from "../data/initial-data";
import type {
  DeleteTarget,
  DeliveryState,
  ToastState,
  WeekDay,
  WeeklyItem,
} from "../types";
import { getDayCounts, simulateDelay } from "../utils";

export function useSchedule() {
  const { hasPermission } = useAuth();

  const canManage = hasPermission("schedule.manage");
  const canSend = hasPermission("schedule.send");

  const { whatsappConnected, activeGroup } = useWorkspace();

  const [items, setItems] = useState<WeeklyItem[]>(initialItems);

  const [activeDay, setActiveDay] = useState<WeekDay>("Senin");

  const [newActivity, setNewActivity] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [editingName, setEditingName] = useState("");

  const [menuId, setMenuId] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [deliveryGateOpen, setDeliveryGateOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [duplicatingId, setDuplicatingId] = useState<number | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [deliveryState, setDeliveryState] = useState<DeliveryState>("idle");

  const [deliveryError, setDeliveryError] = useState<string | null>(null);

  const [toast, setToast] = useState<ToastState | null>(null);

  const counts = useMemo(() => getDayCounts(items, days), [items]);

  const currentItems = useMemo(
    () => items.filter((item) => item.day === activeDay),
    [activeDay, items],
  );

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return currentItems;
    }

    return currentItems.filter((item) =>
      item.activity.toLowerCase().includes(query),
    );
  }, [currentItems, search]);

  const activeDays = useMemo(
    () => days.filter((day) => counts[day] > 0).length,
    [counts],
  );

  const currentDayIndex = days.indexOf(activeDay);

  const deliveryBusy =
    deliveryState === "preparing" || deliveryState === "sending";

  const totalActivities = items.length;

  function showToast(type: ToastState["type"], title: string, message: string) {
    setToast({
      type,
      title,
      message,
    });
  }

  function selectDay(day: WeekDay) {
    setActiveDay(day);
    setSearch("");
    setEditingId(null);
    setEditingName("");
    setMenuId(null);
  }

  function moveDay(direction: -1 | 1) {
    const nextIndex = currentDayIndex + direction;

    if (nextIndex < 0 || nextIndex >= days.length) {
      return;
    }

    const nextDay = days[nextIndex];

    if (nextDay) {
      selectDay(nextDay);
    }
  }

  async function addActivity() {
    if (!canManage || saving) {
      return;
    }

    const value = newActivity.trim();

    if (!value) {
      showToast("error", "Data belum lengkap", "Nama aktivitas wajib diisi.");
      return;
    }

    const duplicate = items.some(
      (item) =>
        item.day === activeDay &&
        item.activity.toLowerCase() === value.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Aktivitas sudah ada",
        "Gunakan nama aktivitas yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(650);

      const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;

      setItems((current) => [
        ...current,
        {
          id: nextId,
          day: activeDay,
          activity: value,
        },
      ]);

      setNewActivity("");

      showToast(
        "success",
        "Aktivitas ditambahkan",
        `"${value}" ditambahkan ke ${activeDay}.`,
      );
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item: WeeklyItem) {
    if (!canManage) {
      return;
    }

    setEditingId(item.id);
    setEditingName(item.activity);
    setMenuId(null);
  }

  function cancelEdit() {
    if (saving) {
      return;
    }

    setEditingId(null);
    setEditingName("");
  }

  async function saveEdit() {
    if (!canManage || saving || editingId === null) {
      return;
    }

    const value = editingName.trim();

    if (!value) {
      showToast("error", "Data belum lengkap", "Nama aktivitas wajib diisi.");
      return;
    }

    const currentItem = items.find((item) => item.id === editingId);

    if (!currentItem) {
      return;
    }

    const duplicate = items.some(
      (item) =>
        item.id !== editingId &&
        item.day === currentItem.day &&
        item.activity.toLowerCase() === value.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Aktivitas sudah ada",
        "Gunakan nama aktivitas yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(650);

      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                activity: value,
              }
            : item,
        ),
      );

      cancelEdit();

      showToast(
        "success",
        "Aktivitas diperbarui",
        "Perubahan aktivitas berhasil disimpan.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(id: number) {
    if (!canManage || deletingId !== null) {
      return;
    }

    const item = items.find((entry) => entry.id === id);

    if (!item) {
      return;
    }

    setDeletingId(id);

    try {
      await simulateDelay(550);

      setItems((current) => current.filter((entry) => entry.id !== id));

      setMenuId(null);

      showToast(
        "success",
        "Aktivitas dihapus",
        `"${item.activity}" berhasil dihapus.`,
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function duplicateItem(item: WeeklyItem) {
    if (!canManage || duplicatingId !== null) {
      return;
    }

    const duplicateName = `${item.activity} (copy)`;

    const alreadyExists = items.some(
      (entry) =>
        entry.day === item.day &&
        entry.activity.toLowerCase() === duplicateName.toLowerCase(),
    );

    if (alreadyExists) {
      showToast(
        "error",
        "Duplikat sudah ada",
        "Aktivitas salinan tersebut sudah tersedia.",
      );
      return;
    }

    setDuplicatingId(item.id);

    try {
      await simulateDelay(500);

      const nextId = Math.max(0, ...items.map((entry) => entry.id)) + 1;

      setItems((current) => [
        ...current,
        {
          id: nextId,
          day: item.day,
          activity: duplicateName,
        },
      ]);

      setMenuId(null);

      showToast(
        "success",
        "Aktivitas diduplikasi",
        `"${item.activity}" berhasil diduplikasi.`,
      );
    } finally {
      setDuplicatingId(null);
    }
  }

  function requestDeleteItem(item: WeeklyItem) {
    if (!canManage) {
      return;
    }

    setMenuId(null);

    setDeleteTarget({
      id: item.id,
      activity: item.activity,
      day: item.day,
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
      await deleteItem(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setConfirmingDelete(false);
    }
  }

  async function requestSend() {
    if (!canSend || deliveryBusy) {
      return;
    }

    if (totalActivities === 0) {
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
        `Weekly Schedule dikirim ke ${activeGroup.name}.`,
      );
    } catch {
      const message =
        "Weekly Schedule gagal dikirim. Periksa koneksi lalu coba lagi.";

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

    items,
    days,
    counts,
    currentItems,
    visibleItems,
    activeDay,
    currentDayIndex,
    activeDays,
    totalActivities,

    newActivity,
    setNewActivity,

    editingId,
    editingName,
    setEditingName,

    menuId,
    setMenuId,

    search,
    setSearch,

    saving,
    deletingId,
    duplicatingId,

    deliveryGateOpen,
    setDeliveryGateOpen,

    deleteTarget,
    confirmingDelete,

    deliveryState,
    deliveryBusy,
    deliveryError,

    toast,
    setToast,

    selectDay,
    moveDay,

    addActivity,

    startEdit,
    cancelEdit,
    saveEdit,

    duplicateItem,
    requestDeleteItem,
    closeDeleteDialog,
    confirmDelete,

    requestSend,
    resetDeliveryState,
  };
}
