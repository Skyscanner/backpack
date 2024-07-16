# Portal migration.

We have decided to deprecate and plan for removal of the Backpack Portal.

## Why?

The original motivation for the Backpack Portal was to provide a way to render Backpack components such as Popovers, Modals, Dialogs and Drawers, in a separate React tree, before native support for Portals was available in React.

## What should I use instead?

There are two options for migrating away from the Backpack Portal a native approach or using a third party library:

- React now has a built-in way to render components in a separate tree, using the `createPortal` API ([React Docs](https://react.dev/reference/react-dom/createPortal)).
  - With this approach, you will need to do any implementation detail and logic yourself if you want to render the component into a specific part of the tree and also stop any event propogation in the case an `onClick` inside bubbles up the event.

  An example of how to use `createPortal`:

  ```js
  import {createPortal} from 'react-dom';
  const MyComponent = ({...}) => {
    return createPortal(
      <div>Content</div>,
      document.getElementById('root')
    );
  };
  ```

- The approach Backpack components currently use is [`floating-ui`](https://floating-ui.com/docs/FloatingPortal) to replacement for a familar `popperjs` library. This library has support for creating Portals in React using the `FloatingPortal` component.
  - A benefit of using `floating-ui` is that it simply is a wrapping React element that then handles all the logic internally and as a consumer you don't need to worry about the implementation details. Which makes this a easier drop in replacement for the Backpack Portal.

  An example of how to use `floating-ui`:

  ```js
  import {FloatingPortal} from 'floating-ui';

  // renderTarget is a reference to the DOM element you want to render the portal into
  const MyComponent = ({..., renderTarget}: Props) => (
    <FloatingPortal root={renderTargt}>
      <div>Content</div>
    </FloatingPortal>
  );
  ```


