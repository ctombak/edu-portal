"use client";

import { usePathname } from "next/navigation";
import { NavTree } from "./NavTree";
import type { NavNode } from "@/types/nav";

export function Sidebar({ nodes }: { nodes: NavNode[] }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-full flex-col">
      <div className="px-3 py-4">
        <NavTree nodes={nodes} pathname={pathname} />
      </div>
    </aside>
  );
}
