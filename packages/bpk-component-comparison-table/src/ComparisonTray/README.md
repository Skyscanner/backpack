# ComparisonTray

A tray component for comparing up to 3 items. The consumer owns and manage the items state — `ComparisonTray.Root` only renders what it receives.

## Usage

```tsx
import ComparisonTray from '@skyscanner/backpack-web/bpk-component-comparison-table';
```

## Consumer responsibilities

- **Manage the items array.** The tray is stateless — it renders whatever you pass to `items`.
- **Cap the array at 3 items.** If you pass more than 3, only the first 3 will be shown. The rest are silently ignored.
- **Prevent adding beyond the limit in your UI.** A common pattern is to disable the "Add to compare" buttons once 3 items are in the array.
## Example

```tsx
import ComparisonTray from '@skyscanner/backpack-web/bpk-component-comparison-table';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

const MAX_ITEMS = 3;

const [items, setItems] = useState<ComparisonItem[]>([]);

const handleAdd = (item: ComparisonItem) => {
  setItems((prev) => [...prev, item]);
};

const handleRemove = (id: string) => {
  setItems((prev) => prev.filter((i) => i.id !== id));
};

<>
  <BpkButton
    onClick={() => handleAdd({ id: '1', label: 'Flight A', image: '/img/a.jpg' })}
    disabled={items.length >= MAX_ITEMS}
  >
    Add to compare
  </BpkButton>

  <ComparisonTray.Root
    items={items}
    ariaLabel="Comparison tray"
    removeLabel="Remove"
    onRemove={handleRemove}
    onCompare={() => navigate('/compare')}
    compareLabel="Compare"
  />
</>
```

## Props

### `ComparisonTray.Root`

| Property       | PropType                          | Required | Default Value            |
| -------------- | --------------------------------- | -------- | ------------------------ |
| items          | `ComparisonItem[]`                | true     | -                        |
| onRemove       | `(id: string) => void`            | true     | -                        |
| onCompare      | `() => void`                      | true     | -                        |
| ariaLabel      | string                            | true     | -                        |
| compareLabel   | string                            | false    | `'Compare'`              |
| removeLabel    | string                            | true     | -                        |

The Compare button is disabled when fewer than 2 items are present.

### `ComparisonItem`

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| id       | string   | true     | -             |
| label    | string   | true     | -             |
| image    | string   | true     | -             |
| imageAlt | string   | false    | `label`       |

> **Note:** `Item` and `ItemPlaceholder` are internal subcomponents exported for testing purposes only — they are not part of the public API.
