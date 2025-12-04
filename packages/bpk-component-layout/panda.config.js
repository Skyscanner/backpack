const { defineConfig } = require('@pandacss/dev');

const spacingSm = '.25rem';
const spacingBase = '1rem';
const spacingMd = '.5rem';
const spacingLg = '1.5rem';
const spacingXl = '2rem';
const spacingXxl = '2.5rem';

module.exports = defineConfig({
  // Use Chakra UI's Panda preset
  presets: ['@chakra-ui/panda-preset'],

  preflight: true,

  include: [
    './src/**/*.{ts,tsx,js,jsx}',
    '../../examples/bpk-component-layout/**/*.{ts,tsx,js,jsx}',
  ],

  exclude: [],

  outdir: 'src/styled-system',

  jsxFramework: 'react',

  theme: {
    extend: {
      tokens: {
        spacing: {
          'bpk-spacing-none': { value: '0' },
          'bpk-spacing-sm': { value: spacingSm },
          'bpk-spacing-base': { value: spacingBase },
          'bpk-spacing-md': { value: spacingMd },
          'bpk-spacing-lg': { value: spacingLg },
          'bpk-spacing-xl': { value: spacingXl },
          'bpk-spacing-xxl': { value: spacingXxl },
        },
        colors: {
           // Text colors
          'bpk-text-primary-day': { value: 'rgb(22, 22, 22)' },
          'bpk-text-secondary-day': { value: 'rgb(98, 105, 113)' },
          'bpk-text-disabled-day': { value: 'rgba(0, 0, 0, 0.2)' },
          'bpk-text-on-dark-day': { value: 'rgb(255, 255, 255)' },
          'bpk-text-link-day': { value: 'rgb(0, 98, 227)' },
          'bpk-text-error-day': { value: 'rgb(231, 8, 102)' },
          'bpk-text-success-day': { value: 'rgb(12, 131, 138)' },
          'bpk-text-hero-day': { value: 'rgb(0, 98, 227)' },

          // Background colors
          'bpk-canvas-day': { value: 'rgb(255, 255, 255)' },
          'bpk-canvas-contrast-day': { value: 'rgb(239, 243, 248)' },
          'bpk-surface-highlight-day': { value: 'rgb(224, 228, 233)' },
          'bpk-surface-default-day': { value: 'rgb(255, 255, 255)' },
          'bpk-surface-elevated-day': { value: 'rgb(255, 255, 255)' },

          // Brand colors
          'bpk-core-primary-day': { value: 'rgb(5, 32, 60)' },
          'bpk-core-accent-day': { value: 'rgb(0, 98, 227)' },

          // Border colors
          'bpk-line-day': { value: 'rgb(193, 199, 207)' },
          'bpk-line-on-dark-day': { value: 'rgba(255, 255, 255, 0.5)' },
        },
      },
      breakpoints: {
        'small-mobile': '32.5rem',
        'mobile': '48rem',
        'small-tablet': '64rem',
        'tablet': '64rem',
        'desktop': '80rem',
        'large-desktop': '90rem',
      },
    },
  },
  globalCss: {
    '*': { boxSizing: 'border-box' },
    body: { margin: 0 },
  },
});
