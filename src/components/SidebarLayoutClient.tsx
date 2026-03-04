"use client";

import { SidebarLayout } from "@/components/Sidebar";
import type { NavNode } from "@/types/nav";

export function SidebarLayoutClient({
  children,
  navTree,
}: {
  children: React.ReactNode;
  navTree: NavNode[];
}) {
  return <SidebarLayout navTree={navTree}>{children}</SidebarLayout>;
}
