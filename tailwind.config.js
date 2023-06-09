/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['var(--font-quicksand)'],
      },
      backgroundImage: {
        'hero-background': "url('/Hero-Background.jpg')",
      },
      boxShadow: {
        'cover': 'inset 0 0 0 1000px rgba(0,0,0,.4);'
      },
      colors: {
        'primary': '#68EDC6',
        'secondary': '#90F3FF',
        'background': 'rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
