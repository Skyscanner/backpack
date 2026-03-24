<!--
==============================================================================
Phase 0 Research — RTL Spike Option 2
==============================================================================
-->

# Research: RTL Spike Option 2 — Ark LocaleProvider in BpkProvider

**Branch**: `001-rtl-spike-option2`
**Date**: 2026-03-24
**Status**: Complete

---

## 1. BpkProvider Current Implementation

**Decision**: Option 2 modifies `BpkProvider` — the single integration point.

**File**: `packages/bpk-component-layout/src/BpkProvider.tsx`

```typescript
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

export const BpkProvider = ({ children }: BpkProviderProps): JSX.Element => (
  <ChakraProvider value={bpkSystem}>{children}</ChakraProvider>
);
```

**Key finding**: BpkProvider currently wraps only Chakra's `ChakraProvider`. It has no RTL awareness, no Ark integration, and a minimal public API (`children: ReactNode`). This makes it a clean integration point — adding `LocaleProvider` internally requires only one file change and leaves the public API unchanged.

**Rationale**: Modifying only `BpkProvider` satisfies FR-003 (no public API change) and NFR-004 (changes confined to `bpk-component-layout`).

**Alternatives considered**: Adding LocaleProvider at the individual component level (Option 4 approach). Rejected for this spike — Option 2 specifically requires a single integration point with no per-component changes.

---

## 2. Ark UI LocaleProvider API

**File**: `packages/node_modules/@ark-ui/react/dist/providers/locale/locale-provider.d.ts`

```typescript
export interface LocaleProviderProps extends PropsWithChildren {
  /**
   * The locale to use for the application.
   * @default 'en-US'
   */
  locale: string;
}
export declare const LocaleProvider: (props: LocaleProviderProps) => JSX.Element;
```

**Implementation (from Ark source)**:
```javascript
const LocaleProvider = ({ children, locale }) => {
  const context = {
    locale,
    dir: isRTL(locale) ? "rtl" : "ltr"  // @zag-js/i18n-utils
  };
  return jsx(LocaleContextProvider, { value: context, children });
};
```

**Key finding**: `LocaleProvider` accepts a BCP 47 locale string and automatically derives `dir` from it using `@zag-js/i18n-utils`. It provides locale + direction via React context, consumed by all Ark Zag machines within the tree.

**Rationale**: Passing `locale: 'ar-SA'` causes Ark to infer `dir: 'rtl'`. Ark components then use this context for RTL layout (indicator positions, animation directions, scroll behaviour, etc.).

**Coupling concern**: `LocaleProvider` provides `{ locale, dir }` context — not just direction. The `locale` string (e.g., `'ar-SA'`) is technically a locale, not just a direction marker. This is a simplification: we always pass either `'en-US'` (LTR) or `'ar-SA'` (RTL) regardless of the actual language. This is a known trade-off for Phase 1.

---

## 3. Existing `getArkLocale` and `getDocumentDir` Utilities

**File**: `packages/bpk-react-utils/src/getArkLocale.ts`

```typescript
const ARK_LOCALE: Record<Direction, string> = {
  ltr: 'en-US',
  rtl: 'ar-SA',
};

export const getDocumentDir = (): Direction => {
  if (typeof document === 'undefined') return 'ltr';
  return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
};

const getArkLocale = (): string => ARK_LOCALE[getDocumentDir()];
```

**Key finding**: `getArkLocale()` already exists and maps `document.dir` → BCP 47 locale. However, it is a plain function (one-time read). For reactive direction support (US3 / US4), BpkProvider needs a stateful mechanism.

**Rationale**: Rather than calling `getArkLocale()` directly in the JSX, we need a `useDocumentDir()` hook that subscribes to `document.documentElement[dir]` changes via `MutationObserver`. The hook can live in `bpk-react-utils` (already contains `getDocumentDir`) or directly in `bpk-component-layout`.

**Architecture Decision Reference**: No existing decision file. This spike will inform a new decision on locale/RTL patterns.

---

## 4. Current RTL Mechanism in Backpack

**Decision**: Backpack's existing RTL is entirely CSS-based.

**Mechanism**: `html[dir='rtl']` attribute on the document element triggers `@include bpk-rtl` Sass mixin:

```scss
// packages/bpk-mixins/_utils.scss
@mixin bpk-rtl {
  html[dir='rtl'] & {
    @content;
  }
}
```

