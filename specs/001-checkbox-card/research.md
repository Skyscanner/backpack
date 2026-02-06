# Research & Discovery: Checkbox Card Component

**Phase**: 0
**Date**: 2026-01-27
**Component**: BpkCheckboxCard
**Objective**: Understand existing Backpack patterns to inform implementation

---

## 1. Existing Component Patterns

### Similar Components Reviewed

**`bpk-component-checkbox`** (Base interaction model):
- File structure: `BpkCheckbox.tsx`, `BpkCheckbox.module.scss`, `accessibility-test.tsx`, `form-test.tsx`
- Props: `name`, `label`, `checked`, `onChange`, `disabled`, `white` (on-dark variant), `valid`, `required`, `indeterminate`
- Validation pattern: `const isInvalid = valid === false;` (explicit false check)
- Accessibility: Wraps input in label, uses `aria-invalid`, `aria-label` for strings
- Testing: Snapshot tests for all variants, jest-axe for accessibility, form integration tests

**`bpk-component-card`** (Base styling model):
- File structure: `BpkCard.tsx`, `BpkCard.module.scss`, `BpkCardWrapper.tsx`, `BpkDividedCard.tsx`
- Props: `href` (makes atomic), `padded`, `onClick`, `className`
- Context-based state: Uses React Context for elevated state management
- Atomic button pattern: When href provided, renders as clickable with zero padding/borders
- Sass mixins: `@include cards.bpk-card;` and `@include cards.bpk-card--padded;`

**`bpk-component-radio`** (Selection semantics):
- Similar props to checkbox but single-selection semantics
- Same validation and accessibility patterns

### Key Patterns Identified

1. **Export Pattern** (from index.ts):
```typescript
import BpkCheckboxCard from './src/BpkCheckboxCard';
import themeAttributes from './src/themeAttributes';

export type { BpkCheckboxCardProps };
export default BpkCheckboxCard;
export { themeAttributes };
```

2. **cssModules Utility** (from `bpk-react-utils`):
```typescript
import { cssModules } from '../../bpk-react-utils';
import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

const classNames = getClassName(
  'bpk-checkbox-card',
  checked && 'bpk-checkbox-card--checked',
  disabled && 'bpk-checkbox-card--disabled',
  className,
);
```

3. **Variant Enums Pattern**:
```typescript
export const VARIANTS = {
  withBackground: 'with-background',
  noBackground: 'no-background',
} as const;

export type Variant = (typeof VARIANTS)[keyof typeof VARIANTS];
```

---

## 2. Sass Mixins & Design Tokens

### Available Mixins (packages/bpk-mixins/)

**Relevant for Checkbox Card**:
- `_cards.scss`: Card base and padded variants
- `_forms.scss`: Form input/checkbox styling
- `_tokens.scss`: Design token forwarding
- `_typography.scss`: Text styling mixins
- `_utils.scss`: RTL, theming, hover, focus indicators
- `_shadows.scss`: Box shadows (sm, lg, xl)
- `_radii.scss`: Border radius utilities
- `_borders.scss`: Border utilities

### Design Token Naming Conventions

**Spacing (Functions)**:
```scss
tokens.bpk-spacing-sm()     // Small spacing
tokens.bpk-spacing-md()     // Medium spacing
tokens.bpk-spacing-lg()     // Large spacing
```

**Colors (Variables)**:
```scss
tokens.$bpk-text-primary-day
tokens.$bpk-core-accent-day              // Accent/brand color
tokens.$bpk-surface-default-day          // Surface bg
tokens.$bpk-canvas-day                   // Canvas bg
tokens.$bpk-surface-contrast-day         // Contrast surface
```

**Typography**:
```scss
@include typography.bpk-text();          // Base text
@include typography.bpk-label-1();       // Labels
@include typography.bpk-text--bold();    // Bold text
```

### Modern Sass @use Syntax

**Correct Pattern**:
```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/cards';
@use '../../../bpk-mixins/typography';
@use '../../../bpk-mixins/utils';

.bpk-checkbox-card {
  @include cards.bpk-card;
  padding: tokens.bpk-spacing-md();

  @include utils.bpk-hover {
    // Hover styles
  }
}
```

**Never use `@import`** - deprecated in Sass

