// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Add custom utilities for text borders
      textStroke: {
        '0': '0.5px',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        // Add more sizes as needed
      },
      textStrokeColor: {
        'black': 'black',
        'white': 'white',
        'red': 'red',
        // Add more colors as needed
      },
      textShadow: {
        // Define your text shadow styles here
        'black': '2px 2px 2px rgba(0, 0, 0, 0.8)',
        'white': '0 2px 4px rgba(255, 255, 255, 0.8)',
        'black-md': '4px 4px 4px rgba(0, 0, 0, 0.7)',
        'black-lg': '6px 6px 6px rgba(0, 0, 0, 5)',
        'white-lg': '0px 3px 6px rgba(255, 255, 255, 0.8)',
        // Add more as needed
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('tailwindcss-textshadow'),],
}
