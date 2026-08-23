"use client";

import type { Permission } from "./auth-context";
import { useAuth } from "./auth-context";

export function Can({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function CanAny({
  permissions,
  children,
  fallback = null,
}: {
  permissions: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasAnyPermission } = useAuth();

  if (!hasAnyPermission(permissions)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function CanAll({
  permissions,
  children,
  fallback = null,
}: {
  permissions: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasAllPermissions } = useAuth();

  if (!hasAllPermissions(permissions)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
