import type { Metadata } from "next";
import LegalChrome from "@/components/LegalChrome";
import { PrivacyBody } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Celestial Radio handles your information.",
};

export default function PrivacyPage() {
  return (
    <LegalChrome title="Privacy Policy">
      <PrivacyBody />
    </LegalChrome>
  );
}
