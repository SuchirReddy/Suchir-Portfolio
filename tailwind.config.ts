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
        lime: {
          100: "#EDF1F4",
          200: "#D4DEE5",
          300: "#BBCCD7",
          400: "#9CAFB9",
          500: "#7E929C",
          600: "#646973",
          700: "#4D535C",
          800: "#3A3E45",
          900: "#2B2E33",
        },
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
        "neon": "0 0 50px rgba(187, 204, 215, 0.25), 0 0 110px rgba(187, 204, 215, 0.16)",
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
