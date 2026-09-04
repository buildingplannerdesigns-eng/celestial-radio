"use client";

import Link from "next/link";
import { ExternalLink, Radio } from "lucide-react";

import BrandMark from "./BrandMark";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { LegalId } from "@/content/legal";

type ListenTab = "home" | "ghana" | "africa" | "world";

export default function SiteFooter({
  onListen,
  onLegal,
}: {
  onListen?: (tab: ListenTab) => void;
  onLegal?: (page: LegalId) => void;
} = {}) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandMark size={44} />
            <p>
              Live Ghana, Africa and world radio. Hear news, sports, music and talk from one dial.
            </p>
            {onListen ? (
              <Button className="mt-4 w-fit" onClick={() => onListen("home")}>
                <Radio className="size-4" />
                Back to live radio
              </Button>
            ) : (
              <Link href="/" className={cn(buttonVariants(), "mt-4 w-fit")}>
                <Radio className="size-4" />
                Listen live
              </Link>
            )}
          </div>

          <nav aria-label="Listen">
            <h3>Listen</h3>
            <ul>
              <li><FooterItem href="/" onClick={onListen ? () => onListen("home") : undefined}>Home</FooterItem></li>
              <li><FooterItem href="/?tab=ghana" onClick={onListen ? () => onListen("ghana") : undefined}>Ghana</FooterItem></li>
              <li><FooterItem href="/?tab=africa" onClick={onListen ? () => onListen("africa") : undefined}>Africa</FooterItem></li>
              <li><FooterItem href="/?tab=world" onClick={onListen ? () => onListen("world") : undefined}>World</FooterItem></li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3>Company</h3>
            <ul>
              <li><FooterItem href="/about" onClick={onLegal ? () => onLegal("about") : undefined}>About us</FooterItem></li>
              <li>
                <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">
                  Celestial Web Solutions
                  <ExternalLink className="ml-1 inline size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">
                  Contact
                  <ExternalLink className="ml-1 inline size-3 opacity-60" />
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3>Legal</h3>
            <ul>
              <li><FooterItem href="/terms" onClick={onLegal ? () => onLegal("terms") : undefined}>Terms &amp; Conditions</FooterItem></li>
              <li><FooterItem href="/privacy" onClick={onLegal ? () => onLegal("privacy") : undefined}>Privacy Policy</FooterItem></li>
            </ul>
          </nav>
        </div>

        <Separator className="my-7" />

        <div className="footer-bottom">
          <span>
            Designed by{" "}
            <a href="https://celestialwebsolutions.net" target="_blank" rel="noopener noreferrer">
              Celestial Web Solutions
            </a>
          </span>
          <span>© {year} Celestial Radio. Live streams belong to their broadcasters.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
  return <Link href={href}>{children}</Link>;
}
