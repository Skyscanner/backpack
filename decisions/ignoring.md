# How we ignore linter and type checker rules

## Decision
When ignoring `eslint` or `stylelint` rules inside files, specify the rules being ignored, along with a comment to explain why it's being ignored if appropriate.

Disabling rules for entire files is discouraged. If it's necessary to do so, be sure to include a comment to explain the rationale.

### Examples

```
// TODO: remove this once we update the Chart implementation to accept values other than pixels.
/* eslint-disable backpack/use-tokens */
const style = {{
  height: 16px;
}};
```

```
// Icons have an inline style attribute setting the height and width.
// so the only way to override this in CSS is to use !important.
> svg {
  /* stylelint-disable declaration-no-important */
  width: 16 * $bpk-one-pixel-rem !important;
  height: 16 * $bpk-one-pixel-rem !important;
  /* stylelint-enable declaration-no-important */`
}
```

## Thinking

It's preferable to know exactly which rules are being ignored and why.
