**Breaking:**

`@skyscanner/backpack-web`: <br />
`bpk-component-tooltip`: </br>
  - Component is now using the new native React `Portal` implementation. Please ensure your components still work as expected with the new `Portal`.

**Fixed:**
`bpk-react-utils`: </br>
  - Fix issue where `onOpen` function which is passed as a prop to `Portal` is called with wrong arguments.

`@skyscanner/backpack-web`: <br />
`bpk-component-popover`: <br />
  - Fix issue where popover opens in wrong location on Safari due to styling issue.