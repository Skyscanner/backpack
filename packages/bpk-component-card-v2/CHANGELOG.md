# Changelog

All notable changes to `@skyscanner/bpk-component-card-v2` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-01-28

### Added

#### Core Component
- **BpkCardV2** - Composable, responsive card component with multi-section layouts
  - Root component with flexible composition support
  - Header subcomponent (semantic `<header>` element)
  - Body subcomponent (main content area with split layout support)
  - Primary subcomponent (takes configurable width in split layout)
  - Secondary subcomponent (flexible sidebar in split layout)
  - Footer subcomponent (semantic `<footer>` element)

#### Props and Configuration
- **variant** - Visual styling (default with shadow, outlined with border)
- **bgColor** - 8 surface colour tokens for flexible theming
  - `surfaceDefault`
  - `surfaceElevated`
  - `surfaceTint`
  - `surfaceSubtle`
  - `surfaceHero`
  - `surfaceContrast`
  - `surfaceLowContrast`
  - `surfaceHighlight`
- **split** - Enable two-column layout on desktop
- **splitRatio** - Configure primary section width (0-100%, default: 70%)
- **className** - Custom CSS class support
- **ariaLabel** - Accessible labeling
- **ariaLabelledBy** - Reference to labeling element

#### Responsive Behavior
- Mobile-first design (stacked layout on < 768px)
- Responsive split layout (row on >= 768px)
- Automatic vertical stacking on mobile
- Configurable split ratio for desktop layout

#### Styling
- CSS Modules with BEM naming convention
- 8 surface colour variants using Backpack design tokens
- Shadow and border visual variants
- Semantic dividers between sections
- RTL support with logical properties

#### Accessibility
- Semantic HTML (`<header>`, `<footer>` elements)
- WCAG 2.1 Level AA compliance
- ARIA label support (`aria-label`, `aria-labelledby`)
- Full keyboard navigation support
- Proper landmark regions
- Axe accessibility testing integrated

#### Testing
- 50+ unit tests covering all features
- Accessibility tests with jest-axe
- Snapshot tests for visual regression
- Integration tests for complex scenarios
- Edge case handling (0%, 100% split ratios)
- Interactive content support testing

#### Documentation
- Comprehensive README with usage examples
- 9 Storybook stories covering all features
- JSDoc comments on all components and props
- TypeScript type definitions
- Package.json with proper exports

### Technical Details

#### Design System Integration
- Backpack token usage with `-day` suffix for theme support
- Automatic theme switching (-night variants handled by Backpack)
- 1px dividers with 4px inset spacing
- `border-radius-md` and `shadow-sm` from design tokens

#### Browser Support
- Chrome 109+
- Edge 129+
- Firefox 131+
- Safari 15+
- Samsung 26+

#### Dependencies
- React 18.3.1+
- TypeScript 5.9.2+
- Jest 30.0.0+ (dev)
- @testing-library/react (dev)

### Migration Guide

This is the initial release of BpkCardV2. If migrating from the previous BpkCard component:

- BpkCardV2 uses explicit subcomponents (Header, Body, Footer) instead of children
- Split layout now uses dedicated Primary/Secondary subcomponents
- Surface colours are configured via `bgColor` prop instead of inline styling
- Variant support is now built-in (default shadow vs outlined border)

### Future Enhancements

Potential features for future releases:
- Hover state styling
- Custom divider styling
- Animation/transition support
- Additional layout variants
- Custom slot support for specialized layouts

---

For more information, see the [README](./README.md) and [Backpack Design System Documentation](https://www.skyscanner.design/latest/components/card).
