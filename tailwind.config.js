/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#04050a',
        abyss: '#080b14',
        panel: 'rgba(13, 18, 32, 0.55)',
        electric: '#2f6bff',
        cyan: '#22d3ee',
        violet: '#8b5cf6',
        ice: '#dbe7ff',
        mist: '#8fa3c8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.25), 0 0 64px rgba(47, 107, 255, 0.15)',
        card: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: { glass: '18px' },
    },
  },
  plugins: [],
};
