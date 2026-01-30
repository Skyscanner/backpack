# Research Document: BpkIconLabel Component

**Package Branch**: `001-bpk-icon-label`
**Created**: 2026-01-28
**Updated**: 2026-01-30 (Implementation Complete)
**Spec**: [spec.md](./spec.md)

## Research Summary

This document captures findings from researching existing Backpack patterns to guide the implementation of BpkIconLabel - a compound component that displays an icon alongside text with optional inline links.

**Implementation Status**: ✅ COMPLETE - All patterns implemented and validated

---

## 1. Compound Components Pattern

### Decision: Use React Context for Parent-Child Communication

**Rationale**: Backpack uses React Context API for compound components to share configuration and styling between parent and children without prop drilling.

### Pattern Examples

**BpkAccordion Context Pattern**:
```typescript
// Parent provides context
export const BpkAccordionContext = createContext({
  onDark: false,
  divider: true,
});

const BpkAccordion = (props: BpkAccordionProps) => {
  return (
    <BpkAccordionContext.Provider value={{ onDark, divider }}>
      <div className={classNames}>
        {children}
      </div>
    </BpkAccordionContext.Provider>
  );
};

// Child consumes context
const BpkAccordionItem = (props: BpkAccordionItemProps) => {
  const { divider, onDark } = useContext(BpkAccordionContext);
  // Uses context to determine styling
};
```

**Application to BpkIconLabel**:
- Root component will provide context with `type` and `style` props
- Icon and Text subcomponents will consume context for styling decisions
- No state management needed (configuration only)

**Alternatives Considered**:
- **Prop cloning**: More brittle, requires Children.map manipulation
- **Render props**: Less ergonomic for simple composition
- **No context (direct props)**: Verbose for consumers, violates DRY

**Architecture Decision Reference**: Pattern aligns with `bpk-component-accordion`, `bpk-component-card`, and `bpk-component-navigation-bar` implementations.

---

## 2. Theming Support

### Decision: Full BpkThemeProvider Integration

**Rationale**: Component requires runtime theming capability similar to BpkButton and BpkLink to support dynamic brand customization.

### Implementation Pattern

**Theme Attributes Definition** (`themeAttributes.ts`):
```typescript
export const iconLabelThemeAttributes = [
  'iconLabelBackgroundColor',
  'iconLabelTextColor',
  'iconLabelIconColor',
  'iconLabelBorderColor',
];

export const iconLabelOnDarkThemeAttributes = [
  'iconLabelOnDarkBackgroundColor',
  'iconLabelOnDarkTextColor',
  'iconLabelOnDarkIconColor',
  'iconLabelOnDarkBorderColor',
];
```

**Sass Themeable Property Pattern**:
```scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/utils';

.bpk-icon-label__text {
  @include utils.bpk-themeable-property(
    color,
    --bpk-icon-label-text-color,
    tokens.$bpk-text-primary-day
  );
}

.bpk-icon-label--on-dark {
  .bpk-icon-label__text {
    @include utils.bpk-themeable-property(
      color,
      --bpk-icon-label-on-dark-text-color,
      tokens.$bpk-text-on-dark-day
    );
  }
}
```

**BpkThemeProvider Behavior**:
- Converts camelCase attributes to CSS variables: `iconLabelTextColor` → `--bpk-icon-label-text-color`
- Provides dual-layer fallback: direct token + CSS variable with token fallback
- Validates all required attributes present; disables theming if any missing

**Alternatives Considered**:
- **No theming**: Would limit component to static design system colors
- **Prop-based colors**: Less flexible, requires code changes for theme updates
- **CSS-only**: Insufficient for runtime brand theming needs

**Architecture Decision Reference**: Follows patterns in `bpk-component-button/themeAttributes.ts` and `bpk-component-link/themeAttributes.ts`.

---

## 3. Typography and Sass Patterns

### Decision: Use Modern Sass @use Syntax with Granular Imports

**Rationale**: Modern Sass API improves modularity, build performance, and follows Backpack constitution non-negotiable requirement.

### Typography Mixins

