# bpk-theming

> Backpack theming utilities.

## Installation

```sh
npm install bpk-theming --save-dev
```

## Usage

```js
import BpkThemeProvider from 'bpk-theming';

import BpkLink, { themeAttributes as linkThemeAttributes } from 'bpk-component-link';

const theme = {
  linkTextColor: '#c00',
  linkHoverColor: '#d00',
  linkActiveColor: '#a00',
  linkVisitedColor: '#800',
};

export default class App extends Component {
  render() {
    return (
      <BpkThemeProvider theme={theme} themeAttributes={[...linkThemeAttributes]}>
        <BpkLink onClick={() => {}}>Book flight</BpkLink>
      </BpkThemeProvider>
    );
  }
}
```

## Props

| Property            | PropType        | Required | Default Value |
| -----------         | --------------- | -------- | ------------- |
| children            | node            | true     | -             |
| theme               | object          | false    | null          |
| themeAttributes     | arrayOf(string) | true     | -             |
