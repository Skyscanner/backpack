# Styling Guide: BpkIconLabel Component

**Package Branch**: `001-bpk-icon-label`
**Created**: 2026-01-28
**Related**: [api-design.md](./api-design.md), [research.md](./research.md)

## BEM Class Structure

Following Backpack's BEM naming convention with `bpk-` prefix:

```scss
.bpk-icon-label {                    // Root container
  &--default { }                      // Default color scheme
  &--on-dark { }                      // On-dark color scheme

  &__icon { }                         // Icon wrapper
  &__text {                           // Text wrapper
    &--body { }                       // Body typography (16px regular)
    &--label-1 { }                    // Label 1 typography (16px bold)
    &--footnote { }                   // Footnote typography (14px regular)
  }
}
```

## Sass Implementation

### Complete SCSS Module

```scss
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/typography';
@use '../../bpk-mixins/utils';

.bpk-icon-label {
  display: flex;
  flex-direction: row;
  align-items: flex-start; // Keep icon aligned to first line
  gap: tokens.bpk-spacing-md(); // 8px spacing between icon and text

  // RTL support: flip icon to right side
  @include utils.bpk-rtl {
    flex-direction: row-reverse;
  }

  // On-dark variant colors
  &--on-dark {
    .bpk-icon-label__icon,
    .bpk-icon-label__text {
      @include utils.bpk-themeable-property(
        color,
        --bpk-icon-label-on-dark-text-color,
        tokens.$bpk-text-on-dark-day
      );
    }
  }

  // Icon wrapper
  &__icon {
    flex-shrink: 0; // Prevent icon from shrinking
    width: tokens.bpk-spacing-base(); // 16px fixed size (1rem)
    height: tokens.bpk-spacing-base(); // 16px fixed size (1rem)
    color: inherit; // Icon inherits color from parent text

    // Ensure SVG icons inherit the color
    svg {
      fill: currentcolor;
    }
  }

  // Text wrapper
  &__text {
    flex: 1; // Allow text to grow and wrap

    @include utils.bpk-themeable-property(
      color,
      --bpk-icon-label-text-color,
      tokens.$bpk-text-primary-day
    );

    // Typography variants
    &--body {
      @include typography.bpk-body-default(); // 16px regular
    }

    &--label-1 {
      @include typography.bpk-label-1(); // 16px bold
    }

    &--footnote {
      @include typography.bpk-footnote(); // 14px regular
    }

    // Link styling within text
    a {
      @include utils.bpk-themeable-property(
        color,
        --bpk-icon-label-link-color,
        tokens.$bpk-text-link-day
      );
      text-decoration: underline;

      @include utils.bpk-hover {
        @include utils.bpk-themeable-property(
          color,
          --bpk-icon-label-link-color,
          tokens.$bpk-text-link-day
        );
      }
    }
  }
}
```

## Design Token Mapping

### Spacing Tokens

| Spec Value | Token Function | Result |
|------------|----------------|--------|
| 8px (icon-text gap) | `tokens.bpk-spacing-md()` | 0.5rem (8px) |
| 16px (icon size) | `tokens.bpk-spacing-base()` | 1rem (16px) |
| 4px (text-link gap) | Handled by inline link margin | 0.25rem (4px) |

### Color Tokens

#### Default Style
| Element | Token | Value |
|---------|-------|-------|
| Text | `tokens.$bpk-text-primary-day` | #161616 |
| Icon | `tokens.$bpk-text-primary-day` | #161616 |
| Link | `tokens.$bpk-text-link-day` | (link color) |

#### On-Dark Style
| Element | Token | Value |
|---------|-------|-------|
| Text | `tokens.$bpk-text-on-dark-day` | white |
| Icon | `tokens.$bpk-text-on-dark-day` | white |
| Link | `tokens.$bpk-text-link-day` | (link color) |

### Typography Tokens

| Type | Mixin | Font Size | Line Height | Weight |
|------|-------|-----------|-------------|--------|
| body | `typography.bpk-body-default()` | 16px | 1.5 | book (400) |
| label-1 | `typography.bpk-label-1()` | 16px | 1.5 | bold (700) |
| footnote | `typography.bpk-footnote()` | 14px | 1.428 | book (400) |