**Type Variants Mapping**:
```scss
@use '../../bpk-mixins/typography';
@use '../../bpk-mixins/tokens';

.bpk-icon-label__text {
  &--body {
    @include typography.bpk-body-default();
    // 16px regular (tokens.$bpk-font-size-base, tokens.$bpk-line-height-base)
  }

  &--label-1 {
    @include typography.bpk-label-1();
    // 16px bold (tokens.$bpk-font-size-base, tokens.$bpk-line-height-base, tokens.$bpk-font-weight-bold)
  }

  &--footnote {
    @include typography.bpk-footnote();
    // 14px regular (tokens.$bpk-font-size-sm, tokens.$bpk-line-height-sm)
  }
}
```

### Spacing Tokens

**Fixed Spacing Requirements**:
```scss
@use '../../bpk-mixins/tokens';

.bpk-icon-label {
  display: flex;
  align-items: center;
  gap: tokens.bpk-spacing-md(); // 8px icon-to-text spacing
}

.bpk-icon-label__text {
  // 4px text-to-link spacing handled by inline link margin
}
```

### Color Tokens for Variants

**Default Variant**:
```scss
.bpk-icon-label__text {
  color: tokens.$bpk-text-primary-day; // #161616
}

.bpk-icon-label__icon {
  color: tokens.$bpk-text-primary-day;
}
```

**On-Dark Variant**:
```scss
.bpk-icon-label--on-dark {
  .bpk-icon-label__text,
  .bpk-icon-label__icon {
    color: tokens.$bpk-text-on-dark-day; // white
  }
}
```

**Alternatives Considered**:
- **@import syntax**: Deprecated, violates constitution
- **px units**: Violates accessibility requirements (rem required)
- **Magic numbers**: Violates design token requirement

**Architecture Decision Reference**: `decisions/modern-sass-api.md`, `decisions/sizing-in-rem.md`

---

## 4. RTL Support

### Decision: Use bpk-rtl Mixin for Layout Flipping

**Rationale**: Icon position must flip in RTL languages to maintain visual hierarchy and reading direction.

### Implementation Pattern

```scss
@use '../../bpk-mixins/utils';

.bpk-icon-label {
  display: flex;
  align-items: center;

  // LTR: Icon on left
  flex-direction: row;

  @include utils.bpk-rtl {
    // RTL: Icon on right (flip layout)
    flex-direction: row-reverse;
  }
}
```

**Alternative Approaches**:
- **Margin-based**: More complex with `bpk-margin-leading`/`bpk-margin-trailing` mixins
- **Logical properties**: Not yet universally supported in all target browsers
- **JavaScript-based**: Overkill for simple layout flip

**Architecture Decision Reference**: Pattern used in `bpk-component-drawer`, `bpk-component-calendar`, and other RTL-aware components.

---

## 5. Testing Patterns

### Decision: Test Public Interface with Compound Components Together

**Rationale**: Per `decisions/accessibility-tests.md`, compound components should be tested as they're used by consumers, not in isolation.

### Unit Tests Pattern

```typescript
// BpkIconLabel-test.tsx
import { render, screen } from '@testing-library/react';
import BpkIconLabel from './BpkIconLabel';
import { InformationCircleIcon } from '@skyscanner/backpack-web/bpk-component-icon';

describe('BpkIconLabel', () => {
  describe('Compound component usage', () => {
    it('should render with all subcomponents', () => {
      render(
        <BpkIconLabel.Root type="body" style="default">
          <BpkIconLabel.Icon>
            <InformationCircleIcon />
          </BpkIconLabel.Icon>
          <BpkIconLabel.Text>
            Information text
          </BpkIconLabel.Text>
        </BpkIconLabel.Root>
      );

      expect(screen.getByText('Information text')).toBeInTheDocument();
    });
  });

  // Test all 6 variants (3 types × 2 styles)
  describe('Type variants', () => {
    const types = ['body', 'label-1', 'footnote'] as const;
    const styles = ['default', 'on-dark'] as const;

    types.forEach(type => {
      styles.forEach(style => {
        it(`should render correctly with type="${type}" and style="${style}"`, () => {
          const { asFragment } = render(
            <BpkIconLabel.Root type={type} style={style}>
              <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
              <BpkIconLabel.Text>Text</BpkIconLabel.Text>
            </BpkIconLabel.Root>
          );
          expect(asFragment()).toMatchSnapshot();
        });
      });
    });
  });
});
```

### Accessibility Tests Pattern

