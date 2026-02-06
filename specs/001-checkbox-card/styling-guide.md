# Styling Guide: Checkbox Card Component

**Phase**: 1
**Date**: 2026-01-27
**Component**: BpkCheckboxCard
**Objective**: Define CSS structure, Sass patterns, and visual implementation

---

## 1. BEM Class Structure

### Base Classes
```scss
.bpk-checkbox-card {
  // Base card wrapper (label element)
}

.bpk-checkbox-card__input {
  // Hidden checkbox input
}

.bpk-checkbox-card__content {
  // Content wrapper (flex container)
}

.bpk-checkbox-card__icon {
  // Icon container
}

.bpk-checkbox-card__image {
  // Image container
}

.bpk-checkbox-card__text {
  // Text wrapper (label + description)
}

.bpk-checkbox-card__label {
  // Primary label text
}

.bpk-checkbox-card__description {
  // Secondary description text
}

.bpk-checkbox-card__price {
  // Price display container
}

.bpk-checkbox-card__indicator {
  // Selection indicator (checkmark/badge)
}
```

### Modifier Classes
```scss
// Variants
.bpk-checkbox-card--with-background {
  // Default variant with visible background
}

.bpk-checkbox-card--no-background {
  // Transparent/minimal background variant
}

// States
.bpk-checkbox-card--checked {
  // Selected state styling
}

.bpk-checkbox-card--disabled {
  // Disabled state styling
}

.bpk-checkbox-card--checked--disabled {
  // Combination: selected and disabled
}
```

---

## 2. Sass Module Imports

### Required Imports
```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/cards';
@use '../../../bpk-mixins/typography';
@use '../../../bpk-mixins/utils';
@use '../../../bpk-mixins/shadows';
@use '../../../bpk-mixins/borders';
@use '../../../bpk-mixins/radii';
```

### Import Rationale
- **tokens**: Access to design tokens (spacing, colors, sizing)
- **cards**: Card base styling mixins
- **typography**: Text styling (labels, descriptions)
- **utils**: RTL support, hover states, focus indicators, theming
- **shadows**: Elevation effects
- **borders**: Border utilities
- **radii**: Border radius utilities

---

## 3. Complete SCSS Implementation

