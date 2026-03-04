"use client";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function HeaderRight() {
  return (
    <div className="flex items-center gap-4">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
}
