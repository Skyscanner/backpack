# Migrating from v1 to v2

Version 2 of `bpk-component-button` removes the individual boolean properties to define the type of button switching to a enum of types, using a `size` property to select the large variant of button and updates some of the API to align better with our platforms.

## Migrating

### Selecting a button type

When selecting the type of button to use the type is now defined through the `type` property and selecting the type from `BUTTON_TYPES` object to specify the available buttons.

Object contains the following: `primary`, `primaryOnDark`, `primaryOnLight`, `secondary`, `secondaryOnDark`, `destructive`, `featured`, `link`, `linkOnDark`

### Original:

```
import BpkButton from 'bpk-component-button';

class SearchButton extends React.Component {
  render() {
    return (
      <BpkButton secondary onClick={this.toggleBaggage}>Include Baggage</BpkButton>
    );
  }
}
```

### Replacement:

```
import { BpkButtonV2, BUTTON_TYPES } from 'bpk-component-button';

class Toggle extends React.Component {
  render() {
    return (
      <BpkButtonV2 type={BUTTON_TYPES.secondary} onClick={this.toogleBaggae}></BpkButtonV2>
    );
  }
}
```

### Rendering a large button

When wishing to render a large button the `large` property has been removed to be replaced with `size` and passing in a `SIZE_TYPES` to set the desired large size

Object contains the following: `small` (component default value) and `large`

### Original:

```
import BpkButton from 'bpk-component-button';

class SearchButton extends React.Component {
  render() {
    return (
      <BpkButton large onClick={this.toggleBaggage}>Include Baggage</BpkButton>
    );
  }
}
```

### Replacement:

```
import { BpkButtonV2, SIZE_TYPES } from 'bpk-component-button';

class Toggle extends React.Component {
  render() {
    return (
      <BpkButtonV2 size={SIZE_TYPES.large} onClick={this.toogleBaggae}></BpkButtonV2>
    );
  }
}
```
