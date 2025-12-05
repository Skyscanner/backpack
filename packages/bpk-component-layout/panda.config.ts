import { defineConfig } from '@pandacss/dev';

/**
 * Panda CSS Configuration for Backpack Layout Components
 * 
 * Uses Chakra UI's Panda preset for zero-runtime CSS generation.
 * This follows Chakra UI's performance best practices:
 * https://chakra-ui.com/guides/styling-performance
 * 
 * Note: This configuration will be used to generate static CSS at build time.
 * The actual token mapping from Backpack foundations will be handled in theme.ts
 * and applied through Chakra UI's component system.
 */
export default defineConfig({
  // Use Chakra UI's Panda preset for design tokens, recipes, and patterns
  presets: ['@chakra-ui/panda-preset'],
  
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/**/*.{ts,tsx,js,jsx}',
    '../../examples/bpk-component-layout/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: 'src/styled-system',

  // Use CSS-in-JS runtime
  jsxFramework: 'react',

  // Extend theme with Backpack tokens
  // The actual token values will be mapped from @skyscanner/bpk-foundations-web
  theme: {
    extend: {
      tokens: {
        spacing: {
          // Backpack spacing tokens will be mapped here
          // Values come from bpk-spacing-*() functions
        },
        colors: {
          // Backpack color tokens will be mapped here
          // Values come from Backpack color tokens
        },
      },
      breakpoints: {
        // Backpack breakpoint tokens will be mapped here
      },
    },
  },

  // Global CSS
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      margin: 0,
    },
  },
});

