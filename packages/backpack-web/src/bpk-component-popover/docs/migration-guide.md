# Migration Guide

This guide will outline what changes you will need to make in order to use the new BpkPopover which brings a smaller library and also handles a lot of the custom logic we previously were required to maintain and upgrade with React versions.

## Changes

- Converted component to Typescript
- Added new property `showArrow` to toggle when to show the popover arrow
- Updated `isOpen` property to be optional as open state now controlled by `floating-ui` library
- `target` type now only accepts `ReactElements` and no longer functions
- Removed properties - `portalStyle`, `portalClassName`, `popperModifiers` and `renderTarget`
- Popover automatically adjusts positioning

### Automatic popover positioning

We have now built into the component default behaviour that when there is lack of space on the view the popover will open in a better position to allow users to view the popover.

E.g. If you setup the popover to open below the target but the space required to render is to small but there is more space to the right of the target, the popover will adjust position to open to the right and display all information clearly without requiring the user to adjust the screen (scroll the page).

### `showArrow` property

The new `showArrow` property controls if the arrow on the popover when open is displayed. By default this property is `true`, when set to `false` the arrow will be hidden and the popover element will display 'attached' to the component as per current design specifications.

### `isOpen` is now optional

The `isOpen` property has now been made optional and no longer controls if the popover is open or closed. This is due to open and closed state now being handled by the underlying library and not via custom portaling logic.

This property is now used to define the inital state of the popover should you wish to display the popover open on first load, otherwise as before it's default state would be closed when the page is loaded.

### `target` type is now only `ReactElement`

Previously the `target` property could accept either a React Element or a function which could point to a DOM element. E.g. `document.getElementById('my-popover-target')`.

This has now changed to only accept a React Element e.g. `target={<BpkButton>Click Me</BpkButton>}` this is due to when a function is provided the object provided is not an element and therefore the `floating-ui` library is unable to assign `refs` to the element as required by the library in order to control where to place the popover.

`target` element should be what you wish to render the popover to when interactive with and should be only passed here and not rendered outside of the popover otherwise you will create to elements on the page.

### Removed `renderTarget`

`renderTarget` was used to be passed to the custom Backpack Portal implementation in order to attach the portal to the DOM tree and then remove it when it was closed. As the rendering and targetting is now handled by the underlying `floating-ui` library this is no longer required, as the library will use the targets and refs to place this and remove this popover from the view in the correct places. Removing the need to use the custom BpkPortal.

### Removed `portalStyle` and `portalClassName`

As we no longer use the custom `BpkPortal` implementation for the popover these properties have been removed.

### Removed `popperModifiers`

Due to the underlying `floating-ui` library implementation of how modifiers are defined, we can no longer pass objects to the modifiers array. We found that the current usage of this property now, doesn't currently work or apply anyway as it used outdated approaches, so impact to remove is minimal.

Should we wish to open the component up to add additional modifiers, these will be controlled through other explict props like `showArrow` or `placement`, then applied internally. Should you wish to expand functionality beyond the current implementation, please follow the current contribution process to get alignment before raising a PR.


