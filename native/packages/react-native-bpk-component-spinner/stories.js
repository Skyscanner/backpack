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
import { storiesOf } from '@storybook/react-native';
import BpkThemeProvider from 'react-native-bpk-theming';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colorGray900, spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkSpinner from './index';
import themeAttributes from '../../storybook/themeAttributes';
import { StoryHeading, StorySubheading } from '../../storybook/TextStyles';
import CenterDecorator from '../../storybook/CenterDecorator';

const styles = StyleSheet.create({
  dark: {
    backgroundColor: colorGray900,
    padding: spacingBase,
  },
  bottomMargin: {
    marginBottom: spacingBase,
  },
});

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

storiesOf('react-native-bpk-component-spinner', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => <View>{generateAllSpinnerTypes()}</View>)
  .add('docs:small', () => <View>{generateAllSpinnerTypes(true)}</View>)
  .add('With theme', () => <View>{getThemedButtons()}</View>)
  .add('All types', () => (
    <ScrollView>
      <StoryHeading>Default</StoryHeading>
      {generateAllSpinnerTypes()}
      <StoryHeading>Small</StoryHeading>
      {generateAllSpinnerTypes(true)}
      <StoryHeading>Themed</StoryHeading>
      {getThemedButtons()}
    </ScrollView>
  ));
