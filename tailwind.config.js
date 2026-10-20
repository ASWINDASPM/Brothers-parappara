/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        club: {
          green: '#16a34a',
          lightGreen: '#22c55e',
          darkGreen: '#15803d',
          deepGreen: '#0f4223',
          mint: '#eafbf0',
          navy: '#0b192c',
          dark: '#0f172a',
          slate: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      }
    },
  },
  plugins: [],
}
