# bpk-theming

> Backpack theming utilities.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkThemeProvider from '@skyscanner/backpack-web/bpk-theming';

import BpkLink, { themeAttributes as linkThemeAttributes } from '@skyscanner/backpack-web/bpk-component-link';

const theme = {
  linkColor: '#c00',
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

| Property            | PropType                           | Required         | Default Value |
| -----------         | ---------------------------------- | ---------------- | ------------- |
| children            | node                               | true             | -             |
| themeAttributes     | arrayOf(string)                    | true             | -             |
| component           | elementType                        | false            | div           |
| theme               | object                             | false            | null          |
