"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Code2,
  GitCommitHorizontal,
  MessageSquareText,
  Settings,
  LogOut,
  Hexagon
} from "lucide-react";

import { logoutAction } from "@/app/admin/actions";

const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: Hexagon },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Journey", href: "/admin/journey", icon: GitCommitHorizontal },
  { label: "Skills", href: "/admin/skills", icon: Code2 },
  { label: "Contact", href: "/admin/messages", icon: MessageSquareText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-[#020202] text-white selection:bg-lime-300/30 selection:text-white pb-20 lg:pb-0">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(206,255,48,0.05),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(66,255,215,0.05),transparent_35%)]" />
      </div>

      {/* Desktop Sidebar (Floating Glass) */}
      <aside className="fixed inset-y-6 left-6 z-40 hidden w-[260px] flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-xl backdrop-blur-md lg:flex">
        <Link href="/admin/dashboard" className="mt-2 mb-4 flex items-center justify-center text-white transition-opacity hover:opacity-80">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-sm">
            <span className="text-5xl" style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>SR</span>
          </div>
        </Link>
        <nav className="mt-10 flex flex-1 flex-col gap-2">
          {links.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                href={href}
                key={href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-lime-300" : "text-white/40 group-hover:text-white/80"}`} />
                {label}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction} className="mt-auto">
          <button className="group flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400">
            <LogOut className="h-5 w-5 text-white/40 transition-colors group-hover:text-red-400" />
            Logout
          </button>
        </form>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/10 bg-black/80 px-2 pb-safe pt-2 backdrop-blur-md lg:hidden">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              href={href}
              key={href}
              className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-colors ${isActive ? "text-lime-300" : "text-white/50 hover:text-white"
                }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto min-h-screen max-w-6xl px-5 py-8 lg:ml-[300px] lg:px-10">
        {children}
      </main>
    </div>
  );
}
