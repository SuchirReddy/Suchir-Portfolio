import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { JourneyManager } from "./journey-manager";

export default async function JourneyAdminPage() {
  await requireAdmin();

  const [milestones, stats, lessons, settings] = await Promise.all([
    prisma.journeyMilestone.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.journeyStat.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.journeyLesson.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.journeySettings.findFirst(),
  ]);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Journey</h1>
          <p className="mt-2 text-sm text-white/50">
            Manage your storytelling experience, timeline, and stats.
          </p>
        </div>
      </div>

      <JourneyManager
        initialMilestones={milestones}
        initialStats={stats}
        initialLessons={lessons}
        initialSettings={settings}
      />
    </AdminShell>
  );
}
