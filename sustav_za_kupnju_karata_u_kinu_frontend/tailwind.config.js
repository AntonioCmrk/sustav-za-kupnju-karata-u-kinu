/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      primary: {
        DEFAULT: "#03234A",
        dark: "#011125",
        light: "#2f89f7",
      },
      secondary: {
        DEFAULT: "#59B8C8",
        dark: "#24626d",
        light: "#acdbe3",
      },
      terary: {
        DEFAULT: "#8FFBFB",
        dark: "#07bebe",
        light: "#c7fdfd",
      },
      quaternary: {
        DEFAULT: "#C3EDF3",
        dark: "#25a4b6",
        light: "#e1f6f9",
      },
      accent: {
        DEFAULT: "#F67740",
        dark: "#943207",
        light: "#fabb9f",
        hover: "#f78b5d",
      },
    },
  },
  plugins: [],
};
