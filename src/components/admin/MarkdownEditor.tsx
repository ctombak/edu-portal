"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Save, Eye, Code, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const CodeMirrorEditor = dynamic(() => import("./CodeMirrorEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
      Loading editor...
    </div>
  ),
});

interface Props {
  initialContent: string;
  locale: string;
  courseSlug: string;
  moduleId: string;
  courseTitle: string;
}

export function MarkdownEditor({
  initialContent,
  locale,
  courseSlug,
  moduleId,
  courseTitle,
}: Props) {
  const [content, setContent] = useState(initialContent);
  const [view, setView] = useState<"split" | "editor" | "preview">("split");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, courseSlug, moduleId, content }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }, [locale, courseSlug, moduleId, content]);

  // Extract title from frontmatter
  const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const moduleTitle = titleMatch ? titleMatch[1] : moduleId;

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 bg-zinc-900/60 px-4 py-2">
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/admin/courses/${courseSlug}`}
            className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">{moduleTitle}</p>
            <p className="text-[11px] text-zinc-600">{courseTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/60 p-0.5">
            {(["editor", "split", "preview"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  view === v ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {v === "editor" ? (
                  <Code className="h-3.5 w-3.5" />
                ) : v === "preview" ? (
                  <Eye className="h-3.5 w-3.5" />
                ) : (
                  <span className="flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    <Eye className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-500 disabled:opacity-60 transition-colors"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : saveStatus === "success" ? (
              <CheckCircle className="h-3.5 w-3.5 text-emerald-300" />
            ) : saveStatus === "error" ? (
              <AlertCircle className="h-3.5 w-3.5 text-red-300" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            {saving ? "Saving..." : saveStatus === "success" ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Editor pane */}
        {(view === "editor" || view === "split") && (
          <div className={`flex flex-col min-h-0 ${view === "split" ? "w-1/2 border-r border-zinc-800/60" : "w-full"}`}>
            <div className="flex-1 min-h-0 overflow-auto">
              <CodeMirrorEditor value={content} onChange={setContent} />
            </div>
          </div>
        )}

        {/* Preview pane */}
        {(view === "preview" || view === "split") && (
          <div className={`flex flex-col min-h-0 overflow-auto bg-zinc-950 ${view === "split" ? "w-1/2" : "w-full"}`}>
            <div className="px-8 py-6">
              <div className="prose prose-invert prose-sm max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-strong:text-zinc-200 prose-blockquote:border-teal-500/50 prose-blockquote:text-teal-300/80 prose-li:text-zinc-400 prose-hr:border-teal-500/20">
                <ReactMarkdown>
                  {content.replace(/^---[\s\S]*?---\n*/m, "")}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
