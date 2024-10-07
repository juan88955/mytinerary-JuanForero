/** @type {import('tailwindcss').Config */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define animaciones personalizadas
      keyframes: {
        // Animación de entrada desde arriba
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Animación de entrada desde abajo
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Animación de pulso
        'pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        // Animación compleja de zoom y paneo para el fondo
        'zoom-pan-enhanced': {
          '0%, 100%': {
            backgroundSize: '150% auto',
            backgroundPosition: '0% 50%',
            filter: 'brightness(1) contrast(1)'
          },
          '25%': {
            backgroundSize: '160% auto',
            backgroundPosition: '50% 25%',
            filter: 'brightness(1.1) contrast(1.05)'
          },
          '50%': {
            backgroundSize: '170% auto',
            backgroundPosition: '100% 50%',
            filter: 'brightness(1.2) contrast(1.1)'
          },
          '75%': {
            backgroundSize: '160% auto',
            backgroundPosition: '50% 75%',
            filter: 'brightness(1.1) contrast(1.05)'
          },
        },
      },
      // Define las clases de animación que se pueden usar en el HTML/JSX
      animation: {
        'fade-in-down': 'fade-in-down 2s ease-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'zoom-pan-enhanced': 'zoom-pan-enhanced 30s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}