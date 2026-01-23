---
name: document-backpack-component
description: Creates Storybook stories with interactive examples, accessibility testing, and visual regression support via Percy
user-invocable: true
allowed-tools: Read, Write
---

# Document Backpack Component

Creates comprehensive Storybook documentation with interactive examples, automatic accessibility testing, and visual regression testing.

## What Gets Created

✅ Storybook stories for each component variant
✅ Accessibility panel integration (jest-axe)
✅ Visual regression test stories for Percy
✅ Zoom testing at 200% for accessibility
✅ Interactive component controls
✅ Example implementations

## Story Structure

### Basic Story File
```typescript
// examples/bpk-component-tabs/stories.tsx
import BpkTabs from '../../packages/bpk-component-tabs';
import { DefaultExample, UnderlineExample } from './examples';

export default {
  title: 'bpk-component-tabs',
  component: BpkTabs,
};

// One story per variant
export const DefaultTabs = () => <DefaultExample />;

export const UnderlineTabs = () => <UnderlineExample />;

// Visual regression testing (Percy auto-detects)
export const VisualTest = () => (
  <div>
    <DefaultExample />
    <UnderlineExample />
  </div>
);

// Zoom testing at 200%
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};
```

## How to Ask

```
Create Storybook stories for BpkAccordion:
- Default story (expandable sections)
- Single-expand story (only one open)
- Animated story (transitions)
- VisualTest combining all variants
- VisualTestWithZoom for 200% zoom

Include examples component with realistic content.
```

## Story Naming Convention

### Regular Stories
```typescript
export const DefaultLayout = () => <DefaultExample />;
export const MultipleItems = () => <MultipleItemsExample />;
export const WithFooter = () => <WithFooterExample />;
```

### Visual Regression (Percy)
Percy automatically detects stories starting with `VisualTest`:

```typescript
// ✅ Detected by Percy (100% zoom)
export const VisualTest = () => <CombinedVariants />;

// ✅ Detected by Percy (100% zoom)
export const VisualTestDefault = () => <DefaultVariant />;

// ✅ Detected by Percy (200% zoom)
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};

// ❌ NOT detected by Percy
export const Story = () => <Component />;
export const Test = () => <Component />;
```

## Example Component Pattern

```typescript
// examples/bpk-component-accordion/examples.tsx
import BpkAccordion from '../../packages/bpk-component-accordion';

export const DefaultExample = () => (
  <BpkAccordion>
    <BpkAccordion.Item title="Section 1">
      Content 1
    </BpkAccordion.Item>
    <BpkAccordion.Item title="Section 2">
      Content 2
    </BpkAccordion.Item>
  </BpkAccordion>
);

export const SingleExpandExample = () => (
  <BpkAccordion single>
    <BpkAccordion.Item title="Section 1">
      Content 1
    </BpkAccordion.Item>
    <BpkAccordion.Item title="Section 2">
      Content 2
    </BpkAccordion.Item>
  </BpkAccordion>
);

export const VisualTestCombined = () => (
  <div>
    <div style={{ marginBottom: '2rem' }}>
      <h3>Default</h3>
      <DefaultExample />
    </div>
    <div>
      <h3>Single Expand</h3>
      <SingleExpandExample />
    </div>
  </div>
);
```

## Storybook Configuration

Located in `.storybook/`:
- Framework: @storybook/react-webpack5 v10
- Addons: addon-a11y, addon-docs
- Stories pattern: `examples/**/stories.@(ts|tsx)`
- Auto-documentation from TypeScript

### Key Addons
```javascript
// .storybook/main.js
export default {
  addons: [
    '@storybook/addon-a11y',      // Accessibility panel
    '@storybook/addon-docs',       // Auto-generated docs
    '@percy/storybook',            // Percy integration
  ],
};
```

## Accessibility Panel

The `@storybook/addon-a11y` addon runs jest-axe automatically:
1. Open any story
2. Click "Accessibility" tab
3. See violations and fixes

No additional setup needed - it just works!

## Percy Visual Regression Testing

### Workflow
1. Create `VisualTest*` stories
2. Push to GitHub
3. Percy automatically captures screenshots
4. Review in Percy dashboard
5. Approve or request changes
6. Merge after approval

### Story Naming for Percy
```typescript
// Percy captures these (naming must start with VisualTest)
export const VisualTest = () => <AllVariants />;
export const VisualTestMobile = () => <MobileVariant />;
export const VisualTestWithZoom = { render: () => <...>, args: { ... } };

// Responsive testing
export const VisualTest = {
  render: () => <Component />,
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
};
```

## Reference

For detailed Storybook guide: [storybook-guide.md](./storybook-guide.md)

For Percy visual regression: [percy-guide.md](./percy-guide.md)

Storybook docs: https://storybook.js.org/
Percy docs: https://percy.io/

## Running Storybook

```bash
npm start                    # Build and start on :9001
npm run storybook            # Just start (no rebuild)
npm run build-storybook      # Build static site
```

## Key Rules

✅ **DO:**
- One story per component variant
- Use `VisualTest*` prefix for regression tests
- Include zoom testing (`VisualTestWithZoom`)
- Keep stories focused and organized
- Use example components for realistic content
- Document complex interactions
- Combine variants in VisualTest

❌ **DON'T:**
- Include dynamic content (timestamps, random)
- Use internal implementation details
- Create overly complex stories
- Skip VisualTest stories
- Use different naming than VisualTest*
- Mix many unrelated components
- Forget zoom testing

## Example Structure

```
examples/bpk-component-accordion/
├── stories.tsx         # Story definitions
├── examples.tsx        # Example components
└── index.js           # Optional index
```

```typescript
// stories.tsx layout
export default { title: 'bpk-component-...' };
export const DefaultVariant = () => <...>;
export const SecondaryVariant = () => <...>;
export const VisualTest = () => <...>;
export const VisualTestWithZoom = { render: VisualTest, ... };
```
