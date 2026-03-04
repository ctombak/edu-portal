"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import type { NavFolder, NavLink, NavNode } from "@/types/nav";

function isActive(href: string, pathname: string): boolean {
  if (pathname === href) return true;
  if (href !== "/" && pathname.startsWith(href + "/")) return true;
  return false;
}

function hasActiveChild(node: NavFolder, pathname: string): boolean {
  return node.children.some((child) => {
    if (child.type === "link") return isActive(child.href, pathname);
    return hasActiveChild(child, pathname);
  });
}

const INDENT_PER_LEVEL = 28;
const CHEVRON_WIDTH = 28;

function NavItem({
  node,
  pathname,
  depth = 0,
}: {
  node: NavNode;
  pathname: string;
  depth?: number;
}) {
  const basePadding = 12 + depth * INDENT_PER_LEVEL;
  const paddingLeft =
    node.type === "link" && depth > 0
      ? basePadding + CHEVRON_WIDTH
      : basePadding;

  if (node.type === "link") {
    const active = isActive(node.href, pathname);
    return (
      <Link
        href={node.href}
        className={`relative flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition-colors hover:bg-zinc-800/80 hover:text-zinc-100 ${
          active
            ? "bg-zinc-800/80 font-medium text-zinc-100 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:rounded-full before:bg-violet-500"
            : "text-zinc-500"
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
        data-active={active}
      >
        <FileText
          className={`h-3.5 w-3.5 shrink-0 ${active ? "text-zinc-400" : "text-zinc-600"}`}
          aria-hidden
        />
        <span>{node.title}</span>
      </Link>
    );
  }

  const folder = node as NavFolder;
  const isFolderActive = folder.href ? isActive(folder.href, pathname) : false;
  const activeChild = hasActiveChild(folder, pathname);
  const defaultOpen = activeChild || isFolderActive;

  return (
    <NavFolderItem
      node={folder}
      pathname={pathname}
      depth={depth}
      paddingLeft={paddingLeft}
      defaultOpen={defaultOpen}
    />
  );
}

function NavFolderItem({
  node,
  pathname,
  depth,
  paddingLeft,
  defaultOpen,
}: {
  node: NavFolder;
  pathname: string;
  depth: number;
  paddingLeft: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const isFolderActive = node.href ? isActive(node.href, pathname) : false;

  React.useEffect(() => {
    if (hasActiveChild(node, pathname) || isFolderActive) setOpen(true);
  }, [pathname, node, isFolderActive]);

  return (
    <div className="py-px">
      <div
        className="flex items-center gap-1"
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-zinc-400"
          aria-label={open ? "Collapse" : "Expand"}
        >
          <ChevronRight
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-90" : ""}`}
            aria-hidden
          />
        </button>
        {node.href ? (
          <Link
            href={node.href}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-zinc-800/80 hover:text-zinc-100"
          >
            {open ? (
              <FolderOpen
                className="h-3.5 w-3.5 shrink-0 text-amber-500/80"
                aria-hidden
              />
            ) : (
              <Folder
                className="h-3.5 w-3.5 shrink-0 text-zinc-600"
                aria-hidden
              />
            )}
            <span
              className={
                isFolderActive
                  ? "min-w-0 truncate font-medium text-zinc-100"
                  : "min-w-0 truncate text-zinc-500"
              }
            >
              {node.title}
            </span>
          </Link>
        ) : (
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-[13px]">
            {open ? (
              <FolderOpen
                className="h-3.5 w-3.5 shrink-0 text-amber-500/80"
                aria-hidden
              />
            ) : (
              <Folder
                className="h-3.5 w-3.5 shrink-0 text-zinc-600"
                aria-hidden
              />
            )}
            <span className="min-w-0 truncate text-zinc-500">
              {node.title}
            </span>
          </span>
        )}
      </div>
      {open && (
        <div className="ml-[3px] border-l border-zinc-800/60">
          {node.children.map((child) => (
            <NavItem
              key={
                child.type === "link"
                  ? (child as NavLink).href
                  : (child as NavFolder).href ?? (child as NavFolder).title
              }
              node={child}
              pathname={pathname}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavTree({
  nodes,
  pathname,
}: {
  nodes: NavNode[];
  pathname: string;
}) {
  return (
    <nav className="space-y-px" aria-label="Course navigation">
      {nodes.map((node) => (
        <NavItem
          key={
            node.type === "link"
              ? (node as NavLink).href
              : (node as NavFolder).href ?? (node as NavFolder).title
          }
          node={node}
          pathname={pathname}
        />
      ))}
    </nav>
  );
}
