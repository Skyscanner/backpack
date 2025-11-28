# Bundle Size Analysis and Impact Assessment

## Executive Summary

This document analyzes the bundle size impact and downstream service implications of introducing `bpk-component-layout` with PandaCSS and Chakra UI 3.0 integration. The analysis covers JavaScript bundle size, CSS generation, build-time considerations, and recommendations for downstream consumers.

## 1. Bundle Size Analysis

### 1.1 New Dependencies

The `bpk-component-layout` package introduces the following new dependencies:

#### Production Dependencies

| Package | Version | Estimated Size | Notes |
|---------|---------|----------------|-------|
| `@chakra-ui/react` | ^3.30.0 | ~150-200 KB (gzipped) | Core Chakra UI library with tree-shaking support |
| `@pandacss/dev` | ^1.5.1 | Build-time only | Not included in production bundle |

#### Dependency Breakdown

**@chakra-ui/react (v3.30.0)**
- **Tree-shaken size**: ~150-200 KB (gzipped) when only layout components are used.
- **Components included**: Box, Flex, Grid, Stack, Provider.
- **Runtime overhead**: Minimal (uses PandaCSS for zero-runtime CSS).
- **Tree-shaking**: Modern bundlers (webpack 5+, Vite, esbuild) can tree-shake unused components.

**@pandacss/dev (^1.5.1)**
- **Build-time only**: Not included in production bundle.
- **Purpose**: Generates static CSS at build time.
- **Consumer impact**: None (pre-generated styles are shipped with the package).

### 1.2 Code Size Analysis

#### Component Code Size

The `bpk-component-layout` package includes:
- Facade components (`BpkBox`, `BpkFlex`, `BpkGrid`, `BpkStack`) - ~2 KB (gzipped)
- Token processing logic (`tokenUtils.ts`) - ~3 KB (gzipped)
- Theme configuration (`theme.ts`) - ~1 KB (gzipped)
- Type definitions - ~1 KB (gzipped)
- **Generated System**: The `styled-system` directory is shipped with the package (~50 KB uncompressed, but not included in JS bundle)

#### Token Mapping Layer
- **Runtime validation**: ~2 KB (gzipped)
- **Token conversion utilities**: ~3 KB (gzipped)
- **Color mapping**: ~1 KB (gzipped)

**Total package code**: ~8-10 KB (gzipped)

### 1.3 CSS Bundle Size

#### PandaCSS Generated CSS

PandaCSS generates static CSS at build time. The CSS size depends on the utilities used within the library itself.

- **Design tokens**: Backpack color and spacing tokens (~5-10 KB)
- **Component styles**: Layout component base styles (~2-5 KB)
- **Utility classes**: Generated based on usage patterns (~3-5 KB)
- **Location**: `dist/bpk-component-layout/src/styled-system/styles.css`

**Estimated CSS size**: ~10-20 KB (gzipped).

#### Comparison with Traditional CSS-in-JS

| Approach | Runtime Size | CSS Size | Total |
|----------|--------------|----------|-------|
| **Traditional CSS-in-JS** | ~50-100 KB | 0 KB | ~50-100 KB |
| **PandaCSS (Build-time)** | ~0 KB | ~10-20 KB | ~10-20 KB |
| **Savings** | -50-100 KB | +10-20 KB | **-30-80 KB** |

The zero-runtime approach eliminates CSS-in-JS overhead while adding minimal CSS bundle size.

### 1.4 Total Bundle Impact

#### For a typical application using layout components:

```
JavaScript Bundle:
├── @chakra-ui/react (tree-shaken)    ~150-200 KB (gzipped)
├── bpk-component-layout code         ~8-10 KB (gzipped)
└── Token utilities                   ~5 KB (gzipped)
    Total JS:                         ~163-215 KB (gzipped)

CSS Bundle:
├── PandaCSS generated CSS            ~10-20 KB (gzipped)
    Total CSS:                        ~10-20 KB (gzipped)

Total Bundle Impact:                  ~173-235 KB (gzipped)
```

