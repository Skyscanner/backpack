**Breaking:**

`bpk-component-popover`: </br>
`bpk-component-modal`: </br>
`bpk-component-datepicker`: </br>
    - Components are now using the new native React `Portal` implementation. Please ensure your components still work as expected with the new `Portal`.

`bpk-component-modal`: </br>
`bpk-component-dialog`: </br>
`bpk-component-drawer`: </br>
    - `target` prop is removed. If you are passing the `target` prop to either of these components, you should instead:
        - ensure the target component is rendered in your component as it will no longer be rendered in the `Portal`

**Changed:**
- bpk-component-navigation-stack:
  - This component is deprecated, please avoid using this component and ensure you migrate away from this component.