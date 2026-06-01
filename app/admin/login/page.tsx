"use client";

import { useActionState } from "react";

import { loginAction } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 text-white">
      <form
        action={action}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-glass backdrop-blur-xl"
      >
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-white/45">Single-owner CMS access.</p>
        <label className="mt-6 block text-sm text-white/70">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-lime-300/60"
          />
        </label>
        <label className="mt-4 block text-sm text-white/70">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-lime-300/60"
          />
        </label>
        {state?.error ? <p className="mt-4 text-sm text-red-300">{state.error}</p> : null}
        <button
          disabled={pending}
          className="mt-6 w-full rounded-lg bg-lime-300 px-4 py-2 font-medium text-black disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
