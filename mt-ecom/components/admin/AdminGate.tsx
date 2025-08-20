"use client";
import { PropsWithChildren } from "react";
import type { Role } from "@/lib/tenant.v1";

export function AdminGate({ role, children }: PropsWithChildren<{ role?: Role | null }>) {
  if (role !== "ADMIN") return null;
  return <>{children}</>;
}