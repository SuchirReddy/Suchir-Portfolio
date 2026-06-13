import { saveHeroSettingsAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { SubmitButton } from "@/components/admin/submit-button";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function HeroPage() {
  await requireAdmin();
  const settings = await prisma.siteSettings.findFirst();

  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Hero Management</h1>
      <p className="mt-2 text-white/50">Manage the hero section assets like the background image and profile portrait.</p>
      <form action={saveHeroSettingsAction} className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:grid-cols-2">
        <ImageUploadField label="Hero Background Image" name="heroImage" defaultValue={settings?.heroImage} />
        <ImageUploadField label="Profile Image" name="profileImage" defaultValue={settings?.profileImage} />
        <SubmitButton className="md:col-span-2 md:w-fit mt-4">Save Hero Settings</SubmitButton>
      </form>
    </AdminShell>
  );
}
