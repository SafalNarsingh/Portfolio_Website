/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures TSX files are scanned
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        dot: ['"DotGothic16"', 'sans-serif'],
      },
      backgroundImage: {
        'halftone': 'radial-gradient(circle, #000 2px, transparent 2.5px)',
      }
    },
  },
  plugins: [],
}