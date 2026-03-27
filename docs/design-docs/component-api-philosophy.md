# Component API Philosophy

## Naming Conventions

### Component Names
- All components prefixed with `Bpk`: `BpkButton`, `BpkCard`, `BpkChip`
- Sub-components use compound naming: `BpkModal.Header`, `BpkAccordion.Item`
- Version suffixes for future APIs: `BpkCardV2`, `BpkCheckboxV2`

### Props
- **`size`**: `'small' | 'default' | 'large'` (not `sm`/`md`/`lg`)
- **`variant`**: `'primary' | 'secondary' | 'destructive'` (descriptive, not numeric)
- **`disabled`**: `boolean` (standard HTML attribute name)
- **`loading`**: `boolean` (for async states)
- **`className`**: Restricted — not all components expose this to prevent style overrides
- **`children`**: `React.ReactNode` for composable components

### Files
- Components: PascalCase (`BpkButton.tsx`)
- Styles: PascalCase with module suffix (`BpkButton.module.scss`)
- Tests: `BpkButton-test.tsx` or `BpkButton.test.tsx`
- Figma: `BpkButton.figma.tsx`

## TypeScript Patterns

```typescript
// Standard props interface
interface BpkComponentProps {
  children?: React.ReactNode;
  className?: string;        // Only when intentionally exposed
  onClick?: (event: React.MouseEvent) => void;
  size?: 'small' | 'default' | 'large';
}

// Default parameters (not defaultProps)
const BpkComponent = ({
  size = 'default',
  ...rest
}: BpkComponentProps) => { ... };
```

## Deprecation Strategy

From `decisions/deprecated-api.md`:
- Minimum **3-month window** between deprecation and removal
- Use `@deprecated` JSDoc tag on deprecated props/components
- Provide migration guides in component `docs/` directory
- Remove deprecated APIs only in major versions

## Future API Pattern

From `decisions/future-api.md`:
- Opt-in breaking changes via version prefix
- Functions: `v2__functionName()`
- Components: `BpkComponentV2`
- Consumers explicitly opt in by importing the versioned API
- Both old and new APIs coexist until the next major version

## Data Attributes

All components include a data attribute for identification:
```typescript
data-backpack-ds-component="BpkButton"
```

Applied via `getDataComponentAttribute()` from `bpk-react-utils`.

## REST Props

Components spread remaining props onto the root element:
```typescript
const BpkButton = ({ children, size, ...rest }: BpkButtonProps) => (
  <button {...rest}>{children}</button>
);
```

This allows consumers to add `aria-*`, `data-*`, event handlers, and standard HTML attributes.
