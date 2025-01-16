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
        }
      },
      animation: {
        "scroll1": "scroll1 30s linear infinite forwards",
        "scroll2": "scroll2 30s linear 15s infinite forwards",
        "spin2": "spin2 3s linear infinite"
      }
    },
  },
  plugins: [],
} satisfies Config;