#### Breakdown by Component Usage

If only specific components are used, tree-shaking can reduce the Chakra UI footprint:

- **BpkBox only**: ~150-160 KB (gzipped)
- **BpkBox + BpkFlex**: ~160-170 KB (gzipped)
- **All components**: ~173-235 KB (gzipped)

## 2. Build-Time Considerations

### 2.1 PandaCSS Build Process

**Crucially, downstream consumers do NOT need to run PandaCSS generation.**

The `bpk-component-layout` package pre-generates the styled system and ships it in the `dist` folder.

#### Build Process in Backpack

1. **Code Generation**: `npm run codegen` runs `panda codegen` in `bpk-component-layout`
2. **Output**: Generates `src/styled-system/` directory
3. **Transpilation**: `npm run transpile` copies `styled-system` to `dist/bpk-component-layout/src/styled-system/`
4. **Shipping**: The `dist` folder is published to npm

#### Downstream Service Configuration

1.  **Install Package**:
    ```bash
    npm install @skyscanner/backpack-web/bpk-component-layout
    ```

2.  **Import CSS**:
    ```typescript
    import '@skyscanner/backpack-web/bpk-component-layout/dist/bpk-component-layout/src/styled-system/styles.css';
    ```
    *(Note: exact path depends on final dist structure - verify in `node_modules` after installation)*

3.  **No Additional Build Steps**: No webpack config or build-time processing required.

### 2.2 Tree Shaking

To minimize the JavaScript bundle impact, ensure your bundler supports tree shaking. Chakra UI 3.0 and `bpk-component-layout` are designed to be tree-shakeable.

**Recommended bundler configurations:**

- **Webpack 5+**: Tree shaking enabled by default in production mode
- **Vite**: Tree shaking enabled by default
- **esbuild**: Tree shaking enabled by default
- **Rollup**: Tree shaking enabled by default

**Verification**: Check your bundle analyzer to confirm unused Chakra UI code is removed.

### 2.3 Build Performance

The pre-generated CSS approach means:
- **No build-time overhead** for consumers
- **Faster builds** (no CSS-in-JS processing)
- **Predictable bundle size** (static CSS size is known)

## 3. Runtime Impact

### 3.1 Zero-Runtime CSS

PandaCSS generates static CSS at build time, eliminating:
- ✅ CSS-in-JS runtime overhead
- ✅ Style object creation
- ✅ Style string generation
- ✅ Dynamic style injection
- ✅ Style cache management

**Performance benefit**: Significantly faster render times compared to runtime CSS-in-JS solutions.

### 3.2 JavaScript Runtime

#### Token Validation
- **Development mode**: Runtime validation adds minimal overhead to check for correct token usage and warn about invalid values (~1-2ms per component render).
- **Production mode**: Validation logic is minimal, ensuring high performance (~0.1-0.5ms per component render).

#### Token Conversion
- **Spacing conversion**: Fast object property lookup (~0.01ms per token)
- **Color conversion**: Fast object property lookup (~0.01ms per token)
- **Responsive processing**: Recursive traversal adds minimal overhead (~0.1ms per responsive object)

**Total processing overhead**: < 1ms per component render in production.

### 3.3 Memory Impact

- **Static CSS**: Loaded once, cached by browser
- **No style objects**: No runtime style object creation
- **Minimal token mapping**: Small in-memory objects for token lookups

**Memory footprint**: Negligible compared to runtime CSS-in-JS solutions.

## 4. Comparison with Alternatives

### 4.1 vs. Traditional SCSS

| Aspect | SCSS Approach | Chakra UI + PandaCSS |
|--------|---------------|----------------------|
| **Bundle Size** | ~5-10 KB CSS | ~173-235 KB (JS + CSS) |
| **Runtime Performance** | Excellent | Excellent (zero-runtime) |
| **Type Safety** | None | Full TypeScript support |
| **Design System Enforcement** | Manual | Automatic (token-only) |
| **Flexibility** | High | Medium (token-restricted) |
| **Maintenance** | Manual CSS | Automated generation |

