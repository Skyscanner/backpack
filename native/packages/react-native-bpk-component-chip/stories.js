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
import PropTypes from 'prop-types';
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
    marginRight: spacingSm,
  },
  row: {
    flexDirection: 'row',
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
    this.setState({
      [chip]: !this.state[chip],
    });
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
            dismissButtonLabel="Remove flights"
            onDismiss={() => {
              this.removeChip('flights');
            }}
            style={styles.chip}
          />
        )}
        {this.state.hotels && (
          <BpkDismissibleChip
            label="Hotels"
            dismissButtonLabel="Remove hotels"
            onDismiss={() => {
              this.removeChip('hotels');
            }}
            style={styles.chip}
          />
        )}
        {this.state.carHire && (
          <BpkDismissibleChip
            label="Car hire"
            dismissButtonLabel="Remove car hire"
            onDismiss={() => {
              this.removeChip('carHire');
            }}
            style={styles.chip}
          />
        )}
        {this.state.trains && (
          <BpkDismissibleChip
            label="Trains"
            dismissButtonLabel="Remove trains"
            onDismiss={() => {
              this.removeChip('trains');
            }}
            style={styles.chip}
          />
        )}
      </Fragment>
    );
  }
}

const StoryChip = ({ dismissible, ...rest }) =>
  dismissible ? (
    <BpkDismissibleChip
      label="Label"
      dismissButtonLabel="Dismiss"
      onDismiss={action('Dismiss button pressed')}
      style={styles.chip}
      {...rest}
    />
  ) : (
    <BpkChip
      label="Label"
      accessibilityLabel="Toggle label"
      onPress={action('Chip pressed.')}
      style={styles.chip}
      {...rest}
    />
  );

StoryChip.propTypes = {
  dismissible: PropTypes.bool,
};

StoryChip.defaultProps = {
  dismissible: false,
};

const generateStoryChips = large => (
  <Fragment>
    <View style={styles.bottomMargin}>
      <BpkText>Default</BpkText>
      <View style={styles.row}>
        <StoryChip large={large} />
        <StoryChip selected large={large} />
      </View>
    </View>
    <View style={styles.bottomMargin}>
      <BpkText>Dismissible</BpkText>
      <View style={styles.row}>
        <StoryChip large={large} dismissible />
      </View>
    </View>
  </Fragment>
);

storiesOf('react-native-bpk-component-chip', module)
  .addDecorator(CenterDecorator)
  .add('docs:BpkChip', () => (
    <View>
      <View style={styles.bottomMargin}>
        <BpkText>Default</BpkText>
        <View style={styles.row}>
          <BpkChip
            label="Label"
            accessibilityLabel="Toggle label"
            onPress={() => {}}
            style={styles.chip}
          />
          <BpkChip
            selected
            label="Selected"
            accessibilityLabel="Toggle label"
            onPress={() => {}}
            style={styles.chip}
          />
        </View>
      </View>
      <View>
        <BpkText>Large</BpkText>
        <View style={styles.row}>
          <BpkChip
            large
            label="Label"
            accessibilityLabel="Toggle label"
            onPress={() => {}}
            style={styles.chip}
          />
          <BpkChip
            selected
            large
            label="Selected"
            accessibilityLabel="Toggle label"
            onPress={() => {}}
            style={styles.chip}
          />
        </View>
      </View>
    </View>
  ))
  .add('docs:BpkDismissibleChip', () => (
    <View>
      <View style={styles.bottomMargin}>
        <BpkText>Default</BpkText>
        <View style={styles.row}>
          <BpkDismissibleChip
            label="Label"
            dismissButtonLabel="Remove label"
            onDismiss={() => {}}
            style={styles.chip}
          />
        </View>
      </View>
      <View>
        <BpkText>Large</BpkText>
        <View style={styles.row}>
          <BpkDismissibleChip
            large
            label="Label"
            dismissButtonLabel="Remove label"
            onDismiss={() => {}}
            style={styles.chip}
          />
        </View>
      </View>
    </View>
  ))
  .add('All types', () => (
    <View>
      {generateStoryChips()}
      <BpkText style={styles.bottomMargin} textStyle="xl">
        Large
      </BpkText>
      {generateStoryChips(true)}
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
