import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware navigation (Link, useRouter, etc.). Use for optional i18n routing helpers. */
export const { Link, usePathname, useRouter, redirect, getPathname } =
  createNavigation(routing);
