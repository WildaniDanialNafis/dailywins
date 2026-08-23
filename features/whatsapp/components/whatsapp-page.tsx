"use client";

import { useMemo } from "react";

import { ReadOnlyBanner } from "@/components/auth/read-only-banner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { usePageLoading } from "@/components/ui/loading-state";
import { PageSkeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";

import { WhatsAppConnectedCard } from "./whatsapp-connected-card";
import { WhatsAppConnectionCard } from "./whatsapp-connection-card";
import { WhatsAppDeliveryReadiness } from "./whatsapp-delivery-readiness";
import { WhatsAppGroupSection } from "./whatsapp-group-section";
import { WhatsAppHeader } from "./whatsapp-header";
import { WhatsAppSetupProgress } from "./whatsapp-setup-progress";
import { useWhatsApp } from "../hooks/use-whatsapp";
import { getSetupProgress } from "../utils";

export function WhatsAppPage() {
  const pageLoading = usePageLoading();

  const whatsapp = useWhatsApp();

  const progress = useMemo(
    () =>
      getSetupProgress(
        whatsapp.connected,
        whatsapp.hasActiveGroup,
        whatsapp.connectionState,
      ),
    [whatsapp.connected, whatsapp.hasActiveGroup, whatsapp.connectionState],
  );

  if (pageLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-svh">
      <ConfirmDialog
        open={whatsapp.disconnectConfirmOpen}
        title="Putuskan WhatsApp?"
        description="Connection WhatsApp dan active group akan dilepas dari workspace ini."
        confirmLabel="Putuskan WhatsApp"
        loading={whatsapp.disconnecting}
        onCancel={whatsapp.closeDisconnectDialog}
        onConfirm={() => void whatsapp.confirmDisconnect()}
      />

      <Toast
        open={Boolean(whatsapp.toast)}
        type={whatsapp.toast?.type}
        title={whatsapp.toast?.title}
        message={whatsapp.toast?.message ?? ""}
        onClose={() => whatsapp.setToast(null)}
      />

      <div className="mx-auto w-full max-w-330 px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <WhatsAppHeader
          connected={whatsapp.connected}
          canManage={whatsapp.canManage}
          disconnecting={whatsapp.disconnecting}
          onDisconnect={whatsapp.requestDisconnect}
        />

        <ReadOnlyBanner />

        <WhatsAppSetupProgress
          connected={whatsapp.connected}
          hasActiveGroup={whatsapp.hasActiveGroup}
          progress={progress}
        />

        {!whatsapp.connected && (
          <WhatsAppConnectionCard
            canManage={whatsapp.canManage}
            role={whatsapp.user?.role ?? "viewer"}
            connectionState={
              whatsapp.connectionState === "scanning"
                ? "scanning"
                : "disconnected"
            }
            connecting={whatsapp.connecting}
            refreshingQr={whatsapp.refreshingQr}
            onConnect={() => void whatsapp.startConnection()}
            onRefreshQr={() => void whatsapp.refreshQr()}
            onSimulateScan={() => void whatsapp.simulateScan()}
            onCancel={whatsapp.cancelConnection}
          />
        )}

        {whatsapp.connected && (
          <>
            <section className="mb-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <WhatsAppConnectedCard
                activeGroupName={whatsapp.activeGroup?.name}
              />

              <WhatsAppDeliveryReadiness
                hasActiveGroup={whatsapp.hasActiveGroup}
                activeGroupName={whatsapp.activeGroup?.name}
                progress={progress}
              />
            </section>

            <WhatsAppGroupSection
              canManage={whatsapp.canManage}
              activeGroupId={whatsapp.activeGroupId}
              activeGroup={whatsapp.activeGroup}
              filteredGroups={whatsapp.filteredGroups}
              search={whatsapp.search}
              disconnecting={whatsapp.disconnecting}
              onSearchChange={whatsapp.setSearch}
              onClearSearch={whatsapp.clearSearch}
              onSelectGroup={whatsapp.selectGroup}
            />
          </>
        )}

        <footer className="mt-8 border-t border-slate-200/80 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DailyWins. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
