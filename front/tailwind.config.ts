import type { Config } from "tailwindcss";

const config: Config = {
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
        'hizurun-red': '#ffbaba', // カスタムカラーの追加
      },
      keyframes: {
        shojiLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shojiRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },

        sunrise: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        sakura: {
          "0%": { transform: "translate(90%,-50%)", opacity: "1" },
          "100%": { transform: "translate(-90%,50%)", opacity: "0" },
        },
      },
      animation: {
        "shoji-left": "shojiLeft 8s ease-in-out forwards",
        "shoji-right": "shojiRight 8s ease-in-out forwards",
        sunrise: "sunrise 3s ease-in-out 1s forwards ",
        sakura: "sakura 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