---

## 3. Testing Patterns

### Snapshot Testing (Primary Method)
```typescript
describe('BpkCheckboxCard', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Select option"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when checked', () => {
    const { asFragment } = render(
      <BpkCheckboxCard
        checked={true}
        onChange={() => {}}
        label="Select option"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
```

### Accessibility Testing (jest-axe)
```typescript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('BpkCheckboxCard accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkCheckboxCard
        checked={false}
        onChange={() => {}}
        label="Select option"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Form Integration Testing
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should work as a form component', async () => {
  const Wrap = () => {
    const [checked, setChecked] = useState(false);
    return (
      <form data-testid="form">
        <BpkCheckboxCard
          name="option"
          checked={checked}
          onChange={() => setChecked(!checked)}
          label="Select option"
          data-testid="card"
        />
      </form>
    );
  };
  render(<Wrap />);

  const card = screen.getByTestId('card');
  await userEvent.click(card);

  // Verify form data
  const form = screen.getByTestId('form') as HTMLFormElement;
  const formData = new FormData(form);
  expect(Object.fromEntries(formData.entries())).toEqual({ option: 'on' });
});
```

---

## 4. Accessibility Patterns

### ARIA Attributes
```typescript
<input
  type="checkbox"
  role="checkbox"
  aria-checked={checked}
  aria-disabled={disabled}
  aria-label={typeof label === 'string' ? label : ariaLabel}
  aria-invalid={isInvalid}
/>
```

### Keyboard Navigation
- Native checkbox input provides Tab, Space, Enter support
- Ensure entire card is clickable (label wrapping or click handler)
- Visible focus indicator with proper contrast
- Disabled state prevents tab focus

### Screen Reader Support
- Use semantic `<input type="checkbox">` for proper announcement
- Wrap in `<label>` to associate text with input
- Hide decorative elements with `aria-hidden="true"`
- Provide `aria-label` when label prop is not a string

---

## 5. RTL Support

### RTL Mixin Usage
```scss
@use '../../../bpk-mixins/utils';

.bpk-checkbox-card {
  padding-left: tokens.bpk-spacing-md();

  @include utils.bpk-rtl {
    padding-left: 0;
    padding-right: tokens.bpk-spacing-md();
  }
}
```

### Directional Properties
- Use logical properties where possible (`margin-inline`, `padding-inline`)
- For explicit direction needs, use RTL mixin
- Icon positions may need mirroring with `scaleX(-1)`

---

## 6. Architecture Decisions Review

### Key Decisions for Checkbox Card

**File Naming** (`decisions/js-filenames.md`, `decisions/component-scss-filenames.md`):
- Component: `BpkCheckboxCard.tsx`
- Styles: `BpkCheckboxCard.module.scss`
- Tests: `BpkCheckboxCard-test.tsx`, `accessibility-test.tsx`
- Utilities: `common-types.ts`

**Modern Sass API** (`decisions/modern-sass-api.md`):
- MUST use `@use` syntax (not `@import`)
- Import mixins granularly
- Namespace with module prefix

**Sizing in rem** (`decisions/sizing-in-rem.md`):
- ALL sizing values MUST use rem units
- Use `tokens.bpk-spacing-*()` functions
- Never use px or em

**Accessibility Tests** (`decisions/accessibility-tests.md`):
- Use jest-axe for automated testing
- Test public interface (complete component with props)
- Place in `accessibility-test.tsx`

**Visual Tests** (`decisions/visual-tests.md`):
- Include Percy tests via Storybook
- Skip if component uses images (flaky on CI)

**Deprecated API** (`decisions/deprecated-api.md`):
- Use `@deprecated` JSDoc tags
- Maintain 3-month minimum before removal
- Add runtime console warnings

**Versioning** (`decisions/versioning-rules.md`):
- New component = MINOR version bump
- Breaking changes = MAJOR
- Bug fixes = PATCH

**Documentation** (`decisions/writing-docs.md`):
- Sentence case for titles ("Checkbox card")
- British English prose
- <100 words description
- Describe purpose, not configuration

---

## 7. Figma Design Review

**Design File**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev

