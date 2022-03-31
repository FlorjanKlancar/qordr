module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        default: "#17AEB6",
        defaultLight: "#1ce0eb",
        defaultDark: "#118b91",
        darkThemeBackground: "#202225",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
