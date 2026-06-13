import { Toaster } from "sonner";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster theme="dark" position="bottom-right" />
    </>
  );
}
