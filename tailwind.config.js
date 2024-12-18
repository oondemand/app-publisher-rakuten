const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans], // Define Inter como a fonte padrão sans
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        brand: {
          25: "#FBFBFB",
          50: "#FAF3FF",
          75: "#eee8f3",
          100: "#EAD1FC",
          200: "#D9B0F9",
          300: "#C08AEF",
          350: "#9013FE",
          400: "#8328CC",
          500: "#8528CE",
          600: "#7200e6",
          700: "#5e00b3",
          800: "#4a0080",
          850: "#3D1C4F",
          900: "#2e0033",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
