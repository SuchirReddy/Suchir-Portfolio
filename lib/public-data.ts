import { prisma } from "@/lib/db";

export async function getPublicPortfolioData() {
  if (!process.env.DATABASE_URL) {
    return { projects: [], skills: [], timeline: [], settings: null };
  }

  try {
    const [projects, skills, timeline, settings] = await Promise.all([
      prisma.project.findMany({
        where: { status: "PUBLISHED" },
        include: { images: { orderBy: { displayOrder: "asc" } } },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      }),
      prisma.skill.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] }),
      prisma.timelineEntry.findMany({ orderBy: [{ order: "asc" }, { year: "desc" }] }),
      prisma.siteSettings.findFirst(),
    ]);

    return { projects, skills, timeline, settings };
  } catch {
    return { projects: [], skills: [], timeline: [], settings: null };
  }
}
