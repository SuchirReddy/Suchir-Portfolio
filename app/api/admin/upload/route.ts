import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  await requireAdmin();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const isImage = file.type.startsWith("image/") || ["png", "jpg", "jpeg", "webp", "gif"].includes(extension);

    if (!isImage) {
      return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