## Theming Implementation

### CSS Custom Properties

Theme attributes are converted to CSS variables by BpkThemeProvider:

```scss
// Default variant
.bpk-icon-label__text {
  color: tokens.$bpk-text-primary-day; // Fallback
  color: var(--bpk-icon-label-text-color, tokens.$bpk-text-primary-day); // Theme-aware
}

// On-dark variant
.bpk-icon-label--on-dark .bpk-icon-label__text {
  color: tokens.$bpk-text-on-dark-day;
  color: var(--bpk-icon-label-on-dark-text-color, tokens.$bpk-text-on-dark-day);
}
```

### Theme Attribute Mappings

**Note**: Icon color is NOT a separate theme attribute. Icons use `color: inherit` to automatically match text color.

| Theme Attribute | CSS Variable | Default Token |
|----------------|--------------|---------------|
| `iconLabelBackgroundColor` | `--bpk-icon-label-background-color` | `transparent` |
| `iconLabelTextColor` | `--bpk-icon-label-text-color` | `$bpk-text-primary-day` |
| `iconLabelBorderColor` | `--bpk-icon-label-border-color` | `transparent` |
| `iconLabelOnDarkBackgroundColor` | `--bpk-icon-label-on-dark-background-color` | `transparent` |
| `iconLabelOnDarkTextColor` | `--bpk-icon-label-on-dark-text-color` | `$bpk-text-on-dark-day` |
| `iconLabelOnDarkBorderColor` | `--bpk-icon-label-on-dark-border-color` | `transparent` |

**Total**: 8 theme attributes (4 for default, 4 for on-dark)

## RTL Support Strategy

Use `bpk-rtl` mixin to flip layout direction:

```scss
.bpk-icon-label {
  flex-direction: row; // LTR: icon on left

  @include utils.bpk-rtl {
    flex-direction: row-reverse; // RTL: icon on right
  }
}
```

**Result**:
- LTR: `[Icon] Text content`
- RTL: `Text content [Icon]`

## Responsive Behavior

Component maintains consistent sizing across all screen sizes. Text wraps naturally:

```scss
.bpk-icon-label {
  align-items: flex-start; // Icon aligns to first line of wrapped text
}

.bpk-icon-label__text {
  flex: 1; // Allow text to wrap
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

## Accessibility Styling

### Focus States

Links within text receive default browser focus styles:

```scss
.bpk-icon-label__text a:focus {
  outline: 2px solid tokens.$bpk-line-day;
  outline-offset: 2px;
}
```

### Icon Accessibility

Icons are decorative (aria-hidden="true"), so no focus styling needed.

## Common Styling Patterns

### With Long Text

```scss
// Text wraps, icon stays at top
.bpk-icon-label {
  align-items: flex-start; // Not center
}
```

### With Custom Styling

```scss
// Consumer can add custom classes
.custom-icon-label {
  @extend .bpk-icon-label;
  background-color: #f0f0f0;
  padding: tokens.bpk-spacing-md();
  border-radius: tokens.bpk-border-radius-sm();
}
```

## Implementation Checklist

- [ ] Create `BpkIconLabel.module.scss` with license header
- [ ] Import granular mixins: tokens, typography, utils
- [ ] Implement BEM class structure with `bpk-` prefix
- [ ] Apply typography mixins for body, label-1, footnote
- [ ] Use spacing tokens for gaps (8px, 16px)
- [ ] Use color tokens with themeable-property mixin
- [ ] Implement RTL support with bpk-rtl mixin
- [ ] Ensure all sizing uses rem units
- [ ] Test long text wrapping behavior
- [ ] Test RTL layout
- [ ] Verify theme colors apply correctly

## References

- **Research**: [research.md](./research.md) - Section 3 (Sass Patterns)
- **API Design**: [api-design.md](./api-design.md) - Theming section
- **Mixins**: `/packages/bpk-mixins/` - tokens, typography, utils
- **Architecture Decisions**: `decisions/modern-sass-api.md`, `decisions/sizing-in-rem.md`
