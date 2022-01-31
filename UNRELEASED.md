**Breaking:**

- bpk-component-content-container:
- bpk-component-heading:
- bpk-component-text:
- bpk-mixins:
    - Updated text to the new typography system. The following styles will have changed: `bpk-text--xs`, `bpk-text--sm`, `bpk-text--base`, `bpk-text--lg`, `bpk-text--xl`, `bpk-text--xxl`, `bpk-text--xxxl`, `bpk-text--xxxxl`, `bpk-text--xxxxxl`, `bpk-heading-1`, `bpk-heading-2`, `bpk-heading-3`, `bpk-heading-4`, `bpk-heading-5`, `bpk-heading-6`. Due to the bigger font sizes and line heights, if using these styles as a mixin or through the text or heading components, components will increase in height.
    - Tokens used in setting the font (i.e. font-size, line-height) will have changed. If using these tokens from `bpk-mixins`, you should check this does not alter layout.

- bpk-component-accordion:
- bpk-component-checkbox:
- bpk-component-nudger:
    - These components will slightly increase in height due to the underlying font changes, so needs to be checked it does not alter layout.