"use client";

import React from "react";

type Theme = "dark" | "light" | "auto";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "auto",
  setTheme: () => {},
});

export function useTheme() {
  return React.useContext(ThemeContext);
}

function applyResolved(theme: Theme) {
  const resolved =
    theme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  document.documentElement.setAttribute("data-theme", resolved);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("auto");

  React.useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && ["dark", "light", "auto"].includes(stored)) {
      setThemeState(stored);
      applyResolved(stored);
    }
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    applyResolved(t);
  }, []);

  React.useEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyResolved("auto");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
