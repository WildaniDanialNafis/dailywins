"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { useWorkspace } from "@/components/workspace/workspace-context";
import { simulateDelay } from "@/shared/utils/simulate-delay";

import { initialCategories, initialEvaluation } from "../data/initial-data";
import {
  createActivityLookup,
  filterCategories,
  getEvaluationPreview,
  getNextActivityId,
  getNextNumericId,
} from "../utils";
import type {
  Activity,
  Category,
  DeleteTarget,
  DeliveryState,
  EvaluationItem,
  ToastState,
} from "../types";

export function useEvaluasi() {
  const { hasPermission } = useAuth();

  const { whatsappConnected, activeGroup } = useWorkspace();

  const canManage = hasPermission("evaluasi.manage");
  const canSend = hasPermission("evaluasi.send");

  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const [evaluationItems, setEvaluationItems] =
    useState<EvaluationItem[]>(initialEvaluation);

  const [search, setSearch] = useState("");

  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<number>>(
    new Set([1]),
  );

  const [newCategoryName, setNewCategoryName] = useState("");

  const [newActivityName, setNewActivityName] = useState("");

  const [activityCategoryId, setActivityCategoryId] = useState<number | null>(
    1,
  );

  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );

  const [editingCategoryName, setEditingCategoryName] = useState("");

  const [editingActivityId, setEditingActivityId] = useState<number | null>(
    null,
  );

  const [editingActivityName, setEditingActivityName] = useState("");

  const [categoryMenuId, setCategoryMenuId] = useState<number | null>(null);

  const [draggedEvaluationId, setDraggedEvaluationId] = useState<number | null>(
    null,
  );

  const [deliveryGateOpen, setDeliveryGateOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(
    null,
  );

  const [deletingActivityId, setDeletingActivityId] = useState<number | null>(
    null,
  );

  const [removingEvaluationId, setRemovingEvaluationId] = useState<
    number | null
  >(null);

  const [deliveryState, setDeliveryState] = useState<DeliveryState>("idle");

  const [deliveryError, setDeliveryError] = useState<string | null>(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const [toast, setToast] = useState<ToastState | null>(null);

  const filteredCategories = useMemo(
    () => filterCategories(categories, search),
    [categories, search],
  );

  const activityLookup = useMemo(
    () => createActivityLookup(categories),
    [categories],
  );

  const totalActivities = useMemo(
    () =>
      categories.reduce(
        (total, category) => total + category.activities.length,
        0,
      ),
    [categories],
  );

  const evaluationPreview = useMemo(
    () => getEvaluationPreview(evaluationItems, activityLookup),
    [evaluationItems, activityLookup],
  );

  const selectedActivityIds = useMemo(
    () => new Set(evaluationItems.map((item) => item.activityId)),
    [evaluationItems],
  );

  const selectedCategoryCount = useMemo(
    () =>
      categories.reduce((count, category) => {
        const hasSelection = category.activities.some((activity) =>
          selectedActivityIds.has(activity.id),
        );

        return count + (hasSelection ? 1 : 0);
      }, 0),
    [categories, selectedActivityIds],
  );

  const searchActive = search.trim().length > 0;
  const libraryIsEmpty = categories.length === 0;

  const searchHasNoResults =
    !libraryIsEmpty && searchActive && filteredCategories.length === 0;

  const deliveryBusy =
    deliveryState === "preparing" || deliveryState === "sending";

  const readyForSend = evaluationPreview.length > 0;

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

  function toggleCategory(categoryId: number) {
    setExpandedCategoryIds((current) => {
      const next = new Set(current);

      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }

      return next;
    });

    setActivityCategoryId(categoryId);
    setCategoryMenuId(null);
  }

  function expandAll() {
    setExpandedCategoryIds(
      new Set(filteredCategories.map((category) => category.id)),
    );
  }

  function collapseAll() {
    setExpandedCategoryIds(new Set());
  }

  function isInEvaluation(activityId: number) {
    return selectedActivityIds.has(activityId);
  }

  async function addToEvaluation(activityId: number) {
    if (!canManage || saving || isInEvaluation(activityId)) {
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(450);

      const nextId = getNextNumericId(evaluationItems.map((item) => item.id));

      setEvaluationItems((current) => [
        ...current,
        {
          id: nextId,
          activityId,
        },
      ]);

      showToast(
        "success",
        "Kegiatan ditambahkan",
        "Kegiatan masuk ke susunan evaluasi.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeFromEvaluation(id: number) {
    if (!canManage || removingEvaluationId !== null) {
      return;
    }

    setRemovingEvaluationId(id);

    try {
      await simulateDelay(400);

      setEvaluationItems((current) => current.filter((item) => item.id !== id));

      showToast(
        "success",
        "Kegiatan dihapus",
        "Kegiatan dikeluarkan dari susunan evaluasi.",
      );
    } finally {
      setRemovingEvaluationId(null);
    }
  }

  function reorderEvaluation(targetId: number) {
    if (!canManage) {
      setDraggedEvaluationId(null);
      return;
    }

    if (draggedEvaluationId === null || draggedEvaluationId === targetId) {
      setDraggedEvaluationId(null);
      return;
    }

    const sourceIndex = evaluationItems.findIndex(
      (item) => item.id === draggedEvaluationId,
    );

    const targetIndex = evaluationItems.findIndex(
      (item) => item.id === targetId,
    );

    if (sourceIndex < 0 || targetIndex < 0) {
      setDraggedEvaluationId(null);
      return;
    }

    const next = [...evaluationItems];

    const [moved] = next.splice(sourceIndex, 1);

    if (!moved) {
      setDraggedEvaluationId(null);
      return;
    }

    next.splice(targetIndex, 0, moved);

    setEvaluationItems(next);
    setDraggedEvaluationId(null);

    showToast(
      "success",
      "Urutan diperbarui",
      "Susunan evaluasi berhasil diperbarui.",
    );
  }

  async function addCategory() {
    if (!canManage || saving) {
      return;
    }

    const name = newCategoryName.trim();

    if (!name) {
      showToast("error", "Data belum lengkap", "Nama kategori wajib diisi.");
      return;
    }

    const duplicate = categories.some(
      (category) => category.name.toLowerCase() === name.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Kategori sudah ada",
        "Gunakan nama kategori yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(600);

      const nextId = getNextNumericId(
        categories.map((category) => category.id),
      );

      setCategories((current) => [
        ...current,
        {
          id: nextId,
          name,
          activities: [],
        },
      ]);

      setExpandedCategoryIds((current) => {
        const next = new Set(current);
        next.add(nextId);
        return next;
      });

      setActivityCategoryId(nextId);
      setNewCategoryName("");

      showToast(
        "success",
        "Kategori dibuat",
        `"${name}" berhasil ditambahkan.`,
      );
    } finally {
      setSaving(false);
    }
  }

  function startEditCategory(category: Category) {
    if (!canManage) {
      return;
    }

    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
    setCategoryMenuId(null);
  }

  function cancelEditCategory() {
    if (saving) {
      return;
    }

    setEditingCategoryId(null);
    setEditingCategoryName("");
  }

  async function saveCategory() {
    if (!canManage || saving || editingCategoryId === null) {
      return;
    }

    const name = editingCategoryName.trim();

    if (!name) {
      showToast("error", "Data belum lengkap", "Nama kategori wajib diisi.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.id !== editingCategoryId &&
        category.name.toLowerCase() === name.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Kategori sudah ada",
        "Gunakan nama kategori yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(600);

      setCategories((current) =>
        current.map((category) =>
          category.id === editingCategoryId
            ? {
                ...category,
                name,
              }
            : category,
        ),
      );

      cancelEditCategory();

      showToast(
        "success",
        "Kategori diperbarui",
        "Perubahan kategori berhasil disimpan.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id: number) {
    if (!canManage || deletingCategoryId !== null) {
      return;
    }

    const category = categories.find((item) => item.id === id);

    if (!category) {
      return;
    }

    setDeletingCategoryId(id);

    try {
      await simulateDelay(500);

      const activityIds = new Set(
        category.activities.map((activity) => activity.id),
      );

      const remainingCategories = categories.filter((item) => item.id !== id);

      setCategories(remainingCategories);

      setEvaluationItems((current) =>
        current.filter((item) => !activityIds.has(item.activityId)),
      );

      setExpandedCategoryIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });

      if (activityCategoryId === id) {
        setActivityCategoryId(remainingCategories[0]?.id ?? null);
      }

      setCategoryMenuId(null);

      showToast(
        "success",
        "Kategori dihapus",
        `"${category.name}" berhasil dihapus.`,
      );
    } finally {
      setDeletingCategoryId(null);
    }
  }

  function startEditActivity(activity: Activity) {
    if (!canManage) {
      return;
    }

    setEditingActivityId(activity.id);
    setEditingActivityName(activity.name);
  }

  function cancelEditActivity() {
    if (saving) {
      return;
    }

    setEditingActivityId(null);
    setEditingActivityName("");
  }

  async function addActivity() {
    if (!canManage || saving || activityCategoryId === null) {
      return;
    }

    const name = newActivityName.trim();

    if (!name) {
      showToast("error", "Data belum lengkap", "Nama kegiatan wajib diisi.");
      return;
    }

    const duplicate = categories.some((category) =>
      category.activities.some(
        (activity) => activity.name.toLowerCase() === name.toLowerCase(),
      ),
    );

    if (duplicate) {
      showToast(
        "error",
        "Kegiatan sudah ada",
        "Gunakan nama kegiatan yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(600);

      const nextId = getNextActivityId(categories);

      setCategories((current) =>
        current.map((category) =>
          category.id === activityCategoryId
            ? {
                ...category,
                activities: [
                  ...category.activities,
                  {
                    id: nextId,
                    name,
                  },
                ],
              }
            : category,
        ),
      );

      setExpandedCategoryIds((current) => {
        const next = new Set(current);
        next.add(activityCategoryId);
        return next;
      });

      setNewActivityName("");

      showToast(
        "success",
        "Kegiatan ditambahkan",
        `"${name}" berhasil ditambahkan.`,
      );
    } finally {
      setSaving(false);
    }
  }

  async function saveActivity(activityId: number) {
    if (!canManage || saving) {
      return;
    }

    const name = editingActivityName.trim();

    if (!name) {
      showToast("error", "Data belum lengkap", "Nama kegiatan wajib diisi.");
      return;
    }

    const duplicate = categories.some((category) =>
      category.activities.some(
        (activity) =>
          activity.id !== activityId &&
          activity.name.toLowerCase() === name.toLowerCase(),
      ),
    );

    if (duplicate) {
      showToast(
        "error",
        "Kegiatan sudah ada",
        "Gunakan nama kegiatan yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(600);

      setCategories((current) =>
        current.map((category) => ({
          ...category,
          activities: category.activities.map((activity) =>
            activity.id === activityId
              ? {
                  ...activity,
                  name,
                }
              : activity,
          ),
        })),
      );

      cancelEditActivity();

      showToast(
        "success",
        "Kegiatan diperbarui",
        "Perubahan kegiatan berhasil disimpan.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteActivity(activityId: number) {
    if (!canManage || deletingActivityId !== null) {
      return;
    }

    setDeletingActivityId(activityId);

    try {
      await simulateDelay(500);

      setCategories((current) =>
        current.map((category) => ({
          ...category,
          activities: category.activities.filter(
            (activity) => activity.id !== activityId,
          ),
        })),
      );

      setEvaluationItems((current) =>
        current.filter((item) => item.activityId !== activityId),
      );

      showToast("success", "Kegiatan dihapus", "Kegiatan berhasil dihapus.");
    } finally {
      setDeletingActivityId(null);
    }
  }

  function requestDeleteCategory(category: Category) {
    if (!canManage) {
      return;
    }

    setCategoryMenuId(null);

    setDeleteTarget({
      type: "category",
      id: category.id,
      label: category.name,
    });
  }

  function requestDeleteActivity(activity: Activity) {
    if (!canManage) {
      return;
    }

    setDeleteTarget({
      type: "activity",
      id: activity.id,
      label: activity.name,
    });
  }

  function requestRemoveEvaluation(item: EvaluationItem) {
    if (!canManage) {
      return;
    }

    const lookup = activityLookup.get(item.activityId);

    setDeleteTarget({
      type: "evaluation",
      id: item.id,
      label: lookup?.activity.name ?? "Kegiatan ini",
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
      if (deleteTarget.type === "category") {
        await deleteCategory(deleteTarget.id);
      }

      if (deleteTarget.type === "activity") {
        await deleteActivity(deleteTarget.id);
      }

      if (deleteTarget.type === "evaluation") {
        await removeFromEvaluation(deleteTarget.id);
      }

      setDeleteTarget(null);
    } finally {
      setConfirmingDelete(false);
    }
  }

  async function requestSend() {
    if (!canSend || deliveryBusy) {
      return;
    }

    if (!readyForSend) {
      showToast(
        "error",
        "Evaluasi masih kosong",
        "Tambahkan minimal satu kegiatan terlebih dahulu.",
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

      await simulateDelay(1100);

      setDeliveryState("sent");

      showToast(
        "success",
        "Berhasil dikirim",
        `Evaluasi dikirim ke ${activeGroup.name}.`,
      );
    } catch {
      const message = "Evaluasi gagal dikirim. Periksa koneksi lalu coba lagi.";

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

  function scrollToLibrary() {
    document.getElementById("activity-library")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return {
    canManage,
    canSend,

    whatsappConnected,
    activeGroup,

    categories,
    evaluationItems,

    search,
    setSearch,

    filteredCategories,
    totalActivities,
    evaluationPreview,
    selectedActivityIds,
    selectedCategoryCount,

    searchActive,
    libraryIsEmpty,
    searchHasNoResults,
    readyForSend,

    expandedCategoryIds,
    activityCategoryId,
    setActivityCategoryId,

    newCategoryName,
    setNewCategoryName,

    newActivityName,
    setNewActivityName,

    editingCategoryId,
    editingCategoryName,
    setEditingCategoryName,

    editingActivityId,
    editingActivityName,
    setEditingActivityName,

    categoryMenuId,
    setCategoryMenuId,

    draggedEvaluationId,
    setDraggedEvaluationId,

    saving,
    deletingCategoryId,
    deletingActivityId,
    removingEvaluationId,

    deliveryState,
    deliveryBusy,
    deliveryError,

    deliveryGateOpen,
    setDeliveryGateOpen,

    deleteTarget,
    confirmingDelete,

    toast,
    clearToast,

    toggleCategory,
    expandAll,
    collapseAll,

    isInEvaluation,
    addToEvaluation,
    removeFromEvaluation,
    reorderEvaluation,

    addCategory,
    startEditCategory,
    cancelEditCategory,
    saveCategory,
    deleteCategory,

    startEditActivity,
    cancelEditActivity,
    addActivity,
    saveActivity,
    deleteActivity,

    requestDeleteCategory,
    requestDeleteActivity,
    requestRemoveEvaluation,

    closeDeleteDialog,
    confirmDelete,

    requestSend,
    resetDeliveryState,
    scrollToLibrary,
  };
}
