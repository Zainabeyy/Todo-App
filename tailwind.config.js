/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Josefin Sans", "sans-serif"],
    },
    extend: {
      colors: {
        white: {
          '000':'#fff',
          100: "hsl(0, 0%, 98%)",
        },
        green: {
          dark: "#141819",
          light:"#1a422f",
          lighter:'#cdcdcd'
        },
      },
      fontSize: {
        base: "1.125rem",
        sm: "1rem",
      },
      width: {
        "h-52": "12.5rem",
      },
      borderWidth: {
        1: "1px",
      },
      inset: {
        3: "0.85rem",
      },
      zIndex: {
        5: 5,
      },
    },
  },
  plugins: [],
};
