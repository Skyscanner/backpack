# bpk-component-ai-summary

> A composable component for displaying AI-generated summaries with a branded header, free-slot content area, loading ellipsis animation, and feedback mechanism.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkAiSummary from '@skyscanner/backpack-web/bpk-component-ai-summary';

// Loading state
<BpkAiSummary.Root>
  <BpkAiSummary.Header title="Summarized by AI" />
  <BpkAiSummary.Summary>
    Comparing your shortlist<BpkAiSummary.Ellipsis />
  </BpkAiSummary.Summary>
</BpkAiSummary.Root>

// Success state with feedback
<BpkAiSummary.Root>
  <BpkAiSummary.Header title="Summarized by AI" />
  <BpkAiSummary.Summary>{llmText}</BpkAiSummary.Summary>
  <BpkAiSummary.Feedback
    feedbackText="Was this helpful?"
    thankYouText="Thanks for your feedback!"
    onFeedback={(positive) => console.log(positive)}
  />
</BpkAiSummary.Root>

// Error state
<BpkAiSummary.Root>
  <BpkAiSummary.Header title="Summarized by AI" />
  <BpkAiSummary.Summary>
    Couldn't load your summary. <a onClick={retry}>Retry</a>
  </BpkAiSummary.Summary>
</BpkAiSummary.Root>
```

## Subcomponents

### `BpkAiSummary.Root`

| Property | PropType  | Required | Default Value |
| -------- | --------- | -------- | ------------- |
| children | ReactNode | true     | -             |

### `BpkAiSummary.Header`

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| title    | string   | true     | -             |

### `BpkAiSummary.Summary`

| Property | PropType  | Required | Default Value |
| -------- | --------- | -------- | ------------- |
| children | ReactNode | true     | -             |

### `BpkAiSummary.Ellipsis`

No props. Renders inline animated three-dot loading indicator. Use inside `Summary` at the end of loading text.

### `BpkAiSummary.Feedback`

| Property     | PropType                        | Required | Default Value |
| ------------ | ------------------------------- | -------- | ------------- |
| feedbackText | string                          | true     | -             |
| thankYouText | string                          | true     | -             |
| onFeedback   | (positive: boolean) => void     | false    | -             |
