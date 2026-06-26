/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        ink: '#111111',
        paper: '#FFFFFF',
        accent: '#111111',
        highlight: '#1573c0',
        muted: '#646A75',
        border: '#D7DDE5',
      },
    },
  },
  plugins: [],
}
