"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSession, destroySession, getClientIp, requireAdmin, verifyAdminLogin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { slugify } from "@/lib/slug";
import {
  loginSchema,
  projectSchema,
  settingsSchema,
  skillSchema,
  timelineSchema,
} from "@/lib/validations";

function readForm(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

function cleanUrl(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function loginAction(_: unknown, formData: FormData) {
  const parsed = loginSchema.safeParse(readForm(formData));
  if (!parsed.success) return { error: "Enter a valid email and password." };

  const ip = await getClientIp();
  const rateLimit = checkRateLimit(`login:${ip}:${parsed.data.email.toLowerCase()}`);
  if (!rateLimit.allowed) return { error: "Too many attempts. Try again in a minute." };

  const user = await verifyAdminLogin(parsed.data.email.toLowerCase(), parsed.data.password);
  if (!user) return { error: "Invalid email or password." };

  await createSession(user.id);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveProjectAction(formData: FormData) {
  await requireAdmin();
  const parsed = projectSchema.parse(readForm(formData));
  const slug = parsed.slug?.trim() || slugify(parsed.title);

  const payload = {
    title: parsed.title,
    slug,
    shortDescription: parsed.shortDescription,
    fullDescription: parsed.fullDescription,
    githubUrl: cleanUrl(parsed.githubUrl),
    liveUrl: cleanUrl(parsed.liveUrl),
    featured: parsed.featured,
    status: parsed.status,
  };

  if (parsed.id) {
    await prisma.project.update({ where: { id: parsed.id }, data: payload });
  } else {
    await prisma.project.create({ data: payload });
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function toggleProjectFeaturedAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const featured = formData.get("featured") === "true";
  await prisma.project.update({ where: { id }, data: { featured: !featured } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function saveSkillAction(formData: FormData) {
  await requireAdmin();
  const parsed = skillSchema.parse(readForm(formData));
  if (parsed.id) {
    await prisma.skill.update({ where: { id: parsed.id }, data: parsed });
  } else {
    await prisma.skill.create({ data: parsed });
  }
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkillAction(formData: FormData) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function saveTimelineAction(formData: FormData) {
  await requireAdmin();
  const parsed = timelineSchema.parse(readForm(formData));
  if (parsed.id) {
    await prisma.timelineEntry.update({ where: { id: parsed.id }, data: parsed });
  } else {
    await prisma.timelineEntry.create({ data: parsed });
  }
  revalidatePath("/");
  revalidatePath("/admin/timeline");
}

export async function deleteTimelineAction(formData: FormData) {
  await requireAdmin();
  await prisma.timelineEntry.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin/timeline");
}

export async function markMessageReadAction(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.update({
    where: { id: String(formData.get("id")) },
    data: { isRead: true },
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/messages");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  const parsed = settingsSchema.parse(readForm(formData));
  const current = await prisma.siteSettings.findFirst();
  const data = {
    name: parsed.name,
    profileImage: cleanUrl(parsed.profileImage),
    tagline: parsed.tagline || null,
    github: cleanUrl(parsed.github),
    linkedin: cleanUrl(parsed.linkedin),
    twitter: cleanUrl(parsed.twitter),
    email: parsed.email || null,
    resumeUrl: cleanUrl(parsed.resumeUrl),
  };

  if (current) {
    await prisma.siteSettings.update({ where: { id: current.id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
