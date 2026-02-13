/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF7F1A',
        secondary: '#005EB8',
        cream: '#FFFDF9',
        'card-bg': '#FFF4E0',
        'footer-dark': '#003366',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        subtle: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        card: '0 4px 14px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
