# BpkCompareModal

A modal-based table component for comparing up to 3 items side by side. The consumer owns the columns state and controls the open/close state.

## Usage

```tsx
import BpkCompareModal from '@skyscanner/backpack-web/bpk-component-comparison-table';
import type { BpkCompareModalColumnProps, BpkCompareModalTranslations } from '@skyscanner/backpack-web/bpk-component-comparison-table';
```

## Consumer responsibilities

- **Map your data to `BpkCompareModal.Column` sub-components.** The table is stateless — it renders whatever columns you pass inside `BpkCompareModal.Content`.
- **Cap at 3 columns.** If you pass more than 3, only the first 3 are rendered.
- **Keep row arrays the same length across all columns.** Rows are aligned positionally — index 0 in every column lands in the same table row. BpkTable handles visual alignment natively.
- **Control open/close state.** Pass `isOpen` and call `setIsOpen(false)` inside `onClose`.
- **Handle removal per column.** Pass an `onRemove` callback to each `BpkCompareModal.Column`. If fewer than 2 items remain you should also close the modal.
- **Compose BpkAiBlurb when needed.** Pass a `BpkAiBlurb.Root` as children of `BpkCompareModal.Header`. The component does not render AI content automatically — you own the composition.

## What the component owns

- Table layout and row alignment across columns
- Scroll detection and column header fade animation
- Remove button rendering and visibility
- Placeholder columns (auto-padded to 3)
- bestTag badge rendering

## Example

```tsx
import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';
import BpkCompareModal from '@skyscanner/backpack-web/bpk-component-comparison-table';
import type { BpkCompareModalTranslations } from '@skyscanner/backpack-web/bpk-component-comparison-table';

const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([
  {
    itemId: 'deal-1',
    bestTag: true,
    imageSrc: '/img/deal-1.jpg',
    imageAlt: 'Citroen C1',
    header: <MyHeader name="rentalcars.com" price="£71" />,
    rows: [
      <span key="cancellation">Free cancellation</span>,
      <span key="rating">4.5 — Excellent</span>,
    ],
    removeA11yLabel: 'Remove rentalcars.com deal',
  },
  {
    itemId: 'deal-2',
    imageSrc: '/img/deal-2.jpg',
    imageAlt: 'Citroen C1',
    header: <MyHeader name="Hertz" price="£85" />,
    rows: [
      <span key="cancellation">No free cancellation</span>,
      <span key="rating">3.8 — Good</span>,
    ],
    removeA11yLabel: 'Remove Hertz deal',
  },
]);

const handleRemove = (itemId: string) => {
  const remaining = items.filter((item) => item.itemId !== itemId);
  setItems(remaining);
  if (remaining.length < 2) setIsOpen(false);
};

const translations: BpkCompareModalTranslations = {
  closeLabel: 'Close comparison',
  removeLabel: 'Remove',
  bestTagLabel: 'Best',
  addMoreDescription: 'Add up to 3 deals to compare your favourites',
  addMoreLinkText: 'Add more',
};

<BpkCompareModal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <BpkCompareModal.Header title="Compare cars" translations={translations}>
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
  <BpkCompareModal.Content onAddMoreClick={() => setIsOpen(false)} translations={translations}>
    {items.map((item) => (
      <BpkCompareModal.Column
        key={item.itemId}
        itemId={item.itemId}
        onRemove={() => handleRemove(item.itemId)}
        removeA11yLabel={item.removeA11yLabel}
      >
        <BpkCompareModal.ColumnHeader
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          bestTag={item.bestTag}
        >
          {item.header}
        </BpkCompareModal.ColumnHeader>
        <BpkCompareModal.Rows rows={item.rows} />
      </BpkCompareModal.Column>
    ))}
  </BpkCompareModal.Content>
</BpkCompareModal.Root>
```

## Props

### `BpkCompareModal.Root`

| Property | PropType     | Required | Default Value |
| -------- | ------------ | -------- | ------------- |
| isOpen   | boolean      | true     | -             |
| onClose  | `() => void` | true     | -             |
| children | ReactNode    | true     | -             |

### `BpkCompareModal.Header`

| Property     | PropType                      | Required | Default Value |
| ------------ | ----------------------------- | -------- | ------------- |
| translations | `BpkCompareModalTranslations` | true     | -             |
| title        | string                        | false    | -             |
| children     | ReactNode                     | false    | -             |

### `BpkCompareModal.Content`

| Property       | PropType                      | Required | Default Value |
| -------------- | ----------------------------- | -------- | ------------- |
| children       | ReactNode                     | true     | -             |
| onAddMoreClick | `() => void`                  | true     | -             |
| translations   | `BpkCompareModalTranslations` | true     | -             |

### `BpkCompareModal.Column`

| Property        | PropType      | Required | Default Value |
| --------------- | ------------- | -------- | ------------- |
| itemId          | string        | true     | -             |
| onRemove        | `() => void`  | true     | -             |
| removeA11yLabel | string        | true     | -             |
| children        | ReactNode     | true     | -             |

### `BpkCompareModal.ColumnHeader`

| Property  | PropType  | Required | Default Value |
| --------- | --------- | -------- | ------------- |
| children  | ReactNode | false    | -             |
| imageSrc  | string    | false    | -             |
| imageAlt  | string    | false    | -             |
| bestTag   | boolean   | false    | `false`       |

### `BpkCompareModal.Rows`

| Property | PropType      | Required | Default Value |
| -------- | ------------- | -------- | ------------- |
| rows     | `ReactNode[]` | true     | -             |

### `BpkCompareModalTranslations`

| Property           | PropType | Required | Default Value |
| ------------------ | -------- | -------- | ------------- |
| closeLabel         | string   | true     | -             |
| removeLabel        | string   | true     | -             |
| bestTagLabel       | string   | true     | -             |
| addMoreDescription | string   | true     | -             |
| addMoreLinkText    | string   | true     | -             |

## Row alignment

Rows are aligned positionally — the ReactNode at index 0 in every column lands in the same `<tr>`. BpkTable handles the visual alignment natively. All columns must contain the same number of rows.

A common pattern is to define a helper that always produces rows in a fixed order:

```tsx
const makeRows = (cancellation: string, rating: string): ReactNode[] => [
  <span key="cancellation">{cancellation}</span>,
  <span key="rating">{rating}</span>,
];

// Use it consistently across all columns:
{items.map((item) => (
  <BpkCompareModal.Column
    key={item.itemId}
    itemId={item.itemId}
    onRemove={() => handleRemove(item.itemId)}
    removeA11yLabel={item.removeA11yLabel}
  >
    <BpkCompareModal.ColumnHeader>
      {item.header}
    </BpkCompareModal.ColumnHeader>
    <BpkCompareModal.Rows rows={makeRows(item.cancellation, item.rating)} />
  </BpkCompareModal.Column>
))}
```
