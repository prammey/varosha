import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialRail } from "@/components/layout/SocialRail";
import { PreviewSwitcher } from "@/components/preview/PreviewSwitcher";
import { PREVIEW_COOKIE, type PreviewTheme } from "@/lib/preview-theme";

// Fetch published content on each visitor request, including after a server restart.
export const dynamic = "force-dynamic";

/** Every public page gets the header, the social rail and the footer. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookie = (await cookies()).get(PREVIEW_COOKIE)?.value;
  const preview: PreviewTheme | null = cookie === "alt" || cookie === "original" ? cookie : null;

  const page = (
    <>
      <Header />
      <SocialRail />
      <main id="main">{children}</main>
      <Footer />
    </>
  );

  return (
    <>
      {/* styles/theme-alt.css recolors everything inside .theme-alt */}
      {preview === "alt" ? <div className="theme-alt">{page}</div> : page}
      {preview && <PreviewSwitcher current={preview} />}
    </>
  );
}
