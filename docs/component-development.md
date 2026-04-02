# Component Development Reference

> **Load this doc when:** creating a new component, modifying an existing component's API or behaviour,
> writing tests, adding stories, or reviewing component code for correctness.

**Deep references** (load when the task requires a specific lookup):
- Which component to use for a given UI need, import paths → `docs/references/components.md`
- Accessibility rules, ARIA patterns, keyboard nav, a11y checklist → `docs/references/accessibility.md`
- Icon imports, sizes, icon names by category → `docs/references/icons.md`
- Layout component selection, responsive props, spacing tokens → `docs/references/layout.md`
- Test patterns, jest-axe, file naming, CSS module mocking → `docs/references/testing.md`
- Storybook story structure, Percy visual test naming → `docs/references/storybook.md`

---

## Component Conventions

### Data attribute (mandatory)

Every component must include a data attribute for identification, applied via `getDataComponentAttribute()` from `bpk-react-utils`:

```tsx
import { getDataComponentAttribute } from '../../bpk-react-utils';

const BpkFoo = ({ children, ...rest }: BpkFooProps) => (
  <div {...getDataComponentAttribute('BpkFoo')} {...rest}>
    {children}
  </div>
);
```

### REST props

Components spread remaining props onto the root element so consumers can add `aria-*`, `data-*`, event handlers, and standard HTML attributes without needing explicit prop declarations:

```tsx
const BpkButton = ({ children, size = 'default', ...rest }: BpkButtonProps) => (
  <button className={...} {...rest}>{children}</button>
);
```

### Deprecation pattern

Use the `@deprecated` JSDoc tag on deprecated props or components. Provide a migration path:

```tsx
interface BpkFooProps {
  /** @deprecated Use `variant` instead. Will be removed in the next major version. */
  type?: string;
  variant?: 'primary' | 'secondary';
}
```

### Test file naming

| File | Naming convention |
|------|------------------|
| Unit tests | `BpkComponent-test.tsx` (hyphen before `test`) |
| Accessibility tests | `accessibility-test.tsx` (fixed name, separate file) |

---

## Code Standards

- **TypeScript**: All new components must be written in TypeScript
- **Props Interface**: Define clear TypeScript interfaces for all component props
- **Default Props**: Use default parameters for optional props
- **Accessibility**: All components must meet WCAG 2.2 AA standards
- **Testing**: Jest + React Testing Library for unit tests
- **Storybook**: All components must have corresponding stories

---

## Component API Patterns

```typescript
// Standard props interface
interface BpkComponentProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  // ... component-specific props
}

// Common prop naming conventions
// size: 'small' | 'default' | 'large'
// variant: 'primary' | 'secondary' | 'destructive'
// disabled: boolean
// loading: boolean
```

---

## Component Development Workflow

1. **Create Component Package**
   - Follow existing package structure in `packages/bpk-component-{name}/`
   - Include: component file, tests, stories, SCSS, and `README.md`

2. **Component Implementation**
   - Write TypeScript React component with proper props interface
   - Include JSDoc comments on props
   - Implement accessibility features (ARIA labels, keyboard navigation)
   - Follow existing component patterns — read a similar component first

3. **Styling**
   - Create SCSS module with BEM naming — see `docs/tokens-and-typography.md`
   - Use design tokens only — no hardcoded colours, spacing, or font values
   - Follow responsive design principles
   - Support RTL languages

4. **Testing**
   - Unit tests with React Testing Library
   - Test all documented prop variants
   - Include accessibility tests
   - No Enzyme

5. **Documentation**
   - Storybook stories showing all variants
   - Comprehensive prop documentation in `README.md`
   - Usage examples

---

## SCSS Guidelines

- Use BEM methodology for CSS class naming
- All classes prefixed with `bpk-`
- Examples: `.bpk-button`, `.bpk-button--large`, `.bpk-button__icon`
- Import design tokens from `bpk-tokens` — see `docs/tokens-and-typography.md`
- Use SCSS mixins from `bpk-mixins`

---

## Accessibility

- Always include proper ARIA labels on interactive components
- Support keyboard navigation (focus, Enter, Space, Escape where appropriate)
- Ensure colour contrast meets WCAG 2.2 AA standards
- Test with screen readers
- Use semantic HTML elements

---

## Performance

- Use `React.memo` for expensive components
- Implement proper tree shaking
- Minimise bundle size impact
- Lazy load heavy components when possible

---

## Internationalisation

- Support RTL languages
- Use semantic markup that works across languages
- Consider text expansion in different locales
- Test with longer text strings

---

## Common Issues

### Component Not Rendering
- Check all required props are provided
- Verify imports are correct
- Ensure SCSS module is imported
- Check for TypeScript errors

### Styling Issues
- Verify SCSS compilation
- Check for class name conflicts
- Ensure design tokens are imported correctly
- Validate BEM naming conventions

### Build Failures
- Check TypeScript compilation errors (`npm run typecheck`)
- Verify all dependencies are installed
- Ensure tests are passing
- Check lint errors (`npm run lint`)