```scss
@use '../../../bpk-mixins/tokens';
@use '../../../bpk-mixins/cards';
@use '../../../bpk-mixins/typography';
@use '../../../bpk-mixins/utils';
@use '../../../bpk-mixins/shadows';
@use '../../../bpk-mixins/borders';
@use '../../../bpk-mixins/radii';

.bpk-checkbox-card {
  // Base card styling
  @include cards.bpk-card;
  position: relative;
  display: block;
  width: 100%;
  padding: tokens.bpk-spacing-md();
  cursor: pointer;
  transition: all tokens.$bpk-duration-sm ease-in-out;

  // Remove default label margin
  margin: 0;

  // Minimum touch target (mobile)
  min-height: tokens.bpk-one-pixel-rem * 44; // 44px in rem

  // With background variant (default)
  &--with-background {
    background-color: tokens.$bpk-surface-default-day;
    @include shadows.bpk-box-shadow-sm();
    @include radii.bpk-border-radius-md();
  }

  // No background variant
  &--no-background {
    background-color: transparent;
    @include borders.bpk-border-sm(tokens.$bpk-line-day);
    @include radii.bpk-border-radius-md();
  }

  // Hover state
  @include utils.bpk-hover {
    &:not(&--disabled) {
      @include shadows.bpk-box-shadow-lg();

      &--with-background {
        background-color: tokens.$bpk-surface-highlight-day;
      }

      &--no-background {
        background-color: tokens.$bpk-canvas-contrast-day;
      }
    }
  }

  // Focus state (keyboard navigation)
  &__input:focus-visible ~ &__content {
    outline: tokens.bpk-one-pixel-rem * 2 solid tokens.$bpk-core-accent-day;
    outline-offset: tokens.bpk-one-pixel-rem * 2;
  }

  // Selected state
  &--checked {
    &--with-background {
      background-color: tokens.$bpk-surface-highlight-day;
      border: tokens.bpk-one-pixel-rem * 2 solid tokens.$bpk-core-accent-day;
    }

    &--no-background {
      background-color: tokens.$bpk-canvas-contrast-day;
      border: tokens.bpk-one-pixel-rem * 2 solid tokens.$bpk-core-accent-day;
    }
  }

  // Disabled state
  &--disabled {
    cursor: not-allowed;
    opacity: tokens.$bpk-disabled-opacity;
    pointer-events: none;

    &--checked {
      // Disabled but selected appearance
      opacity: tokens.$bpk-disabled-opacity;
    }
  }

  // Hidden checkbox input
  &__input {
    position: absolute;
    width: tokens.bpk-one-pixel-rem;
    height: tokens.bpk-one-pixel-rem;
    margin: calc(tokens.bpk-one-pixel-rem * -1);
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  // Content wrapper
  &__content {
    display: flex;
    align-items: center;
    gap: tokens.bpk-spacing-md();
  }

  // Icon container
  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: tokens.$bpk-text-primary-day;

    @include utils.bpk-rtl {
      // Mirror icon position in RTL
      order: 99; // Move to end in RTL
    }
  }

  // Image container
  &__image {
    flex-shrink: 0;
    width: tokens.bpk-one-pixel-rem * 48; // 48px
    height: tokens.bpk-one-pixel-rem * 48;
    @include radii.bpk-border-radius-sm();
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include utils.bpk-rtl {
      // Mirror image position in RTL
      order: 99;
    }
  }

  // Text wrapper
  &__text {
    flex: 1;
    min-width: 0; // Enable text truncation
    display: flex;
    flex-direction: column;
    gap: tokens.bpk-spacing-sm();
  }

  // Label text
  &__label {
    @include typography.bpk-label-1();
    color: tokens.$bpk-text-primary-day;

    // Truncate after 2 lines (from clarification)
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    .bpk-checkbox-card--disabled & {
      color: tokens.$bpk-text-disabled-day;
    }
  }

  // Description text
  &__description {
    @include typography.bpk-text();
    color: tokens.$bpk-text-secondary-day;

    // Truncate after 3 lines (from clarification)
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;

    .bpk-checkbox-card--disabled & {
      color: tokens.$bpk-text-disabled-day;
    }
  }

  // Price container
  &__price {
    flex-shrink: 0;
    @include typography.bpk-label-1();
    @include typography.bpk-text--bold();
    color: tokens.$bpk-text-primary-day;

    .bpk-checkbox-card--disabled & {
      color: tokens.$bpk-text-disabled-day;
    }

    @include utils.bpk-rtl {
      // Price stays at end in RTL
      order: 1;
    }
  }

  // Selection indicator
  &__indicator {
    position: absolute;
    top: tokens.bpk-spacing-sm();
    right: tokens.bpk-spacing-sm();
    display: flex;
    align-items: center;
    justify-content: center;
    color: tokens.$bpk-core-accent-day;

    @include utils.bpk-rtl {
      right: auto;
      left: tokens.bpk-spacing-sm();
    }
  }
}
```

---

## 4. Design Token Mapping

### Spacing
```scss
// Padding
padding: tokens.bpk-spacing-md();        // 16px equivalent

// Gaps
gap: tokens.bpk-spacing-md();            // 16px between content elements
gap: tokens.bpk-spacing-sm();            // 8px between label/description

// Margins
margin: 0;                                // Reset label default margin

// Minimum touch target
min-height: tokens.bpk-one-pixel-rem * 44;  // 44px minimum for mobile
```

### Colors
```scss
// Backgrounds
background-color: tokens.$bpk-surface-default-day;       // With background
background-color: tokens.$bpk-surface-highlight-day;     // Hover/selected
background-color: tokens.$bpk-canvas-contrast-day;       // No background hover

// Text
color: tokens.$bpk-text-primary-day;                    // Primary text
color: tokens.$bpk-text-secondary-day;                  // Description text
color: tokens.$bpk-text-disabled-day;                   // Disabled state

// Accent/Selection
color: tokens.$bpk-core-accent-day;                     // Selection indicator
border-color: tokens.$bpk-core-accent-day;              // Selected border

// Borders
border-color: tokens.$bpk-line-day;                     // Default border
```

