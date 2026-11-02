/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif']
      },
      // Tailles de police relevées : plus rien en dessous de 13px
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.25rem' }], // 13px
        sm: ['0.9375rem', { lineHeight: '1.4rem' }], // 15px
        base: ['1rem', { lineHeight: '1.55rem' }] // 16px
      },
      colors: {
        brand: {
          50: '#effaff',
          100: '#d6f1ff',
          200: '#b2e6ff',
          300: '#7dd5fb',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1'
        },
        ink: '#0f1b2d'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,27,45,.04), 0 8px 24px -12px rgba(15,27,45,.10)',
        glow: '0 10px 24px -8px rgba(14,165,233,.55)'
      }
    }
  },
  plugins: []
};
