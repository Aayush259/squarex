import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /animate-txt-slide-\d+/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
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
        spotlight: {
          "0%": {
            opacity: '0',
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: '1',
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        'txt-slide': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '10%': { opacity: '1', transform: 'translateY(0)' },
          '20%': { opacity: '1', transform: 'translateY(0)' },
          '30%': { opacity: '0', transform: 'translateY(-28px)' },
          '100%': { opacity: '0', transform: 'translateY(-28px)' },
        },
        'toast': {
          '0%': { width: '100%' },
          '100%': { width: '0%' }
        },
        'heightActive': {
          '0%': { height: '0px' },
          '100%': { height: '16px' }
        },
      },
      animation: {
        "scroll1": "scroll1 30s linear infinite forwards",
        "scroll2": "scroll2 30s linear 15s infinite forwards",
        "spin2": "spin2 3s linear infinite",
        "loading1": "loading 1s infinite",
        "loading2": "loading 1s infinite 0.2s",
        "loading3": "loading 1s infinite 0.4s",
        "spotlight": "spotlight 2s ease .75s 1 forwards",
        'txt-slide-1': 'txt-slide 10s ease-in-out 0s infinite',
        'txt-slide-2': 'txt-slide 10s ease-in-out 2s infinite',
        'txt-slide-3': 'txt-slide 10s ease-in-out 4s infinite',
        'txt-slide-4': 'txt-slide 10s ease-in-out 6s infinite',
        'txt-slide-5': 'txt-slide 10s ease-in-out 8s infinite',
        'toast': 'toast 4s linear forwards',
        'heightActive': 'heightActive 0.2s linear forwards',
      }
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
