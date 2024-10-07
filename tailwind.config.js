/** @type {import('tailwindcss').Config */
  module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          'fade-in-down': {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          'pulse': {
            '0%, 100%': { opacity: '1', transform: 'scale(1)' },
            '50%': { opacity: '0.9', transform: 'scale(1.05)' },
          },
          'zoom-pan': {
            '0%, 100%': { backgroundSize: '150% auto', backgroundPosition: '0% 50%' },
            '50%': { backgroundSize: '165% auto', backgroundPosition: '100% 50%' },
          },
        },
        animation: {
          'fade-in-down': 'fade-in-down 1s ease-out',
          'fade-in-up': 'fade-in-up 1s ease-out',
          'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'zoom-pan': 'zoom-pan 15s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  }