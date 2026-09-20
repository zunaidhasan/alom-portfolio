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
        background: '#0a0a0a',
        surface: {
          DEFAULT: '#121212',
          card: '#161616',
          elevated: '#1a1a1a',
          hover: '#222222',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-gold': 'rgba(212, 175, 55, 0.22)',
        },
        gold: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F4E5C7',
          300: '#EBD19B',
          400: '#E0BC68',
          500: '#D4AF37', // Refined Studio Gold
          600: '#B89225',
          700: '#8E6F18',
          800: '#644D12',
          900: '#3D2F0B',
        },
        accent: {
          DEFAULT: '#D4AF37',
          hover: '#E5C378',
          light: '#F5E4B2',
          teal: '#00D4C8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(212, 175, 55, 0.3)',
        'glow-sm': '0 0 15px -3px rgba(212, 175, 55, 0.25)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      }
    },
  },
  plugins: [],
}
