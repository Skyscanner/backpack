# react-native-bpk-component-phone-input

> Backpack React Native telephone input component.

## Installation

```sh
npm install react-native-bpk-component-phone-input --save-dev
```

## BpkDialingCodeList

### Usage

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import { BpkDialingCodeList } from 'react-native-bpk-component-phone-input';

const CODES = [
  { id: 'DZ', dialingCode: '+213', name: 'Algeria' },
  { id: 'CA', dialingCode: '+1', name: 'Canada' },
  { id: 'CD', dialingCode: '+243', name: 'Democratic Republic of the Congo' },
  { id: 'IT', dialingCode: '+39', name: 'Italy' },
  { id: 'JP', dialingCode: '+81', name: 'Japan' },
  { id: 'SE', dialingCode: '+46', name: 'Sweden' },
  { id: 'GB', dialingCode: '+44', name: 'United Kingdom' },
];

const FLAG_IMAGES = {
  'DZ': '/resources/algeria.png',
  'CA': '/resources/canada.png',
  'CD': '/resources/drcongo.png',
  'IT': '/resources/italy.png',
  'JP': '/resources/japan.png',
  'SE': '/resources/sweden.png',
  'GB': '/resources/uk.png',
};

export default class App extends Component {
  render() {
    return (
      <BpkDialingCodeList
        codes={CODES}
        selectedId="CD"
        onItemPress={code => console.log(code.id)}
        renderFlag={code => <Image source={require(FLAG_IMAGES[code.id])} />}
      />
    );
  }
}
```

### Props


| Property                    | PropType                                                    | Required | Default Value |
| --------------------------- | ----------------------------------------------------------- | -------- | ------------- |
| codes                       | arrayOf({id, diallingCode, name})                           | true     | -             |
| onItemPress                 | func                                                        | true     | -             |
| renderFlag                  | func                                                        | true     | -             |
| selectedId                  | string                                                      | false    | null          |

