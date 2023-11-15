# bpk-scrim-utils

> Higher order component that adds a scrim behind components and manages scroll states

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

```js
import { withScrim } from '@skyscanner/backpack-web/bpk-scrim-utils';

const Box = props => (
  <div ref={props.dialogRef}>
    <BpkButton onClick={props.onClose}>Close</BpkButton>
    Hello
  </div>
);

const BoxWithScrim = withScrim(Box);
```

The version using a [React portal](https://react.dev/reference/react-dom/createPortal) renders the wrapped component in a different part of the DOM. It also provides an `isPortalReady` prop to notify when the component inside the portal is ready to be used. This may be necessary to interact with the content of the component in a `useEffect` hook, for example to set the focus on mount.

The `withScrimmedPortal` runs by default only on client due to the use of the portal. However, it accepts the `runOnSSR` prop which, when passed, renders a scrim on the server to block users from interacting with the page and making it evident that the page is not interactive.

```js
import { withScrimmedPortal } from '@skyscanner/backpack-web/bpk-scrim-utils';

const Box = props => {
  const dialogRef = useRef(null);
  const { isPortalReady, onClose } = props;

  useEffect(() => {
    if (isPortalReady) {
      dialogRef.current?.focus();
    }
  }, [isPortalReady]);

  return (
    <div>
      <BpkButton ref={dialogRef} onClick={onClose}>Close</BpkButton>
      Hello in a portal
    </div>
  );
};

const BoxWithScrimmedPortal = withScrimmedPortal(Box);
```
