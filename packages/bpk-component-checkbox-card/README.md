# bpk-component-checkbox-card

> Backpack checkbox card component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkCheckboxCard from '@skyscanner/backpack-web/bpk-component-checkbox-card';

export default () => (
  <BpkCheckboxCard
    checked={false}
    onChange={(checked) => console.log(checked)}
    label="Select option"
    price="£100"
  />
);
```

## Props

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| checked | boolean | true | - |
| onChange | func | true | - |
| label | string | false | null |
| description | string | false | null |
| icon | element | false | null |
| image | string or element | false | null |
| price | element or string | false | null |
| indicator | element | false | null |
| disabled | boolean | false | false |
| variant | string | false | 'with-background' |
| ariaLabel | string | false | null |
| name | string | false | null |
| value | string | false | null |

## Variants

- `with-background` (default)
- `no-background`
