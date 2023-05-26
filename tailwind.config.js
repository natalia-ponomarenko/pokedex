/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "juicy-red": "#ff0000",
      },
      spacing: {
        'screen-offset': 'calc(100vw - 100%)',
      },
    },
  },
  plugins: [],
}

