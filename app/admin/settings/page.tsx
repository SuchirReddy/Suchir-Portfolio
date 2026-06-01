import { saveSettingsAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { SubmitButton } from "@/components/admin/submit-button";
import { Field } from "@/components/admin/field";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await prisma.siteSettings.findFirst();

  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Settings</h1>
      <form action={saveSettingsAction} className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:grid-cols-2">
        <Field label="Name" name="name" defaultValue={settings?.name ?? "Suchir Reddy"} required />
        <Field label="Tagline" name="tagline" defaultValue={settings?.tagline} />
        <Field label="Profile Image URL" name="profileImage" defaultValue={settings?.profileImage} />
        <Field label="Resume URL" name="resumeUrl" defaultValue={settings?.resumeUrl} />
        <Field label="GitHub" name="github" defaultValue={settings?.github} />
        <Field label="LinkedIn" name="linkedin" defaultValue={settings?.linkedin} />
        <Field label="Twitter" name="twitter" defaultValue={settings?.twitter} />
        <Field label="Email" name="email" type="email" defaultValue={settings?.email} />
        <SubmitButton className="md:w-fit">Save Settings</SubmitButton>
      </form>
    </AdminShell>
  );
}