**Trade-off**: Larger bundle size for better type safety and design system enforcement.

### 4.2 vs. Runtime CSS-in-JS (styled-components, emotion)

| Aspect | Runtime CSS-in-JS | Chakra UI + PandaCSS |
|--------|-------------------|----------------------|
| **Bundle Size** | ~50-100 KB JS | ~163-215 KB JS + ~10-20 KB CSS |
| **Runtime Performance** | Slower (style injection) | Faster (static CSS) |
| **Build Time** | Fast | Fast (pre-generated) |
| **Type Safety** | Partial | Full |
| **Design System Enforcement** | Manual | Automatic |

**Trade-off**: Slightly larger bundle for better runtime performance and design system enforcement.

## 5. Recommendations

### 5.1 For Downstream Services

1.  **Code Splitting**:
    - If the 150KB+ initial bundle size is a concern, consider lazy loading routes that heavily use layout components.
    - However, for a core layout library, this is often included in the main bundle for optimal performance.

2.  **CSS Extraction**:
    - Standard CSS loaders will handle the imported `styles.css` file efficiently.
    - Ensure your bundler is configured to extract CSS (not inline it).

3.  **Tree Shaking**:
    - Verify that unused Chakra UI components are removed from your bundle.
    - Use bundle analyzers (webpack-bundle-analyzer, rollup-plugin-visualizer) to check.

4.  **Import Optimization**:
    - Import only the components you need:
    ```typescript
    // Good: Tree-shakeable
    import { BpkBox, BpkFlex } from '@skyscanner/backpack-web/bpk-component-layout';

    // Avoid: Importing everything
    import * as BpkLayout from '@skyscanner/backpack-web/bpk-component-layout';
    ```

### 5.2 Best Practices

1.  **Use tokens only**: Always use Backpack tokens (`BpkSpacing`, `BpkColor`).
2.  **Avoid `className`**: Do not try to override styles with classes; use the provided props.
3.  **Leverage responsive props**: Use responsive objects instead of media queries when possible.
4.  **Monitor bundle size**: Use bundle analyzers to track the impact of layout components.

### 5.3 Migration Strategy

If migrating from existing layout solutions:

1. **Gradual Migration**: Migrate one component at a time to measure impact.
2. **Bundle Monitoring**: Track bundle size before and after migration.
3. **Performance Testing**: Measure render performance to validate improvements.
4. **User Testing**: Ensure visual consistency during migration.

## 6. Conclusion

The introduction of `bpk-component-layout` with PandaCSS and Chakra UI 3.0:

### Benefits

- ✅ **Zero-runtime CSS** (better performance)
- ✅ **Type-safe token usage** (compile-time error checking)
- ✅ **Consistent design system integration** (token enforcement)
- ✅ **Pre-generated styles** (easy consumption, no build config)
- ✅ **Better developer experience** (autocomplete, type safety)

### Costs

- ⚠️ **~173-235 KB bundle size increase** (mostly due to Chakra UI dependency)
- ⚠️ **Breaking changes** (no `className`, token-only)
- ⚠️ **Learning curve** (must use Backpack tokens)

### Overall Assessment

The benefits in developer experience (type safety), design consistency (token enforcement), and runtime performance (zero-runtime CSS) outweigh the initial bundle size cost for most applications. The bundle size impact is reasonable for a core layout library that provides foundational UI primitives.

### When to Use

**Recommended for:**
- New projects starting with Backpack
- Projects prioritizing design system consistency
- Projects with TypeScript
- Projects where layout components are core to the application

**Consider alternatives if:**
- Bundle size is extremely constrained (< 200 KB total)
- You need maximum flexibility (arbitrary CSS values)
- You're not using TypeScript

### Future Optimizations

Potential areas for future optimization:
1. **Lazy loading**: Load layout components on-demand
2. **CSS code splitting**: Split CSS by component usage
3. **Token subset**: Ship only used tokens
4. **Smaller Chakra UI subset**: Create a minimal Chakra UI build with only layout components
