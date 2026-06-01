import { saveTimelineAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { TimelineEntryForm } from "@/components/admin/timeline-entry-form";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function TimelinePage() {
  await requireAdmin();
  const entries = await prisma.timelineEntry.findMany({ orderBy: [{ order: "asc" }, { year: "desc" }] });

  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Timeline</h1>
      
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="mb-4 text-xl font-medium">Add New Entry</h2>
        <form action={saveTimelineAction} className="grid gap-4 md:grid-cols-2">
          <Field label="Title" name="title" required />
          <Field label="Year" name="year" required />
          <Field label="Order" name="order" type="number" defaultValue={0} />
          <div className="md:col-span-2">
            <Field label="Description" name="description" textarea />
          </div>
          <SubmitButton className="md:w-fit transition-transform hover:-translate-y-0.5">
            Add Entry
          </SubmitButton>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-medium">Existing Entries</h2>
        <div className="grid gap-3">
          {entries.length === 0 ? <p className="text-white/45">No timeline entries yet.</p> : null}
          {entries.map((entry) => (
            <TimelineEntryForm key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
