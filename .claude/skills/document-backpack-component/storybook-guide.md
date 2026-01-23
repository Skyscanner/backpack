# Storybook and Visual Testing Guide

Detailed reference material for the `/document-backpack-component` skill.

## Storybook File Organization

### Directory Structure
```
examples/bpk-component-accordion/
├── stories.tsx              # Story definitions
├── examples.tsx             # Example components
└── index.js                 # Optional index export
```

### Story File Template
```typescript
// examples/bpk-component-accordion/stories.tsx
import BpkAccordion from '../../packages/bpk-component-accordion';
import {
  DefaultExample,
  SingleExpandExample,
  WithCustomHeaderExample,
} from './examples';

export default {
  title: 'bpk-component-accordion',
  component: BpkAccordion,
};

// One story per use case
export const Default = () => <DefaultExample />;

export const SingleExpand = () => <SingleExpandExample />;

export const WithCustomHeader = () => <WithCustomHeaderExample />;

// Visual regression testing
export const VisualTest = () => (
  <div>
    <DefaultExample />
    <SingleExpandExample />
    <WithCustomHeaderExample />
  </div>
);

// Zoom testing at 200%
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};
```

## Example Components

### Pattern
```typescript
// examples/bpk-component-accordion/examples.tsx
import BpkAccordion from '../../packages/bpk-component-accordion';

export const DefaultExample = () => (
  <BpkAccordion>
    <BpkAccordion.Item title="Section 1">
      <p>Content for section 1</p>
    </BpkAccordion.Item>
    <BpkAccordion.Item title="Section 2">
      <p>Content for section 2</p>
    </BpkAccordion.Item>
    <BpkAccordion.Item title="Section 3">
      <p>Content for section 3</p>
    </BpkAccordion.Item>
  </BpkAccordion>
);

export const SingleExpandExample = () => (
  <BpkAccordion single>
    <BpkAccordion.Item title="Section 1">
      <p>Content for section 1</p>
    </BpkAccordion.Item>
    <BpkAccordion.Item title="Section 2">
      <p>Content for section 2</p>
    </BpkAccordion.Item>
  </BpkAccordion>
);

export const WithCustomHeaderExample = () => (
  <BpkAccordion>
    <BpkAccordion.Item title={<strong>Custom Header</strong>}>
      <p>Content with custom header</p>
    </BpkAccordion.Item>
  </BpkAccordion>
);
```

## Story Naming Conventions

### Regular Stories
```typescript
// ✅ Clear, descriptive names
export const DefaultState = () => <Component />;
export const LoadingState = () => <Component loading />;
export const DisabledState = () => <Component disabled />;
export const WithError = () => <Component error="Error message" />;
export const LongContent = () => <Component text={longText} />;
```

### Visual Regression Testing

Percy automatically detects stories with these names:

```typescript
// ✅ DETECTED BY PERCY
export const VisualTest = () => <AllVariants />;
export const VisualTestDefault = () => <DefaultVariant />;
export const VisualTestWithZoom = { render: () => <...>, ... };

// ❌ NOT DETECTED
export const Test = () => <Component />;
export const Story = () => <Component />;
```

### Naming Best Practices
```typescript
// ✅ Specific
export const DefaultButton = () => <BpkButton>Click</BpkButton>;
export const DisabledButton = () => <BpkButton disabled>Click</BpkButton>;

// ❌ Too generic
export const Story1 = () => <BpkButton>Click</BpkButton>;
export const Test = () => <BpkButton>Click</BpkButton>;
```

## Percy Integration

### How Percy Works

1. **Detect Stories**
   - Looks for stories named `VisualTest*`
   - Captures screenshots automatically
   - Compares to previous baseline

2. **Workflow**
   ```
   Git Push → CI Triggers → Percy Captures → Compare → Approve/Reject → Merge
   ```

3. **Story Naming**
   ```typescript
   // Percy captures these
   export const VisualTest = () => <Component />;
   export const VisualTestMobile = () => <Component />;
   export const VisualTestWithZoom = { render: () => <...>, args: { zoomEnabled: true } };

   // Percy ignores these
   export const Default = () => <Component />;
   export const Story = () => <Component />;
   ```

## Storybook Configuration

