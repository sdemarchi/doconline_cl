/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grad-blue': '#00b1ff',
        'grad-green': '#01cfcf',
        'gray-bg': '#e9e8ee',
        'input': '#03cdcf',
      },
    },
  },
  plugins: [],
}

