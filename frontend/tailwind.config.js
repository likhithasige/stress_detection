/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        calmBlue: "#A7C7E7",
        softMint: "#BEE3DB",
        warmGray: "#FAFAFA",
        ocean: "#89CFF0",
        deepIndigo: "#4C6EF5",
        softWhite: "#FFFFFF",
      },
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        calm: "0 8px 24px rgba(100, 150, 255, 0.2)",
      },
      backgroundImage: {
        "soft-gradient":
          "linear-gradient(135deg, #E0F7FA 0%, #E6EEFA 50%, #FAFAFA 100%)",
      },
    },
  },
  plugins: [],
};
