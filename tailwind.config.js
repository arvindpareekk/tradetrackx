/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#080B10',
          surface: '#0D1117',
          card:    '#111827',
          border:  '#1F2937',
          neon:    '#00FFC2',
          blue:    '#3B82F6',
          purple:  '#8B5CF6',
          red:     '#EF4444',
          gold:    '#F59E0B',
          muted:   '#6B7280',
          text:    '#E5E7EB',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'monospace'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFC2' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #00FFC220, 0 0 20px #00FFC210' },
          to:   { boxShadow: '0 0 20px #00FFC240, 0 0 40px #00FFC220' },
        }
      },
      boxShadow: {
        'neon':    '0 0 20px rgba(0, 255, 194, 0.3)',
        'neon-lg': '0 0 40px rgba(0, 255, 194, 0.2)',
        'card':    '0 4px 24px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
