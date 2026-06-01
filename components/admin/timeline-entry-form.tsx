"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { TimelineEntry } from "@prisma/client";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { deleteTimelineAction, saveTimelineAction } from "@/app/admin/actions";

export function TimelineEntryForm({ entry }: { entry: TimelineEntry }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden transition-all duration-300">
      {/* Header / Summary */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.02]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-semibold text-white">{entry.title}</h3>
          <p className="text-sm text-white/50">{entry.year} • Order: {entry.order}</p>
        </div>
        <button 
          type="button" 
          className="p-2 text-white/50 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {/* Expanded Form Content */}
      {isExpanded && (
        <form action={saveTimelineAction} className="grid gap-4 p-4 border-t border-white/10 md:grid-cols-2 bg-black/20">
          <input type="hidden" name="id" value={entry.id} />
          <Field label="Title" name="title" defaultValue={entry.title} required />
          <Field label="Year" name="year" defaultValue={entry.year} required />
          <Field label="Order" name="order" type="number" defaultValue={entry.order} />
          <div className="md:col-span-2">
            <Field label="Description" name="description" defaultValue={entry.description || ""} textarea />
          </div>
          <div className="flex gap-2">
            <SubmitButton variant="secondary">Save</SubmitButton>
            <button formAction={deleteTimelineAction} className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-200 hover:bg-red-400/10 transition-colors">
              Delete
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
