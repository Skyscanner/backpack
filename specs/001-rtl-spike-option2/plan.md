<!--
==============================================================================
DOCUMENT PURPOSE: Design HOW to implement spec.md requirements (Implementation)
==============================================================================
-->

# Implementation Plan: RTL Spike Option 2 — Ark LocaleProvider in BpkProvider

**Branch**: `001-rtl-spike-option2` | **Date**: 2026-03-24 | **Spec**: [spec.md](./spec.md)

---

## Summary

Integrate Ark's `LocaleProvider` inside the existing `BpkProvider` (layout package). `BpkProvider` gains a `useDocumentDir()` hook (backed by `MutationObserver`) that tracks `document.documentElement.dir` reactively. The derived locale (`'en-US'` or `'ar-SA'`) is passed to `LocaleProvider`, which propagates direction context to all Ark-based components in the tree. No public API changes. No per-component changes.

---

## Technical Context

**Framework**: React 18.3.1 with TypeScript 5.9.2
**Styling**: No new SCSS (CSS-based RTL unaffected)
**Testing**: Storybook visual validation (no unit tests for this spike)
**Build Tools**: Webpack 5, Babel 7
**Package Manager**: npm ≥10.7.0
**Node Version**: ≥18.20.4
**Target Browsers**: Chrome 109+, Edge 142+, Firefox 145+, Safari 16+, Samsung 29+
**Scope**: Single file change in `packages/bpk-component-layout/` + new Storybook stories
**External dependency**: `@ark-ui/react` — already in workspace dependency tree, no new installation

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

### Core Principles Compliance

- [X] **Component-First Architecture**: Modifying `packages/bpk-component-layout/src/BpkProvider.tsx` — existing package, no new package needed
- [X] **Naming Conventions**: No new component or file names; all conventions preserved
- [X] **License Headers**: Existing file retains Apache 2.0 header; no new files with missing headers
- [X] **Modern Sass**: No Sass changes in this spike
- [X] **Accessibility-First**: RTL support is required for accessibility compliance
- [X] **TypeScript**: All code in TypeScript; no JS files added
- [N/A] **Test Coverage**: Spike explicitly excludes unit tests; validated via Storybook
- [X] **Documentation**: Spike findings captured in research.md and plan.md
- [X] **Versioning**: PATCH — internal implementation change, no public API change

### Technology Compliance

- [X] **React Version**: Using React 18 hooks (`useState`, `useEffect`)
- [X] **TypeScript Version**: Types compatible with TS 5.9.2
- [N/A] **CSS Modules**: No new styles
- [N/A] **rem Units**: No new styles
- [N/A] **Design Tokens**: No new styles
- [N/A] **BEM Naming**: No new CSS classes
- [X] **RTL Support**: This IS the RTL support feature
- [X] **Browser Support**: `MutationObserver` is supported in all target browsers

### Complexity Tracking

| Note | Detail |
|------|--------|
| Locale coupling | Ark `LocaleProvider` provides both `locale` and `dir` context. We pass `'ar-SA'` for RTL regardless of the actual page language. This is a known Phase 1 trade-off — documents the coupling concern for the decision log. |
| SSR safety | `useState(getDocumentDir)` uses lazy initialisation — safe in SSR contexts. `useEffect` + `MutationObserver` only runs in browser. |

---

## Phase 0: Research & Discovery

### Findings

Complete findings in [research.md](./research.md). Summary:

1. **BpkProvider** (`packages/bpk-component-layout/src/BpkProvider.tsx`): Wraps only `ChakraProvider`. Single `children: ReactNode` prop. Clean integration point.

2. **Ark `LocaleProvider`** (`@ark-ui/react`): Accepts `locale: string` (BCP 47). Internally calls `isRTL(locale)` from `@zag-js/i18n-utils` to compute `dir`. Provides `{ locale, dir }` via React context to all Ark Zag machines.

3. **Existing utilities** (`packages/bpk-react-utils/src/getArkLocale.ts`): `getDocumentDir()` and `getArkLocale()` already exist but are one-shot functions. A `useDocumentDir()` hook is needed for reactivity.

4. **CSS-based RTL**: `html[dir='rtl']` CSS selector via `@include bpk-rtl` Sass mixin. Completely orthogonal to React context — non-Ark components are unaffected by adding `LocaleProvider`.

5. **No existing decisions**: No `decisions/` file covers RTL/Ark integration. This spike will inform one.

---

## Phase 1: Design & Planning

### BpkProvider Implementation

**File to modify**: `packages/bpk-component-layout/src/BpkProvider.tsx`

