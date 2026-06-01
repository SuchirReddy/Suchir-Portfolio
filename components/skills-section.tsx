import * as LucideIcons from "lucide-react";
import type { Skill } from "@prisma/client";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  if (!skills.length) return null;

  const categories = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
          Core <span className="text-lime-500 dark:text-lime-300">Competencies</span>
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-white/50">
          Technologies and tools I work with.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categories).map(([category, catSkills]) => {
          // We assume all skills in the same category have the same icon since they share the category name.
          // We'll pick the icon from the first skill.
          const iconName = (catSkills[0] as any)?.icon || "Code2";
          // @ts-ignore - Dynamic access to lucide icons
          const CategoryIcon = LucideIcons[iconName] || LucideIcons.Code2;

          return (
            <div
              key={category}
              className="group rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 shadow-glass transition-colors hover:border-lime-500/30 dark:hover:border-lime-300/30"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/10 dark:bg-lime-300/10 text-lime-600 dark:text-lime-300">
                  <CategoryIcon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white/80">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {catSkills.flatMap(skill => skill.name.split(',')).map((name, idx) => {
                  const trimmedName = name.trim();
                  if (!trimmedName) return null;
                  return (
                    <span
                      key={`${category}-${idx}`}
                      className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.05] px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:text-white/70 transition-colors group-hover:border-black/20 dark:group-hover:border-white/20"
                    >
                      {trimmedName}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
