import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import PWARegister from "./PWARegister";
import ThemeProvider from "../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const APP_URL = "https://radio.celestialwebsolutions.net"; // update to your domain

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Celestial Radio — Live Ghana & Africa Internet Radio",
    template: "%s | Celestial Radio",
  },
  description:
    "Stream live Ghana, Africa and world radio stations free online. Peace FM, Joy FM, Adom FM, Citi FM and 20+ more stations. Built by Celestial Web Solutions.",
  keywords: [
    "Ghana radio online",
    "live radio Ghana",
    "Peace FM live",
    "Joy FM online",
    "Adom FM stream",
    "Africa radio",
    "internet radio Ghana",
    "Celestial Radio",
  ],
  authors: [{ name: "Celestial Web Solutions", url: "https://celestialwebsolutions.net" }],
  creator: "Celestial Web Solutions",
  publisher: "Celestial Web Solutions",
  applicationName: "Celestial Radio",
  generator: "Next.js",
  category: "music",

  /* ── Icons ── */
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png",  sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#F5C542" },
    ],
  },

  /* ── Manifest ── */
  manifest: "/manifest.json",

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    url: APP_URL,
    title: "Celestial Radio — Live Ghana & Africa Internet Radio",
    description:
      "Stream Peace FM, Joy FM, Adom FM, Citi FM and 20+ Ghana & Africa stations live. Free internet radio.",
    siteName: "Celestial Radio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Celestial Radio — Live Ghana & Africa Internet Radio",
      },
    ],
  },

  /* ── Twitter Card ── */
  twitter: {
    card: "summary_large_image",
    title: "Celestial Radio — Live Ghana & Africa Internet Radio",
    description: "Stream 27+ Ghana & Africa radio stations free online.",
    images: ["/og-image.png"],
    creator: "@celestialwebgh",
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1020" },
    { media: "(prefers-color-scheme: light)", color: "#F3F4F8" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const stored = (await cookies()).get("cr_theme")?.value;
  const theme = stored === "light" ? "light" : "dark";

  return (
    <html lang="en" className={inter.variable} data-theme={theme} suppressHydrationWarning>
      <head>
        {/* Extra PWA/browser meta not covered by Next.js metadata API */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CelestialFM" />
        <meta name="msapplication-TileColor" content="#0B1020" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider initialTheme={theme}>
          <PWARegister />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
