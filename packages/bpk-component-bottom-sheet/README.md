# bpk-component-bottom-sheet

> Backpack bottom sheet component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
class BottomSheetContainer extends Component<Props, { isOpen: boolean }> {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

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
      <BpkBottomSheet closeButtonLabel="Close modal" {...this.props}>
        {this.props.children}
      </BpkBottomSheet>
    );
  }
}
```

## Props

| Property   | PropType | Required                                    | Default Value |
| ---------- | -------- | ------------------------------------------- | ------------- |
| children   | node     | true                                        | -             |
| isClosable | boolean  | only if false                               | true          |
| closeLabel | string   | true if isClosable is true, false otherwise | -             |
| action     | object   | false                                       | -             |
| title      | string   | false                                       | ''            |
