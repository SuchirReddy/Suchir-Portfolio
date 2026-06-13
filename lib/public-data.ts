import { prisma } from "@/lib/db";

export async function getPublicPortfolioData() {
  if (!process.env.DATABASE_URL) {
    return { projects: [], skills: [], journeyMilestones: [], journeyStats: [], journeyLessons: [], journeySettings: null, settings: null };
  }

  const [projects, skills, journeyMilestones, journeyStats, journeyLessons, journeySettings, settings] = await Promise.all([
    prisma.project.findMany({
      where: { status: "PUBLISHED" },
      include: { images: { orderBy: { displayOrder: "asc" } } },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
    prisma.skill.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] }),
    prisma.journeyMilestone.findMany({ 
      orderBy: [{ displayOrder: "asc" }],
    }),
    prisma.journeyStat.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.journeyLesson.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.journeySettings.findFirst(),
    prisma.siteSettings.findFirst(),
  ]);

  return { projects, skills, journeyMilestones, journeyStats, journeyLessons, journeySettings, settings };
}
