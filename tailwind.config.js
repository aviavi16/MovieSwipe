/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      colors: {
        ink: '#050816',
        panel: 'rgba(14, 19, 35, 0.72)',
        border: 'rgba(255, 255, 255, 0.08)',
        accent: {
          50: '#eefdfb',
          100: '#d6fbf6',
          200: '#aef7ec',
          300: '#7ff0df',
          400: '#46e1cb',
          500: '#1ec9b0',
          600: '#149f8c',
          700: '#147e72',
          800: '#145f57',
          900: '#144d49'
        },
        danger: {
          50: '#fff1f1',
          100: '#ffe0e0',
          200: '#ffc2c2',
          300: '#ff9898',
          400: '#ff6a6a',
          500: '#f43f5e',
          600: '#dc264a',
          700: '#b61b39',
          800: '#951a32',
          900: '#7e1a2f'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.45)',
        halo: '0 0 50px rgba(30, 201, 176, 0.22)'
      },
      backgroundImage: {
        'aurora-radial':
          'radial-gradient(circle at top, rgba(30,201,176,0.18), transparent 35%), radial-gradient(circle at right, rgba(244,63,94,0.15), transparent 30%), linear-gradient(180deg, rgba(5,8,22,0.2), rgba(5,8,22,0.95))'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 1.7s linear infinite'
      }
    }
  },
  plugins: []
};
