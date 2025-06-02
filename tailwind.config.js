/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ajuste conforme sua estrutura
  ],
  theme: {
    extend: {
      colors: {
        'outline-ring': 'rgba(147, 197, 253, 1)', // Azul claro (por exemplo)
      },
    },
  },
  plugins: [],
};