```typescript
// accessibility-test.tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import BpkIconLabel from './BpkIconLabel';
import { InformationCircleIcon } from '@skyscanner/backpack-web/bpk-component-icon';

describe('BpkIconLabel accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkIconLabel.Root>
        <BpkIconLabel.Icon>
          <InformationCircleIcon />
        </BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          Information text with <a href="/learn">link</a>
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should ensure link is keyboard accessible', async () => {
    const { container } = render(
      <BpkIconLabel.Root>
        <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
        <BpkIconLabel.Text>
          Text with <a href="/test">link</a>
        </BpkIconLabel.Text>
      </BpkIconLabel.Root>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/test');
    await userEvent.tab();
    expect(link).toHaveFocus();
  });
});
```

### RTL Testing Pattern

```typescript
const mockIsRtl = jest.fn(() => false);

jest.mock('../../bpk-react-utils/index', () => ({
  ...jest.requireActual('../../bpk-react-utils/index'),
  isRTL: () => mockIsRtl(),
}));

it.each([
  ['ltr', false],
  ['rtl', true],
])('should render correctly in %s mode', (mode, isRtl) => {
  mockIsRtl.mockReturnValue(isRtl);
  const { asFragment } = render(<TestComponent />);
  expect(asFragment()).toMatchSnapshot();
});
```

**Alternatives Considered**:
- **Test subcomponents separately**: Violates Backpack testing philosophy
- **Skip snapshot tests**: Would miss visual regressions
- **Manual accessibility only**: Insufficient coverage (40% automated + 60% manual)

**Architecture Decision Reference**: `decisions/accessibility-tests.md`

---

## 6. Component API Design

### Decision: Compound Components with Context + Convenience API

**Rationale**: Provides flexibility for power users while maintaining simplicity for common cases.

### Compound Component Structure

**Primary API** (Flexible composition):
```typescript
<BpkIconLabel.Root type="body" style="default">
  <BpkIconLabel.Icon>
    <InformationCircleIcon />
  </BpkIconLabel.Icon>
  <BpkIconLabel.Text>
    Information about this feature. <a href="/learn">Learn more</a>
  </BpkIconLabel.Text>
</BpkIconLabel.Root>
```

**Convenience API** (Simplified single-component):
```typescript
<BpkIconLabel
  type="body"
  style="default"
  icon={<InformationCircleIcon />}
  text="Information about this feature"
  linkText="Learn more"
  linkHref="/learn"
/>
```

**TypeScript Type Pattern**:
```typescript
type BpkIconLabelType = 'body' | 'label-1' | 'footnote';
type BpkIconLabelStyle = 'default' | 'on-dark';

interface BpkIconLabelContext {
  type: BpkIconLabelType;
  style: BpkIconLabelStyle;
}

export const IconLabelContext = createContext<BpkIconLabelContext>({
  type: 'body',
  style: 'default',
});
```

**Alternatives Considered**:
- **Single component only**: Less flexible for complex compositions
- **Compound only**: More verbose for simple use cases
- **Array-based children**: Less flexible than React element children

**Architecture Decision Reference**: Similar to BpkAccordion dual API approach.

---

## 7. File Structure

### Decision: Follow Standard Backpack Package Structure

**Rationale**: Maintains consistency with all other Backpack components.

```
packages/bpk-component-icon-label/
├── README.md
├── index.ts                                    # exports from src/
├── docs/                                       # Figma screenshots
└── src/
    ├── BpkIconLabel/
    │   ├── BpkIconLabel.tsx                   # Main component + context
    │   ├── BpkIconLabelRoot.tsx               # Root subcomponent
    │   ├── BpkIconLabelIcon.tsx               # Icon subcomponent
    │   ├── BpkIconLabelText.tsx               # Text subcomponent
    │   ├── BpkIconLabel.module.scss           # Styles
    │   ├── BpkIconLabel-test.tsx              # Unit tests
    │   ├── accessibility-test.tsx              # A11y tests
    │   ├── BpkIconLabel.figma.tsx             # Figma Code Connect
    │   ├── common-types.ts                     # Shared TypeScript types
    │   └── __snapshots__/
    ├── themeAttributes.ts                      # Theme attributes export
    └── index.ts                                # Re-export from BpkIconLabel/
```

