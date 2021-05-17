**Breaking:**

- bpk-component-button
- bpk-component-nudger
  - The button component is now slightly larger due to usage of the new spacing system. There are no breaking API changes, this change is only labelled as _Breaking_ to ensure you test your buttons still look good at these new sizes. The same applies to the nudger component.

  (Read more about the new spacing changes](TODO link)

**Changed:**

- bpk-tokens:
  - The following tokens are now deprecated. To migrate, use an equivalent spacing value.
    - `$button-padding-x`
    - `$button-padding-y`
    - `$button-padding-x-icon-only`
    - `$button-icon-border-radius`
    - `$button-icon-border-radius-lg`
    - `$button-large-padding-x`
    - `$button-large-padding-y`
    - `$button-large-padding-x-icon-only`
