import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact message." }, { status: 400 });
  }

  const message = await prisma.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ ok: true, id: message.id });
}
