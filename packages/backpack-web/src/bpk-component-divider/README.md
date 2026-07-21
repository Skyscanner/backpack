# bpk-component-divider

> Backpack divider component. A thin line that groups or separates content.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkDivider from '@skyscanner/backpack-web/bpk-component-divider';

export default () => (
  <>
    <p>Above the line</p>
    <BpkDivider />
    <p>Below the line</p>
  </>
);
```

A vertical divider can be used to separate inline content:

```tsx
<BpkDivider orientation="vertical" />
```

Use `spacing` to add space around the divider, and `weight` to control its thickness:

```tsx
<BpkDivider spacing="lg" weight="bold" />
```

## Props

| Property    | PropType                          | Required | Default        |
| ----------- | --------------------------------- | -------- | -------------- |
| orientation | 'horizontal' \| 'vertical'        | false    | 'horizontal'   |
| spacing     | 'none' \| 'base' \| 'lg'          | false    | 'none'         |
| weight      | 'default' \| 'bold'               | false    | 'default'      |

`BpkDivider` does not accept `className` or `style`. Backpack owns the
divider's styling. If you need to position or constrain it, wrap it in a
layout component such as `BpkBox` / `BpkFlex` / `BpkVStack`.
