module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        default: "#17AEB6",
        defaultLight: "#1ce0eb",
        defaultDark: "#118b91",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
