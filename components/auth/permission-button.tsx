"use client";

import type { ButtonHTMLAttributes } from "react";

import type { Permission } from "./auth-context";
import { useAuth } from "./auth-context";

type PermissionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  permission: Permission;
  children: React.ReactNode;
  hideWhenDenied?: boolean;
};

export function PermissionButton({
  permission,
  children,
  hideWhenDenied = true,
  disabled,
  ...props
}: PermissionButtonProps) {
  const { hasPermission } = useAuth();

  const allowed = hasPermission(permission);

  if (!allowed && hideWhenDenied) {
    return null;
  }

  return (
    <button {...props} disabled={disabled || !allowed}>
      {children}
    </button>
  );
}
