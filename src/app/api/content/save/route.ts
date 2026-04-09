import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeModuleFile } from "@/lib/content/write-module";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { locale, courseSlug, moduleId, content } = body;

    if (!locale || !courseSlug || !moduleId || typeof content !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic path traversal protection
    if (
      moduleId.includes("..") ||
      courseSlug.includes("..") ||
      locale.includes("..")
    ) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    await writeModuleFile(locale, courseSlug, moduleId, content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save module:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
