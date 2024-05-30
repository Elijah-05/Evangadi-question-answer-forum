/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#516cf1",
        primaryHover: "#334dcc",
        secondary: "#fe8302",
        secondaryHover: "#ffa442",
        darkBlue: "#3a4559",
        darkGray: "f5f5f5",
      },
      screens: {
        xs: "380px",
      },
    },
  },
  plugins: [],
};
