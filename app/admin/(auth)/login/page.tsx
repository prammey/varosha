import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession, passwordIsConfigured } from "@/lib/admin/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in · Varosha admin", robots: { index: false } };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  const configured = passwordIsConfigured();

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
          <LoginForm />
        ) : (
          <p className="text-[0.95rem] leading-relaxed text-ink-2">
            Admin login needs to be configured by the website developer. Production requires a password of at least 16 characters and a separate session secret of at least 32 characters.
          </p>
        )}
      </div>
    </div>
  );
}
