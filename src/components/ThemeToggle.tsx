"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ label = true }: { label?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  const dark = !ready || resolvedTheme !== "light";

  return (
    <button
      type="button"
      className="theme-btn"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
      {label && <span>{dark ? "Light" : "Dark"}</span>}
    </button>
  );
}
