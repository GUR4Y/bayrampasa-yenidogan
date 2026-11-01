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
        brand: {
          red: "#DC2626",
          redDark: "#991B1B",
          redLight: "#EF4444",
          black: "#0A0A0B",
          dark: "#121214",
          card: "#18181B",
          cardBorder: "#27272A",
          surface: "#1F1F23",
          gold: "#EAB308",
        },
      },
      fontFamily: {
        heading: ["Roboto Condensed", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.18), transparent 70%)",
        "red-black-diagonal": "linear-gradient(135deg, #DC2626 0%, #121214 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
