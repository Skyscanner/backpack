---
name: connect-component-to-figma
description: Connects React components to Figma designs using Code Connect for automatic code generation and design accuracy
user-invocable: true
allowed-tools: Read, Write
---

# Connect Component to Figma

Sets up Figma Code Connect to sync React components with Figma designs, enabling automatic code generation and design-to-code workflow.

## What Gets Created

✅ `ComponentName.figma.tsx` file
✅ Figma property → React prop mapping
✅ Example component with all combinations
✅ Ready for Figma plugin integration

## How to Ask

```
Connect BpkButton to Figma:
- Figma design: https://www.figma.com/design/...?node-id=100%3A0
- Map "Style" property to type prop (primary, secondary, tertiary)
- Map "Size" property to size prop (small, large)
- Map "Label" text property
- Include example with all combinations
```

## Code Connect Pattern

### Basic Setup
```typescript
// src/BpkButton.figma.tsx
import figma from '@figma/code-connect';
import BpkButton from './BpkButton';
import { BUTTON_TYPES, BUTTON_SIZES } from './BpkButton';

figma.connect(
  BpkButton,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack?node-id=100%3A0',
  {
    props: {
      type: figma.enum('Style', {
        'Primary': BUTTON_TYPES.primary,
        'Secondary': BUTTON_TYPES.secondary,
        'Tertiary': BUTTON_TYPES.tertiary,
      }),
      size: figma.enum('Size', {
        'Small': BUTTON_SIZES.small,
        'Large': BUTTON_SIZES.large,
      }),
      children: figma.string('Label'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ type, size, children, disabled }) => (
      <BpkButton type={type} size={size} disabled={disabled}>
        {children}
      </BpkButton>
    ),
  },
);
```

## Property Mapping

### figma.enum (Select/Variant)
```typescript
figma.enum('PropertyName', {
  'Figma Label': 'component value',
  'Another Label': 'another value',
})
```

### figma.boolean (Toggle)
```typescript
figma.boolean('Disabled')
```

### figma.string (Text Input)
```typescript
figma.string('Label')
```

### figma.number (Number Input)
```typescript
figma.number('Width')
```

### figma.children (Slots)
```typescript
figma.children('Content')
```

## Finding Figma Node IDs

1. Open Figma design file
2. Right-click component → Copy link
3. Link format: `https://www.figma.com/design/FILE_ID?node-id=PAGE_ID%3ACOMPONENT_ID`
4. Extract: `node-id=PAGE_ID%3ACOMPONENT_ID` (colon = %3A)

Example:
```
URL: https://www.figma.com/design/abc123?node-id=1234%3A567
node-id: 1234%3A567
```

## Multiple Components

For components with multiple variants in Figma:

```typescript
// Primary Button
figma.connect(
  BpkButton,
  'https://www.figma.com/design/...?node-id=100%3A0',
  { /* config */ },
);

// Secondary Button
figma.connect(
  BpkButton,
  'https://www.figma.com/design/...?node-id=200%3A0',
  { /* config */ },
);
```

## File Location & Compilation

### Naming Convention
```
src/ComponentName.figma.tsx     # ✅ Correct
src/ComponentName-figma.tsx     # ❌ Wrong
src/figma-ComponentName.tsx     # ❌ Wrong
```

### TypeScript Configuration
Figma files are excluded from:
- `tsconfig.json` (exclude: `**/*.figma.tsx`)
- Babel transpilation
- Distribution builds

They're only used for Figma Code Connect plugin.

## Real Example: BpkBadge

```typescript
// packages/bpk-component-badge/src/BpkBadge.figma.tsx
import figma from '@figma/code-connect';
import BpkBadge from './BpkBadge';
import { BADGE_TYPES } from './BpkBadge';

figma.connect(
  BpkBadge,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=2965%3A0',
  {
    props: {
      type: figma.enum('Type', {
        'Warning': BADGE_TYPES.warning,
        'Success': BADGE_TYPES.success,
        'Critical': BADGE_TYPES.critical,
        'Normal': BADGE_TYPES.normal,
        'Inverse': BADGE_TYPES.inverse,
        'Outline': BADGE_TYPES.outline,
        'Strong': BADGE_TYPES.strong,
        'Brand': BADGE_TYPES.brand,
      }),
      centered: figma.boolean('Centered'),
      docked: figma.enum('Docked', {
        'None': null,
        'Right': 'right',
        'Left': 'left',
      }),
      children: figma.string('Label'),
    },
    example: ({ type, centered, docked, children }) => (
      <BpkBadge type={type} centered={centered} docked={docked}>
        {children || 'Badge label'}
      </BpkBadge>
    ),
  },
);
```

## Workflow

### Designer Side
1. Design component in Figma
2. Notify developer of Figma link

### Developer Side
1. Create `ComponentName.figma.tsx`
2. Map Figma properties to React props
3. Include realistic example
4. Commit to repository

### Designer Using Code Connect
1. Open Figma design
2. Select component
3. Click "Dev" → "Code Connect"
4. Select React code
5. Generate code from Figma variants
6. Copy to codebase

## Testing

### Verify Connection
```bash
# Check for TypeScript errors
npm run typecheck

# The figma.tsx file should compile without errors
```

### Manual Testing
1. Open Figma file in design editor
2. Select connected component
3. Open Dev panel
4. Verify Code Connect shows up
5. Test code generation

## Current Backpack Status

**25+ components** connected to Figma:
- BpkButton and variants
- BpkBadge
- BpkCard
- BpkInputField
- And more...

All follow the pattern documented here.

## Reference

Figma Code Connect docs: https://www.figma.com/developers/api/code-connect

See examples: `packages/bpk-component-button/src/BpkButtonV2.figma.tsx`

## Key Rules

✅ **DO:**
- File named `ComponentName.figma.tsx`
- Use exported component and enums
- Map all variant combinations
- Include realistic example
- Use exact Figma node ID
- TypeScript strict mode
- Keep logic minimal

❌ **DON'T:**
- Use external dependencies beyond figma package
- Do complex calculations in example
- Forget to find correct node-id
- Use different naming convention
- Skip TypeScript checking
- Make example too simple
- Import styles/dependencies

## Benefits

✅ **Design Sync**: Designers see component props
✅ **Code Generation**: Figma generates React code
✅ **Accuracy**: Ensures designs match implementation
✅ **Efficiency**: Designers don't write code
✅ **Single Source**: Design and code stay in sync
