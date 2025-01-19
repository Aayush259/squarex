import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "scroll1": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scroll2": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-200%)" },
        },
        "spin2": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "loading": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "scroll1": "scroll1 30s linear infinite forwards",
        "scroll2": "scroll2 30s linear 15s infinite forwards",
        "spin2": "spin2 3s linear infinite",
        "loading1": "loading 1s infinite",
        "loading2": "loading 1s infinite 0.2s",
        "loading3": "loading 1s infinite 0.4s",
      }
    },
  },
  plugins: [],
} satisfies Config;
