import type { Metadata } from "next";
import LegalChrome from "@/components/LegalChrome";
import { TermsBody } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using Celestial Radio.",
};

export default function TermsPage() {
  return (
    <LegalChrome title="Terms & Conditions">
      <TermsBody />
    </LegalChrome>
  );
}
