"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import type { Permission } from "./auth-context";
import { useAuth } from "./auth-context";

type PermissionLinkProps = ComponentProps<typeof Link> & {
  permission: Permission;
  hideWhenDenied?: boolean;
};

export function PermissionLink({
  permission,
  hideWhenDenied = true,
  children,
  ...props
}: PermissionLinkProps) {
  const { hasPermission } = useAuth();

  const allowed = hasPermission(permission);

  if (!allowed && hideWhenDenied) {
    return null;
  }

  if (!allowed) {
    return (
      <span aria-disabled="true" className="cursor-not-allowed opacity-50">
        {children}
      </span>
    );
  }

  return (
    <Link {...props} aria-disabled={undefined}>
      {children}
    </Link>
  );
}
