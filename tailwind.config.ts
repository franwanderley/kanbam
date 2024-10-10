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
        "bg-primary": "#21212d",
        "bg-secondary": "#2c2c38",
        "button": "#645fc6",
        "border": "#636466",
      }
    },
  },
  plugins: [],
};
export default config;
