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

/* @flow */

import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BpkText from 'react-native-bpk-component-text';
import { spacingSm, spacingMd } from 'bpk-tokens/tokens/base.react.native';

import CenterDecorator from '../../storybook/CenterDecorator';
import BpkChip, { BpkDismissibleChip } from './index';

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: spacingMd,
  },
  chip: {
    marginEnd: spacingSm,
    marginBottom: spacingSm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacingSm,
  },
});

class StatefulBpkChipExample extends React.Component<
  {},
  {
    flights: boolean,
    hotels: boolean,
    carHire: boolean,
    trains: boolean,
  },
> {
  constructor() {
    super();
    this.state = {
      flights: false,
      hotels: true,
      carHire: false,
      trains: false,
    };
  }

  toggleChip = chip => {
    action(`Toggling ${chip}`);
    this.setState(prevState => ({ [chip]: !prevState[chip] }));
  };

  render() {
    return (
      <Fragment>
        <BpkChip
          label="Flights"
          accessibilityLabel="Toggle flights"
          onPress={() => {
            this.toggleChip('flights');
          }}
          selected={this.state.flights}
          style={styles.chip}
        />
        <BpkChip
          label="Hotels"
          accessibilityLabel="Toggle hotels"
          onPress={() => {
            this.toggleChip('hotels');
          }}
          selected={this.state.hotels}
          style={styles.chip}
        />
        <BpkChip
          label="Car hire"
          accessibilityLabel="Toggle car hire"
          onPress={() => {
            this.toggleChip('carHire');
          }}
          selected={this.state.carHire}
          style={styles.chip}
        />
        <BpkChip
          label="Trains"
          accessibilityLabel="Toggle trains"
          onPress={() => {
            this.toggleChip('trains');
          }}
          selected={this.state.trains}
          style={styles.chip}
        />
      </Fragment>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class StatefulBpkDismissibleChipExample extends React.Component<
  {},
  {
    flights: boolean,
    hotels: boolean,
    carHire: boolean,
    trains: boolean,
  },
> {
  constructor() {
    super();
    this.state = {
      flights: true,
      hotels: true,
      carHire: true,
      trains: true,
    };
  }

  removeChip = chip => {
    action(`Removing ${chip}`);
    this.setState({
      [chip]: false,
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.flights && (
          <BpkDismissibleChip
            label="Flights"
            accessibilityLabel="Remove flights"
            onPress={() => {
              this.removeChip('flights');
            }}
            style={styles.chip}
          />
        )}
        {this.state.hotels && (
          <BpkDismissibleChip
            label="Hotels"
            accessibilityLabel="Remove hotels"
            onPress={() => {
              this.removeChip('hotels');
            }}
            style={styles.chip}
          />
        )}
        {this.state.carHire && (
          <BpkDismissibleChip
            label="Car hire"
            accessibilityLabel="Remove car hire"
            onPress={() => {
              this.removeChip('carHire');
            }}
            style={styles.chip}
          />
        )}
        {this.state.trains && (
          <BpkDismissibleChip
            label="Trains"
            accessibilityLabel="Remove trains"
            onPress={() => {
              this.removeChip('trains');
            }}
            style={styles.chip}
          />
        )}
      </Fragment>
    );
  }
}

const COUNTRIES = [
  'Afghanistan',
  'Belgium',
  'Canada',
  'Denmark',
  'Ethiopia',
  'Fiji',
  'Germany',
  'Honduras',
  'India',
  'Jamaica',
  'Kosovo',
  'Lesotho',
  'Madagascar',
];

storiesOf('react-native-bpk-component-chip', module)
  .addDecorator(CenterDecorator)
  .add('docs:BpkChip', () => (
    <View>
      <View style={styles.bottomMargin}>
        <BpkText>Default</BpkText>
        <View style={styles.row}>
          {COUNTRIES.map((country, index) => (
            <BpkChip
              key={country}
              label={country}
              accessibilityLabel={`Toggle ${country}`}
              onPress={() => {}}
              selected={index % 4 === 0}
              style={styles.chip}
            />
          ))}
        </View>
      </View>
      <View>
        <BpkText>Large</BpkText>
        <View style={styles.row}>
          {COUNTRIES.map((country, index) => (
            <BpkChip
              key={country}
              label={country}
              accessibilityLabel={`Toggle ${country}`}
              onPress={() => {}}
              selected={index % 4 === 0}
              large
              style={styles.chip}
            />
          ))}
        </View>
      </View>
    </View>
  ))
  .add('docs:BpkDismissibleChip', () => (
    <View style={styles.row}>
      {COUNTRIES.map((country, index) => (
        <BpkDismissibleChip
          key={country}
          label={country}
          accessibilityLabel={`Toggle ${country}`}
          onPress={() => {}}
          selected={index % 4 === 0}
          style={styles.chip}
        />
      ))}
    </View>
  ))
  .add('Stateful examples', () => (
    <View>
      <View style={styles.bottomMargin}>
        <BpkText>BpkChip</BpkText>
        <View style={styles.row}>
          <StatefulBpkChipExample />
        </View>
      </View>
      <View style={styles.bottomMargin}>
        <BpkText>BpkDismissibleChip</BpkText>
        <View style={styles.row}>
          <StatefulBpkDismissibleChipExample />
        </View>
      </View>
    </View>
  ));
