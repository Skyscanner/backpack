# BpkCompareModal

A modal-based table component for comparing up to 3 items side by side. The consumer owns the columns state and controls the open/close state.

## Usage

```tsx
import { BpkCompareModal } from '@skyscanner/backpack-web/bpk-component-comparison-table';
import type { BpkCompareColumn, BpkCompareModalTranslations } from '@skyscanner/backpack-web/bpk-component-comparison-table';
```

## Consumer responsibilities

- **Manage the columns array.** The table is stateless — it renders whatever you pass to `columns`.
- **Cap the array at 3 columns.** If you pass more than 3, only the first 3 are rendered.
- **Ensure rowId sequences match across all columns.** Every column must declare the same `rowId` values in the same order. `rowId` is the shared key that aligns rows across columns — think of it as the row label (e.g. `'cancellation'`, `'rating'`). Mismatches will cause rows to misalign.
- **Control open/close state.** Pass `isOpen` and call `setIsOpen(false)` inside `onClose`.
- **Handle removal.** When `onRemove(itemId)` fires, remove that item from your columns array. If fewer than 2 items remain you should also close the modal.
- **Compose BpkAiBlurb when needed.** Pass a `BpkAiBlurb.Root` as children of `BpkCompareModal.Header`. The component does not render AI content automatically — you own the composition.

## Example

```tsx
import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';
import { BpkCompareModal } from '@skyscanner/backpack-web/bpk-component-comparison-table';
import type { BpkCompareColumn, BpkCompareModalTranslations } from '@skyscanner/backpack-web/bpk-component-comparison-table';

const [isOpen, setIsOpen] = useState(false);
const [columns, setColumns] = useState<BpkCompareColumn[]>([
  {
    itemId: 'deal-1',
    bestTag: true,
    imageSrc: '/img/deal-1.jpg',
    imageAlt: 'Citroen C1',
    headerContent: <MyHeader name="rentalcars.com" price="£71" />,
    rows: [
      { rowId: 'cancellation', cell: <span>Free cancellation</span> },
      { rowId: 'rating', cell: <span>4.5 — Excellent</span> },
    ],
    removeA11yLabel: 'Remove rentalcars.com deal',
  },
  {
    itemId: 'deal-2',
    imageSrc: '/img/deal-2.jpg',
    imageAlt: 'Citroen C1',
    headerContent: <MyHeader name="Hertz" price="£85" />,
    rows: [
      { rowId: 'cancellation', cell: <span>No free cancellation</span> },
      { rowId: 'rating', cell: <span>3.8 — Good</span> },
    ],
    removeA11yLabel: 'Remove Hertz deal',
  },
]);

const handleRemove = (itemId: string) => {
  const remaining = columns.filter((col) => col.itemId !== itemId);
  setColumns(remaining);
  if (remaining.length < 2) setIsOpen(false);
};

const translations = {
  closeLabel: 'Close comparison',
  removeLabel: 'Remove',
  bestTagLabel: 'Best',
  addMoreDescription: 'Add up to 3 deals to compare your favourites',
  addMoreLinkText: 'Add more',
};

<BpkCompareModal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <BpkCompareModal.Header
    title="Compare cars"
    translations={translations}
  >
    <BpkAiBlurb.Root>
      <BpkAiBlurb.Header title="Summarized by AI" />
      <BpkAiBlurb.Summary state="aiResponse" aiResponseText={<p>Rentalcars.com offers the best value.</p>} />
      <BpkAiBlurb.Feedback
        feedbackText="Was this helpful?"
        thankYouText="Thanks for your feedback!"
        thumbsUpLabel="Thumbs up"
        thumbsDownLabel="Thumbs down"
        onFeedback={(positive) => trackEvent(positive ? 'thumb_up' : 'thumb_down')}
      />
    </BpkAiBlurb.Root>
  </BpkCompareModal.Header>
  <BpkCompareModal.Content
    columns={columns}
    onRemove={handleRemove}
    onAddMoreClick={() => setIsOpen(false)}
    translations={translations}
  />
</BpkCompareModal.Root>
```

If you don't need the AI blurb, omit the children from `BpkCompareModal.Header`:

```tsx
<BpkCompareModal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <BpkCompareModal.Header
    title="Compare cars"
    translations={translations}
  />
  <BpkCompareModal.Content
    columns={columns}
    onRemove={handleRemove}
    onAddMoreClick={() => setIsOpen(false)}
    translations={translations}
  />
</BpkCompareModal.Root>
```

## Props

### `BpkCompareModal.Root`

| Property | PropType    | Required | Default Value |
| -------- | ----------- | -------- | ------------- |
| isOpen   | boolean     | true     | -             |
| onClose  | `() => void` | true    | -             |
| children | ReactNode   | true     | -             |

### `BpkCompareModal.Header`

| Property     | PropType                        | Required | Default Value |
| ------------ | ------------------------------- | -------- | ------------- |
| translations | `BpkCompareModalTranslations`   | true     | -             |
| title        | string                          | false    | -             |
| children     | ReactNode                       | false    | -             |

### `BpkCompareModal.Content`

| Property       | PropType                        | Required | Default Value |
| -------------- | ------------------------------- | -------- | ------------- |
| columns        | `BpkCompareColumn[]`        | true     | -             |
| onRemove       | `(itemId: string) => void`      | true     | -             |
| onAddMoreClick | `() => void`                    | true     | -             |
| translations   | `BpkCompareModalTranslations`   | true     | -             |

### `BpkCompareModalTranslations`

| Property           | PropType | Required | Default Value |
| ------------------ | -------- | -------- | ------------- |
| closeLabel         | string   | true     | -             |
| removeLabel        | string   | true     | -             |
| bestTagLabel       | string   | true     | -             |
| addMoreDescription | string   | true     | -             |
| addMoreLinkText    | string   | true     | -             |

### `BpkCompareColumn`

| Property        | PropType        | Required | Default Value |
| --------------- | --------------- | -------- | ------------- |
| itemId          | string          | true     | -             |
| rows            | `BpkCompareRow[]`  | true     | -             |
| headerContent   | ReactNode       | true     | -             |
| removeA11yLabel | string          | true     | -             |
| imageSrc        | string          | false    | -             |
| imageAlt        | string          | false    | -             |
| bestTag         | boolean         | false    | `false`       |

### `BpkCompareRow`

| Property | PropType  | Required | Default Value |
| -------- | --------- | -------- | ------------- |
| rowId    | string    | true     | -             |
| cell     | ReactNode | true     | -             |

`rowId` is the shared key that links the same attribute across all columns. Every column must contain the same `rowId` values in the same order. The component derives the table's row structure from the first column's `rowId` list, so a mismatch will cause rows to misalign.

A common pattern is to define a helper that always produces rows in a fixed order:

```tsx
const makeRows = (cancellation: string, rating: string): BpkCompareColumn['rows'] => [
  { rowId: 'cancellation', cell: <span>{cancellation}</span> },
  { rowId: 'rating',       cell: <span>{rating}</span> },
];

// Then use it consistently across all columns:
const columns: BpkCompareColumn[] = [
  { itemId: 'deal-1', rows: makeRows('Free cancellation', '4.5 — Excellent'), ... },
  { itemId: 'deal-2', rows: makeRows('No free cancellation', '3.8 — Good'), ... },
];
```
