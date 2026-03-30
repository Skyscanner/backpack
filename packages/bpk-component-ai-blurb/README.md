# bpk-component-ai-blurb

> A composable component for displaying AI-generated summaries with a branded header, free-slot content area, loading ellipsis animation, and feedback mechanism.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';

// Loading state
<BpkAiBlurb.Root>
  <BpkAiBlurb.Header title="Summarized by AI" />
  <BpkAiBlurb.Summary>
    Comparing your shortlist<BpkAiBlurb.Ellipsis />
  </BpkAiBlurb.Summary>
</BpkAiBlurb.Root>

// Success state with feedback
<BpkAiBlurb.Root>
  <BpkAiBlurb.Header title="Summarized by AI" />
  <BpkAiBlurb.Summary>{llmText}</BpkAiBlurb.Summary>
  <BpkAiBlurb.Feedback
    feedbackText="Was this helpful?"
    thankYouText="Thanks for your feedback!"
    thumbsUpLabel="Thumbs up"
    thumbsDownLabel="Thumbs down"
    onFeedback={(positive) => console.log(positive)}
  />
</BpkAiBlurb.Root>

// Error state
<BpkAiBlurb.Root>
  <BpkAiBlurb.Header title="Summarized by AI" />
  <BpkAiBlurb.Summary>
    Couldn't load your summary. <button type="button" onClick={retry}>Retry</button>
  </BpkAiBlurb.Summary>
</BpkAiBlurb.Root>
```

## Subcomponents

### `BpkAiBlurb.Root`

| Property | PropType  | Required | Default Value |
| -------- | --------- | -------- | ------------- |
| children | ReactNode | true     | -             |

### `BpkAiBlurb.Header`

| Property | PropType | Required | Default Value |
| -------- | -------- | -------- | ------------- |
| title    | string   | true     | -             |

### `BpkAiBlurb.Summary`

| Property | PropType  | Required | Default Value |
| -------- | --------- | -------- | ------------- |
| children | ReactNode | true     | -             |

### `BpkAiBlurb.Ellipsis`

No props. Renders inline animated three-dot loading indicator. Use inside `Summary` at the end of loading text.

### `BpkAiBlurb.Feedback`

| Property     | PropType                        | Required | Default Value |
| ------------ | ------------------------------- | -------- | ------------- |
| feedbackText   | string                        | true     | -             |
| thankYouText   | string                        | true     | -             |
| thumbsUpLabel  | string                        | true     | -             |
| thumbsDownLabel | string                       | true     | -             |
| onFeedback     | (positive: boolean) => void   | false    | -             |
