"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function AdminSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
      title="Sign out"
    >
      <LogOut className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Sign Out</span>
    </button>
  );
}
