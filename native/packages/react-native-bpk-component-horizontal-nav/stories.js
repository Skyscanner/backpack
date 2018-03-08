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
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import BpkThemeProvider from 'react-native-bpk-theming';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkHorizontalNav, { BpkHorizontalNavItem } from './index';
import { StorySubheading } from '../../storybook/TextStyles';
import themeAttributes from '../../storybook/themeAttributes';
import CenterDecorator from '../../storybook/CenterDecorator';

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: spacingBase,
  },
});

class ManagedNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedId: '2' };
  }
  render() {
    return (
      <BpkHorizontalNav selectedId={this.state.selectedId}>
        <BpkHorizontalNavItem
          id="0"
          onPress={() => {
            this.setState({ selectedId: '0' });
          }}
          title="One"
        />
        <BpkHorizontalNavItem
          id="1"
          onPress={() => {
            this.setState({ selectedId: '1' });
          }}
          title="Two (Long Title)"
        />
        <BpkHorizontalNavItem
          id="2"
          onPress={() => {
            this.setState({ selectedId: '2' });
          }}
          title="Three"
        />
      </BpkHorizontalNav>
    );
  }
}

const StoryNav = props => {
  const { items, ...rest } = props;
  return (
    <BpkHorizontalNav selectedId="1" {...rest}>
      {[...Array(items)].map((_, index) => (
        <BpkHorizontalNavItem
          title="Item"
          id={index.toString()}
          key={index.toString()}
          onPress={action(`Nav item ${index} pressed`)}
        />
      ))}
      <BpkHorizontalNavItem
        title="Disabled Item"
        disabled
        id="disabled"
        onPress={() => {}}
      />
    </BpkHorizontalNav>
  );
};
StoryNav.propTypes = {
  items: PropTypes.number,
};
StoryNav.defaultProps = {
  items: 2,
};

storiesOf('react-native-bpk-component-horizontal-nav', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View style={styles.bottomMargin}>
      <BpkHorizontalNav selectedId="1">
        <BpkHorizontalNavItem
          title="Flights"
          id="0"
          onPress={action('Nav item one pressed')}
        />
        <BpkHorizontalNavItem
          title="Hotels"
          id="1"
          onPress={action('Nav item two pressed')}
        />
        <BpkHorizontalNavItem
          title="Car hire"
          id="2"
          onPress={action('Nav item three pressed')}
        />
      </BpkHorizontalNav>
    </View>
  ))
  .add('docs:spaceAround', () => (
    <View style={styles.bottomMargin}>
      <BpkHorizontalNav spaceAround selectedId="1">
        <BpkHorizontalNavItem
          title="Flights"
          id="0"
          onPress={action('Nav item one pressed')}
        />
        <BpkHorizontalNavItem
          title="Hotels"
          id="1"
          onPress={action('Nav item two pressed')}
        />
        <BpkHorizontalNavItem
          title="Car hire"
          id="2"
          onPress={action('Nav item three pressed')}
        />
      </BpkHorizontalNav>
    </View>
  ))
  .add('All Types', () => (
    <View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Default</StorySubheading>
        <StoryNav />
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Space Around</StorySubheading>
        <StoryNav spaceAround />
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Overflowing</StorySubheading>
        <StoryNav items={5} />
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Space Around, Overflowing</StorySubheading>
        <StoryNav items={5} spaceAround />
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Themed</StorySubheading>
        <BpkThemeProvider theme={themeAttributes}>
          <StoryNav />
        </BpkThemeProvider>
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>
          In a state management wrapper, for testing animation
        </StorySubheading>
        <ManagedNav />
      </View>
    </View>
  ));