### Main Configuration
```typescript
// .storybook/main.js
export default {
  stories: ['../../examples/**/stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-a11y',      // Accessibility panel
    '@storybook/addon-docs',       // Auto-generated docs
    '@percy/storybook',            // Percy integration
  ],
  framework: '@storybook/react-webpack5',
};
```

### Preview Configuration
```typescript
// .storybook/preview.js
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z]' },
  controls: { expanded: true },
};
```

## Accessibility Panel

### Automatic Testing
The `@storybook/addon-a11y` addon runs jest-axe automatically:

1. Open any story
2. Click "Accessibility" tab
3. See violations and suggestions
4. No additional setup needed

### Example Violations
```
Color Contrast
└─ Element has insufficient color contrast (1.5:1)
   Fix: Use proper color tokens

ARIA
└─ Button missing accessible name
   Fix: Add aria-label

Images
└─ Image missing alt text
   Fix: Add alt attribute
```

## Zoom Testing

### 200% Zoom
```typescript
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};
```

Why zoom testing matters:
- Tests responsive behavior at larger text sizes
- WCAG requirement for accessibility
- Percy tests at both 100% and 200% zoom

## Responsive Testing

### Viewport Variations
```typescript
export const MobileView = {
  render: () => <Component />,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const TabletView = {
  render: () => <Component />,
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
};

export const DesktopView = {
  render: () => <Component />,
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
};
```

## Complex Stories

### With Controls (Knobs)
```typescript
export const Configurable = {
  render: (args) => <BpkButton {...args}>Click</BpkButton>,
  args: {
    type: 'primary',
    size: 'small',
    disabled: false,
  },
};
```

### With Multiple Components
```typescript
export const ButtonVariants = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <BpkButton type="primary">Primary</BpkButton>
    <BpkButton type="secondary">Secondary</BpkButton>
    <BpkButton type="tertiary">Tertiary</BpkButton>
  </div>
);
```

### With State
```typescript
export const WithHover = {
  render: () => <BpkButton>Hover State</BpkButton>,
  parameters: {
    pseudo: { hover: true },
  },
};

export const WithFocus = {
  render: () => <BpkButton>Focus State</BpkButton>,
  parameters: {
    pseudo: { focus: true },
  },
};
```

## Best Practices

### ✅ Do
- One story per use case
- Realistic example content
- Clear story names
- Group related variants
- Document complex interactions
- Include VisualTest* for Percy
- Test at multiple zoom levels

### ❌ Don't
- Mix unrelated components
- Use placeholder "Lorem ipsum" without context
- Create overly complex stories
- Skip VisualTest stories
- Use different naming than VisualTest*
- Include dynamic content (timestamps)
- Make examples too simplistic

## Running Storybook

```bash
# Build and start
npm start                     # On port :9001

# Just start (no rebuild)
npm run storybook

# Build static site
npm run build-storybook

# View Percy
# Check Percy dashboard for visual regression results
```

## Percy Workflow

### Step 1: Create Stories
```typescript
export const VisualTest = () => <AllVariants />;
export const VisualTestWithZoom = { render: VisualTest, args: { zoomEnabled: true } };
```

### Step 2: Push Code
```bash
git push origin feature-branch
```

### Step 3: Percy Runs
- Automatically captures screenshots
- Compares to main branch baseline
- Blocks merge until reviewed

### Step 4: Review
- Open Percy dashboard
- See visual diffs
- Approve or request changes

### Step 5: Merge
- Percy approval required
- All visual checks pass
- Code is visually tested

## Common Patterns

### Card Component
```typescript
export const VisualTest = () => (
  <div>
    <BpkCard>Default card</BpkCard>
    <BpkCard elevated>Elevated card</BpkCard>
    <BpkCard interactive>Interactive card</BpkCard>
  </div>
);
```

### Button Variants
```typescript
export const VisualTest = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <h4>Primary</h4>
      <BpkButton type="primary">Small</BpkButton>
      <BpkButton type="primary" size="large">Large</BpkButton>
    </div>
    <div>
      <h4>Secondary</h4>
      <BpkButton type="secondary">Small</BpkButton>
      <BpkButton type="secondary" size="large">Large</BpkButton>
    </div>
  </div>
);
```

### States
```typescript
export const VisualTest = () => (
  <div>
    <BpkComponent>Normal</BpkComponent>
    <BpkComponent disabled>Disabled</BpkComponent>
    <BpkComponent loading>Loading</BpkComponent>
  </div>
);
```