```typescript
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

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { LocaleProvider } from '@ark-ui/react';

import { createBpkConfig } from './theme';

export interface BpkProviderProps {
  children: ReactNode;
}

// Remove Chakra's global CSS to prevent style conflicts with Backpack components
const { globalCss: _chakraGlobalCss, ...defaultConfigWithoutGlobalCss } =
  defaultConfig;

const bpkSystem = createSystem(defaultConfigWithoutGlobalCss, createBpkConfig());

type Direction = 'ltr' | 'rtl';

// Maps DOM direction to BCP 47 locale understood by Ark's isRTL() function.
// 'ar-SA' is chosen as a minimal RTL locale — Ark only uses it to derive dir='rtl'.
const ARK_LOCALE: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

// SSR-safe: returns 'ltr' when document is unavailable.
const getDocumentDir = (): Direction =>
  typeof document !== 'undefined' &&
  document.documentElement.getAttribute('dir') === 'rtl'
    ? 'rtl'
    : 'ltr';

// Reactive hook: re-renders when document.documentElement[dir] changes.
// Uses MutationObserver so direction toggles (Storybook toolbar, locale switcher)
// propagate to all Ark-based components in the tree without a page reload.
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

/**
 * BpkProvider - Provides context for Backpack layout and Ark-based components.
 *
 * Wraps children with:
 * - Chakra UI system context (for layout components: BpkFlex, BpkGrid, etc.)
 * - Ark UI LocaleProvider (for Ark-based components: BpkCheckboxV2, etc.)
 *
 * RTL support: reads document direction reactively and passes the appropriate
 * locale to Ark's LocaleProvider, enabling all Ark-based components to render
 * correctly in right-to-left layouts without any additional wrapping.
 */
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

### Storybook Examples

See [api-design.md](./api-design.md) for the full Storybook code examples. Summary of required stories:

| Story file | Example name | Purpose |
|-----------|-------------|---------|
| `examples/bpk-component-checkbox-v2/examples.tsx` | `RtlOption2ArkExample` | Ark RTL via BpkProvider |
| `examples/bpk-component-checkbox-v2/examples.tsx` | `RtlOption2BeforeAfterExample` | Before/after comparison |
| `examples/bpk-component-checkbox-v2/examples.tsx` | `RtlOption2MixedExample` | Ark + non-Ark together |
| `examples/bpk-component-checkbox-v2/stories.tsx` | `RtlOption2Ark`, `RtlOption2Mixed`, `RtlOption2BeforeAfter` | Story exports |

For the mixed story including `BpkSegmentedControlV2`, examples can be added to `examples/bpk-component-segmented-control-v2/` in a similar pattern.

The modal story (BpkModalV3) should be placed in `examples/bpk-component-modal/` following the existing modal story pattern.

### Validation Instructions

1. Start Storybook: `npm run storybook`
2. Navigate to the new RTL Option 2 stories
3. Use the Storybook direction toolbar toggle to switch `html[dir]`
4. Observe:
   - Ark components (checkbox, segmented control) update layout without reload
   - Non-Ark components (ticket) also update via CSS, simultaneously
   - No console errors or warnings
5. Optionally open React DevTools to verify re-render count is minimal (only BpkProvider and its consumers re-render on direction toggle)

---

## Dependencies

### Internal Backpack Dependencies

- `packages/bpk-component-layout` — BpkProvider (modified)
- `packages/bpk-react-utils` — `getDocumentDir` (referenced for pattern; may inline in spike)

### External Dependencies

- `@ark-ui/react` — `LocaleProvider` (already in workspace; no new install)
- `@chakra-ui/react` — `ChakraProvider` (unchanged; existing peer dep)

---

## File Change Summary

| File | Type | Description |
|------|------|-------------|
| `packages/bpk-component-layout/src/BpkProvider.tsx` | Modified | Add `useDocumentDir` hook + `LocaleProvider` wrapper |
| `examples/bpk-component-checkbox-v2/examples.tsx` | Modified | Add 3 new RTL Option 2 examples |
| `examples/bpk-component-checkbox-v2/stories.tsx` | Modified | Export new RTL Option 2 stories |
| `examples/bpk-component-segmented-control-v2/examples.tsx` | Modified | Add live-toggle RTL example (US4) |
| `examples/bpk-component-segmented-control-v2/stories.tsx` | Modified | Export US4 story |
| (Optional) `examples/bpk-component-modal/` | Modified | Add BpkModalV3 RTL story |

**Zero changes** to: individual component packages (checkbox, segmented-control, checkbox-card, modal), bpk-react-utils, bpk-mixins, or any SCSS files.

---

## Versioning

**Package**: `bpk-component-layout`
**Version type**: PATCH
**Rationale**: Internal implementation change. BpkProvider's public API (`children: ReactNode`) is unchanged. Existing consumers wrapping LTR content see no difference. New behaviour is additive — RTL support is enabled, not breaking existing usage.

---

## Validation Findings Template

After running the spike, document findings here:

### Concern 1: Compatibility with existing RTL patterns

- [ ] BpkTicket RTL layout unchanged by adding LocaleProvider: **[RESULT]**
- [ ] BpkButton states unchanged: **[RESULT]**
- [ ] CSS `[dir="rtl"]` rules still apply correctly: **[RESULT]**
- [ ] Any unexpected visual changes in non-Ark components: **[RESULT]**

### Concern 2: LocaleProvider coupling and performance

- [ ] `LocaleProvider` re-render scope — only BpkProvider + Ark context consumers re-render on direction toggle: **[RESULT]**
- [ ] `LocaleProvider` extra responsibilities beyond direction (calendar, date format, etc.) — observed in practice: **[RESULT]**
- [ ] Performance overhead noticeable to user: **[RESULT]**
- [ ] Unexpected behaviours introduced: **[RESULT]**

### Recommendation

- [ ] Is Option 2 safe for Phase 1? **[YES / NO / CONDITIONAL]**
- [ ] Remaining risks: **[LIST]**
- [ ] Follow-up work needed: **[LIST]**

---

## References

- [spec.md](./spec.md)
- [research.md](./research.md)
- [api-design.md](./api-design.md)
- [styling-guide.md](./styling-guide.md)
- Related: `CLOV-1447-rtl-spike-option1`, `CLOV-1447-rtl-spike-option4`
- `packages/bpk-component-layout/src/BpkProvider.tsx`
- `packages/bpk-react-utils/src/getArkLocale.ts`
- `@ark-ui/react` — `LocaleProvider`
