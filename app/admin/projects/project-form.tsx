import type { Project, ProjectImage } from "@prisma/client";

import { saveProjectAction } from "@/app/admin/actions";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { ProjectImageManager } from "@/components/admin/project-image-manager";

export function ProjectForm({
  project,
}: {
  project?: Project & { images: ProjectImage[] };
}) {
  return (
    <div className="grid gap-6">
      <form action={saveProjectAction} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <input type="hidden" name="id" value={project?.id ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" name="title" defaultValue={project?.title} required />
          <Field label="Slug" name="slug" defaultValue={project?.slug} />
          <Field label="Short Description" name="shortDescription" defaultValue={project?.shortDescription} required />
          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>
            <select
              name="status"
              defaultValue={project?.status ?? "PUBLISHED"}
              className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-2.5 outline-none focus:border-white/20"
            >
              <option className="bg-neutral-950">DRAFT</option>
              <option className="bg-neutral-950">PUBLISHED</option>
              <option className="bg-neutral-950">ARCHIVED</option>
            </select>
          </div>
          <Field label="GitHub URL" name="githubUrl" defaultValue={project?.githubUrl} />
          <Field label="Live URL" name="liveUrl" defaultValue={project?.liveUrl} />
        </div>
        <div className="mt-4">
          <Field label="Full Description" name="fullDescription" defaultValue={project?.fullDescription} textarea required />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-white/70">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} value="true" />
          Featured project
        </label>
        <SubmitButton className="mt-6">
          Save Project
        </SubmitButton>
      </form>
      {project ? <ProjectImageManager projectId={project.id} images={project.images} /> : null}
    </div>
  );
}