### Typography
```scss
// Label
@include typography.bpk-label-1();       // Primary label text
@include typography.bpk-text--bold();    // Bold variant for price

// Description
@include typography.bpk-text();          // Body text for description
```

### Shadows & Borders
```scss
// Elevation
@include shadows.bpk-box-shadow-sm();    // Default card elevation
@include shadows.bpk-box-shadow-lg();    // Hover elevation

// Border radius
@include radii.bpk-border-radius-md();   // Card corners
@include radii.bpk-border-radius-sm();   // Image corners

// Borders
@include borders.bpk-border-sm(tokens.$bpk-line-day);  // Default border
border: tokens.bpk-one-pixel-rem * 2 solid tokens.$bpk-core-accent-day;  // Selected
```

### Transitions & Timing
```scss
transition: all tokens.$bpk-duration-sm ease-in-out;  // Smooth state changes
```

---

## 5. Responsive Behavior

### Breakpoints
```scss
// Mobile (<= 768px)
@media (max-width: 768px) {
  .bpk-checkbox-card {
    min-height: tokens.bpk-one-pixel-rem * 44;  // Maintain touch target

    &__content {
      flex-direction: column;  // Stack vertically if needed
      align-items: flex-start;
    }
  }
}

// Tablet (769px - 1023px)
@media (min-width: 769px) and (max-width: 1023px) {
  .bpk-checkbox-card {
    // Grid layout handled by parent container
  }
}

// Desktop (>= 1024px)
@media (min-width: 1024px) {
  .bpk-checkbox-card {
    // Flexible layout, full features
  }
}
```

### Content Stacking
```scss
// For narrow containers
.bpk-checkbox-card--stacked {
  .bpk-checkbox-card__content {
    flex-direction: column;
    align-items: flex-start;
  }

  .bpk-checkbox-card__icon,
  .bpk-checkbox-card__image {
    margin-bottom: tokens.bpk-spacing-sm();
  }
}
```

---

## 6. RTL Support Strategy

### Directional Properties
```scss
// Icon position
.bpk-checkbox-card__icon {
  // Default: left side
  @include utils.bpk-rtl {
    order: 99;  // Move to right side in RTL
  }
}

// Image position
.bpk-checkbox-card__image {
  @include utils.bpk-rtl {
    order: 99;  // Mirror to right side
  }
}

// Price position
.bpk-checkbox-card__price {
  @include utils.bpk-rtl {
    order: 1;  // Stays at natural end
  }
}

// Indicator position
.bpk-checkbox-card__indicator {
  right: tokens.bpk-spacing-sm();

  @include utils.bpk-rtl {
    right: auto;
    left: tokens.bpk-spacing-sm();
  }
}
```

### Text Direction
```scss
// Text naturally flows RTL with html[dir="rtl"]
.bpk-checkbox-card__label,
.bpk-checkbox-card__description {
  // No explicit direction needed - inherits from html[dir]
}

// Numbers/prices maintain LTR if needed
.bpk-checkbox-card__price {
  @include utils.bpk-rtl {
    // Price numbers typically stay LTR
    // BpkPrice component handles this
  }
}
```

---

## 7. Theming Support

### Theme Attributes (themeAttributes.ts)
```typescript
export default [
  'checkboxCardCheckedBackground',
  'checkboxCardCheckedBorder',
  'checkboxCardHoverBackground',
];
```

### Themeable Properties (SCSS)
```scss
.bpk-checkbox-card {
  // Default with fallback
  @include utils.bpk-themeable-property(
    background-color,
    --bpk-checkbox-card-checked-background,
    tokens.$bpk-surface-highlight-day
  );

  &--checked {
    @include utils.bpk-themeable-property(
      border-color,
      --bpk-checkbox-card-checked-border,
      tokens.$bpk-core-accent-day
    );
  }

  @include utils.bpk-hover {
    @include utils.bpk-themeable-property(
      background-color,
      --bpk-checkbox-card-hover-background,
      tokens.$bpk-surface-highlight-day
    );
  }
}
```

