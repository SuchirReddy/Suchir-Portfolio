import { deleteSkillAction, saveSkillAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { SubmitButton } from "@/components/admin/submit-button";
import { Field } from "@/components/admin/field";
import { IconPicker } from "@/components/admin/icon-picker";
import { SkillForm } from "@/components/admin/skill-form";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function SkillsPage() {
  await requireAdmin();
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { name: "asc" }] });

  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Skills</h1>
      <form action={saveSkillAction} className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Category" name="category" required />
          <Field label="Skills (comma-separated)" name="name" required />
        </div>
        <IconPicker />
        <SubmitButton className="w-full md:w-auto md:justify-self-end">Add</SubmitButton>
      </form>
      <div className="mt-8 grid gap-4">
        {skills.length === 0 ? <p className="text-white/45">No skills yet.</p> : null}
        {skills.map((skill) => (
          <SkillForm key={skill.id} skill={skill} />
        ))}
      </div>
    </AdminShell>
  );
}
