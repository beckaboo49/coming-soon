/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      colors: {
        background: '#060606',
        surface: '#0F0F0F',
        primary: '#00E5FF',
        'text-main': '#F3F4F6',
        'text-muted': '#9CA3AF',
        border: '#262626',
        'border-accent': 'rgba(0, 229, 255, 0.2)',
      },
      borderRadius: {
        lg: '0',
        md: '0',
        sm: '0',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glitch': 'glitch 500ms infinite',
        'blink': 'blink 1s step-end infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'glitch': {
          '0%, 14%': {
            textShadow: '0.05em 0 0 rgba(0, 229, 255, 0.75), -0.05em -0.025em 0 rgba(255, 0, 128, 0.75), -0.025em 0.05em 0 rgba(0, 255, 128, 0.75)',
          },
          '15%, 49%': {
            textShadow: '-0.05em -0.025em 0 rgba(0, 229, 255, 0.75), 0.025em 0.025em 0 rgba(255, 0, 128, 0.75), -0.05em -0.05em 0 rgba(0, 255, 128, 0.75)',
          },
          '50%, 99%': {
            textShadow: '0.025em 0.05em 0 rgba(0, 229, 255, 0.75), 0.05em 0 0 rgba(255, 0, 128, 0.75), 0 -0.05em 0 rgba(0, 255, 128, 0.75)',
          },
          '100%': {
            textShadow: '-0.025em 0 0 rgba(0, 229, 255, 0.75), -0.025em -0.025em 0 rgba(255, 0, 128, 0.75), -0.025em -0.05em 0 rgba(0, 255, 128, 0.75)',
          },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
