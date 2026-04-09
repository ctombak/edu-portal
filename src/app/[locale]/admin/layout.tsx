import Link from "next/link";
import Image from "next/image";
import { HeaderRight } from "@/components/HeaderRight";
import { AdminSignOut } from "@/components/admin/AdminSignOut";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-20 border-b border-teal-500/20 bg-zinc-950/90 backdrop-blur-xl">
        <div className="flex h-14 w-full items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/admin`}
              className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <Image src="/logo.png" alt="Atlantic Learning" width={32} height={32} className="rounded-md" />
              <span className="text-sm font-semibold text-zinc-100">
                <span className="font-normal text-zinc-400">Trainer</span> Dashboard
              </span>
            </Link>
            <div className="h-4 w-px bg-zinc-800" aria-hidden />
            <nav className="flex items-center gap-1">
              <Link
                href={`/${locale}/admin`}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
              >
                Courses
              </Link>
              <Link
                href={`/${locale}`}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Public Site
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <HeaderRight />
            <AdminSignOut />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
