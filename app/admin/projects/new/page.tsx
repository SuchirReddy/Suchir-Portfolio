import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "@/app/admin/projects/project-form";

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <AdminShell>
      <h1 className="mb-8 text-3xl font-semibold">New Project</h1>
      <ProjectForm />
    </AdminShell>
  );
}
