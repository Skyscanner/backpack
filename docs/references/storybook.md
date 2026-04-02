# Storybook Reference

> **Load this doc when:** adding or modifying Storybook stories or examples — story structure,
> the `examples.tsx` vs `stories.tsx` split, Percy visual test naming, or running Storybook locally.

---

# Storybook patterns

**Version:** Storybook 10 with webpack5 + Babel

## Directory structure

```
examples/
  bpk-component-{name}/
    examples.tsx    # Component example definitions (the actual JSX)
    stories.tsx     # Storybook story configuration (imports + exports)
```

Stories live in `examples/`, not `packages/`. Import paths point to source (`packages/.../src/`).

## stories.tsx pattern

```tsx
import BpkComponent from '../../packages/bpk-component-{name}/src/BpkComponent';
import {
  DefaultExample,
  LargeExample,
  VisualTestExample,
} from './examples';

export default {
  title: 'bpk-component-{name}',
  component: BpkComponent,
};

export const Default = DefaultExample;
export const Large = LargeExample;
export const VisualTest = VisualTestExample;
```

## examples.tsx pattern

```tsx
import BpkComponent from '../../packages/bpk-component-{name}/src/BpkComponent';

const DefaultExample = () => (
  <BpkComponent>Default content</BpkComponent>
);

const LargeExample = () => (
  <BpkComponent size="large">Large content</BpkComponent>
);

// VisualTest stories are captured by Percy for visual regression
const VisualTestExample = () => (
  <div>
    <BpkComponent>Default</BpkComponent>
    <BpkComponent size="large">Large</BpkComponent>
    <BpkComponent type="destructive">Destructive</BpkComponent>
  </div>
);

export { DefaultExample, LargeExample, VisualTestExample };
```

## Visual testing (Percy)

Stories exported with a name starting with `VisualTest` are captured by Percy for visual regression testing.

Visual test stories must:
1. Show **all visual variants** in a single story
2. Include different states (default, disabled, any interactive modifier states)
3. Use **stable, deterministic content** — no random data, no animations
4. Render identically on every run

Percy config: `.percy.yml`

## Naming conventions

| What | Convention | Example |
|------|------------|---------|
| Story `title` | Package name | `'bpk-component-button'` |
| Export names | Descriptive PascalCase | `Default`, `WithIcon`, `Large`, `VisualTest` |
| Visual test export | Must start with `VisualTest` | `VisualTest`, `VisualTestRTL` |

## Import paths

Stories always import from source, not dist:

```tsx
// Correct — from source
import BpkButton from '../../packages/bpk-component-button/src/BpkButton';

// Wrong — do not import from dist or package entry
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
```

Source imports enable hot module replacement during development.

## Running Storybook

```bash
npm run storybook    # Start development server
```