### Usage Example
```typescript
import BpkCheckboxCard, { themeAttributes } from '@skyscanner/backpack-web/bpk-component-checkbox-card';
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

const customTheme = {
  checkboxCardCheckedBackground: '#e0f7fa',
  checkboxCardCheckedBorder: '#00acc1',
  checkboxCardHoverBackground: '#f1f8fb',
};

<BpkThemeProvider theme={customTheme} themeAttributes={themeAttributes}>
  <BpkCheckboxCard
    checked={checked}
    onChange={handleChange}
    label="Themed card"
  />
</BpkThemeProvider>
```

---

## 8. Visual States Implementation

### State Matrix
| State | Background | Border | Cursor | Opacity | Shadow |
|-------|------------|--------|--------|---------|--------|
| Default | surface-default | none/line | pointer | 1.0 | sm |
| Hover | surface-highlight | none/line | pointer | 1.0 | lg |
| Focus | surface-default | accent (outline) | pointer | 1.0 | sm |
| Selected | surface-highlight | accent | pointer | 1.0 | sm |
| Selected+Hover | surface-highlight | accent | pointer | 1.0 | lg |
| Disabled | surface-default | none/line | not-allowed | 0.4 | sm |
| Disabled+Selected | surface-highlight | accent | not-allowed | 0.4 | sm |

### State Combinations (SCSS)
```scss
// Default
.bpk-checkbox-card { /* base styles */ }

// Hover (not disabled)
@include utils.bpk-hover {
  .bpk-checkbox-card:not(.bpk-checkbox-card--disabled) { /* hover styles */ }
}

// Focus
.bpk-checkbox-card__input:focus-visible ~ .bpk-checkbox-card__content { /* focus styles */ }

// Selected
.bpk-checkbox-card--checked { /* selected styles */ }

// Selected + Hover
@include utils.bpk-hover {
  .bpk-checkbox-card--checked:not(.bpk-checkbox-card--disabled) { /* selected hover */ }
}

// Disabled
.bpk-checkbox-card--disabled { /* disabled styles */ }

// Disabled + Selected
.bpk-checkbox-card--disabled.bpk-checkbox-card--checked { /* disabled selected */ }
```

---

## 9. Text Truncation Implementation

### Line Clamping (Webkit)
```scss
.bpk-checkbox-card__label {
  // Truncate after 2 lines
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bpk-checkbox-card__description {
  // Truncate after 3 lines
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Fallback for Non-Webkit
```scss
// Fallback for browsers without webkit-line-clamp
@supports not (-webkit-line-clamp: 2) {
  .bpk-checkbox-card__label {
    max-height: calc(tokens.$bpk-line-height-base * 2);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bpk-checkbox-card__description {
    max-height: calc(tokens.$bpk-line-height-base * 3);
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
```

---

## 10. Performance Optimizations

### CSS Containment
```scss
.bpk-checkbox-card {
  // Optimize rendering performance
  contain: layout style;
}
```

### Will-Change for Animations
```scss
.bpk-checkbox-card {
  // Only on hover to reduce memory overhead
  @include utils.bpk-hover {
    will-change: box-shadow, background-color;
  }
}
```

### GPU Acceleration (if needed)
```scss
.bpk-checkbox-card {
  // Force GPU acceleration for smooth transitions
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

---

## 11. Testing Considerations

### Visual Regression Classes
```scss
// Add data attributes for Percy testing
.bpk-checkbox-card[data-testid] {
  // Ensure consistent rendering for screenshots
}
```

### Storybook-specific Styles
```scss
// Only in Storybook examples
.bpk-checkbox-card-story-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: tokens.bpk-spacing-lg();
  padding: tokens.bpk-spacing-lg();
}
```

---

## References

- **Specification**: `specs/001-checkbox-card/spec.md`
- **Research**: `specs/001-checkbox-card/research.md`
- **API Design**: `specs/001-checkbox-card/api-design.md`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Similar Styles**: `packages/bpk-component-card/src/BpkCard.module.scss`
