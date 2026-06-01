import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProjectForm } from "@/app/admin/projects/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  await requireAdmin();
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { images: { orderBy: { displayOrder: "asc" } } },
  });

  if (!project) notFound();

  return (
    <AdminShell>
      <h1 className="mb-8 text-3xl font-semibold">Edit Project</h1>
      <ProjectForm project={project} />
    </AdminShell>
  );
}
