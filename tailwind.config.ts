import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      md: "768px",
      lg: "1280px",
      xl: "1920px",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "lower-roman",
    },
    extend: {
      // All the widths and minHeights are follow the Figma section size to define
      // mobile: The Mobile section size
      // md: The Tablet section size
      // lg: The Desktop section size
      // xl: The Largest section size
      width: {
        mobile: "375px",
        md: "768px",
        lg: "1280px",
        xl: "1920px",
      },
      height: {
        "navbar-mobile": "60px",
        "navbar-md": "60px",
        "navbar-lg": "80px",
        "navbar-xl": "80px",
      },
      minHeight: {
        mobile: "589px",
        md: "768px",
        lg: "752px",
        xl: "1000px",
      },
      padding: {
        xMobile: "20px",
        xMd: "40px",
        xLg: "90px",
        xXl: "100px",
        yMobile: "26px",
        yMd: "60px",
        yLg: "80px",
        yXl: "80px",
        "navbar-mobile": "60px",
        "navbar-md": "60px",
      },
      margin: {
        xMobile: "20px",
        xMd: "40px",
        xLg: "90px",
        xXl: "100px",
        yMobile: "26px",
        yMd: "60px",
        yLg: "80px",
        yXl: "80px",
        "navbar-mobile": "60px",
        "navbar-md": "60px",
      },
      colors: {
        bondscape: {
          primary: "#8358F9",
          hover: "#FFF3E0",
          text: "#E8E8E8",
          background: { primary: "#010308" },
        },
      },
      backgroundImage: {
        "bondscape-home-bg-mobile":
          "url('/bondscape-home-bg-mobile-masked.png')",
        "bondscape-home-bg": "url('/bondscape-home-bg-masked.png')",
      },
    },
  },
  plugins: [],
};
export default config;
