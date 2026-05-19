/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        num:     ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
