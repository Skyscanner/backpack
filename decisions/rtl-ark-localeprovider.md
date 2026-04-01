# RTL support for Ark-based components via BpkProvider

## TL;DR

Ark UI's `LocaleProvider` is integrated inside `BpkProvider` so all Ark-based components receive RTL layout automatically. However, Ark components that use a **Zag.js state machine with physical pixel measurements** cannot respond to locale context changes alone — they require a `key={dir}` remount workaround.

## Decision

Wrap `BpkProvider` children with Ark's `LocaleProvider`, passing a locale derived from `html[dir]` (tracked reactively via `MutationObserver`). This is **Option 2** of the RTL spike: a single-provider integration that avoids per-component changes for the common case.

For Ark components whose Zag machine caches physical pixel measurements (see "Zag machine indicator pattern" below), apply `key={dir}` to force a remount when direction changes.

## Thinking

Ark UI's `LocaleProvider` sets a `dir` attribute on its root element and exposes a locale context consumed by Ark components internally. Most layout-driven RTL behaviour (flex direction, text alignment, padding) works automatically once `LocaleProvider` is in the tree.

However, some Zag machines compute layout values eagerly at mount time using physical DOM measurements (`el.offsetLeft`, `getBoundingClientRect`) and only re-compute when their tracked state (e.g. `value`) changes — they do not subscribe to locale/direction changes. When direction changes at runtime, the locale context updates but the Zag machine's cached measurements remain stale, causing visual misalignment.

## Zag machine indicator pattern

**Affected use case:** Any Ark component that renders a **sliding/animated indicator** whose position is computed via `el.offsetLeft` or similar physical pixel APIs inside a Zag machine.

**Current known instances:** `BpkSegmentedControlV2` (`SegmentGroup` → Zag radio-group machine → `indicatorRect.x = el.offsetLeft`).

**Workaround:** Read `dir` from `useLocaleContext()` and pass it as `key` to the Ark component root. This forces React to unmount and remount the component when direction changes, restarting the Zag machine and triggering a fresh physical measurement in the new layout.

```tsx
const { dir } = useLocaleContext();

return (
  <SegmentGroup.Root key={dir} ...>
    {children}
  </SegmentGroup.Root>
);
```

**Trade-off:** Full remount on direction change. In production, direction is set at page load from the user's locale and does not change during a session, so this is not a user-facing concern. It is observable in Storybook when toggling the RTL toolbar.

**How to identify future candidates:** If an Ark component has a visible sliding indicator or absolutely-positioned element whose position is computed at mount time, check whether the underlying Zag machine tracks `dir`/`locale` as a dependency of its layout computation. If not, the `key={dir}` pattern applies.

## Anything else

CSS physical properties (`top`, `right`, `bottom`, `left`) on non-Ark elements are unaffected by `LocaleProvider` and must be migrated to CSS logical properties (`inset-block-start`, `inset-inline-end`, etc.) separately. See `BpkCheckboxCard.module.scss` for an example (`right` → `inset-inline-end`).
