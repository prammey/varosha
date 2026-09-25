import { headers } from "next/headers";
import { requireAdmin } from "@/lib/admin/auth";
import { getStore } from "@/lib/data/store";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = { title: "Varosha admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const store = await getStore();
  const readOnly = !(await store.canWrite());
  // which section is open, for the sidebar highlight
  const path = (await headers()).get("x-admin-path") ?? "";
  return (
    <AdminShell user={session.name} readOnly={readOnly} current={path}>
      {children}
    </AdminShell>
  );
}
