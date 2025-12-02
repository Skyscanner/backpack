import { defineConfig } from '@pandacss/dev';
import { spacingMap, colorMap, breakpointMap } from './src/theme';

/**
 * Panda CSS Configuration for Backpack Layout Components
 */
const formatColorTokens = () =>
  Object.entries(colorMap).reduce<Record<string, { value: string }>>((acc, [token, value]) => {
    acc[token] = { value };
    return acc;
  }, {});

export default defineConfig({
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
        spacing: spacingMap,
        colors: {
          ...formatColorTokens(),
        },
      },
      breakpoints: breakpointMap,
    },
  },
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      margin: 0,
    },
  },
});


