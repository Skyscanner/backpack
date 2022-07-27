**Breaking**

`bpk-component-graphic-promotion`

- The component CSS was refactored to use the standard breakpoints from backpack.
- Additional changes requested by design:
  - The `max-width` is `1280px`.
  - The `height` in desktop landscape mode is `460px`.
  - The `height` in tablet landscape mode is `360px`.
  - The font style for the heading in small tablet portrait mode is `Bpk-Heading-1`.
  - The font style for the heading in tablet landscape mode is `Bpk-Heading-1`.
  - Portrait modes should change their height to maintain aspect ratio of 4/3 as the width changes.

**Added:**

- `bpk-component-graphic-promotion`: `3.1.2` => `3.1.3`
  - Added optional property `contentId`, to apply a HTML attribute `id` to the `div` containing the main content of the Graphic Promotion.
