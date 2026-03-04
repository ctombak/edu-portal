"use client";

import React from "react";
import { Moon, Sun, Circle } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type ThemeValue = "dark" | "auto" | "light";

const modes: { value: ThemeValue; icon: typeof Moon; label: string }[] = [
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "auto", icon: Circle, label: "System" },
  { value: "light", icon: Sun, label: "Light" },
];

const BUTTON_SIZE = 24;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const activeIndex = modes.findIndex((m) => m.value === theme);

  return (
    <div
      className={`relative flex h-8 items-center rounded-lg bg-zinc-800/60 p-1 transition-opacity duration-150 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      role="radiogroup"
      aria-label="Theme"
    >
      <div
        className="absolute left-1 h-6 w-6 rounded-md bg-zinc-700/80 shadow-sm transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${activeIndex * BUTTON_SIZE}px)` }}
      />
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
          onClick={() => setTheme(value)}
          className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
            theme === value
              ? "text-zinc-100"
              : "text-zinc-500 hover:text-zinc-400"
          }`}
        >
          <Icon
            className={value === "auto" ? "h-3 w-3" : "h-3.5 w-3.5"}
            strokeWidth={value === "auto" ? 2.5 : 2}
          />
        </button>
      ))}
    </div>
  );
}
