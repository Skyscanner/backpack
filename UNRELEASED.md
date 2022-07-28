**Breaking:**

`@skyscanner/backpack-web`: <br />
`bpk-component-tooltip`: </br>
`bpk-component-popover`: </br>
`bpk-component-datepicker`: </br>
  - Components are now using the new native React `Portal` implementation.
  - Components are no longer using `findDOMNode` which is deprecated in strict mode. To achieve the same behaviour, you must use React refs. This means that when you pass a `target` to either of the `tooltip`, `popover`, or `datepicker` components (`inputComponent` in `datepicker`) you should pass a DOM element with a `ref` attached to it. The `popover` component also supports `target` as a function that returns a DOM element (or a `ref` to a DOM element). Check out the `README.md` in our components for examples of how to use them.

**Fixed:**
`bpk-react-utils`: </br>
  - Fix issue where `onOpen` function which is passed as a prop to `Portal` is called with wrong arguments.

**Changed:**

`@skyscanner/backpack-web`: <br />
`bpk-component-calendar:` </br>
`bpk-component-scrollable-calendar:` </br>
`bpk-component-datatable:` </br>
 - Update components to the new typography system. This will cause a change in the font weight of dates.

`bpk-component-description-list:` </br>
 - Update components to the new typography system.
