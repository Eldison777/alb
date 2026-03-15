/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './{components,admin}/**/*.{ts,tsx}',
    './translations.ts',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crimson: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        obsidian: '#0a0a0a',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealDown: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
      },
      animation: {
        'reveal-up': 'revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-down': 'revealDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.4s ease-in forwards',
        'pulse-soft': 'pulseSoft 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
