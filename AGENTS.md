# AI Agents Guide for Backpack Design System

This guide provides instructions and context for AI agents working with the Backpack Design System codebase.

## Project Overview

**Backpack** is Skyscanner's design system - a collection of design resources, reusable components, and guidelines for creating consistent user interfaces across Skyscanner's products.

- **Repository**: Skyscanner/backpack
- **Language**: TypeScript/JavaScript (React components)
- **Package Manager**: npm
- **Build System**: Gulp + custom scripts
- **Styling**: SCSS with BEM methodology
- **Documentation**: [skyscanner.design](https://www.skyscanner.design/)

## Key Architecture Patterns

### Component Structure
- Each component lives in `packages/bpk-component-{name}/`
- Components follow the pattern: `BpkComponentName`
- All components are prefixed with `Bpk`
- Examples: `BpkButton`, `BpkCard`, `BpkChip`

### Package Organization
```
packages/
├── bpk-component-{name}/          # Individual React components
├── bpk-mixins/                    # SCSS mixins and utilities
├── bpk-stylesheets/               # Compiled CSS
└── bpk-tokens/                    # Design tokens
```

### File Naming Conventions
- React components: PascalCase (e.g., `BpkButton.tsx`)
- SCSS files: PascalCase (e.g., `BpkButton.module.scss`)
- Test files: `{ComponentName}.test.tsx`
- Story files: `{ComponentName}.stories.tsx`

## Development Guidelines

### Code Standards
- **TypeScript**: All new components must be written in TypeScript
- **Props Interface**: Define clear TypeScript interfaces for all component props
- **Default Props**: Use default parameters for optional props
- **Accessibility**: All components must meet WCAG 2.2 AA standards
- **Testing**: Jest + React Testing Library for unit tests
- **Storybook**: All components must have corresponding stories

### SCSS Guidelines
- Use BEM methodology for CSS class naming
- All classes prefixed with `bpk-`
- Example: `.bpk-button`, `.bpk-button--large`, `.bpk-button__icon`
- Import design tokens from `bpk-tokens`
- Use SCSS mixins from `bpk-mixins`

### Component API Patterns
```typescript
// Standard prop patterns
interface BpkComponentProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  // ... component-specific props
}

// Common prop naming
- size: 'small' | 'default' | 'large'
- variant: 'primary' | 'secondary' | 'destructive'
- disabled: boolean
- loading: boolean
```

## Build and Development Commands

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Component Development Workflow

1. **Create Component Package**
   - Follow existing package structure in `packages/bpk-component-{name}/`
   - Include: component file, tests, stories, SCSS, and package.json

2. **Component Implementation**
   - Write TypeScript React component with proper props interface
   - Include proper JSDoc comments
   - Implement accessibility features (ARIA labels, keyboard navigation)
   - Follow existing component patterns

3. **Styling**
   - Create SCSS file with BEM naming
   - Use design tokens from `bpk-tokens`
   - Follow responsive design principles
   - Support RTL languages

4. **Testing**
   - Unit tests with React Testing Library
   - Accessibility tests
   - Visual regression tests (if applicable)

5. **Documentation**
   - Storybook stories showing all variants
   - Comprehensive prop documentation
   - Usage examples

## Design Tokens and Typography

Backpack uses design tokens and typography mixins for consistent styling across all components. The token system is built on top of `@skyscanner/bpk-foundations-web` and provides access to all design system values.

### Design Token Architecture

Design tokens are centralized in `packages/unstable__bpk-mixins/_tokens.scss` which forwards all tokens from the foundations package:

```scss
@forward '@skyscanner/bpk-foundations-web/tokens/base.default';
```

### Importing Tokens and Typography

Always import both tokens and typography at the top of your SCSS files:

```scss
@use '../../unstable__bpk-mixins/tokens';
@use '../../unstable__bpk-mixins/typography';
```

### Typography Mixins

Backpack provides a comprehensive set of typography mixins for consistent text styling. Use these instead of setting font properties manually. There are more options available in `unstable__bpk-mixins/typography`.

#### Text Size Mixins
```scss
.my-component {
  // Size-based typography
  &__small-text {
    @include typography.bpk-text-xs;    // Extra small
    @include typography.bpk-text-sm;    // Small
    @include typography.bpk-text-base;  // Base/default
    @include typography.bpk-text-lg;    // Large
    @include typography.bpk-text-xl;    // Extra large
    @include typography.bpk-text-xxl;   // 2x large
    @include typography.bpk-text-xxxl;  // 3x large
  }
}
```

### Design Token Usage

#### Color Tokens
```scss
.my-component {
  // Text colors
  color: tokens.$bpk-text-primary-day;
  color: tokens.$bpk-text-secondary-day;
  color: tokens.$bpk-text-disabled-day;
  color: tokens.$bpk-text-on-dark-day;
  
  // Background colors
  background-color: tokens.$bpk-canvas-day;
  background-color: tokens.$bpk-canvas-contrast-day;
  background-color: tokens.$bpk-surface-highlight-day;
  
  // Brand colors
  background-color: tokens.$bpk-core-primary-day;
  background-color: tokens.$bpk-core-accent-day;
  
  // Border colors
  border-color: tokens.$bpk-line-day;
  border-color: tokens.$bpk-line-on-dark-day;
}
```

#### Spacing Tokens (Function-based)
```scss
.my-component {
  // Spacing functions return values in rem
  padding: tokens.bpk-spacing-base();     // 1rem (16px)
  margin: tokens.bpk-spacing-lg();        // 1.5rem (24px)
  gap: tokens.bpk-spacing-sm();           // 0.5rem (8px)
  
  // Multiple values
  padding: tokens.bpk-spacing-sm() tokens.bpk-spacing-base();
  margin: tokens.bpk-spacing-md() 0;
  
  // Full spacing scale
  padding: tokens.bpk-spacing-none();     // 0
  padding: tokens.bpk-spacing-sm();       // 0.5rem
  padding: tokens.bpk-spacing-base();     // 1rem
  padding: tokens.bpk-spacing-md();       // 1.25rem
  padding: tokens.bpk-spacing-lg();       // 1.5rem
  padding: tokens.bpk-spacing-xl();       // 2rem
}
```

### Best Practices

1. **Prefer Typography Mixins**: Use semantic typography mixins like `bpk-body-default` instead of size-based ones like `bpk-text-base`

2. **Use Spacing Functions**: Always use `tokens.bpk-spacing-base()` instead of direct values

3. **Semantic Color Naming**: Use semantic color tokens that describe purpose, not appearance

4. **Consistent Patterns**: Follow established patterns for similar UI elements

### Complete Component Example

```scss
@use '../../unstable__bpk-mixins/tokens';
@use '../../unstable__bpk-mixins/typography';

.bpk-my-component {
  display: flex;
  flex-direction: column;
  padding: tokens.bpk-spacing-base();
  background-color: tokens.$bpk-canvas-day;
  border-radius: tokens.bpk-border-radius-md();
  border: tokens.$bpk-border-size-sm solid tokens.$bpk-line-day;
  box-shadow: tokens.bpk-box-shadow-sm();
  
  &__title {
    @include typography.bpk-heading-3;
    color: tokens.$bpk-text-primary-day;
    margin-bottom: tokens.bpk-spacing-sm();
  }
  
  &__body {
    @include typography.bpk-body-default;
    color: tokens.$bpk-text-secondary-day;
    margin-bottom: tokens.bpk-spacing-base();
  }
  
  &__link {
    @include typography.bpk-link;
    @include typography.bpk-link-underlined;
  }
  
  &--compact {
    padding: tokens.bpk-spacing-sm();
    
    .bpk-my-component__title {
      @include typography.bpk-heading-4;
    }
    
    .bpk-my-component__body {
      @include typography.bpk-caption;
    }
  }
}
```

## Common Patterns and Best Practices

### Accessibility
- Always include proper ARIA labels on interactive components
- Support keyboard navigation
- Ensure color contrast meets WCAG standards
- Test with screen readers
- Use semantic HTML elements

### Performance
- Use React.memo for expensive components
- Implement proper tree shaking
- Minimize bundle size impact
- Lazy load heavy components when possible

### Internationalization
- Support RTL languages
- Use semantic markup that works across languages
- Consider text expansion in different locales
- Test with longer text strings

## Common Issues and Solutions

### Component Not Rendering
- Check if all required props are provided
- Verify imports are correct
- Ensure SCSS is properly imported
- Check for TypeScript errors

### Styling Issues
- Verify SCSS compilation
- Check class name conflicts
- Ensure design tokens are imported
- Validate BEM naming conventions

### Build Failures
- Check TypeScript compilation errors
- Verify all dependencies are installed
- Ensure tests are passing
- Check linting errors

## Integration with External Tools

### Figma Integration
- Components may have Figma mappings for design-to-code workflows
- Check for existing Code Connect mappings
- Follow Figma component naming conventions

### Package Publishing
- All packages are published to npm under `@skyscanner/` scope
- Follow semantic versioning
- Update changelogs for releases
- Coordinate with design team for major changes

## Decision Records

Check the `decisions/` directory for architectural decisions and guidelines:
- Component naming conventions
- API design patterns
- Accessibility requirements
- Testing strategies
- Build system choices

## Getting Help

- **Documentation**: [skyscanner.design](https://www.skyscanner.design/)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Code Review**: See [CODE_REVIEW_GUIDELINES.md](CODE_REVIEW_GUIDELINES.md)
- **Issues**: File GitHub issues for bugs or feature requests

## Quick Reference

### Component Template Structure
```
packages/bpk-component-example/
├── src/
│   ├── BpkExample.tsx           # Main component
│   ├── BpkExample.module.scss   # Styles
│   └── BpkExample.test.tsx      # Tests
├── README.md                    # Component documentation
examples/bpk-component-example/
│   ├── examples.tsx             # Storybook examples
│   └── stories.tsx              # Storybook stories
```

### Import Patterns
```typescript
// Component imports
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

// Token imports
@use '@skyscanner/backpack-web/unstable__bpk-mixins/tokens';
```

This guide should help AI agents understand the structure, patterns, and conventions used in the Backpack Design System codebase.
