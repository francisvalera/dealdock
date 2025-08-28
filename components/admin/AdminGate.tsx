"use client";
import { PropsWithChildren } from "react";

type Role = "ADMIN" | "STAFF" | "CUSTOMER";

export function AdminGate({ role, children }: PropsWithChildren<{ role?: Role | null }>) {
  if (role !== "ADMIN") return null;
  return <>{children}</>;
}
