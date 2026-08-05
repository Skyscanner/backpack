# Confirmation modal

The confirmation modal is a blocking dialog confirming or reporting the outcome of an action — a booking confirmation, a destructive-action confirmation ("Cancel this booking?"), or an error report. It is a composition of `BpkModalV3` slots plus feedback components, not a single component.

## Structure

Build a confirmation modal by arranging the following:

1. **`BpkModalV3.Root`** — `type={MODAL_V3_TYPES.default}` for a standard dialog, or `sheet` on mobile
2. **`BpkModalV3.Header`** — contains `BpkModalV3.Title` (required, even if visually hidden) and `BpkModalV3.CloseTrigger`
3. **`BpkModalV3.Body`** — contains:
   - `BpkInfoBanner` (`type={ALERT_TYPES.success}`/`critical`/etc.) if the modal is reporting a status, or plain `BpkText` for a plain confirmation question
   - Supporting detail text (`BpkText` `bodyDefault`)
4. **Footer actions** — `BpkButton` `type={BUTTON_TYPES.secondary}` ("Cancel") and `type={BUTTON_TYPES.primary}` or `destructive` (the confirming action) — at most one primary/destructive action

## Example

```tsx
import BpkModalV3, { MODAL_V3_TYPES } from '@skyscanner/backpack-web/bpk-component-modal';
import { BpkInfoBannerDismissable, ALERT_TYPES } from '@skyscanner/backpack-web/bpk-component-info-banner';
import BpkButton, { BUTTON_TYPES } from '@skyscanner/backpack-web/bpk-component-button';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import { BpkFlex, BpkSpacing } from '@skyscanner/backpack-web/bpk-component-layout';

function CancelBookingModal() {
  return (
    <BpkModalV3.Root type={MODAL_V3_TYPES.default}>
      <BpkModalV3.Portal>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Cancel this booking?</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkText textStyle={TEXT_STYLES.bodyDefault}>
              This can't be undone. Any refund will be processed within 5–7 business days.
            </BpkText>
          </BpkModalV3.Body>
          <BpkFlex justify="flex-end" gap={BpkSpacing.MD} padding={BpkSpacing.LG}>
            <BpkButton type={BUTTON_TYPES.secondary} onClick={onKeep}>Keep booking</BpkButton>
            <BpkButton type={BUTTON_TYPES.destructive} onClick={onCancel}>Cancel booking</BpkButton>
          </BpkFlex>
        </BpkModalV3.Content>
      </BpkModalV3.Portal>
    </BpkModalV3.Root>
  );
}
```

## Layout guidelines

- The confirming action (primary or destructive) is always the visually stronger, right-most (in LTR) button; the dismissing/cancel action uses `secondary`.
- For a destructive confirmation (delete, cancel), use `BUTTON_TYPES.destructive` on the confirming action, not `primary`.
- Keep body copy short — state the consequence of confirming, not a restatement of the question already in the title.

## Rules

- `BpkModalV3.Title` is required — never omit it, even for a simple confirmation.
- At most one primary/destructive action in the footer.
- Use `BpkInfoBanner` inside the body only when reporting a status (success/error) after an action already happened — not for a yes/no confirmation question, which needs no banner.
