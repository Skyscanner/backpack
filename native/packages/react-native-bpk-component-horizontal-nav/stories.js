/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import {
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import BpkThemeProvider from 'react-native-bpk-theming';
import BpkHorizontalNav, { BpkHorizontalNavItem } from './index';
import { StorySubheading } from '../../storybook/TextStyles';
import themeAttributes from '../../storybook/themeAttributes';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: tokens.spacingBase,
  },
});

storiesOf('BpkHorizontalNav', module)
  .add('docs:default', () => (
    <View style={styles.bottomMargin}>
      <BpkHorizontalNav>
        <BpkHorizontalNavItem title="Flights" onPress={action('Nav item one pressed')} />
        <BpkHorizontalNavItem selected title="Hotels" onPress={action('Nav item two pressed')} />
        <BpkHorizontalNavItem title="Car hire" onPress={action('Nav item three pressed')} />
      </BpkHorizontalNav>
    </View>
  ))
  .add('docs:spaceAround', () => (
    <View style={styles.bottomMargin}>
      <BpkHorizontalNav spaceAround>
        <BpkHorizontalNavItem title="Flights" onPress={action('Nav item one pressed')} />
        <BpkHorizontalNavItem selected title="Hotels" onPress={action('Nav item two pressed')} />
        <BpkHorizontalNavItem title="Car hire" onPress={action('Nav item three pressed')} />
      </BpkHorizontalNav>
    </View>
  ))
  .add('All Types', () => (
    <View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Default</StorySubheading>
        <BpkHorizontalNav>
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item one pressed')} />
          <BpkHorizontalNavItem selected title="Item" onPress={action('Nav item two pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item three pressed')} />
        </BpkHorizontalNav>
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Space Around</StorySubheading>
        <BpkHorizontalNav spaceAround>
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item one pressed')} />
          <BpkHorizontalNavItem selected title="Item" onPress={action('Nav item two pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item three pressed')} />
        </BpkHorizontalNav>
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Overflowing</StorySubheading>
        <BpkHorizontalNav spaceAround>
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item one pressed')} />
          <BpkHorizontalNavItem selected title="Item" onPress={action('Nav item two pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item three pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item one pressed')} />
          <BpkHorizontalNavItem disabled title="Item" onPress={action('Nav item two pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item three pressed')} />
        </BpkHorizontalNav>
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Space Around, Overflowing</StorySubheading>
        <BpkHorizontalNav spaceAround>
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item one pressed')} />
          <BpkHorizontalNavItem selected title="Item" onPress={action('Nav item two pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item three pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item one pressed')} />
          <BpkHorizontalNavItem disabled title="Item" onPress={action('Nav item two pressed')} />
          <BpkHorizontalNavItem title="Item" onPress={action('Nav item three pressed')} />
        </BpkHorizontalNav>
      </View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Themed</StorySubheading>
        <BpkThemeProvider theme={themeAttributes}>
          <BpkHorizontalNav>
            <BpkHorizontalNavItem title="Menu Item" onPress={action('Nav item one pressed')} />
            <BpkHorizontalNavItem selected title="Menu Item" onPress={action('Nav item two pressed')} />
            <BpkHorizontalNavItem title="Menu Item" onPress={action('Nav item three pressed')} />
          </BpkHorizontalNav>
        </BpkThemeProvider>
      </View>
    </View>
  ));
