"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, PanelLeft } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "./SidebarContext";
import type { NavNode } from "@/types/nav";

const SIDEBAR_WIDTH = 280;
const COLLAPSED_STRIP_WIDTH = 48;

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function SidebarLayout({
  children,
  navTree,
}: {
  children: React.ReactNode;
  navTree: NavNode[];
}) {
  const pathname = usePathname();
  const ctx = useSidebar();
  const isMobile = useIsMobile();
  const hasTwoSegmentsAfterCourses = /\/courses\/[^/]+\/[^/]+/.test(pathname);
  const isSpecialPage = /\/courses\/[^/]+\/(plugins|selection-guide|curriculum)(\/|$)/.test(pathname);
  const isCourseDetailRoute = hasTwoSegmentsAfterCourses && !isSpecialPage;

  const collapsed = ctx?.collapsed ?? false;
  const setCollapsed = ctx?.setCollapsed ?? (() => {});
  const mobileOverlayOpen = ctx?.mobileOverlayOpen ?? false;
  const setMobileOverlayOpen = ctx?.setMobileOverlayOpen ?? (() => {});

  React.useEffect(() => {
    setMobileOverlayOpen(false);
  }, [pathname, setMobileOverlayOpen]);

  const sidebarContent = (
    <>
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-800/80 px-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
          Contents
        </span>
        <button
          type="button"
          onClick={() => {
            if (isMobile) setMobileOverlayOpen(false);
            else setCollapsed(true);
          }}
          className="rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
          aria-label={isMobile ? "Close navigation" : "Hide sidebar"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Sidebar nodes={navTree} />
      </div>
    </>
  );

  if (!isCourseDetailRoute) {
    return <>{children}</>;
  }

  const showMobileExpandButton = isMobile && !mobileOverlayOpen;

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-1">
      {/* Desktop sidebar */}
      {!isMobile && !collapsed && (
        <div
          className="hidden shrink-0 flex-col border-r border-zinc-800/80 bg-zinc-950 lg:flex"
          style={{ width: SIDEBAR_WIDTH }}
        >
          <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop collapsed strip */}
      {!isMobile && collapsed && (
        <div
          className="hidden shrink-0 flex-col border-r border-zinc-800/80 bg-zinc-950 lg:flex"
          style={{ width: COLLAPSED_STRIP_WIDTH }}
        >
          <div className="sticky top-14 flex h-11 items-center justify-center border-b border-zinc-800/80">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              className="rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
              aria-label="Show sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOverlayOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden
            onClick={() => setMobileOverlayOpen(false)}
          />
          <div
            className="fixed inset-y-0 left-0 z-50 flex w-[min(85vw,320px)] flex-col border-r border-zinc-800 bg-zinc-950 shadow-2xl lg:hidden"
            role="dialog"
            aria-label="Course navigation"
          >
            <div className="flex h-full flex-col overflow-hidden">
              {sidebarContent}
            </div>
          </div>
        </>
      )}

      {/* Mobile floating button */}
      {showMobileExpandButton && (
        <button
          type="button"
          onClick={() => setMobileOverlayOpen(true)}
          className="fixed left-0 top-1/2 z-30 flex h-12 w-8 -translate-y-1/2 items-center justify-center rounded-r-md border border-l-0 border-zinc-800 bg-zinc-900 shadow-lg transition-colors hover:bg-zinc-800 lg:hidden"
          aria-label="Open navigation"
        >
          <PanelLeft className="h-4 w-4 text-zinc-500" />
        </button>
      )}

      {/* Main content */}
      <div
        className="min-w-0 flex-1"
        style={
          !isMobile && !collapsed
            ? undefined
            : { width: "100%", maxWidth: "100%" }
        }
      >
        {children}
      </div>
    </div>
  );
}
