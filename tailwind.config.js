/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Omni - darker, serious security palette
        'omni-black': '#050507',
        'omni-dark': '#0c0c12',
        'omni-violet': '#6d28d9',
        'omni-indigo': '#4f46e5',
        'omni-teal': '#0d9488',
      },
    },
  },
  plugins: [],
}
