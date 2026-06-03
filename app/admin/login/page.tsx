"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";

import { loginAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <main className="relative grid min-h-screen place-items-center bg-[#020202] px-5 text-white selection:bg-lime-300/30 selection:text-white">
      {/* Background glow effect */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/5 blur-[120px]" />
      </div>

      <form
        action={action}
        className="relative z-10 w-full max-w-[420px] rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl sm:p-10"
      >
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-300/30 bg-lime-300/10 shadow-[0_0_30px_rgba(195,228,29,0.15)] ring-1 ring-lime-300/20">
            <span className="text-3xl text-lime-300" style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>SR</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm font-medium text-white/50">
            Sign in to access your portfolio dashboard
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-lime-300/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-lime-300/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-lime-300/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-lime-300/50"
            />
          </div>
        </div>

        {state?.error ? (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center">
            <p className="text-sm font-medium text-red-400">{state.error}</p>
          </div>
        ) : null}

        <button
          disabled={pending}
          className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-4 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-lime-300"
        >
          {pending ? (
            "Authenticating..."
          ) : (
            <>
              Sign in to Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </main>
  );
}
