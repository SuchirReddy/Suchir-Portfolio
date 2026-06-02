import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> },
) {
  await requireAdmin();
  const { projectId } = await params;
  const formData = await request.formData();
  const files = formData.getAll("files").filter((file): file is File => typeof file === "object" && file !== null);

  if (!files.length) {
    return NextResponse.json({ error: "No images uploaded." }, { status: 400 });
  }

  const currentCount = await prisma.projectImage.count({ where: { projectId } });
  const created = [];

  for (const [index, file] of files.entries()) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const isImage = file.type.startsWith("image/") || ["png", "jpg", "jpeg", "webp", "gif"].includes(extension);

    if (!isImage) {
      return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    created.push(
      await prisma.projectImage.create({
        data: {
          projectId,
          imageUrl: blob.url,
          displayOrder: currentCount + index,
          isCover: currentCount === 0 && index === 0,
        },
      }),
    );
  }

  return NextResponse.json({ images: created });
}
