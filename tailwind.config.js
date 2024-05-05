/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fonts: {
        fontInter: '"Inter", sans-serif',
        fontPoppins: '"Poppins", sans-serif;',
        fontRale: '"Raleway", sans-serif;',
        fontLobster: '"Lobster", sans-serif;'
      }
    },
  },
  plugins: [],
}

