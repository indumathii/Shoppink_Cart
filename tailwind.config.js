/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '65': '16.75rem', // Customize or add specific values
      },
    },
  },
  plugins: [],
}