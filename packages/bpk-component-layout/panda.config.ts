import { defineConfig } from '@pandacss/dev';
import { spacingMap, colorMap, breakpointMap } from './src/theme';

const toCssVar = (token: string) => `var(--bpk-${token.replace(/^bpk-/, '')})`;

const spacingTokens = Object.keys(spacingMap).reduce((acc, key) => {
  acc[key] = { value: toCssVar(key) };
  return acc;
}, {} as any);

const colorTokens = Object.keys(colorMap).reduce((acc, key) => {
  acc[key] = { value: toCssVar(key) };
  return acc;
}, {} as any);

const breakpointTokens = Object.keys(breakpointMap).reduce((acc, key) => {
  acc[key] = { value: breakpointMap[key] };
  return acc;
}, {} as any);

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

  // Hashing class names for smaller bundle size and implementation hiding
  hash: true,

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
        spacing: spacingTokens,
        colors: colorTokens,
      },
      breakpoints: breakpointTokens,
    },
  },

  // Force generation of static CSS for all tokens used in dynamic components
  // This is required because BpkBox/Flex/etc use runtime prop processing
  // that Panda's static analysis cannot detect.
  staticCss: {
    css: [
      {
        properties: {
          // Spacing
          padding: ['*'],
          paddingTop: ['*'],
          paddingRight: ['*'],
          paddingBottom: ['*'],
          paddingLeft: ['*'],
          paddingInline: ['*'],
          paddingBlock: ['*'],
          margin: ['*'],
          marginTop: ['*'],
          marginRight: ['*'],
          marginBottom: ['*'],
          marginLeft: ['*'],
          marginInline: ['*'],
          marginBlock: ['*'],
          gap: ['*'],
          rowGap: ['*'],
          columnGap: ['*'],

          // Color
          color: ['*'],
          backgroundColor: ['*'],
          borderColor: ['*'],
          borderTopColor: ['*'],
          borderRightColor: ['*'],
          borderBottomColor: ['*'],
          borderLeftColor: ['*'],

          // Layout & Typography
          borderRadius: ['*'],
          borderTopLeftRadius: ['*'],
          borderTopRightRadius: ['*'],
          borderBottomLeftRadius: ['*'],
          borderBottomRightRadius: ['*'],

          // Flex/Grid
          display: ['*'],
          flexDirection: ['*'],
          flexWrap: ['*'],
          alignItems: ['*'],
          justifyContent: ['*'],
          textAlign: ['*'],
          gridTemplateColumns: ['*'],
          gridTemplateRows: ['*'],
          gridColumn: ['*'],
          gridRow: ['*'],
        },
      },
    ],
  },

  // Global CSS
  globalCss: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      margin: 0,
      color: 'var(--bpk-text-primary-day)', // 全局默认文字颜色
      background: 'var(--bpk-canvas-day)',  // 全局默认背景色
    },
    // 定义 Backpack Layout 组件的预设样式 (Preset Styles)
    '.bpk-box, .bpk-flex, .bpk-grid, .bpk-stack': {
       // 默认继承 body 的颜色，也可以显式指定为变量
       color: 'inherit',
    },
    '.bpk-flex': {
      display: 'flex',
      // 可以在这里预设默认 gap，例如: gap: 'var(--bpk-spacing-base)'
    },
    '.bpk-grid': {
      display: 'grid',
    },
    // Stack 组件通常是 Flex 布局
    '.bpk-stack, .bpk-stack-h, .bpk-stack-v': {
      display: 'flex',
      flexDirection: 'column', // Stack 默认为垂直
    },
    '.bpk-stack-h': {
      flexDirection: 'row',
    },
  },
});

