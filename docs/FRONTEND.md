# Frontend Architecture

## React Patterns

- **Functional components** with TypeScript (no class components)
- **forwardRef** for components that expose DOM refs
- **Compound components** with attached subcomponents (e.g., `BpkModal.Header`)
- **Props interfaces** defined as `BpkComponentProps` with clear TypeScript types
- **Default parameters** for optional props (not `defaultProps`)

## TypeScript

- **Strict mode** enabled (`tsconfig.json`)
- Target: ES5 with React JSX automatic runtime
- All new components must be TypeScript
- Props interfaces exported for consumer type safety
- Common types shared via `common-types.ts` within packages

## Styling

### CSS Modules + BEM
- Files: `BpkComponent.module.scss`
- BEM naming: `.bpk-component`, `.bpk-component--modifier`, `.bpk-component__element`
- All classes prefixed with `bpk-`
- CSS Modules for scoping (imported as `styles` in components)

### Modern Sass API
- `@use`/`@forward` only (no `@import`)
- Tokens: `@use '../../bpk-mixins/tokens'` then `tokens.$bpk-color-name` or `tokens.bpk-spacing-base()`
- Typography: `@use '../../bpk-mixins/typography'` then `@include typography.bpk-body-default`

### Token Categories
- **Colors**: Semantic naming (e.g., `$bpk-text-primary-day`, `$bpk-canvas-day`)
- **Spacing**: Function-based (e.g., `bpk-spacing-sm()`, `bpk-spacing-base()`)
- **Typography**: Mixin-based (e.g., `bpk-text-sm`, `bpk-heading-3`)
- **Borders**: `bpk-border-radius-md()`, `$bpk-border-size-sm`
- **Shadows**: `bpk-box-shadow-sm()`

## Storybook (v10)

- Stories in `examples/bpk-component-{name}/`
- Format: `stories.tsx` imports from `examples.tsx`
- Visual test stories prefixed with "VisualTest" for Percy
- Webpack 5 compiler with Babel

## Bundle Size

- Tree shaking via individual package imports
- Each component is a separate npm package under `@skyscanner/backpack-web`
- Consumers import only what they need: `import BpkButton from '@skyscanner/backpack-web/bpk-component-button'`

## Testing

- **Jest 30** with jsdom environment
- **React Testing Library** for component rendering and assertions
- **@testing-library/user-event** for user interaction simulation
- **jest-axe** for accessibility validation
- Coverage thresholds: 70% branches, 75% functions/lines/statements

## Internationalization

- RTL language support built into components
- Semantic markup that works across locales
- Text expansion considerations in layout
- Direction-aware styling patterns
