import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--text)",
        },
        popover: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--text)",
        },
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-ink)",
        },
        secondary: {
          DEFAULT: "var(--card-hover)",
          foreground: "var(--text)",
        },
        muted: {
          DEFAULT: "var(--card-hover)",
          foreground: "var(--muted)",
        },
        destructive: {
          DEFAULT: "var(--live)",
          foreground: "#ffffff",
        },
        border: "var(--line)",
        input: "var(--line)",
        ring: "var(--accent)",
        ink: "#1C203C",
        inkdeep: "#10131F",
        inkmid: "#252A48",
        tsharp: "#14D8CC",
        iris: "#9FAEFD",
        popgold: "#FEC25A",
        popcoral: "#FD685F",
        pewter: "#A7A4A0",
      },
      boxShadow: {
        tile: "0 8px 24px rgba(0,0,0,0.28)",
        player: "0 -8px 32px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
