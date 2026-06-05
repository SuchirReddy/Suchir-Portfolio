import type { TimelineEntry } from "@prisma/client";

export function JourneySection({ timeline }: { timeline: TimelineEntry[] }) {
  if (!timeline.length) return null;

  return (
    <section id="journey" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
          The <span className="text-lime-500 dark:text-lime-300">Journey</span>
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-white/50">
          My professional timeline and milestones.
        </p>
      </div>

      <div className="relative mt-10">
        {/* Continuous horizontal line across the container behind dots */}
        <div className="absolute left-0 top-1.5 h-px w-full bg-black/10 dark:bg-white/10 hidden md:block" />
        
        <div className="flex w-full snap-x snap-mandatory flex-col gap-12 overflow-x-auto pb-12 pt-2 md:flex-row md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {timeline.map((entry, index) => (
            <div key={entry.id} className="group relative w-full shrink-0 snap-start md:w-[320px] lg:w-[380px]">
              
              {/* Dot & Line container for desktop */}
              <div className="relative mb-6 hidden md:flex items-center w-full">
                <span className="relative z-10 h-3 w-3 shrink-0 rounded-full border border-lime-300/40 bg-lime-300/20 shadow-[0_0_12px_rgba(187,204,215,0.4)] transition-transform duration-300 group-hover:scale-125" />
              </div>

              {/* Dot for mobile vertical view */}
              <span className="absolute -left-5 top-1.5 h-3 w-3 rounded-full border border-lime-300/40 bg-lime-300/20 shadow-[0_0_12px_rgba(187,204,215,0.4)] md:hidden" />

              <div className="flex flex-col gap-1 md:pr-8">
                <span className="text-sm font-semibold tracking-wider text-lime-600 dark:text-lime-300/80">
                  {entry.year}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
                  {entry.title}
                </h3>
                {entry.description && (
                  <p className="mt-2 text-zinc-600 dark:text-white/60 leading-relaxed">
                    {entry.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
