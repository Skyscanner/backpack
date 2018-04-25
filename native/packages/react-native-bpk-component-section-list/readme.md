# react-native-bpk-component-section-list

> Backpack React Native section list component.

## Installation

```sh
npm install react-native-bpk-component-section-list --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { Image } from 'react-native';
import BpkSectionList, {
  BpkSectionListHeader,
  BpkSectionListItem,
  BpkSectionListItemSeparator,
} from 'react-native-bpk-component-section-list';

const AIRPORTS = [
  {
    title: 'Beijing',
    country: 'CN',
    data: [{ id: 'PEK', name: 'Capital' }, { id: 'NAY', name: 'Nanyuan' }],
  },
  {
    title: 'Glasgow',
    country: 'UK',
    data: [
      {
        id: 'GLA',
        name: 'Glasgow International',
      },
      { id: 'PIK', name: 'Prestwick' },
    ],
  },
  {
    title: 'Paris',
    country: 'FR',
    data: [
      { id: 'BVA', name: 'Beauvais' },
      { id: 'CDG', name: 'Charles de Gaulle' },
      { id: 'ORY', name: 'Orly' },
    ],
  },
  {
    title: 'New York City',
    country: 'US',
    data: [
      { id: 'JFK', name: 'John F. Kennedy' },
      { id: 'LGA', name: 'LaGuardia' },
      { id: 'EWR', name: 'Newark' },
    ],
  },
];

const FLAG_IMAGES = {
  'US': '/resources/usa.png',
  'FR': '/resources/france.png',
  'CN': '/resources/china.png',
  'UK': '/resources/uk.png',
};

export default class App extends Component {
  render() {
    return (
      <BpkSectionList
        sections={AIRPORTS}
        renderItem={({ airport, section }) => (
          <BpkSectionListItem
            key={airport.id}
            title={airport.name}
            image={<Image source={require(FLAG_IMAGES[section.country])} />}
            onPress={() => console.log(airport.id)}
          />
        )}
        renderSectionHeader={(section) => (
          <BpkSectionListHeader title={section.title} />
        )}
        ItemSeparatorComponent={BpkSectionListItemSeparator}
      />
    );
  }
}
```

## Props

### BpkSectionList

Inherits all props from React Native's [SectionList](https://facebook.github.io/react-native/docs/sectionlist.html) component.

### BpkSectionListItem

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| onPress            | func                                  | true     | -             |
| title              | string                                | true     | -             |
| image              | instanceOf(Image)                     | false    | null          |
| selected           | bool                                  | false    | false         |

### BpkSectionListHeader

| Property           | PropType                              | Required | Default Value |
| ------------------ | ------------------------------------- | -------- | ------------- |
| title              | string                                | true     | -             |

### BpkSectionListItemSeparator

None.
