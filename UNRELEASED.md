**Changed:**

- bpk-component-switch:
  - Added new `small` variant using a `boolean` to enable the small size.
  - Deprecated `type` property as we no longer use/support `event` type switch and only have one style.

**Patched:**

- Upgraded to latest `@stylelint-config-skyscanner`, which brings into align style standards across components. The main change that impacts all components is updating `@import '~bpk-mixins/index'` to include the `.scss` file extension `@import '~bpk-mixins/index.scss`.

`bpk-component-navigation-bar`: </br>
`bpk-component-modal`: </br>
  - Add missing bottom border in navigation bar