import Image from "next/image";
import { redirect } from "next/navigation";
import { authMode, getSession, passwordIsConfigured } from "@/lib/admin/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in · Varosha admin", robots: { index: false } };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  const mode = authMode();
  const configured = mode === "supabase" || passwordIsConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f2ea] px-4 font-sans text-ink">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-8 shadow-card">
        <div className="mb-6 flex items-center gap-3">
          <Image src="/brand/logo.svg" alt="" width={44} height={44} className="rounded-lg" />
          <div className="leading-tight">
            <div className="display text-2xl">Varosha</div>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-mute">Admin</div>
          </div>
        </div>
        {configured ? (
          <LoginForm mode={mode} />
        ) : (
          <p className="text-[0.95rem] leading-relaxed text-ink-2">
            No admin password is set yet. Create a file called <code className="rounded bg-cream-2 px-1">.env.local</code> in the project folder with a line like <code className="rounded bg-cream-2 px-1">ADMIN_PASSWORD=choose-something</code>, then restart the site.
          </p>
        )}
      </div>
    </div>
  );
}
