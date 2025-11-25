# Layout Styling Approach

This document explains the styling approach used in `bpk-component-layout` and how it differs from traditional CSS-in-JS solutions.

## Overview

`bpk-component-layout` uses a **Chakra UI facade pattern** with **PandaCSS** for zero-runtime CSS generation. This approach provides:

- **Zero Runtime Overhead**: All styles are generated at build time
- **Design System Consistency**: Enforced through token-based styling
- **Type Safety**: Full TypeScript support with strict validation
- **Performance**: No CSS-in-JS runtime calculations

## Architecture

### Chakra UI Facade Pattern

The layout components act as facades over Chakra UI's layout primitives:

```
BpkBox → Chakra UI Box → PandaCSS → Static CSS
```

This pattern provides:
- **Stable API**: Backpack-specific API that doesn't change with Chakra UI updates
- **Token Enforcement**: Only Backpack tokens are allowed, not Chakra UI tokens
- **Style Isolation**: `className` prop is removed to prevent style overrides

### PandaCSS Integration

PandaCSS is configured to generate static CSS at build time:

```typescript
// panda.config.ts
export default defineConfig({
  presets: ['@chakra-ui/panda-preset'],
  jsxFramework: 'react',
  outdir: 'styled-system',
  // ...
});
```

**Key Benefits:**
- **Build-time CSS generation**: All styles are pre-compiled
- **Zero runtime**: No CSS-in-JS processing at runtime
- **Tree-shakeable**: Only used styles are included in the bundle
- **Performance**: Follows [Chakra UI's performance best practices](https://chakra-ui.com/guides/styling-performance)

## Token Mapping System

### How It Works

1. **User provides Backpack tokens** in component props:
   ```tsx
   <BpkBox p="bpk-spacing-base" bg="bpk-canvas-day" />
   ```

2. **Token validation** happens at runtime (development mode):
   - Invalid tokens show warnings
   - Only Backpack tokens or allowed special values are accepted

3. **Token conversion** maps Backpack tokens to actual values:
   ```typescript
   // tokenUtils.ts
   convertBpkSpacingToChakra('bpk-spacing-base') → '1rem'
   convertBpkColorToChakra('bpk-canvas-day') → '#ffffff'
   ```

4. **Chakra UI receives actual values**:
   ```tsx
   <Box padding="1rem" bg="#ffffff" />
   ```

5. **PandaCSS generates static CSS** at build time

### Token Resolution

Tokens are resolved from `@skyscanner/bpk-foundations-web`:

- **Spacing tokens**: Mapped from SCSS functions to rem values
  - `bpk-spacing-sm` → `.25rem`
  - `bpk-spacing-base` → `1rem`
  - `bpk-spacing-md` → `.5rem`
  - etc.

- **Color tokens**: Mapped from Backpack foundations
  - `bpk-text-primary-day` → Actual hex/rgb value
  - `bpk-canvas-day` → Actual hex/rgb value
  - etc.

### Theme Configuration

The theme is created using Chakra UI 3.0's `createSystem`:

```typescript
// theme.ts
const bpkSystem = createSystem({
  theme: {
    space: {
      'bpk-spacing-sm': '.25rem',
      'bpk-spacing-base': '1rem',
      // ...
    },
    colors: {
      bpk: {
        'bpk-text-primary-day': '#000000',
        'bpk-canvas-day': '#ffffff',
        // ...
      }
    }
  }
});
```

## Styling Restrictions

### What's Allowed

✅ **Backpack spacing tokens**: `bpk-spacing-*`
✅ **Backpack color tokens**: `bpk-*-day`
✅ **Percentages**: `50%`, `100%`
✅ **Special values**: `auto`, `full`, `fit-content` (for size props)
✅ **Special colors**: `transparent`, `currentColor`

### What's NOT Allowed

❌ **Direct pixel/rem values**: `16px`, `1rem`, `2em`
❌ **Chakra UI tokens**: `sm`, `md`, `lg`, `blue.500`
❌ **className prop**: Removed to prevent style overrides
❌ **Arbitrary CSS values**: Only tokens or allowed special values

### Runtime Validation

In development mode, invalid values trigger warnings:

```typescript
// tokenUtils.ts
if (!isValidSpacingValue(value)) {
  console.warn(
    `Invalid spacing value "${value}" for prop "${key}". ` +
    `Only Backpack spacing tokens or percentages are allowed.`
  );
  delete processed[key]; // Remove invalid prop
}
```

## Component Implementation

### Example: BpkBox

```typescript
// BpkBox.tsx
export const BpkBox = ({ children, ...props }: BpkBoxProps) => {
  // Process props to convert Backpack tokens to Chakra UI format
  const processedProps = processBpkProps(props);
  
  // className is explicitly excluded to prevent style overrides
  return <Box {...processedProps}>{children}</Box>;
};
```

**Key points:**
1. Props are processed through `processBpkProps`
2. Tokens are converted to actual values
3. Invalid props are removed
4. `className` is explicitly excluded

### Prop Processing Pipeline

```
User Props
  ↓
processBpkProps()
  ↓
processSpacingProps() → Convert spacing tokens
  ↓
processColorProps() → Convert color tokens
  ↓
Chakra UI Component → Receives actual values
  ↓
PandaCSS → Generates static CSS
```

## Development vs Production

### Development Mode

- **Runtime validation**: Invalid tokens show warnings
- **CSS-in-JS**: Chakra UI uses runtime CSS for hot reloading
- **Debugging**: Easier to debug with runtime styles

### Production Mode

- **Static CSS**: PandaCSS generates all CSS at build time
- **Zero runtime**: No CSS-in-JS processing
- **Optimized**: Only used styles are included

## Performance Considerations

### Why Zero-Runtime Matters

Traditional CSS-in-JS solutions:
- Calculate styles on every render
- Create new style objects (garbage collection pressure)
- Process style objects into CSS strings

PandaCSS approach:
- ✅ Styles pre-compiled at build time
- ✅ No runtime calculations
- ✅ Static CSS files
- ✅ Better performance, especially in complex applications

### Best Practices

Following [Chakra UI's performance guide](https://chakra-ui.com/guides/styling-performance):

1. **Use tokens, not dynamic values**: All values come from tokens
2. **No runtime style calculations**: Everything is pre-compiled
3. **Static class names**: Generated at build time
4. **Tree-shaking**: Unused styles are removed

## Comparison with Other Approaches

### vs Traditional CSS-in-JS

| Feature | CSS-in-JS (Runtime) | PandaCSS (Build-time) |
|---------|---------------------|----------------------|
| Runtime overhead | Yes | No |
| Build time | Fast | Slower (CSS generation) |
| Bundle size | Larger | Smaller (tree-shaken) |
| Performance | Slower | Faster |
| Hot reload | Fast | Slower |

### vs SCSS Modules

| Feature | SCSS Modules | PandaCSS |
|---------|--------------|----------|
| Type safety | Limited | Full TypeScript |
| Token enforcement | Manual | Automatic |
| Runtime validation | No | Yes (dev mode) |
| Dynamic styles | Limited | Full support |

## Configuration Files

### `panda.config.ts`

PandaCSS configuration for build-time CSS generation:

```typescript
export default defineConfig({
  presets: ['@chakra-ui/panda-preset'],
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
});
```

### `theme.ts`

Backpack token mapping to Chakra UI theme:

```typescript
export function createBpkTheme() {
  return {
    space: { /* spacing tokens */ },
    colors: { bpk: { /* color tokens */ } },
    breakpoints: { /* breakpoint tokens */ },
  };
}
```

### `tokenUtils.ts`

Runtime token validation and conversion:

```typescript
export function processBpkProps(props) {
  // Validates and converts tokens
  // Removes invalid values
  // Excludes className
}
```

## Migration Notes

If migrating from Chakra UI directly:

1. **Replace Chakra tokens with Backpack tokens**:
   ```tsx
   // Before
   <Box p={4} bg="blue.500" />
   
   // After
   <BpkBox p="bpk-spacing-base" bg="bpk-core-primary-day" />
   ```

2. **Remove className usage**: Use component props instead

3. **Use percentages for dynamic sizing**: Instead of `px` values

4. **Wrap with BpkProvider**: Required for all layout components

## Future Considerations

- **PandaCSS build integration**: May need to run `panda codegen` in build process
- **Storybook integration**: Currently uses runtime CSS for development
- **Production optimization**: Ensure static CSS is properly loaded

## References

- [Chakra UI Performance Guide](https://chakra-ui.com/guides/styling-performance)
- [PandaCSS Documentation](https://panda-css.com/)
- [Chakra UI 3.0 Documentation](https://chakra-ui.com/)

