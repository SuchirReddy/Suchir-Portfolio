import { AdminShell } from "@/components/admin/admin-shell";
import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <AdminShell>
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-lime-300" />
        <p className="text-sm font-medium text-white/50">Loading...</p>
      </div>
    </AdminShell>
  );
}
