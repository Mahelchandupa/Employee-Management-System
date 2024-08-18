/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'pop': ['Poppins', 'sans-serif'],
        'mont': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        'sidebar-bg': '#f8f9fc',
        'text-primary': '#082431',
        'text-highlight': '#5a6acfff',
        'primary': '#0D6EFD',
        'purple': {
          '600': '#6B21A8',
          '700': '#581C87',
        },
        'gray': {
          '900': '#1F2937',
          '800': '#2D3748',
          '700': '#4A5568',
        },
      }
    },
  },
  plugins: [], 
}