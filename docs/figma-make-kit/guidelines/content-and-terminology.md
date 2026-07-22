# Content & Terminology

## Voice & tone

Backpack is a cross-product design system, not a single branded product — it doesn't prescribe a marketing voice. The conventions below are the accessibility and labeling rules Backpack's own components are built around; apply them to any user-facing copy generated for a Backpack-based screen.

- **Voice**: clear and functional — copy exists to help the user complete a task (search, book, manage a trip), not to entertain.
- **Tone**: concise; action-oriented; avoid jargon in user-facing strings even if the underlying domain term is technical.
- **Accessible labels**: every icon-only control, chip, and card action needs a short, unique accessibility label in the form `{verb} {unique name}` — e.g. `Save Amsterdam hostel`, not just `Save`. If the related item's title isn't unique, fall back to a generic identifier that's still part of the item title, e.g. `Save option 1`.
- Do not adjust an accessibility label based on component state (e.g. checked/unchecked) — interactive components already announce their own state ("selected," "toggle button") to assistive technology; a label that also changes causes confusion.
- Avoid trailing punctuation in accessibility labels — it causes screen readers to pause unnecessarily.

## Capitalization & formatting

- **Buttons / CTAs**: Sentence case (e.g. "Search flights", not "Search Flights" or "SEARCH FLIGHTS").
- **Headings**: Sentence case.
- **Labels**: Sentence case; keep short and specific.
- Do not use ALL CAPS for any user-facing text — Backpack has no all-caps text style in its type scale.

## Approved vs. forbidden terms

| Use this | Not this | Notes |
| --- | --- | --- |
| Backpack | BPK, the design system | "Backpack" is the product name; "BPK" is only a code prefix (`bpk-*` classes/tokens), never written out in prose or user-facing copy. |
| component | widget, control (when referring to a Backpack component specifically) | Match the vocabulary this doc set uses so generated copy/comments stay consistent with `components/overview.md`. |
| token | variable, style constant | "Token" is the established term across `foundations/*.md` — don't introduce a synonym. |

This table is intentionally small: Backpack is a design system used across many products, so it does not own a fixed marketing vocabulary the way a single product would. When building a screen for a specific product on top of Backpack, extend this table with that product's own approved/forbidden terms rather than inventing generic ones here.

## Microcopy patterns

| Situation | Copy |
| --- | --- |
| Empty state | Short, plain description of what's missing plus the next action, e.g. "No results found. Try adjusting your filters." |
| Loading | Prefer a visual `BpkSpinner`/skeleton over text; if text is needed, keep it short, e.g. "Loading…" |
| Success | Confirm what happened, not just that it succeeded, e.g. "Booking confirmed" (see `BpkInfoBanner`/`BpkFloatingNotification` examples in `components/overview.md`) |
| Error | State what went wrong and, where possible, what to do next, e.g. "Couldn't save changes. Try again." |

## Rules

- Validate every user-facing string (labels, headings, CTAs, error messages, body copy) against the approved/forbidden table above **before presenting output**.
- If a string uses a forbidden term, replace it with the approved term — do not ask the user to decide; fix it first.
- Keep CTAs to 1–3 words; lead with a verb where possible (e.g. "Search flights", "Save", "Continue").
- Every non-text/icon-only control needs an accessibility label following the `{verb} {unique name}` pattern above — never ship an icon button without one.
