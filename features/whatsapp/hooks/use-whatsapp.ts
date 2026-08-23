"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import {
  defaultGroups,
  useWorkspace,
} from "@/components/workspace/workspace-context";

import { initialGroups } from "../data/initial-data";
import type { ConnectionState, ToastState } from "../types";
import { simulateDelay } from "../utils";

export function useWhatsApp() {
  const { hasPermission, user } = useAuth();

  const canManage = hasPermission("whatsapp.manage");

  const {
    whatsappConnected,
    activeGroupId,
    activeGroup,
    setWhatsAppConnected,
    setActiveGroupId,
  } = useWorkspace();

  const [scanning, setScanning] = useState(false);

  const [search, setSearch] = useState("");

  const [connecting, setConnecting] = useState(false);

  const [disconnecting, setDisconnecting] = useState(false);

  const [refreshingQr, setRefreshingQr] = useState(false);

  const [disconnectConfirmOpen, setDisconnectConfirmOpen] = useState(false);

  const [toast, setToast] = useState<ToastState | null>(null);

  const groups = defaultGroups?.length ? defaultGroups : initialGroups;

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return groups;
    }

    return groups.filter((group) => group.name.toLowerCase().includes(query));
  }, [groups, search]);

  const connectionState: ConnectionState = whatsappConnected
    ? "connected"
    : scanning
      ? "scanning"
      : "disconnected";

  const connected = whatsappConnected;

  const hasActiveGroup = connected && Boolean(activeGroup);

  function showToast(type: ToastState["type"], title: string, message: string) {
    setToast({
      type,
      title,
      message,
    });
  }

  async function startConnection() {
    if (!canManage || connecting || scanning) {
      return;
    }

    setConnecting(true);
    setScanning(true);

    try {
      await simulateDelay(450);

      showToast(
        "info",
        "QR siap dipindai",
        "Gunakan WhatsApp di ponsel untuk memindai QR code.",
      );
    } finally {
      setConnecting(false);
    }
  }

  function cancelConnection() {
    if (!canManage) {
      return;
    }

    setScanning(false);
    setConnecting(false);
    setRefreshingQr(false);

    showToast("info", "Koneksi dibatalkan", "WhatsApp belum terhubung.");
  }

  async function refreshQr() {
    if (!canManage || refreshingQr || connecting || !scanning) {
      return;
    }

    setRefreshingQr(true);

    try {
      await simulateDelay(550);

      showToast("info", "QR diperbarui", "QR code baru siap dipindai.");
    } finally {
      setRefreshingQr(false);
    }
  }

  async function simulateScan() {
    if (!canManage || connecting || refreshingQr || !scanning) {
      return;
    }

    setConnecting(true);

    try {
      await simulateDelay(950);

      setScanning(false);
      setWhatsAppConnected(true);

      showToast(
        "success",
        "WhatsApp terhubung",
        "Connection berhasil. Sekarang pilih active group.",
      );
    } finally {
      setConnecting(false);
    }
  }

  function requestDisconnect() {
    if (!canManage || disconnecting) {
      return;
    }

    setDisconnectConfirmOpen(true);
  }

  function closeDisconnectDialog() {
    if (disconnecting) {
      return;
    }

    setDisconnectConfirmOpen(false);
  }

  async function confirmDisconnect() {
    if (!canManage || disconnecting) {
      return;
    }

    setDisconnecting(true);

    try {
      await simulateDelay(750);

      setScanning(false);
      setWhatsAppConnected(false);
      setActiveGroupId(null);
      setDisconnectConfirmOpen(false);

      showToast(
        "success",
        "WhatsApp terputus",
        "Connection dan active group telah dilepas.",
      );
    } finally {
      setDisconnecting(false);
    }
  }

  function selectGroup(groupId: string) {
    if (!canManage || !connected) {
      return;
    }

    const group = groups.find((item) => item.id === groupId);

    if (!group) {
      return;
    }

    setActiveGroupId(groupId);

    showToast(
      "success",
      "Active group diperbarui",
      `"${group.name}" sekarang menjadi target delivery DailyWins.`,
    );
  }

  function clearSearch() {
    setSearch("");
  }

  return {
    user,
    canManage,

    connectionState,
    connected,
    hasActiveGroup,

    activeGroupId,
    activeGroup,

    search,
    setSearch,
    clearSearch,
    filteredGroups,

    scanning,
    connecting,
    disconnecting,
    refreshingQr,

    disconnectConfirmOpen,
    toast,
    setToast,

    startConnection,
    cancelConnection,
    refreshQr,
    simulateScan,
    requestDisconnect,
    closeDisconnectDialog,
    confirmDisconnect,
    selectGroup,
  };
}
