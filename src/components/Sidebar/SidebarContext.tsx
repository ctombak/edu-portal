"use client";

import React from "react";

type SidebarContextValue = {
  /** Desktop: sidebar is hidden when true. Default false (visible). */
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  /** Mobile: overlay is open when true. Default false. */
  mobileOverlayOpen: boolean;
  setMobileOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOverlayOpen, setMobileOverlayOpen] = React.useState(false);
  const value = React.useMemo(
    () => ({
      collapsed,
      setCollapsed,
      mobileOverlayOpen,
      setMobileOverlayOpen,
    }),
    [collapsed, mobileOverlayOpen]
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  return React.useContext(SidebarContext);
}
