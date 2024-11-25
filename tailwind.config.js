/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        brand: {
          white: '#f7f4fe',
          black: '#212121',
          blue: {
            light: '#A0B4FF',
            base: '#647EFF',
            dark: '#4358B3',
          },
        },
      },
    },
  },
  plugins: [],
}
