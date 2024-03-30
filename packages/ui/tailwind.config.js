/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C6758',
        secondary: '#3D8361',
        tertiary: '#D6CDA4',
        quaternary: '#EEF2E6',
      }
    },
  },
  plugins: [],
}