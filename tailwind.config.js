/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        dark: {
          900: '#04060f',
          800: '#060a16',
          750: '#080d1e',
          700: '#0d1628',
          600: '#111c35',
          500: '#162040',
        },
        profit: '#10b981',
        loss:   '#f43f5e',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body:    ['"DM Sans"',       'sans-serif'],
        mono:    ['"JetBrains Mono"','monospace' ],
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'shimmer':      'shimmer 1.8s infinite',
        'ticker-scroll':'tickerScroll 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #6366f1' },
          to:   { boxShadow: '0 0 25px #6366f1, 0 0 50px #4f46e5' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        tickerScroll: {
          '0%':   { transform: 'translateX(0)'    },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
}
