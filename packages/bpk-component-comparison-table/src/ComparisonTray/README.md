# ComparisonTray

A data-driven tray component for comparing up to 3 items. The consumer owns and manages the items state; `ComparisonTray.Root` is the only public API.

## Usage

```tsx
import ComparisonTray from '@skyscanner/backpack-web/bpk-component-comparison-table';

const [items, setItems] = useState([]);

<ComparisonTray.Root
  items={items}
  onRemove={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
  onCompare={() => navigate('/compare')}
  compareLabel="Compare"
/>
```

## Props

### `ComparisonTray.Root`

| Property     | PropType               | Required | Default Value |
| ------------ | ---------------------- | -------- | ------------- |
| items        | `ComparisonItem[]`     | true     | -             |
| onRemove     | `(id: string) => void` | true     | -             |
| onCompare    | `() => void`           | true     | -             |
| compareLabel | string                 | true     | -             |

The Compare button is disabled when fewer than 2 items are present.

### `ComparisonItem`

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| id       | string   | true     | -             |
| label    | string   | true     | -             |
| image    | string   | true     | -             |
| imageAlt | string   | false    | `label`       |

> **Note:** `Item` and `ItemPlaceholder` are internal subcomponents exported for testing and extension purposes only — they are not part of the public API.
