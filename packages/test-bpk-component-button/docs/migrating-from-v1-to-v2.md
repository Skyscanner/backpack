# Migrating from v1 to v2

Version 2 of `bpk-component-button` removes the `selected` prop. This guide walks through a few patterns that can be used as a replacement.

## Migrating

### When used as a toggle

If a *selected* button is being used as an on/off toggle, it can easily be replaced with a checkbox:

### Original:

```
import BpkButton from 'bpk-component-button';

class Toggle extends React.Component {
  constructor() {
    this.state = { includeBaggage: false };
  }
  toggleBaggage = () => {
    this.setState({includeBaggage: !this.state.includeBaggage});
  }
  render() {
    return (
      <BpkButton selected={this.state.includeBaggage} onClick={this.toggleBaggage}>Include Baggage</BpkButton>
    );
  }
}
```

### Replacement:

```
import BpkCheckbox from 'bpk-component-checkbox';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { includeBaggage: false };
  }
  toggleBaggage = () => {
    this.setState({ includeBaggage: !this.state.includeBaggage });
  }
  render() {
    return (
      <BpkCheckbox
        checked={this.state.includeBaggage}
        onChange={this.toggleBaggage}
        label="Include Baggage"
      />
    );
  }
}
```

### When used to show/hide UI elements.

There are many replacement patterns that can handle showing and hiding UI elements.
The simplest of these is to use a button, whose text changes to reflect the state.

### Original:

```
import BpkButton from 'bpk-component-button';

class Toggle extends React.Component {
  constructor() {
    this.state = { showMore: false };
  }
  toggleMore = () => {
    this.setState({showMore: !this.state.showMore});
  }
  render() {
    return (
      <BpkButton selected={this.state.showMore} onClick={this.toggleMore}>Expand</BpkButton>
    );
  }
}
```

### Replacement:

```
import BpkButton from 'bpk-component-button';

class Toggle extends React.Component {
  constructor() {
    this.state = { showMore: false };
  }
  toggleMore = () => {
    this.setState({showMore: !this.state.showMore});
  }
  render() {
    return (
      <BpkButton onClick={this.toggleMore}>
        { this.state.showMore ? 'Collapse' : 'Expand'}
      </BpkButton>
    );
  }
}
```
