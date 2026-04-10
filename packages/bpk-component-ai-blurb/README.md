# bpk-component-ai-blurb (experimental)

> A composable component for displaying AI-generated summaries with a branded header, state-driven content area, loading ellipsis animation, and feedback mechanism.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```tsx
import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

// AI response state with feedback
<BpkAiBlurb.Root>
  <BpkAiBlurb.Header title="Summarized by AI" />
  <BpkAiBlurb.Summary
    state="aiResponse"
    aiResponseText={
      <BpkText tagName="p" textStyle={TEXT_STYLES.caption}>
        {llmText}
      </BpkText>
    }
  />
  <BpkAiBlurb.Feedback
    feedbackText="Was this helpful?"
    thankYouText="Thanks for your feedback!"
    thumbsUpLabel="Thumbs up"
    thumbsDownLabel="Thumbs down"
    onFeedback={(positive) => console.log(positive)}
  />
</BpkAiBlurb.Root>

// Thinking state
<BpkAiBlurb.Root>
  <BpkAiBlurb.Header title="Summarized by AI" />
  <BpkAiBlurb.Summary
    state="thinking"
    thinkingText="Comparing your shortlist"
  />
</BpkAiBlurb.Root>

// Error state
<BpkAiBlurb.Root>
  <BpkAiBlurb.Header title="Summarized by AI" />
  <BpkAiBlurb.Summary
    state="error"
    errorText="Couldn't load your summary."
    errorLinkText="Retry"
    errorLinkHref="#"
  />
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

The `state` prop controls which content is displayed. Only pass the props relevant to the current state.

| Property        | PropType  | Required | Default Value |
| --------------- | --------- | -------- | ------------- |
| state           | `'aiResponse'` \| `'thinking'` \| `'error'` | true | - |
| aiResponseText  | ReactNode | When `state="aiResponse"` | - |
| thinkingText    | string    | When `state="thinking"` | - |
| errorText       | string    | When `state="error"` | - |
| errorLinkText   | string    | When `state="error"` | - |
| errorLinkHref   | string    | When `state="error"` | - |

> **Note:** `aiResponseText` accepts a `ReactNode` — the component does not enforce any text formatting on the AI response. The consumer is responsible for applying Backpack typography (e.g. `BpkText` with `TEXT_STYLES.caption`). This is intentional: AI-generated text is non-deterministic and translations vary in length and structure, so formatting cannot be reliably applied from within the component.

### `BpkAiBlurb.Ellipsis`

No props. Renders an inline animated three-dot loading indicator. Used internally by `Summary` when `state="thinking"`.

### `BpkAiBlurb.Feedback`

| Property        | PropType                      | Required | Default Value |
| --------------- | ----------------------------- | -------- | ------------- |
| feedbackText    | string                        | true     | -             |
| thankYouText    | string                        | true     | -             |
| thumbsUpLabel   | string                        | true     | -             |
| thumbsDownLabel | string                        | true     | -             |
| onFeedback      | (positive: boolean) => void   | false    | -             |
