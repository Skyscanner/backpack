# bpk-component-collapsible

> Backpack collapsible component — a low-level primitive for expand/collapse content built on [Ark UI](https://ark-ui.com/docs/components/collapsible).

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

> **RTL support:** `BpkCollapsible` is built on Ark UI and requires [`BpkProvider`](https://www.skyscanner.design/latest/components/layout/web) from `@skyscanner/backpack-web/bpk-component-layout` for correct RTL layout. Wrap your application (or the relevant subtree) with `<BpkProvider>`.

## Anatomy

`BpkCollapsible` is a compound component. Consumers compose the trigger row from the exposed parts:

- `BpkCollapsible.Root` — manages open/closed state and applies the surface variant.
- `BpkCollapsible.RootProvider` — alternative root that accepts an externally owned state machine instance from `useBpkCollapsible`.
- `BpkCollapsible.Trigger` — clickable header row (renders a real `<button>`). Lays its children out as a horizontal flex row.
- `BpkCollapsible.Indicator` — chevron wrapper that rotates `0° → 180°` on open. Pulled to the end of the trigger row via auto margin.
- `BpkCollapsible.Content` — animated expandable region.

The package also exports:

- `useBpkCollapsible` — the underlying Ark state machine hook.
- `COLLAPSIBLE_VARIANTS` — variant constants (`default`, `onContrast`).

## Usage

```tsx
import BpkCollapsible from '@skyscanner/backpack-web/bpk-component-collapsible';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import ChevronDownIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/chevron-down';
import AirportsIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/airports';

const Example = () => (
  <BpkCollapsible.Root defaultOpen={false}>
    <BpkCollapsible.Trigger>
      <AirportsIcon />
      <BpkText textStyle={TEXT_STYLES.heading5}>Title</BpkText>
      <BpkText textStyle={TEXT_STYLES.label2}>Label</BpkText>
      <BpkCollapsible.Indicator>
        <ChevronDownIcon />
      </BpkCollapsible.Indicator>
    </BpkCollapsible.Trigger>
    <BpkCollapsible.Content>Contents go here.</BpkCollapsible.Content>
  </BpkCollapsible.Root>
);
```

## Composing the trigger row

`BpkCollapsible.Trigger` renders a `<button>` and is itself the flex container (`display: flex`, `align-items: center`, `inline-size: 100%`, gap between children). Drop trigger contents in directly — do not wrap them in `BpkFlex` / `BpkHStack` / `BpkVStack`. Those layout components render `<div>`s, and HTML5 only allows phrasing content inside a `<button>`; browsers will silently reparent block-level descendants.

`BpkCollapsible.Indicator` uses `margin-inline-start: auto` to push itself to the end of the row. Place it last in the trigger so the chevron sits on the trailing edge.

> Use raw icons (no `withButtonAlignment`) when composing the trigger row. The trigger uses `display: flex` with `align-items: center`, so the HOC's inline-text margin offsets the icon visually. On the `onContrast` variant, leading icons need an explicit on-dark fill (`<LeadingIcon fill={textOnDarkDay} />`) — the trigger's `color` only paints text and the chevron `Indicator`.

## Variants

`BpkCollapsible.Root` accepts a `variant` prop. Pass one of the `COLLAPSIBLE_VARIANTS` values:

- `default` — for use on the standard canvas surface.
- `onContrast` — for use on a contrasting/dark surface (e.g. inside a `BpkBox` with `backgroundColor="surface-contrast"`). Switches text and chevron colours to the on-dark token set.

```tsx
import BpkCollapsible, { COLLAPSIBLE_VARIANTS } from '@skyscanner/backpack-web/bpk-component-collapsible';

<BpkCollapsible.Root variant={COLLAPSIBLE_VARIANTS.onContrast}>
  …
</BpkCollapsible.Root>;
```

## Controlled mode

Pass `open` and `onOpenChange` to drive the component from outside state. `onOpenChange` is invoked with `{ open: boolean }`.

```tsx
const [open, setOpen] = useState(false);

<BpkCollapsible.Root
  open={open}
  onOpenChange={({ open: nextOpen }) => setOpen(nextOpen)}
>
  …
</BpkCollapsible.Root>;
```

For uncontrolled use, pass `defaultOpen` (defaults to `false`).

## RootProvider with `useBpkCollapsible`

For deeper integration — driving the same machine from multiple places, or reading derived state such as `visible` while the close animation runs — own the state machine yourself with `useBpkCollapsible` and pass it to `BpkCollapsible.RootProvider`.

```tsx
import BpkCollapsible, { useBpkCollapsible } from '@skyscanner/backpack-web/bpk-component-collapsible';

const Example = () => {
  const collapsible = useBpkCollapsible();
  const { open, setOpen, visible, disabled } = collapsible;

  return (
    <>
      <button type="button" onClick={() => setOpen(!open)}>
        Toggle ({open ? 'open' : 'closed'})
      </button>

      <BpkCollapsible.RootProvider value={collapsible}>
        <BpkCollapsible.Trigger>…</BpkCollapsible.Trigger>
        <BpkCollapsible.Content>…</BpkCollapsible.Content>
      </BpkCollapsible.RootProvider>
    </>
  );
};
```

`useBpkCollapsible` accepts the same machine props as Ark's `useCollapsible` and returns the live state plus imperative `setOpen`. `RootProvider` accepts the same `variant` prop as `Root`.

## Lazy mounting

Use `lazyMount` to defer rendering the content until the first time the section is opened. Pair with `unmountOnExit` to remove the content from the DOM whenever it closes.

```tsx
<BpkCollapsible.Root lazyMount unmountOnExit>
  …
</BpkCollapsible.Root>
```

## Show-more pattern with `collapsedHeight`

Pass `collapsedHeight` (a `string` or `number`) to keep a fixed slice of the content visible while collapsed. Useful for "show more" affordances where the trigger sits *below* the content.

```tsx
<BpkCollapsible.Root collapsedHeight="3.5rem">
  <BpkCollapsible.Content>{longCopy}</BpkCollapsible.Content>
  <BpkCollapsible.Trigger>
    <BpkText textStyle={TEXT_STYLES.label2}>Show more</BpkText>
  </BpkCollapsible.Trigger>
</BpkCollapsible.Root>
```

`collapsedHeight` is intentionally low-level. Choose a value that matches the typography being rendered and leaves enough buffer for locale-dependent wrapping so the collapse edge does not cut through glyphs.

## Disabled state

Pass `disabled` to `Root` (or supply it via the `useBpkCollapsible` machine). The trigger receives the native HTML `disabled` attribute, removing it from the tab order and announcing it as disabled to assistive technology — Ark/Zag's `data-disabled` alone would leave the button focusable and announced as enabled, so Backpack escalates the state for correctness.

When disabled, the trigger ignores click and keyboard activation; the content stays in whichever open state it was in when disabled was applied.

## Element ids

Pass `ids` to `Root` to override the auto-generated ids that wire `aria-controls` / `aria-labelledby` between the trigger and content:

```tsx
<BpkCollapsible.Root ids={{ root: 'filters', trigger: 'filters-trigger', content: 'filters-content' }}>
  …
</BpkCollapsible.Root>
```

All three keys are optional — supply only the ones you need stable.

## Styling and layout constraints

`BpkCollapsible` does not accept `className` or `style` on any of its parts. Backpack manages the surface, spacing, focus, and animation styling itself — overriding from outside would break the design system contract. If you need a wrapper or surrounding layout, place `BpkBox` / `BpkFlex` / `BpkVStack` *around* `BpkCollapsible.Root`.

The component drops cleanly into `BpkCardV2` without imposing extra padding or borders. `BpkCardV2.Root` has no intrinsic width, so constrain the wrapper if you need a stable card size as the section expands.

Collapsibles can be nested. Each level keeps its own open state, so toggling an inner section does not affect the outer one.

## Accessibility

- `aria-expanded`, `aria-controls`, and `role="region"` wiring is provided by Ark.
- When the collapsible is fully closed, Ark hides the content with the native `hidden` attribute. When `collapsedHeight` keeps closed content mounted for a "show more" pattern, Ark keeps the section present and manages interactive descendants so they stay out of the tab order while closed.
- The chevron `Indicator` is `aria-hidden`.
- Backpack's focus indicator is applied to the trigger when focused via keyboard.
- Disabled triggers receive the native `disabled` attribute, so they are skipped by tab order and announced correctly by assistive tech.

## Animation

The expand/collapse animation is driven by Ark's `data-state` attribute and the `--height` / `--collapsed-height` CSS variables Ark exposes on `Content`. `open` maps to the expand animation, while `closed` and `closing` are both treated as collapsing states. The indicator rotates `0° → 180°`. Animation is disabled when `prefers-reduced-motion: reduce` is set.

`onExitComplete` fires when the close animation finishes — useful for sequencing follow-up state changes (e.g. unmounting siblings) once the section has fully retracted.
