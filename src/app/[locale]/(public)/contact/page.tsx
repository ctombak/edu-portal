"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center sm:py-32">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/25">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-50">{t("successTitle")}</h1>
        <p className="mt-3 text-zinc-400">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-1/4 top-0 -translate-y-1/3 h-[500px] w-[500px] rounded-full bg-sky-600/[0.05] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-xl px-6 py-16 sm:py-24">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
            {t("title")}
          </h1>
          <p className="mt-3 text-zinc-400 leading-relaxed">{t("subtitle")}</p>
        </header>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-300">
              {t("name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-zinc-300">
              {t("company")}
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-300">
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-zinc-300">
              {t("phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
            />
          </div>

          <div>
            <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-zinc-300">
              {t("interest")}
            </label>
            <select
              id="interest"
              name="interest"
              required
              defaultValue=""
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
            >
              <option value="" disabled className="text-zinc-600">{t("interestPlaceholder")}</option>
              <option value="leadership">{t("interestLeadership")}</option>
              <option value="product-lifecycle">{t("interestProductLifecycle")}</option>
              <option value="tech">{t("interestTech")}</option>
              <option value="custom">{t("interestCustom")}</option>
              <option value="other">{t("interestOther")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-zinc-300">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={t("messagePlaceholder")}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/25"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100 disabled:opacity-60"
          >
            {sending ? (
              t("sending")
            ) : (
              <>
                {t("submit")}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
