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
        ink: '#0D0D0D',
        paper: '#F7F5F0',
        accent: '#1A3A5C',
        highlight: '#C8A96E',
        muted: '#8A8A8A',
        border: '#E0DDD6',
      },
    },
  },
  plugins: [],
}
