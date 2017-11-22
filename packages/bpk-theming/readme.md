# bpk-theming

> Backpack theming utilities.

## Installation

```sh
npm install bpk-theming --save-dev
```

## Usage

```js
import BpkThemeProvider from 'bpk-theming';

import BpkButton, {themeAttributes as buttonThemeAttributes} from 'bpk-component-button';

const theme = {
  buttonPrimaryGradientStartColor: '#fce134',
  buttonPrimaryGradientEndColor: '#f8c42d',
  buttonPrimaryTextColor: '#2d244c',
  buttonSecondaryBackgroundColor: '#fff',
  buttonSecondaryTextColor: '#2d244c',
  buttonSecondaryBorderColor: '#2d244c',
};

export default class App extends Component {
  render() {
    return (
      <BpkThemeProvider theme={theme} themeAttributes={[...buttonThemeAttributes]}>
        <BpkButton type="primary" onClick={() => {}}>Primary</BpkButton>
        <BpkButton type="secondary" onClick={() => {}}>Secondary</BpkButton>
      </BpkThemeProvider>
    );
  }
}
```

## Props

| Property            | PropType        | Required | Default Value |
| -----------         | --------------- | -------- | ------------- |
| children            | node            | true     | -             |
| theme               | object          | true     | -             |
| themeAttributes     | arrayOf(string) | true     | -             |
