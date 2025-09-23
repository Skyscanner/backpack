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
├── bpk-stylesheets/              # Compiled CSS
└── bpk-tokens/                   # Design tokens
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
npm run type-check
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

## Design Tokens

Backpack uses design tokens for consistent styling:

- **Colors**: Primary, secondary, background, text colors
- **Spacing**: Consistent spacing scale (sm, base, lg, xl, xxl)
- **Typography**: Font sizes, line heights, font weights
- **Borders**: Border radius, border widths
- **Shadows**: Box shadow definitions
- **Breakpoints**: Responsive design breakpoints

Access tokens via:
```scss
@use '../../unstable__bpk-mixins/tokens';

.my-component {
  color: tokens.$bpk-color-text-primary;
  padding: tokens.bpk-spacing-base();
  border-radius: tokens.bpk-border-radius-sm();
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
│   ├── BpkExample.module.scss          # Styles
│   └── BpkExample.test.tsx      # Tests
├── README.md                    # Component documentation
examples/bpk-component-example/
│   └── examples.tsx   # Storybook examples
│   └── stories.tsx    # Storybook stories
```

### Import Patterns
```typescript
// Component imports
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

// Token imports
@use '@skyscanner/backpack-web/unstable__bpk-mixins/tokens';
```

This guide should help AI agents understand the structure, patterns, and conventions used in the Backpack Design System codebase.