export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",          // enables dark theme via class
  theme: { extend: {
    keyframes: {
        caret: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        caret: 'caret 1s step-end infinite',
      },
  } },
  plugins: [],
};


