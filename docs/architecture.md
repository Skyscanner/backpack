# Architecture Reference

> **Load this doc when:** exploring the codebase structure, planning where new files go,
> understanding package relationships, or any task involving multiple packages.

---

## Project Overview

**Backpack** is Skyscanner's design system — a collection of design resources, reusable components, and guidelines for creating consistent user interfaces across Skyscanner's products.

- **Repository**: Skyscanner/backpack
- **Language**: TypeScript/JavaScript (React components)
- **Package Manager**: npm
- **Build System**: Webpack, Gulp + custom scripts
- **Styling**: SCSS with BEM methodology
- **Documentation**: [skyscanner.design](https://www.skyscanner.design/)

---

## Package Organization

```
packages/
├── bpk-component-{name}/          # Individual React components
├── bpk-mixins/                    # SCSS mixins and utilities
├── bpk-stylesheets/               # Compiled CSS
└── bpk-tokens/                    # Design tokens

examples/
└── bpk-component-{name}/          # Storybook examples per component
```

---

## Component Structure

- Each component lives in `packages/bpk-component-{name}/`
- Components follow the naming pattern: `BpkComponentName`
- All components are prefixed with `Bpk`
- Examples: `BpkButton`, `BpkCard`, `BpkChip`

### Component Package Layout

```
packages/bpk-component-{name}/
├── src/
│   ├── Bpk{Name}.tsx              # Main component
│   ├── Bpk{Name}.module.scss      # Styles
│   ├── Bpk{Name}-test.tsx         # Unit tests
│   └── accessibility-test.tsx     # Accessibility tests (jest-axe)
└── README.md                      # Component documentation

examples/bpk-component-{name}/
├── examples.tsx                   # Example implementations
└── stories.tsx                    # Storybook stories
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `BpkButton.tsx` |
| SCSS modules | PascalCase | `BpkButton.module.scss` |
| Unit test files | `{Name}-test.tsx` (hyphen) | `BpkButton-test.tsx` |
| Accessibility test files | `accessibility-test.tsx` (fixed name) | `accessibility-test.tsx` |
| Story files | `stories.tsx` + `examples.tsx` | in `examples/bpk-component-{name}/` |

---

## Decision Records

Architectural decisions and guidelines are in the `decisions/` directory:
- Component naming conventions
- API design patterns
- Accessibility requirements
- Testing strategies
- Build system choices
