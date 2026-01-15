/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This allows you to use className="font-dot" in JSX if needed
        dot: ['"Bitcount Prop Single"', 'monospace'],
      },
    },
  },
  plugins: [],
}