import Link from "next/link";

import {
  deleteProjectAction,
  toggleProjectFeaturedAction,
} from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function ProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: { images: true },
  });

  return (
    <AdminShell>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new" className="rounded-lg bg-lime-300 px-4 py-2 text-sm font-medium text-black">
          New Project
        </Link>
      </div>
      <div className="mt-8 grid gap-4">
        {projects.length === 0 ? <p className="text-white/45">No projects yet.</p> : null}
        {projects.map((project) => (
          <article key={project.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="mt-1 text-sm text-white/45">{project.shortDescription}</p>
                <p className="mt-2 text-xs text-white/35">
                  {project.status} · {project.images.length} images · {project.featured ? "Featured" : "Not featured"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/projects/${project.id}`} className="rounded-lg border border-white/10 px-3 py-2 text-sm">
                  Edit
                </Link>
                <form action={toggleProjectFeaturedAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="featured" value={String(project.featured)} />
                  <SubmitButton variant="secondary">
                    {project.featured ? "Unfeature" : "Feature"}
                  </SubmitButton>
                </form>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button className="rounded-lg border border-red-400/30 px-3 py-2 text-sm text-red-200">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
