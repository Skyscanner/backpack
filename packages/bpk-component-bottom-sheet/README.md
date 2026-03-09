# bpk-component-bottom-sheet

> Backpack bottom sheet component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import { Component } from 'react';
import BpkBottomSheet, { PADDING_TYPE } from '@skyscanner/backpack-web/bpk-component-bottom-sheet';
import { BpkButton } from '@skyscanner/backpack-web/bpk-component-button';

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
      <div id="bottom-sheet-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open bottom sheet</BpkButton>
        </div>
        <BpkBottomSheet
          id="my-bottom-sheet"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Bottom sheet title"
          closeLabel="Close bottom sheet"
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('bottom-sheet-container')}
        >
          This is a bottom sheet. You can put anything you want in here.
        </BpkBottomSheet>
      </div>
    );
  }
}
```

Ensure your body/children is accessible via Voice Over. You may need to specify the tabIndex of the elements.

## Custom Title

The `title` prop accepts either a string or a custom React component:

```js
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

<BpkBottomSheet
  id="my-bottom-sheet"
  isOpen={this.state.isOpen}
  onClose={this.onClose}
  title={<BpkText textStyle={TEXT_STYLES.label1}>Custom Title Component</BpkText>}
  closeLabel="Close bottom sheet"
>
  Content with custom title
</BpkBottomSheet>
```

**Note:** When providing a custom title component, BpkBottomSheet automatically adds the required `id` prop for accessibility. You don't need to manually set the id.

## Padding

This component allows various levels of padding:
| name   | px | rem |
| ------ | -- | --- |
| `none` | 0  | 0   |
| `base` | 16 | 1   |
| `lg`   | 24 | 1.5 |
| `xxl`  | 40 | 2.5 |
| `xxxl` | 64 | 4   |

The default values for top is `PADDING_TYPE.none` due to header having `bpk-spacing-lg()` = 24px padding, other sides are by default `PADDING_TYPE.lg` = 24px. If you want to use a different padding you can specify any side you want to override - top, bottom, start and end. start and end are left and right respectively when in ltr direction, and right and left respectively when in rtl direction.

**Note** that you can't remove the header padding with this property, you can only add to it, by increasing contents top padding.

override of all sides - eg.:
```js
  <BpkBottomSheet
    {...properties}
    paddingStyles={{
      top: PADDING_TYPE.base,
      start: PADDING_TYPE.lg,
      end: PADDING_TYPE.xxl,
      bottom: PADDING_TYPE.xxl
    }}
  >

```

individual override - eg.:
```js
  <BpkBottomSheet
    {...properties}
    paddingStyles={{
      top: PADDING_TYPE.lg,
    }}
  >

```
