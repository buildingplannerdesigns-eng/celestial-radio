"use client";

import { useEffect, useState } from "react";

/**
 * Drop this inside your root layout or page.tsx.
 * It registers the service worker silently — no UI impact.
 */
export default function PWARegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[CelestialFM] SW registered:", reg.scope);
          })
          .catch((err) => {
            console.warn("[CelestialFM] SW registration failed:", err);
          });
      });
    }
    // Listen for PWA install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setShowPrompt(false);
      setDeferredPrompt(null);
      if (outcome === "accepted") {
        alert("App will be installed on your device!");
      }
    }
  };

  // Detect dark mode
  const isDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const promptBg = isDark ? "#1C203C" : "#1C203C";
  const promptColor = "#fff";
  const btnBg = "#F5C542";
  const btnColor = "#10131F";
  return showPrompt ? (
    <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: promptBg, color: promptColor, padding: "14px 28px", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.25)", zIndex: 9999, fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 15 }}>
      <span style={{ marginRight: 16 }}>Install Celestial Radio for a better experience!</span>
      <button onClick={handleInstall} style={{ background: btnBg, color: btnColor, border: "none", borderRadius: 8, padding: "7px 18px", fontWeight: 700, cursor: "pointer", fontFamily: 'Syne,sans-serif', fontSize: 15 }}>Install</button>
      <button onClick={() => setShowPrompt(false)} style={{ marginLeft: 10, background: "none", color: promptColor, border: "none", fontSize: 18, cursor: "pointer" }} title="Dismiss">×</button>
    </div>
  ) : null;
}
