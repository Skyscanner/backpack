import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: false,
  include: ['./packages/bpk-component-layout/src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  prefix: 'bpk',
  jsxFramework: undefined,

  theme: {
    extend: {
      tokens: {
        spacing: {
          none: { value: '0' },
          xs: { value: '.125rem' },
          sm: { value: '.25rem' },
          md: { value: '.5rem' },
          base: { value: '1rem' },
          lg: { value: '1.5rem' },
          xl: { value: '2rem' },
          xxl: { value: '2.5rem' },
        },
      },
    },
  },

  conditions: {
    extend: {
      'small-mobile': '@media (min-width: 20rem)',
      mobile: '@media (min-width: 22.5rem)',
      'small-tablet': '@media (min-width: 32.0625rem)',
      tablet: '@media (min-width: 48.0625rem)',
      desktop: '@media (min-width: 64.0625rem)',
    },
  },
});
