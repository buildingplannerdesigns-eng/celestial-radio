import type { Metadata } from "next";
import LegalChrome from "@/components/LegalChrome";
import { AboutBody } from "@/content/legal";

export const metadata: Metadata = {
  title: "About",
  description: "Celestial Radio streams live Ghana, Africa and world radio. Designed by Celestial Web Solutions.",
};

export default function AboutPage() {
  return (
    <LegalChrome title="About Celestial Radio">
      <AboutBody />
    </LegalChrome>
  );
}