**Visual States Required**:
- Default/Rest state (unselected)
- Hover state (mouse over)
- Focus state (keyboard navigation)
- Selected state (checked)
- Selected + Hover
- Active/Pressed state
- Disabled state (unselected)
- Disabled + Selected

**Content Patterns** (from use cases):
- Icon + Label + Price (Hotels)
- Label + Price (Flights)
- Image + Label + Price (Car Hire)
- Icon + Label + Description + Price (extended)

**Design Token Mapping**:
- Background: `tokens.$bpk-surface-default-day` or `tokens.$bpk-canvas-day`
- Selected: `tokens.$bpk-core-accent-day` or similar brand color
- Text: `tokens.$bpk-text-primary-day`
- Border: Use `borders` mixins with token colors
- Shadow: `@include shadows.bpk-box-shadow-sm();` for elevation

**Responsive Breakpoints**:
- Mobile (≤768px): Stack vertically, maintain 44x44px touch target
- Tablet (769-1023px): Grid layout
- Desktop (≥1024px): Flexible grid/horizontal layout

---

## 8. Decisions & Rationale

### Composition Strategy
**Decision**: Compose checkbox input with card wrapper rather than creating entirely new element
**Rationale**:
- Leverages existing accessibility of native checkbox
- Reuses battle-tested patterns from bpk-component-checkbox
- Card mixin provides consistent styling with other cards
- Easier to maintain and test

**Alternatives Considered**:
- Pure div with click handler → Rejected: Loses native form integration
- Radio button semantics → Rejected: Spec requires flexible selection model
- Button element → Rejected: Form integration more complex

### State Management
**Decision**: Stateless component with controlled checked prop
**Rationale**:
- Follows React best practices for form components
- Allows parent to implement single or multi-selection
- Consistent with existing checkbox and radio components
- Clarified in spec session 2026-01-27

### Content Flexibility
**Decision**: Accept multiple content types via props (icon, image, label, description, price)
**Rationale**:
- Supports all three documented use cases (Hotels, Flights, Car Hire)
- Flexible composition without vertical-specific variants
- Simpler API than children-based composition
- Can integrate BpkPrice as ReactElement prop

### Styling Approach
**Decision**: CSS Modules with granular Sass mixin imports
**Rationale**:
- Aligns with Backpack constitution
- Scoped styles prevent conflicts
- Modern Sass API enforced by architecture decisions
- Enables theming via CSS custom properties

### Text Overflow
**Decision**: Truncate with ellipsis after line count from Figma
**Rationale**:
- Prevents layout breaking with long text
- Maintains card height consistency
- Common pattern in card components
- Clarified in spec session 2026-01-27

### Performance Target
**Decision**: Response time <100ms for state changes
**Rationale**:
- Industry standard for instant feel
- Measurable for testing
- Achievable with React state updates
- Clarified in spec session 2026-01-27

---

## 9. Open Questions Resolved

All questions from spec have been resolved through research and clarification:

1. **Selection model**: Flexible (parent-controlled) ✅
2. **Text overflow**: Truncate with ellipsis ✅
3. **Performance metric**: <100ms response time ✅
4. **Icon + image precedence**: Follow Figma design ✅
5. **Theming support**: Use `bpk-theming` if design requires ✅
6. **Price composition**: Accept BpkPrice as ReactElement or string ✅

---

## 10. Implementation Recommendations

1. **Start with native checkbox input** for proper form integration and accessibility
2. **Wrap in card-styled container** using card mixins for visual consistency
3. **Use controlled component pattern** (checked prop + onChange callback)
4. **Implement all visual states** from Figma with BEM modifiers
5. **Support RTL** from day one using RTL mixins
6. **Test thoroughly** with snapshots, jest-axe, and form integration
7. **Document edge cases** (long text, missing content, disabled+selected)
8. **Create comprehensive Storybook stories** for all variants and states
9. **Restrict className/style props** per Constitution XI to maintain design consistency
10. **Use TypeScript** for all code with proper type definitions

---

## References

- **Component Examples**: `packages/bpk-component-checkbox/`, `packages/bpk-component-card/`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **React Utilities**: `packages/bpk-react-utils/`
- **Architecture Decisions**: `decisions/` directory
- **Figma Design**: https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627&m=dev
- **Chakra UI Reference**: https://chakra-ui.com/docs/components/checkbox-card#examples
