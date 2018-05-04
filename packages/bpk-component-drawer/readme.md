# bpk-component-drawer

> Backpack drawer component.

## Installation

```sh
npm install bpk-component-drawer --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import BpkDrawer from 'bpk-component-drawer';
import BpkButton from 'bpk-component-button';

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
  }

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div>
        <div id="application-container">
          <BpkButton onClick={this.onOpen}>Open drawer</BpkButton>
        </div>
        <BpkDrawer
          id="my-drawer"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Drawer title"
          closeLabel="Close drawer"
          getApplicationElement={() =>
            document.getElementById('application-container')
          }
        >
          This is a drawer. You can put anything you want in here.
        </BpkDrawer>
      </div>
    );
  }
}
```

> **Note:** In order to "hide" your application from screenreaders whilst the drawer is open you need to let it know what
  the root element for your application is by returning it's DOM node via the function passed to the
  `getApplicationElement` prop (see the example above).

> **Theming:** In order to theme the drawer, a `renderTarget` needs to be supplied as a function which returns a DOM node
  in the scope of a `BpkThemeProvider`.

## Props

| Property              | PropType             | Required | Default Value |
| --------------------- | -------------------- | -------- | ------------- |
| id                    | string               | true     | -             |
| className             | string               | true     | -             |
| contentClassName      | string               | true     | -             |
| children              | node                 | true     | -             |
| isOpen                | bool                 | true     | -             |
| onClose               | func                 | true     | -             |
| title                 | string               | true     | -             |
| getApplicationElement | func                 | true     | -             |
| closeLabel            | string               | false    | null          |
| closeText             | string               | false    | null          |
| hideTitle             | bool                 | false    | false         |
| renderTarget          | func                 | false    | null          |

## Theme Props

* `linkColor`
* `linkHoverColor`
* `linkActiveColor`
* `linkVisitedColor`
