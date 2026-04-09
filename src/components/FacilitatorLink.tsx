"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function FacilitatorLink({
  name,
  bio,
  locale,
  courseSlug,
}: {
  name: string;
  bio: string;
  locale: string;
  courseSlug: string;
}) {
  const router = useRouter();
  const t = useTranslations("curriculum");

  return (
    <div
      className="flex items-start gap-5 rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700 sm:p-8 cursor-pointer"
      onDoubleClick={() => router.push(`/${locale}/courses/${courseSlug}/curriculum`)}
      title={t("viewCurriculum")}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-lg font-bold text-teal-400 ring-1 ring-teal-500/20">
        CT
      </div>
      <div>
        <h3 className="text-lg font-bold text-zinc-100">{name}</h3>
        <p className="mt-2 leading-relaxed text-zinc-400">{bio}</p>
        <p className="mt-3 text-xs text-zinc-600 italic">
          {t("viewCurriculum")} &rarr;
        </p>
      </div>
    </div>
  );
}
