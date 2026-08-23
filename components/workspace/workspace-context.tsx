"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type WhatsAppGroup = {
  id: string;
  name: string;
  members: number;
};

export const defaultGroups: WhatsAppGroup[] = [
  {
    id: "120363001234567890@g.us",
    name: "LittleWins Team",
    members: 18,
  },
  {
    id: "120363009876543210@g.us",
    name: "Daily Progress",
    members: 27,
  },
  {
    id: "120363007654321098@g.us",
    name: "Personal Development",
    members: 12,
  },
  {
    id: "120363005555555555@g.us",
    name: "Productivity Circle",
    members: 34,
  },
];

type WorkspaceContextValue = {
  whatsappConnected: boolean;
  activeGroupId: string | null;
  activeGroup: WhatsAppGroup | null;
  groups: WhatsAppGroup[];
  setWhatsAppConnected: (connected: boolean) => void;
  setActiveGroupId: (groupId: string | null) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [whatsappConnected, setWhatsAppConnected] = useState(false);

  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  const activeGroup = useMemo(
    () => defaultGroups.find((group) => group.id === activeGroupId) ?? null,
    [activeGroupId],
  );

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      whatsappConnected,
      activeGroupId,
      activeGroup,
      groups: defaultGroups,
      setWhatsAppConnected,
      setActiveGroupId,
    }),
    [whatsappConnected, activeGroupId, activeGroup],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider.");
  }

  return context;
}
