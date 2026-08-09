import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EDE5",
        orange: "#F35634",
        gold: "#F3DE92",
        pale: "#CDDDE3",
        dark: "#842318",
        ink: "#111111"
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        serif: ['"Times New Roman"', "Times", "serif"]
      },
      transitionTimingFunction: {
        orbit: "cubic-bezier(.16,.84,.44,1)"
      }
    }
  },
  plugins: []
};

export default config;
