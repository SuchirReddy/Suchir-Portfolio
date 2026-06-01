import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "Inter", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      boxShadow: {
        "glass": "0 24px 90px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
        "neon": "0 0 50px rgba(197, 255, 61, 0.25), 0 0 110px rgba(64, 224, 208, 0.16)",
      },
      animation: {
        "mesh-shift": "mesh-shift 18s ease-in-out infinite alternate",
        "grain-drift": "grain-drift 10s steps(10) infinite",
      },
      keyframes: {
        "mesh-shift": {
          "0%": { transform: "translate3d(-2%, -1%, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, 1%, 0) scale(1.05)" },
          "100%": { transform: "translate3d(0, -2%, 0) scale(1.02)" },
        },
        "grain-drift": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-6%, -4%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
