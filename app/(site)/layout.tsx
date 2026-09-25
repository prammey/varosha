import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialRail } from "@/components/layout/SocialRail";

/** Every public page gets the header, the social rail and the footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <SocialRail />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
