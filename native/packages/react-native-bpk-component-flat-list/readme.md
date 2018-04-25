# react-native-bpk-component-flat-list

> Backpack React Native flat list component.

## Installation

```sh
npm install react-native-bpk-component-flat-list --save-dev
```


## Usage

```js
import React, { Component } from 'react';
import { Image } from 'react-native';
import BpkFlatList, { BpkFlatListItem, BpkFlatListItemSeparator } from 'react-native-bpk-component-flat-list';

const COUNTRIES = [
  { id: 'DZ', name: 'Algeria' },
  { id: 'CA', name: 'Canada' },
  { id: 'CD', name: 'Democratic Republic of the Congo' },
  { id: 'IT', name: 'Italy' },
  { id: 'JP', name: 'Japan' },
  { id: 'SE', name: 'Sweden' },
  { id: 'GB', name: 'United Kingdom' },
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
      <BpkFlatList
        data={COUNTRIES}
        renderItem={({ country }) => (
          <BpkFlatListItem
            key={country.id}
            title={country.name}
            image={<Image source={require(FLAG_IMAGES[country.id])} />}
            onPress={() => console.log(country.id)}
          />
        )}
        ItemSeparatorComponent={BpkFlatListItemSeparator}
      />
    );
  }
}
```

## Props

### BpkFlatList

Inherits all props from React Native's [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) component.

### BpkFlatListItem

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| onPress            | func                                  | true     | -             |
| title              | string                                | true     | -             |
| image              | instanceOf(Image)                     | false    | null          |
| selected           | bool                                  | false    | false         |

### BpkFlatListItemSeparator

None.
