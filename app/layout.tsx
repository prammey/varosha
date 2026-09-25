import type { Metadata } from "next";
import { Fraunces, Karla, Source_Serif_4 } from "next/font/google";
import "@/styles/globals.css";
import { ArchDefs } from "@/components/ui/ArchDefs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialRail } from "@/components/layout/SocialRail";
import { site } from "@/content/site";

// Display face: headlines and the wordmark
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body face
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});

// UI face: nav, labels, buttons, captions
const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/hero/tailoring-graduates.jpg", width: 1400, height: 1600 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`no-js ${fraunces.variable} ${sourceSerif.variable} ${karla.variable}`}>
      <head>
        {/* lets CSS know JavaScript is running, so scroll-reveal can start hidden */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
      </head>
      <body>
        <ArchDefs />
        <Header />
        <SocialRail />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
