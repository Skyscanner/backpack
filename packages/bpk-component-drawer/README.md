# bpk-component-drawer

> Backpack drawer component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import React, { Component } from 'react';
import BpkDrawer from '@skyscanner/backpack-web/bpk-component-drawer';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      <div>
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open drawer</BpkButton>
        </div>
        <BpkDrawer
          id="my-drawer"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
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

> **Note:** In order to "hide" your application from screen readers whilst the drawer is open you need to let it know what
> the root element for your application is by returning it's DOM node via the function passed to the
> `getApplicationElement` prop (see the example above). The `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".

> **Theming:** In order to theme the drawer, a `renderTarget` needs to be supplied as a function which returns a DOM node
> in the scope of a `BpkThemeProvider`.

## Props

| Property              | PropType | Required | Default Value |
| --------------------- | -------- | -------- | ------------- |
| id                    | string   | true     | -             |
| className             | string   | true     | -             |
| contentClassName      | string   | true     | -             |
| children              | node     | true     | -             |
| isOpen                | bool     | true     | -             |
| onClose               | func     | true     | -             |
| title                 | string   | true     | -             |
| getApplicationElement | func     | true     | -             |
| closeLabel            | string   | false    | null          |
| closeText             | string   | false    | null          |
| hideTitle             | bool     | false    | false         |
| renderTarget          | func     | false    | null          |

## Theme Props

- `linkColor`
- `linkHoverColor`
- `linkActiveColor`
- `linkVisitedColor`
