/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkFlatList, {
  BpkFlatListItem,
  BpkFlatListItemSeparator,
} from './index';

const styles = StyleSheet.create({
  topMargin: {
    marginTop: spacingBase,
  },
  image: {
    height: 16,
    width: 24,
  },
});

const getFlagUriFromCountryCode = countryCode =>
  `https://images.skyscnr.com/images/country/flag/header/${countryCode.toLowerCase()}.png`;

const countries = [
  { id: 'AT', name: 'Austria' },
  { id: 'BR', name: 'Brazil' },
  { id: 'CN', name: 'China' },
  { id: 'DJ', name: 'Djibouti' },
  { id: 'EC', name: 'Ecuador' },
  { id: 'FR', name: 'France' },
  { id: 'GD', name: 'Grenada' },
  { id: 'HT', name: 'Haiti' },
  { id: 'US', name: 'USA' },
];

class StatefulBpkFlatList extends React.Component<{
  showImages: boolean,
}> {
  static propTypes = {
    showImages: PropTypes.bool,
  };

  static defaultProps = {
    showImages: false,
  };

  constructor() {
    super();
    this.state = { selectedCountry: 'DJ' };
  }
  render() {
    return (
      <BpkFlatList
        data={countries}
        renderItem={({ item }) => (
          <BpkFlatListItem
            title={item.name}
            selected={this.state.selectedCountry === item.id}
            image={
              this.props.showImages ? (
                <Image
                  source={{ uri: getFlagUriFromCountryCode(item.id) }}
                  style={styles.image}
                />
              ) : null
            }
            onPress={() => {
              this.setState({ selectedCountry: item.id });
            }}
          />
        )}
        ItemSeparatorComponent={
          Platform.OS === 'ios' ? BpkFlatListItemSeparator : null
        }
        keyExtractor={item => item.id}
        extraData={this.state}
      />
    );
  }
}

storiesOf('react-native-bpk-component-flat-list', module)
  .addDecorator(getStory => <View style={styles.topMargin}>{getStory()}</View>)
  .add('docs:default', () => <StatefulBpkFlatList />)
  .add('With images', () => <StatefulBpkFlatList showImages />);
