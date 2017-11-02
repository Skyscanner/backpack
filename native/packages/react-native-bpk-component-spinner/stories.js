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
  ScrollView,
  StyleSheet,
} from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkThemeProvider from 'react-native-bpk-theming';
import BpkSpinner from './index';
import { StoryHeading, StorySubheading } from '../../storybook/TextStyles';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const styles = StyleSheet.create({
  dark: {
    backgroundColor: tokens.colorGray900,
    padding: tokens.spacingBase,
  },
  bottomMargin: {
    marginBottom: tokens.spacingBase,
  },
});

const themeAttributes = {
  spinnerPrimaryColor: '#2d244c',
};

const generateAllSpinnerTypes = small => (
  <View>
    <View style={styles.bottomMargin}>
      <StorySubheading>Primary (Default)</StorySubheading>
      <BpkSpinner small={small} />
    </View>
    <View style={styles.bottomMargin}>
      <StorySubheading>Dark</StorySubheading>
      <BpkSpinner type="dark" small={small} />
    </View>
    <StorySubheading>Light</StorySubheading>
    <View style={[styles.dark, styles.bottomMargin]}>
      <BpkSpinner type="light" small={small} />
    </View>
  </View>
);

const getThemedButtons = () => (
  <BpkThemeProvider theme={themeAttributes}>
    <View>
      <StorySubheading>Default</StorySubheading>
      <BpkSpinner />
      <StorySubheading>Small</StorySubheading>
      <BpkSpinner small />
    </View>
  </BpkThemeProvider>
);

storiesOf('BpkSpinner', module)
  .add('docs:default', () => (
    <View>
      {generateAllSpinnerTypes()}
    </View>
  ))
  .add('docs:small', () => (
    <View>
      {generateAllSpinnerTypes(true)}
    </View>
  ))
  .add('docs:withTheme', () => (
    <View>
      {getThemedButtons()}
    </View>
  ))
  .add('All types', () => (
    <ScrollView>
      <StoryHeading>Default</StoryHeading>
      {generateAllSpinnerTypes()}
      <StoryHeading>Small</StoryHeading>
      {generateAllSpinnerTypes(true)}
      <StoryHeading>Themed</StoryHeading>
      { getThemedButtons() }
    </ScrollView>
  ));
