"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const LABEL_BY_LOCALE: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

const LOCALE_REGEX = new RegExp(`^/(${locales.join("|")})`);

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const fullPathname = usePathname();
  const pathWithoutLocale = fullPathname.replace(LOCALE_REGEX, "") || "";

  function switchTo(targetLocale: Locale) {
    if (targetLocale === locale) return;
    const newPath =
      pathWithoutLocale === "" || pathWithoutLocale === "/"
        ? `/${targetLocale}`
        : `/${targetLocale}${pathWithoutLocale}`;
    window.location.href = newPath;
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          disabled={l === locale}
          className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors ${
            l === locale
              ? "bg-zinc-800 text-zinc-200"
              : "text-zinc-600 hover:bg-zinc-800/60 hover:text-zinc-300"
          }`}
          title={l === "en" ? "English" : "Türkçe"}
          aria-label={l === "en" ? "Switch to English" : "Türkçe'ye geç"}
        >
          {LABEL_BY_LOCALE[l]}
        </button>
      ))}
    </div>
  );
}
