"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { useWorkspace } from "@/components/workspace/workspace-context";
import { simulateDelay } from "@/shared/utils/simulate-delay";

import { initialPollings } from "../data/initial-data";
import {
  filterPollings,
  getDeliveredCount,
  getNextPollingId,
  getSendingCount,
  getTotalOptions,
  isPollingReady,
} from "../utils";
import type {
  DeleteTarget,
  DeletingOption,
  DeliveryState,
  EditingOption,
  Polling,
  ToastState,
} from "../types";

export function usePolling() {
  const { hasPermission } = useAuth();

  const { whatsappConnected, activeGroup } = useWorkspace();

  const canManage = hasPermission("polling.manage");
  const canSend = hasPermission("polling.send");

  const [pollings, setPollings] = useState<Polling[]>(initialPollings);

  const [search, setSearch] = useState("");

  const [newTitle, setNewTitle] = useState("");

  const [selectedPollingId, setSelectedPollingId] = useState<number | null>(1);

  const [newOption, setNewOption] = useState("");

  const [editingPollingId, setEditingPollingId] = useState<number | null>(null);

  const [editingTitle, setEditingTitle] = useState("");

  const [editingOption, setEditingOption] = useState<EditingOption>(null);

  const [editingOptionValue, setEditingOptionValue] = useState("");

  const [menuPollingId, setMenuPollingId] = useState<number | null>(null);

  const [deliveryGateOpen, setDeliveryGateOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [deletingPollingId, setDeletingPollingId] = useState<number | null>(
    null,
  );

  const [deletingOption, setDeletingOption] = useState<DeletingOption>(null);

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const [deliveryStates, setDeliveryStates] = useState<
    Record<number, DeliveryState>
  >({});

  const [deliveryErrors, setDeliveryErrors] = useState<Record<number, string>>(
    {},
  );

  const [sendingAll, setSendingAll] = useState(false);

  const [sendingAllProgress, setSendingAllProgress] = useState(0);

  const [sendingAllTotal, setSendingAllTotal] = useState(0);

  const [toast, setToast] = useState<ToastState | null>(null);

  const filteredPollings = useMemo(
    () => filterPollings(pollings, search),
    [pollings, search],
  );

  const readyPollings = useMemo(
    () => pollings.filter(isPollingReady),
    [pollings],
  );

  const totalOptions = useMemo(() => getTotalOptions(pollings), [pollings]);

  const sendingPollings = useMemo(
    () => getSendingCount(pollings, deliveryStates),
    [pollings, deliveryStates],
  );

  const deliveredPollings = useMemo(
    () => getDeliveredCount(pollings, deliveryStates),
    [pollings, deliveryStates],
  );

  const searchActive = search.trim().length > 0;

  const libraryIsEmpty = pollings.length === 0;

  const searchHasNoResults =
    !libraryIsEmpty && searchActive && filteredPollings.length === 0;

  const sendingAllActive = sendingAll && sendingAllTotal > 0;

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

  function getDeliveryState(pollingId: number): DeliveryState {
    return deliveryStates[pollingId] ?? "idle";
  }

  function getDeliveryError(pollingId: number) {
    return deliveryErrors[pollingId];
  }

  function setPollingDeliveryState(pollingId: number, state: DeliveryState) {
    setDeliveryStates((current) => ({
      ...current,
      [pollingId]: state,
    }));
  }

  function setPollingDeliveryError(pollingId: number, message: string | null) {
    setDeliveryErrors((current) => {
      const next = {
        ...current,
      };

      if (message) {
        next[pollingId] = message;
      } else {
        delete next[pollingId];
      }

      return next;
    });
  }

  function selectPolling(id: number) {
    setSelectedPollingId((current) => (current === id ? null : id));

    setMenuPollingId(null);
  }

  function clearSearch() {
    setSearch("");
  }

  function createFromEmpty() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function addPolling() {
    if (!canManage || saving) {
      return;
    }

    const title = newTitle.trim();

    if (!title) {
      showToast(
        "error",
        "Data belum lengkap",
        "Pertanyaan polling wajib diisi.",
      );
      return;
    }

    const duplicate = pollings.some(
      (polling) => polling.title.toLowerCase() === title.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Polling sudah ada",
        "Gunakan pertanyaan yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(700);

      const nextId = getNextPollingId(pollings);

      setPollings((current) => [
        {
          id: nextId,
          title,
          options: [],
        },
        ...current,
      ]);

      setNewTitle("");
      setSelectedPollingId(nextId);

      showToast(
        "success",
        "Polling dibuat",
        `"${title}" berhasil ditambahkan.`,
      );
    } finally {
      setSaving(false);
    }
  }

  async function addOption() {
    if (!canManage || saving || selectedPollingId === null) {
      return;
    }

    const option = newOption.trim();

    if (!option) {
      showToast(
        "error",
        "Data belum lengkap",
        "Isi pilihan jawaban terlebih dahulu.",
      );
      return;
    }

    const polling = pollings.find((item) => item.id === selectedPollingId);

    if (!polling) {
      return;
    }

    const duplicate = polling.options.some(
      (item) => item.toLowerCase() === option.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Opsi sudah ada",
        "Gunakan pilihan jawaban yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(600);

      setPollings((current) =>
        current.map((item) =>
          item.id === selectedPollingId
            ? {
                ...item,
                options: [...item.options, option],
              }
            : item,
        ),
      );

      setNewOption("");

      showToast(
        "success",
        "Opsi ditambahkan",
        `"${option}" berhasil ditambahkan.`,
      );
    } finally {
      setSaving(false);
    }
  }

  function startEditPolling(polling: Polling) {
    if (!canManage) {
      return;
    }

    setEditingPollingId(polling.id);
    setEditingTitle(polling.title);
    setMenuPollingId(null);
  }

  function cancelEditPolling() {
    if (saving) {
      return;
    }

    setEditingPollingId(null);
    setEditingTitle("");
  }

  async function savePollingTitle() {
    if (!canManage || saving || editingPollingId === null) {
      return;
    }

    const title = editingTitle.trim();

    if (!title) {
      showToast(
        "error",
        "Data belum lengkap",
        "Pertanyaan polling wajib diisi.",
      );
      return;
    }

    const duplicate = pollings.some(
      (polling) =>
        polling.id !== editingPollingId &&
        polling.title.toLowerCase() === title.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Polling sudah ada",
        "Gunakan pertanyaan yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(700);

      setPollings((current) =>
        current.map((polling) =>
          polling.id === editingPollingId
            ? {
                ...polling,
                title,
              }
            : polling,
        ),
      );

      cancelEditPolling();

      showToast(
        "success",
        "Pertanyaan diperbarui",
        "Perubahan pertanyaan berhasil disimpan.",
      );
    } finally {
      setSaving(false);
    }
  }

  function startEditOption(pollingId: number, index: number, value: string) {
    if (!canManage) {
      return;
    }

    setEditingOption({
      pollingId,
      index,
    });

    setEditingOptionValue(value);
    setMenuPollingId(null);
  }

  function cancelEditOption() {
    if (saving) {
      return;
    }

    setEditingOption(null);
    setEditingOptionValue("");
  }

  async function saveOption() {
    if (!canManage || saving || !editingOption) {
      return;
    }

    const value = editingOptionValue.trim();

    if (!value) {
      showToast(
        "error",
        "Data belum lengkap",
        "Isi pilihan jawaban terlebih dahulu.",
      );
      return;
    }

    const polling = pollings.find(
      (item) => item.id === editingOption.pollingId,
    );

    if (!polling) {
      return;
    }

    const duplicate = polling.options.some(
      (option, index) =>
        index !== editingOption.index &&
        option.toLowerCase() === value.toLowerCase(),
    );

    if (duplicate) {
      showToast(
        "error",
        "Opsi sudah ada",
        "Gunakan pilihan jawaban yang berbeda.",
      );
      return;
    }

    setSaving(true);

    try {
      await simulateDelay(650);

      setPollings((current) =>
        current.map((item) =>
          item.id === editingOption.pollingId
            ? {
                ...item,
                options: item.options.map((option, index) =>
                  index === editingOption.index ? value : option,
                ),
              }
            : item,
        ),
      );

      cancelEditOption();

      showToast(
        "success",
        "Opsi diperbarui",
        "Perubahan pilihan jawaban berhasil disimpan.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteOption(pollingId: number, optionIndex: number) {
    if (!canManage || deletingOption !== null) {
      return;
    }

    setDeletingOption({
      pollingId,
      index: optionIndex,
    });

    try {
      await simulateDelay(600);

      setPollings((current) =>
        current.map((polling) =>
          polling.id === pollingId
            ? {
                ...polling,
                options: polling.options.filter(
                  (_, index) => index !== optionIndex,
                ),
              }
            : polling,
        ),
      );

      if (
        editingOption?.pollingId === pollingId &&
        editingOption.index === optionIndex
      ) {
        cancelEditOption();
      }

      showToast("success", "Opsi dihapus", "Pilihan jawaban berhasil dihapus.");
    } finally {
      setDeletingOption(null);
    }
  }

  async function deletePolling(id: number) {
    if (!canManage || deletingPollingId !== null) {
      return;
    }

    const polling = pollings.find((item) => item.id === id);

    if (!polling) {
      return;
    }

    setDeletingPollingId(id);

    try {
      await simulateDelay(600);

      const remaining = pollings.filter((item) => item.id !== id);

      setPollings(remaining);

      setSelectedPollingId((current) =>
        current === id ? (remaining[0]?.id ?? null) : current,
      );

      setMenuPollingId(null);

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

      if (editingOption?.pollingId === id) {
        cancelEditOption();
      }

      if (editingPollingId === id) {
        cancelEditPolling();
      }

      showToast(
        "success",
        "Polling dihapus",
        `"${polling.title}" berhasil dihapus.`,
      );
    } finally {
      setDeletingPollingId(null);
    }
  }

  function requestDeletePolling(polling: Polling) {
    if (!canManage) {
      return;
    }

    setMenuPollingId(null);

    setDeleteTarget({
      type: "polling",
      pollingId: polling.id,
      label: polling.title,
    });
  }

  function requestDeleteOption(
    pollingId: number,
    optionIndex: number,
    option: string,
  ) {
    if (!canManage) {
      return;
    }

    setDeleteTarget({
      type: "option",
      pollingId,
      optionIndex,
      label: option,
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
      if (deleteTarget.type === "polling") {
        await deletePolling(deleteTarget.pollingId);
      }

      if (deleteTarget.type === "option") {
        await deleteOption(deleteTarget.pollingId, deleteTarget.optionIndex);
      }

      setDeleteTarget(null);
    } finally {
      setConfirmingDelete(false);
    }
  }

  async function requestSend(polling: Polling) {
    const state = getDeliveryState(polling.id);

    if (
      !canSend ||
      state === "preparing" ||
      state === "sending" ||
      sendingAll
    ) {
      return;
    }

    if (!isPollingReady(polling)) {
      showToast(
        "error",
        "Polling belum siap",
        "Tambahkan minimal 2 opsi sebelum mengirim.",
      );
      return;
    }

    if (!whatsappConnected || !activeGroup) {
      setDeliveryGateOpen(true);
      return;
    }

    setDeliveryGateOpen(false);

    setPollingDeliveryError(polling.id, null);
    setPollingDeliveryState(polling.id, "preparing");

    try {
      await simulateDelay(500);

      setPollingDeliveryState(polling.id, "sending");

      await simulateDelay(1200);

      setPollingDeliveryState(polling.id, "sent");

      showToast(
        "success",
        "Berhasil dikirim",
        `"${polling.title}" dikirim ke ${activeGroup.name}.`,
      );
    } catch {
      const message = "Polling gagal dikirim. Periksa koneksi lalu coba lagi.";

      setPollingDeliveryState(polling.id, "failed");

      setPollingDeliveryError(polling.id, message);

      showToast("error", "Pengiriman gagal", message);
    }
  }

  async function requestSendAll() {
    if (
      !canSend ||
      sendingAll ||
      readyPollings.length === 0 ||
      sendingPollings > 0
    ) {
      return;
    }

    if (!whatsappConnected || !activeGroup) {
      setDeliveryGateOpen(true);
      return;
    }

    setDeliveryGateOpen(false);

    setSendingAll(true);
    setSendingAllProgress(0);
    setSendingAllTotal(readyPollings.length);

    try {
      for (let index = 0; index < readyPollings.length; index += 1) {
        const polling = readyPollings[index];

        if (!polling) {
          continue;
        }

        setPollingDeliveryError(polling.id, null);

        setPollingDeliveryState(polling.id, "preparing");

        await simulateDelay(350);

        setPollingDeliveryState(polling.id, "sending");

        await simulateDelay(800);

        setPollingDeliveryState(polling.id, "sent");

        setSendingAllProgress(index + 1);
      }

      showToast(
        "success",
        `${readyPollings.length} polling berhasil dikirim`,
        `Semua polling dikirim ke ${activeGroup.name}.`,
      );
    } finally {
      setSendingAll(false);
    }
  }

  function resetDelivery(pollingId: number) {
    const state = getDeliveryState(pollingId);

    if (state === "preparing" || state === "sending" || sendingAll) {
      return;
    }

    setPollingDeliveryState(pollingId, "idle");

    setPollingDeliveryError(pollingId, null);
  }

  return {
    canManage,
    canSend,

    whatsappConnected,
    activeGroup,

    pollings,
    filteredPollings,
    readyPollings,

    search,
    setSearch,
    searchActive,
    libraryIsEmpty,
    searchHasNoResults,

    newTitle,
    setNewTitle,

    selectedPollingId,
    setSelectedPollingId,

    newOption,
    setNewOption,

    editingPollingId,
    editingTitle,
    setEditingTitle,

    editingOption,
    editingOptionValue,
    setEditingOptionValue,

    menuPollingId,
    setMenuPollingId,

    saving,
    deletingPollingId,
    deletingOption,

    deleteTarget,
    confirmingDelete,

    deliveryStates,
    deliveryErrors,

    sendingAll,
    sendingAllActive,
    sendingAllProgress,
    sendingAllTotal,

    sendingPollings,
    deliveredPollings,
    totalOptions,

    deliveryGateOpen,
    setDeliveryGateOpen,

    toast,
    clearToast,

    getDeliveryState,
    getDeliveryError,

    selectPolling,
    clearSearch,
    createFromEmpty,

    addPolling,
    addOption,

    startEditPolling,
    cancelEditPolling,
    savePollingTitle,

    startEditOption,
    cancelEditOption,
    saveOption,

    deleteOption,
    deletePolling,

    requestDeletePolling,
    requestDeleteOption,

    closeDeleteDialog,
    confirmDelete,

    requestSend,
    requestSendAll,
    resetDelivery,
  };
}