**Storybook Examples**:
```
examples/bpk-component-icon-label/
├── stories.tsx                                 # Storybook story definitions
├── examples.tsx                                # Example implementations
└── IconLabelStory.module.scss                 # Example styles (if needed)
```

**Alternatives Considered**:
- **Flat structure**: Less organized for compound components
- **Sub-folders per subcomponent**: Overkill for small components
- **Separate packages**: Violates Backpack monorepo structure

**Architecture Decision Reference**: `decisions/js-filenames.md`, `decisions/component-scss-filenames.md`

---

## 8. Documentation Requirements

### Decision: British English Prose, <100 Words

**Rationale**: Per `decisions/writing-docs.md`, Backpack uses British English for prose.

**README Pattern**:
```markdown
# Icon label

A flexible component for displaying an icon alongside text with an optional link, supporting multiple typography styles and colour schemes.

## Installation

npm install @skyscanner/backpack-web

## Usage

import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';
import { InformationCircleIcon } from '@skyscanner/backpack-web/bpk-component-icon';

<BpkIconLabel.Root type="body">
  <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
  <BpkIconLabel.Text>Information text</BpkIconLabel.Text>
</BpkIconLabel.Root>
```

**JSDoc Pattern**:
```typescript
/**
 * BpkIconLabel is a compound component for displaying an icon alongside text with optional inline links.
 *
 * It supports three typography variants (body, label-1, footnote) and two colour schemes (default, on-dark).
 *
 * @example
 * <BpkIconLabel.Root type="body" style="default">
 *   <BpkIconLabel.Icon><InformationCircleIcon /></BpkIconLabel.Icon>
 *   <BpkIconLabel.Text>Information text</BpkIconLabel.Text>
 * </BpkIconLabel.Root>
 */
```

**Alternatives Considered**:
- **American English**: Violates Backpack standards
- **Longer descriptions**: Violates <100 word requirement
- **Technical focus**: Should describe purpose, not configuration

**Architecture Decision Reference**: `decisions/writing-docs.md`

---

## Key Findings Summary

| Area | Decision | Implementation Status |
|------|----------|----------------------|
| **Compound Pattern** | React Context for parent-child communication | ✅ Implemented with IconLabelContext |
| **Theming** | Full BpkThemeProvider integration | ✅ 3 theme attributes (default, on-dark, night) |
| **Typography** | Use bpk-body-default, bpk-label-1, bpk-footnote mixins | ✅ All 3 types implemented |
| **Color Schemes** | **ENHANCED**: enum instead of boolean | ✅ colorScheme='default'/'on-dark'/'night' |
| **Icon Color** | **ENHANCED**: color: inherit from text | ✅ Icon inherits text color via CSS |
| **Icon Alignment** | **ENHANCED**: withAlignment HOC | ✅ Vertical centering with first line |
| **Sass** | Modern @use syntax with granular imports | ✅ Implemented correctly |
| **RTL** | bpk-rtl mixin for flex-direction flip | ✅ Implemented with row-reverse |
| **Testing** | Compound components tested together | ✅ 32 tests passing, no violations |
| **API** | Compound only (no convenience) | ✅ Root, Icon, Text subcomponents |
| **Spacing** | tokens.bpk-spacing-md() (8px) | ✅ Gap between icon and text |
| **Colors** | $bpk-text-primary-day / on-dark / night | ✅ All 3 color schemes implemented |
| **File Structure** | Flat src/ structure | ✅ All files in src/ directly |

**Key Enhancements from Research Phase**:
1. **Night Mode Added**: Third color scheme with dedicated theme attribute
2. **Icon Color Inheritance**: Simplified theming (icon automatically matches text)
3. **withAlignment HOC**: Better vertical alignment for multi-line text
4. **Compound API Only**: Removed complexity of dual API pattern

---

## Implementation Validation

This research guided the successful implementation:
- ✅ Compound component pattern implemented with Context
- ✅ Theming approach confirmed (3 theme attributes)
- ✅ Typography and spacing tokens applied
- ✅ Testing strategy executed (32 tests passing)
- ✅ RTL support implemented with bpk-rtl mixin
- ✅ **ENHANCED**: Night mode added beyond original spec
- ✅ **ENHANCED**: Icon color inheritance for simpler theming
- ✅ **ENHANCED**: withAlignment HOC for better icon positioning

**Status**: ✅ All research findings successfully implemented and validated
