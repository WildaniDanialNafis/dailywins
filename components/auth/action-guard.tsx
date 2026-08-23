"use client";

import type { Permission } from "./auth-context";
import { useAuth } from "./auth-context";

export function usePermissionGuard() {
  const { hasPermission } = useAuth();

  function can(permission: Permission) {
    return hasPermission(permission);
  }

  function guard(permission: Permission, onDenied?: () => void) {
    if (!hasPermission(permission)) {
      onDenied?.();
      return false;
    }

    return true;
  }

  return {
    can,
    guard,
  };
}
