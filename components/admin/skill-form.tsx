"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Skill } from "@prisma/client";
import { Field } from "@/components/admin/field";
import { SubmitButton } from "@/components/admin/submit-button";
import { IconPicker } from "@/components/admin/icon-picker";
import { deleteSkillAction, saveSkillAction } from "@/app/admin/actions";
import * as LucideIcons from "lucide-react";

export function SkillForm({ skill }: { skill: Skill }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // @ts-ignore - Dynamic access to lucide icons
  const CategoryIcon = LucideIcons[(skill as any).icon] || LucideIcons.Code2;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden transition-all duration-300">
      {/* Header / Summary */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/[0.02]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-300/10 text-lime-300">
            <CategoryIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{skill.category}</h3>
            <p className="text-sm text-white/50 line-clamp-1 max-w-[200px] md:max-w-md">{skill.name}</p>
          </div>
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
        <form action={saveSkillAction} className="flex flex-col gap-6 p-5 border-t border-white/10 bg-black/20">
          <input type="hidden" name="id" value={skill.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Category" name="category" defaultValue={skill.category} required />
            <Field label="Skills (comma-separated)" name="name" defaultValue={skill.name} required />
          </div>
          <IconPicker defaultValue={(skill as any).icon} />
          <div className="flex justify-end gap-2">
            <button formAction={deleteSkillAction} className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-200 hover:bg-red-400/10 transition-colors">
              Delete
            </button>
            <SubmitButton variant="secondary">Save</SubmitButton>
          </div>
        </form>
      )}
    </div>
  );
}