**Examples** (representative):
- `bpk-component-calendar/src/BpkCalendarWeek.module.scss` — flips gradient direction
- `bpk-component-chip-group/src/BpkStickyChip.module.scss` — switches border side
- Non-Ark components: 100% CSS-driven. No React context involved.

**Compatibility conclusion**: Adding Ark's `LocaleProvider` inside `BpkProvider` does NOT affect CSS-based RTL. The `[dir='rtl']` CSS selector reads from the DOM attribute, which is completely independent of React context. The two mechanisms are orthogonal — BpkTicket, BpkButton, BpkCalendar etc. will not notice the presence of `LocaleProvider`.

---

## 5. Reactive Direction — Hook Design

**Decision**: Use a `useDocumentDir()` hook backed by `MutationObserver`.

**Pattern** (derived from Option 4 spike research, `packages/bpk-react-utils/src/getArkLocale.ts`):

```typescript
import { useEffect, useState } from 'react';

const useDocumentDir = (): 'ltr' | 'rtl' => {
  const [dir, setDir] = useState<'ltr' | 'rtl'>(getDocumentDir);

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

**Rationale**: MutationObserver fires synchronously after the DOM attribute changes, causing a React state update that re-renders `BpkProvider` with the new locale. This satisfies US3 (live direction toggle) and US4 (mixed components respond together).

**SSR safety**: `useState(getDocumentDir)` uses lazy initialisation — `getDocumentDir` is a function reference (not a call), so it is not executed during SSR. `useEffect` does not run on the server. Safe for Next.js and similar SSR frameworks.

**Performance**: Only one `MutationObserver` per `BpkProvider` instance (typically one per page). Callback fires only on `dir` attribute mutations — not on every DOM change.

---

## 6. Storybook Story Patterns

**Decision**: Follow the segmented control V2 RTL story pattern.

**Pattern found** in `examples/bpk-component-segmented-control-v2/examples.tsx`:
```typescript
const RtlLayout = () => (
  <div dir="rtl">
    <BpkSegmentedControlV2.Root label="ترتيب حسب" ...>
      ...
    </BpkSegmentedControlV2.Root>
  </div>
);
```

**Difference for Option 2 spike**: The `<div dir="rtl">` pattern sets direction on a container, NOT on `<html>`. For Option 2 (which reads `document.documentElement.dir`), the Storybook RTL toolbar toggle (which sets `<html dir="rtl">`) is the correct validation mechanism — not `<div dir="rtl">`.

**For spike stories, both approaches will be demonstrated**:
- Container-level `<div dir="rtl">`: shows CSS-based RTL working (non-Ark components)
- Storybook toolbar RTL toggle: shows Ark-based RTL working (via LocaleProvider)

**Before/After story**: Create two sub-stories — one rendering BpkCheckboxV2 outside BpkProvider (no Ark RTL), one inside BpkProvider with Option 2 applied (Ark RTL works).

---

## 7. No Existing Decision Files for This Domain

Search across `decisions/` found no files on RTL strategy, Ark UI integration, or locale management. The existing decisions are:
- `modern-sass-api.md`, `sizing-in-rem.md`, `versioning-rules.md`, `accessibility-tests.md`, `js-filenames.md`, `component-scss-filenames.md`, `deprecated-api.md`, `future-api.md`, `packages.md`, `release-schedule.md`, `ts-deprecating-props.md`, `visual-tests.md`, `writing-docs.md`

**Rationale**: This spike's findings should inform a new `decisions/rtl-ark-integration.md` decision document after the three options are evaluated.

---

## Summary of Key Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| Integration point | Modify `BpkProvider` only | Cleanest single point, no public API changes |
| Locale source | `getDocumentDir()` → BCP 47 mapping (via existing `getArkLocale`) | Already implemented and SSR-safe |
| Reactivity | `useDocumentDir()` hook with `MutationObserver` | Satisfies US3/US4; one observer per provider |
| Locale values | `'en-US'` / `'ar-SA'` | Simplest that works for LTR/RTL inference in Ark |
| Non-Ark compat | CSS `[dir='rtl']` is DOM-based, orthogonal to React context | No regression risk |
| SSR | Lazy `useState(getDocumentDir)` + effect-only observer | No `document` access at module load or during SSR |
