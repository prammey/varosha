import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialRail } from "@/components/layout/SocialRail";
import { OverscrollColor } from "@/components/layout/OverscrollColor";
import { PreviewSwitcher } from "@/components/preview/PreviewSwitcher";
import { PREVIEW_COOKIE, type PreviewTheme } from "@/lib/preview-theme";

// Fetch published content on each visitor request, including after a server restart.
export const dynamic = "force-dynamic";

/**
 * Every public page gets the header, the social rail and the footer.
 * The site opens in the brand colors; the floating switcher (always shown) lets
 * the board flip to the current design, which sets a session cookie via /original.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookie = (await cookies()).get(PREVIEW_COOKIE)?.value;
  const theme: PreviewTheme = cookie === "original" ? "original" : "alt";

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
      {theme === "alt" ? <div className="theme-alt">{page}</div> : page}
      <PreviewSwitcher current={theme} />
      <OverscrollColor />
    </>
  );
}
