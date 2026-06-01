import Link from "next/link";
import { FolderGit2, Code2, GitCommitHorizontal, MessageSquareText, ArrowUpRight } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function DashboardPage() {
  await requireAdmin();
  const [projects, skills, timeline, unreadMessages] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.timelineEntry.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const cards = [
    { label: "Projects", value: projects, href: "/admin/projects", icon: FolderGit2, colSpan: "col-span-1 sm:col-span-2 lg:col-span-1" },
    { label: "Skills", value: skills, href: "/admin/skills", icon: Code2, colSpan: "col-span-1" },
    { label: "Timeline", value: timeline, href: "/admin/timeline", icon: GitCommitHorizontal, colSpan: "col-span-1" },
    { label: "Unread Messages", value: unreadMessages, href: "/admin/messages", icon: MessageSquareText, colSpan: "col-span-1 sm:col-span-2 lg:col-span-1", highlight: unreadMessages > 0 },
  ];

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date().toLocaleDateString('en-US', dateOptions);

  return (
    <AdminShell>
      <div className="flex flex-col gap-8">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 shadow-glass backdrop-blur-md">
          <div className="absolute -mr-16 -mt-16 right-0 top-0 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {greeting}, <span className="text-lime-300">Suchir</span>
            </h1>
            <p className="mt-2 text-sm font-medium text-white/50">
              {formattedDate}
            </p>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[160px]">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                href={card.href}
                key={card.label}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-glass backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(195,228,29,0.1)] ${card.colSpan} ${card.highlight ? 'bg-lime-400/5' : 'bg-white/[0.02]'}`}
              >
                <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 ${card.highlight ? 'bg-lime-400/20' : 'bg-white/5'}`} />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-3 shadow-inner">
                      <Icon className={`h-5 w-5 ${card.highlight ? 'text-lime-300' : 'text-white/70'}`} />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/20 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-white">{card.value}</p>
                    <p className="mt-1 text-sm font-medium text-white/50">{card.label}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
