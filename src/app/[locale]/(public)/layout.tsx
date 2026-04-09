import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HeaderRight } from "@/components/HeaderRight";
import { MobileNav } from "@/components/MobileNav";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations("nav");

  const navItems = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/courses`, label: tNav("courses") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href={`/${locale}`}
              className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo.png"
                alt="Atlantic Learning"
                width={36}
                height={36}
                className="rounded-md"
              />
              <span className="hidden text-[15px] font-semibold tracking-tight text-zinc-100 sm:inline">
                <span className="font-normal text-zinc-400">Atlantic</span>{" "}
                Learning
              </span>
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
        {children}
      </main>
      <footer className="border-t border-zinc-800/60">
        <div className="flex items-center justify-between px-6 py-4 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} Atlantic Learning</span>
          <Link href={`/${locale}/login`} className="transition-colors hover:text-zinc-400">Trainer Login</Link>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}
