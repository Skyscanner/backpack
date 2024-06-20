# bpk-component-drawer

> Backpack drawer component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkDrawer from '@skyscanner/backpack-web/bpk-component-drawer';
import { BpkButtonV2 as BpkButton } from '@skyscanner/backpack-web/bpk-component-button';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  render() {
    return (
      <div>
        <div id="pagewrap">
          <BpkButton onClick={() => setIsOpen(true)}>Open drawer</BpkButton>
        </div>
        <BpkDrawer
          id="my-drawer"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer title"
          closeLabel="Close drawer"
          getApplicationElement={() => document.getElementById('pagewrap')}
        >
          This is a drawer. You can put anything you want in here.
        </BpkDrawer>
      </div>
    );
  }
}
```

## Props

Check out the full list of props on Skyscanner's [design system documentation website](https://www.skyscanner.design/latest/components/drawer/web-QAxL5e0N#section-props-a2).
