import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = { title: terms.title };

export default function TermsPage() {
  return <LegalPage page={terms} />;
}
