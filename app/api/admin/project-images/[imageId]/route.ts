import { NextResponse } from "next/server";
import { del } from "@vercel/blob";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ imageId: string }> },
) {
  await requireAdmin();
  const { imageId } = await params;
  
  const image = await prisma.projectImage.findUnique({ where: { id: imageId } });
  if (image && image.imageUrl.startsWith("https://")) {
    await del(image.imageUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
  }

  await prisma.projectImage.delete({ where: { id: imageId } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ imageId: string }> },
) {
  await requireAdmin();
  const { imageId } = await params;
  const body = await request.json();

  if (body.isCover) {
    const image = await prisma.projectImage.findUniqueOrThrow({ where: { id: imageId } });
    await prisma.projectImage.updateMany({
      where: { projectId: image.projectId },
      data: { isCover: false },
    });
  }

  const updated = await prisma.projectImage.update({
    where: { id: imageId },
    data: {
      displayOrder: Number.isInteger(body.displayOrder) ? body.displayOrder : undefined,
      isCover: typeof body.isCover === "boolean" ? body.isCover : undefined,
    },
  });

  return NextResponse.json({ image: updated });
}
