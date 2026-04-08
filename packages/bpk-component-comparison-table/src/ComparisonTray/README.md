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
- **a11y - Manage focus after item removal.** When a remove button is clicked its DOM node is destroyed, causing focus to fall to `<body>`. Move focus explicitly in your `onRemove` handler. A common pattern is to focus the next item's remove button, falling back to the previous one:

```tsx
const trayRef = useRef<HTMLDivElement>(null);
const pendingFocusIndexRef = useRef<number | null>(null);

const removeItem = (id: string) => {
  const removedIndex = items.findIndex((item) => item.id === id);
  const remaining = items.filter((item) => item.id !== id);

  if (remaining.length > 0) {
    pendingFocusIndexRef.current = removedIndex < remaining.length ? removedIndex : removedIndex - 1;
  }

  setItems(remaining);
};

useEffect(() => {
  if (pendingFocusIndexRef.current === null) return;

  const idx = pendingFocusIndexRef.current;
  pendingFocusIndexRef.current = null;

  const removeButtons = trayRef.current?.querySelectorAll<HTMLButtonElement>(
    'button[aria-label^="Remove"]',
  );
  removeButtons?.[idx]?.focus();
}, [items]);

// Wrap ComparisonTray.Root in a div with trayRef so the query is scoped
<div ref={trayRef}>
  <ComparisonTray.Root ... onRemove={removeItem} />
</div>
```
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
