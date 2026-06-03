"use client";

import { useActionState, useEffect, useState } from "react";
import { Send } from "lucide-react";

import { submitContactMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";

const initialState = {
  error: null as string | null,
  success: false,
};

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);
  const [hasSucceeded, setHasSucceeded] = useState(false);

  useEffect(() => {
    if (state.success) {
      setHasSucceeded(true);
      const timer = setTimeout(() => setHasSucceeded(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:px-12">
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl">
          Get in <span className="text-lime-500 dark:text-lime-300">Touch</span>
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-white/50">
          Interested in working together or have a question? Leave a message below.
        </p>
      </div>

      <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 shadow-glass sm:p-10">
        <form action={formAction} className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-white/70">Name</span>
              <input
                type="text"
                name="name"
                required
                className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-zinc-900 dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 outline-none transition-colors focus:border-lime-500/50 dark:focus:border-lime-300/50"
                placeholder="Your Name"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-white/70">Email</span>
              <input
                type="email"
                name="email"
                required
                className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-zinc-900 dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 outline-none transition-colors focus:border-lime-500/50 dark:focus:border-lime-300/50"
                placeholder="yourname@example.com"
              />
            </label>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-white/70">Mobile Number (Optional)</span>
              <input
                type="tel"
                name="mobile"
                className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-zinc-900 dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 outline-none transition-colors focus:border-lime-500/50 dark:focus:border-lime-300/50"
                placeholder="+1 234 567 890"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-white/70">Company (Optional)</span>
              <input
                type="text"
                name="company"
                className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-zinc-900 dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 outline-none transition-colors focus:border-lime-500/50 dark:focus:border-lime-300/50"
                placeholder="Your Company"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-white/70">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="resize-none rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-zinc-900 dark:text-white placeholder:text-black/40 dark:placeholder:text-white/30 outline-none transition-colors focus:border-lime-500/50 dark:focus:border-lime-300/50"
              placeholder="How can I help you?"
            />
          </label>

          {state.error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {state.error}
            </div>
          )}

          {hasSucceeded && (
            <div className="rounded-xl border border-lime-300/30 bg-lime-300/10 px-4 py-3 text-sm text-lime-200">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sending..." : "Send Message"}
              {!isPending && <Send className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
