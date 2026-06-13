import Image from "next/image";
import type { Project, ProjectImage } from "@prisma/client";
import { ArrowUpRight, Github } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProjectImageCarousel } from "@/components/project-image-carousel";

type ProjectWithImages = Project & { images: ProjectImage[] };

export function ProjectsSection({ projects }: { projects: ProjectWithImages[] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
          These are My Selected <span className="text-lime-500 dark:text-lime-300">Works</span>
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-white/50">
          A showcase of recent products, experiments, and applications I've built.
        </p>
      </div>

      <div className="grid gap-12 lg:gap-20">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.id}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
            >
              {project.images.length > 0 && (
                <ProjectImageCarousel
                  images={project.images}
                  title={project.title}
                  className="w-full lg:w-3/5"
                />
              )}
              <div className="flex w-full flex-col lg:w-2/5 lg:px-6">
                {project.featured && (
                  <span className="mb-4 w-fit rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-semibold text-lime-300">
                    Featured
                  </span>
                )}
                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-white/60 leading-relaxed whitespace-pre-wrap">
                  {project.fullDescription}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <Button href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit Live
                      <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      Source
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
