"use client";

import Link from "next/link";
import BrandMark from "./BrandMark";
import SiteFooter from "./SiteFooter";
import ThemeToggle from "./ThemeToggle";

export default function LegalChrome({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="legal-page">
      <header className="legal-top">
        <Link href="/" aria-label="Back to Celestial Radio">
          <BrandMark size={40} />
        </Link>
        <div className="legal-top-actions">
          <ThemeToggle />
          <Link href="/" className="listen-btn legal-listen">Listen live</Link>
        </div>
      </header>
      <article className="legal-article">
        <h1>{title}</h1>
        {children}
      </article>
      <SiteFooter />
    </div>
  );
}
