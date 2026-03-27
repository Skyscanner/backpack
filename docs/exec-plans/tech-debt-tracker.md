# Tech Debt Tracker

Track known technical debt items. Review quarterly alongside major releases.

---

## Critical

*(No critical items identified at this time.)*

---

## High

### JS-to-TypeScript migration incomplete
- **Location**: `packages/bpk-component-barchart/src/utils.js`, `packages/bpk-component-icon/scripts/generate-figma-connect.js`
- **Description**: A small number of `.js` files remain. All new components must be TypeScript (per AGENTS.md). Remaining JS files carry untyped import suppressions (`@ts-expect-error`) elsewhere.
- **Action**: Migrate remaining `.js` source files to `.ts`/`.tsx`. The `ts-migrate` script is available (`npm run ts-migrate`).
- **Reference**: `decisions/imports-ts-suppressions.md`, `decisions/js-filenames.md`

### Untyped import suppressions (`@ts-expect-error`)
- **Location**: `bpk-component-dialog`, `bpk-component-banner-alert`, `bpk-component-navigation-bar`, `bpk-component-bottom-sheet`, `bpk-component-popover`, `bpk-component-datatable`, `bpk-component-calendar`, `bpk-react-utils`, `bpk-component-theme-toggle`, `bpk-component-image`
- **Description**: Packages importing from still-untyped modules use `@ts-expect-error`. These are self-documenting: once the imported module is typed, the suppression will cause a TypeScript error prompting removal.
- **Action**: Complete TypeScript migration of suppressed modules.
- **Reference**: `decisions/imports-ts-suppressions.md`

### `bpk-react-utils/src/Portal.tsx` type fixmes
- **Location**: `packages/bpk-react-utils/src/Portal.tsx` lines 186, 303
- **Description**: Two `FIXME` suppressions covering `TouchEvent | MouseEvent` property access and an overload mismatch.
- **Action**: Investigate correct union type narrowing; resolve without suppression.

---

## Medium

### `className` prop removal TODOs
- **Location**: `bpk-component-banner-alert/src/BpkBannerAlertInner.tsx`, `bpk-component-calendar/src/composeCalendar.tsx`, `bpk-component-calendar/src/BpkCalendarGridHeader.tsx`, `bpk-component-graphic-promotion/src/BpkGraphicPromo.tsx`, `bpk-component-content-cards/src/BpkContentCard.tsx`
- **Description**: Internal `className` props marked `TODO: className to be removed`. Implementation details that have leaked into component internals.
- **Action**: Remove `className` pass-throughs and update tests.

### `BpkPriceRange` deprecation of `showPriceIndicator`
- **Location**: `packages/bpk-component-price-range/src/BpkPriceRange.tsx` (LUNA-3184)
- **Description**: TODOs indicate `showPriceIndicator` should be deprecated and replaced with a `BUBBLE` default.
- **Action**: Introduce `v{n}__` future flag per `decisions/future-api.md`, set 3-month deprecation window.

### `BpkSegmentedControl` internal state duplication
- **Location**: `packages/bpk-component-segmented-control/src/BpkSegmentedControl.tsx` line 197
- **Description**: Component maintains internal state that mirrors the `selectedIndex` controlled prop, causing potential sync issues.
- **Action**: Remove internal state, rely solely on controlled prop.

### `bpk-component-calendar` custom date logic
- **Location**: `packages/bpk-component-calendar/src/date-utils.ts` line 47
- **Description**: Custom date manipulation where `date-fns` functions should be used.
- **Action**: Replace with equivalent `date-fns` calls.

### `bpk-component-layout` hardcoded spacing values
- **Location**: `packages/bpk-component-layout/src/theme.ts` (CLOV-1021)
- **Description**: Spacing and breakpoint values hardcoded pending token additions to `@skyscanner/bpk-foundations-web`.
- **Action**: Add tokens to foundations package, then replace hardcoded values.

### `bpk-component-input` legacy JS type helpers
- **Location**: `packages/bpk-component-input/src/common-types.ts`, `common-types-test.ts`
- **Description**: Helpers and tests that should be removed once all input examples are migrated to TypeScript.
- **Action**: Migrate remaining input examples to TypeScript, then delete legacy helpers.

### `bpk-component-icon` untyped icon exports
- **Location**: `packages/bpk-component-icon/all.tsx` line 19
- **Description**: Icon exports use `any` types.
- **Action**: Generate or author specific icon types to replace `any`.

### Storybook story colocation
- **Description**: Stories live in `examples/` directory, separate from component source in `packages/`.
- **Action**: Evaluate colocating stories with component source.

### Test file naming inconsistency
- **Description**: Some tests use `Component-test.tsx`, others use `Component.test.tsx`.
- **Action**: Standardize on one convention.

---

## Low

### `BpkModal` unused `dialogRef` prop
- **Location**: `packages/bpk-component-modal/src/BpkModal.tsx`
- **Description**: `dialogRef` prop injected by `withScrim` HOC but unused.
- **Action**: Remove in next major release with deprecation notice.

### `BpkDialogWrapper` Safari 14 compatibility check
- **Location**: `packages/bpk-react-utils/src/BpkDialogWrapper/BpkDialogWrapper.tsx` line 63
- **Description**: Runtime check for native `<dialog>` element support.
- **Action**: Remove when Safari 14 is no longer supported.

### `BpkGraphicPromo` `useCallback` deferral
- **Location**: `packages/bpk-component-graphic-promotion/src/BpkGraphicPromo.tsx` line 152
- **Description**: FIXME noting `useCallback` should be used, deferred pending React version.
- **Action**: Confirm React version supports intended usage and apply.

### `BpkBannerAlert` react-transition-group test failures
- **Location**: `packages/bpk-component-banner-alert/src/BpkBannerAlertInner-test.tsx`, `AnimateAndFade-test.tsx`
- **Description**: Tests marked TODO due to known `react-transition-group` bug.
- **Action**: Track upstream fix; re-enable tests when resolved.

### Legacy SCSS dash-case filenames
- **Description**: Per `decisions/component-scss-filenames.md`, legacy filenames should be renamed to PascalCase.
- **Action**: Rename on next touch of each affected file.

### Deprecated component cleanup
- **Description**: Components with `V2`/`V3` versioned alternatives may be past their deprecation window.
- **Action**: Check dates against 3-month policy, remove expired APIs in next major.

---

## Tracking

| Item | Priority | Owner | Target Release |
|------|----------|-------|----------------|
| JS-to-TS migration | High | - | Ongoing |
| `@ts-expect-error` cleanup | High | - | Ongoing |
| Portal.tsx type fixmes | High | - | Next major |
| className removal TODOs | Medium | - | Next major |
| PriceRange deprecation | Medium | - | Next major |
| SegmentedControl state | Medium | - | TBD |
| Calendar date utils | Medium | - | TBD |
| Layout hardcoded values | Medium | - | Blocked on foundations |
| Icon untyped exports | Medium | - | TBD |
| Story colocation | Medium | - | TBD |
| Test naming | Medium | - | TBD |
| Modal dialogRef | Low | - | Next major |
| Safari 14 check | Low | - | Browser policy |
| GraphicPromo useCallback | Low | - | TBD |
| BannerAlert test fixes | Low | - | Upstream fix |
| SCSS filenames | Low | - | Opportunistic |
| Deprecated cleanup | Low | - | Next major |
