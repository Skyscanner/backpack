<!--
==============================================================================
Phase 1 API Design — RTL Spike Option 2
==============================================================================
-->

# API Design: RTL Spike Option 2 — Ark LocaleProvider in BpkProvider

**Branch**: `001-rtl-spike-option2`
**Date**: 2026-03-24

---

## Public API — Unchanged

`BpkProvider`'s public interface MUST NOT change (FR-003). The props type is identical before and after Option 2:

```typescript
// packages/bpk-component-layout/src/BpkProvider.tsx

export interface BpkProviderProps {
  children: ReactNode;
}
```

No new props. No removed props. No behaviour changes visible to consumers.

---

## Internal Implementation

### 1. `useDocumentDir` Hook

A reactive hook that reads `document.documentElement.dir` and updates on changes via `MutationObserver`.

**Location**: Can live in `bpk-react-utils/src/getArkLocale.ts` (alongside `getDocumentDir`) and be re-exported from `bpk-react-utils`, or inline in `BpkProvider.tsx` if we prefer to keep the layout package self-contained for this spike.

**Recommended for spike**: Inline in `BpkProvider.tsx` to minimise blast radius. Can be extracted to `bpk-react-utils` if adopted.

```typescript
// Internal hook — NOT exported from the package

import { useEffect, useState } from 'react';

type Direction = 'ltr' | 'rtl';

const getDocumentDir = (): Direction => {
  if (typeof document === 'undefined') return 'ltr';
  return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
};

const useDocumentDir = (): Direction => {
  const [dir, setDir] = useState<Direction>(getDocumentDir);

  useEffect(() => {
    const observer = new MutationObserver(() => setDir(getDocumentDir()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });
    return () => observer.disconnect();
  }, []);

  return dir;
};
```

### 2. Updated `BpkProvider`

```typescript
// packages/bpk-component-layout/src/BpkProvider.tsx

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { LocaleProvider } from '@ark-ui/react';

import { createBpkConfig } from './theme';

// ... bpkSystem setup unchanged ...

const ARK_LOCALE: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

export const BpkProvider = ({ children }: BpkProviderProps): JSX.Element => {
  const dir = useDocumentDir();

  return (
    <ChakraProvider value={bpkSystem}>
      <LocaleProvider locale={ARK_LOCALE[dir]}>
        {children}
      </LocaleProvider>
    </ChakraProvider>
  );
};
```

### 3. `LocaleProvider` Import

`@ark-ui/react` is already installed in `packages/node_modules/@ark-ui/react` (workspace-hoisted). `BpkProvider.tsx` can import directly:

```typescript
import { LocaleProvider } from '@ark-ui/react';
```

No additional package installation required (NFR-003).

---

## How It Works — Request/Response Flow

```
document.documentElement.dir = "rtl"
      ↓
MutationObserver fires
      ↓
useDocumentDir() → setDir('rtl')
      ↓
BpkProvider re-renders with locale='ar-SA'
      ↓
<LocaleProvider locale="ar-SA">
      ↓
Ark context: { locale: 'ar-SA', dir: 'rtl' }
      ↓
Ark components (BpkCheckboxV2, BpkSegmentedControlV2, BpkCheckboxCard, BpkModalV3)
render in RTL
```

```
Non-Ark components (BpkTicket, BpkButton, BpkCalendar, ...)
↓
CSS rule: html[dir='rtl'] .bpk-ticket { ... }  (reads DOM directly)
↓
RTL layout via CSS — completely independent of React context
```

---

## Storybook Examples API

### Story: RTL Option 2 — Ark components

```typescript
// examples/bpk-component-checkbox-v2/examples.tsx (additions)

export const RtlOption2ArkExample = () => (
  <BpkProvider>
    {/* direction set via Storybook RTL toolbar → html[dir="rtl"] */}
    <BpkFlex direction="column" gap={BpkSpacing.Base}>
      <BpkCheckboxV2.Root defaultChecked>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>تنبيهات الأسعار</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>
    </BpkFlex>
  </BpkProvider>
);
```

### Story: RTL Option 2 — Before/After

```typescript
// Demonstrates the problem (before) and the fix (after)

export const RtlOption2BeforeAfterExample = () => (
  <BpkProvider>
    <BpkFlex direction="column" gap={BpkSpacing.Base}>
      <p>Without BpkProvider (Ark has no locale context — RTL broken):</p>
      {/* This renders Ark component outside BpkProvider to show the bug */}
      <BpkCheckboxV2.Root defaultChecked>
        <BpkCheckboxV2.Control><BpkCheckboxV2.Indicator /></BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>Broken RTL</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>

      <p>With BpkProvider (Ark gets locale from LocaleProvider — RTL works):</p>
      <BpkProvider>
        <BpkCheckboxV2.Root defaultChecked>
          <BpkCheckboxV2.Control><BpkCheckboxV2.Indicator /></BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label>Working RTL</BpkCheckboxV2.Label>
          <BpkCheckboxV2.HiddenInput />
        </BpkCheckboxV2.Root>
      </BpkProvider>
    </BpkFlex>
  </BpkProvider>
);
```

### Story: RTL Option 2 — Mixed (Ark + non-Ark)

This story MUST be validated using the Storybook RTL toolbar toggle, not a `<div dir="rtl">` wrapper, because:
- The Storybook toolbar sets `html[dir="rtl"]` on the document element
- `useDocumentDir()` watches `document.documentElement.dir`
- CSS `[dir="rtl"]` rules also read from `html[dir="rtl"]`
- Both mechanisms respond to the same DOM attribute — they can be validated together

```typescript
// A story combining BpkCheckboxV2 (Ark-based) + BpkTicket (CSS-based)
// Activate via Storybook toolbar: Direction → RTL
export const RtlOption2MixedExample = () => (
  <BpkProvider>
    <BpkFlex direction="column" gap={BpkSpacing.Base}>
      {/* Ark-based: RTL via LocaleProvider context */}
      <BpkCheckboxV2.Root>
        <BpkCheckboxV2.Control><BpkCheckboxV2.Indicator /></BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>إرسال العروض</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>

      {/* Non-Ark: RTL via CSS [dir="rtl"] */}
      <BpkTicket stub="00:00 — 08:00">
        Cairo — Riyadh
      </BpkTicket>
    </BpkFlex>
  </BpkProvider>
);
```

---

## Scope Boundary

| File | Change type | What changes |
|------|-------------|--------------|
| `packages/bpk-component-layout/src/BpkProvider.tsx` | Modified | Add `useDocumentDir` hook + `LocaleProvider` wrapper |
| `examples/bpk-component-checkbox-v2/examples.tsx` | Modified | Add Option 2 RTL examples |
| `examples/bpk-component-checkbox-v2/stories.tsx` | Modified | Add Option 2 RTL story entries |
| (Optionally) `bpk-react-utils/src/getArkLocale.ts` | Optional | Extract `useDocumentDir` hook if sharing with Option 4 |
| All Ark-based component packages | **No change** | Packages remain unchanged |

---

## Versioning

**Version type**: PATCH for `bpk-component-layout`

**Rationale**: Internal implementation change only. No public API changes, no new required props, no visual change to existing usage. Existing consumers using `BpkProvider` with LTR content will see no difference.
