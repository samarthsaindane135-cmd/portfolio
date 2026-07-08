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
        ink: "#0B0E14",
        surface: "#12161F",
        amber: "#E8A33D",
        teal: "#5EEAD4",
        text: "#EDEBE6",
        muted: "#8B93A7",
      },
      fontFamily: {
        sans: ["var(--font-ibm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
