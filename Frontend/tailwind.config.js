/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="IMS-Dark"]'],
  theme: {
    extend: {
      colors: {
        muted: 'var(--color-gray-500)',
        primary: 'var(--color-primary)',
        'primary-100': 'var(--color-primary-100)',
        nutral: 'var(--color-nutral)',
        'nutral-100': 'var(--color-nutral-100)',
        success: 'var(--color-success)',
        'success-100': 'var(--color-success-100)',
        pink: 'var(--color-pink)',
        'pink-100': 'var(--color-pink-100)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        'IMS-Light': {
          primary: '#eeab1c',

          secondary: '#64480c',

          accent: '#f7d897',

          neutral: '#1f5def',

          'base-100': '#fff',
          'base-200': '#f9fafb',
          'base-300': '#e5e7eb',
          'base-400': '#d1d5db',

          info: '#9cafe8',

          success: '#34ee1b',

          warning: '#eba01e',

          error: '#ee1b1b',
        },
        'IMS-Dark': {
          primary: '#eeab1c',

          secondary: '#64480c',

          accent: '#f7d897',

          neutral: '#1f5def',

          'base-100': '#111827',
          'base-200': '#1f2937',
          'base-300': '#374151',
          'base-400': '#4b5563',

          info: '#9cafe8',

          success: '#34ee1b',

          warning: '#eba01e',

          error: '#ee1b1b',
        },
      },
    ],

    darkTheme: 'IMS-Dark', // name of one of the included themes for dark mode
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
