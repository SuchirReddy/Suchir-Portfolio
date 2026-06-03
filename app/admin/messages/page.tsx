import { deleteMessageAction, markMessageReadAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function MessagesPage() {
  await requireAdmin();
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Messages</h1>
      <div className="mt-8 grid gap-4">
        {messages.length === 0 ? <p className="text-white/45">No messages yet.</p> : null}
        {messages.map((message) => (
          <article key={message.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{message.name}</h2>
                  {message.company && (
                    <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
                      {message.company}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <p className="text-sm text-white/45">{message.email}</p>
                  {message.mobile && (
                    <>
                      <span className="text-white/20">•</span>
                      <p className="text-sm text-white/45">{message.mobile}</p>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-white/35">{message.createdAt.toLocaleString()}</p>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-white/75">{message.message}</p>
            <div className="mt-4 flex gap-2">
              {!message.isRead ? (
                <form action={markMessageReadAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <button className="rounded-lg border border-white/10 px-3 py-2 text-sm">Mark read</button>
                </form>
              ) : (
                <span className="rounded-lg border border-lime-300/20 px-3 py-2 text-sm text-lime-200">Read</span>
              )}
              <form action={deleteMessageAction}>
                <input type="hidden" name="id" value={message.id} />
                <button className="rounded-lg border border-red-400/30 px-3 py-2 text-sm text-red-200">Delete</button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
