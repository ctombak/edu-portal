import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getNavTree } from "@/lib/courses";
import { HeaderRight } from "@/components/HeaderRight";
import { MobileNav } from "@/components/MobileNav";
import { SidebarProvider } from "@/components/Sidebar/SidebarContext";
import { SidebarLayoutClient } from "@/components/SidebarLayoutClient";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("home");
  const navTree = await getNavTree(locale);

  const navItems = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/courses`, label: tNav("courses") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-zinc-950">
        <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
          <div className="flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-6">
              <Link
                href={`/${locale}`}
                className="shrink-0 text-[15px] font-semibold text-zinc-100 transition-colors hover:text-white"
              >
                {tHome("title")}
              </Link>
              <div className="hidden h-4 w-px bg-zinc-800 md:block" aria-hidden />
              <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-1">
              <HeaderRight />
              <MobileNav items={navItems} />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col">
          <SidebarLayoutClient navTree={navTree}>
            {children}
          </SidebarLayoutClient>
        </main>
      </div>
    </SidebarProvider>
  );
}
