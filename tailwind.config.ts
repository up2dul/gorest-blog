import type { Config } from "tailwindcss";
import { generateAntdColors } from "./src/lib/utils";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      // Add all Ant Design colors
      ...generateAntdColors(),
    },
  },
  plugins: [],
};
export default config;
