import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { accessibility } from "@/content/legal";

export const metadata: Metadata = { title: accessibility.title };

export default function AccessibilityPage() {
  return <LegalPage page={accessibility} />;
}
