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
  Text,
  StyleSheet,
  View,
  ScrollView,
  Platform,
} from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BpkThemeProvider from 'react-native-bpk-theming';

import { StoryHeading, StorySubheading } from '../../storybook/TextStyles';

import BpkButton, { BUTTON_TYPES } from './src/BpkButton';

const tokens = Platform.OS === 'ios' ?
  require('bpk-tokens/tokens/ios/base.react.native.common.js') :
  require('bpk-tokens/tokens/android/base.react.native.common.js');

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  buttonStyles: {
    marginBottom: tokens.spacingMd,
    marginRight: tokens.spacingMd,
  },
});

const theme = {
  contentColor: '#2d244c',
  backgroundColor: tokens.colorWhite,
  brandColors: {
    gradientStart: '#fce134',
    gradientEnd: '#f8c42d',
  },
};

const themeAttributes = {
  buttonPrimaryGradientStartColor: theme.brandColors.gradientStart,
  buttonPrimaryGradientEndColor: theme.brandColors.gradientEnd,
  buttonPrimaryTextColor: theme.contentColor,
  buttonSecondaryBackgroundColor: theme.backgroundColor,
  buttonSecondaryTextColor: theme.contentColor,
  buttonSecondaryBorderColor: theme.contentColor,
};

const getIconType = type => (
  type === 'destructive' ? 'trash' : 'long-arrow-right'
);

const generateButtonStoryForType = (type) => {
  function getLargeVersion() {
    return (
      <View>
        <StorySubheading>Large</StorySubheading>
        <View style={styles.btnContainer}>
          <BpkButton
            large
            type={type}
            title="Button"
            onPress={action(`${type} pressed`)}
            style={styles.buttonStyles}
          />
          <BpkButton
            large
            type={type}
            disabled
            title="Disabled"
            onPress={action(`${type} disabled pressed, somehow`)}
            style={styles.buttonStyles}
          />
          <BpkButton
            large
            type={type}
            title="Icon only"
            icon={getIconType(type)}
            iconOnly
            onPress={action(`${type} icon only button clicked`)}
            style={styles.buttonStyles}
          />
        </View>
      </View>
    );
  }
  return (
    <View key={type}>
      <StorySubheading>Default</StorySubheading>
      <View style={styles.btnContainer}>
        <BpkButton
          type={type}
          title="Button"
          onPress={action(`${type} pressed`)}
          style={styles.buttonStyles}
        />
        <BpkButton
          type={type}
          disabled
          title="Disabled"
          onPress={action(`${type} disabled pressed, somehow`)}
          style={styles.buttonStyles}
        />
        {Platform.OS === 'ios' ?
          <BpkButton
            type={type}
            title="Icon only"
            icon={getIconType(type)}
            iconOnly
            onPress={action(`${type} icon only button clicked`)}
            style={styles.buttonStyles}
          />
          : null}

      </View>
      {Platform.OS === 'ios' ? getLargeVersion() : null}
    </View>
  );
};

const allButtonStories = BUTTON_TYPES.map(generateButtonStoryForType);
const allThemedButtons = (
  <BpkThemeProvider theme={themeAttributes}>
    <View>
      <StoryHeading>Primary</StoryHeading>
      {generateButtonStoryForType('primary')}
      <StoryHeading>Secondary</StoryHeading>
      {generateButtonStoryForType('secondary')}
    </View>
  </BpkThemeProvider>
);

storiesOf('BpkButton', module)
  .add('docs:primary', () => (
    <View>
      {generateButtonStoryForType('primary')}
    </View>
  ))
  .add('docs:secondary', () => (
    <View>
      {generateButtonStoryForType('secondary')}
    </View>
  ))
  .add('docs:destructive', () => (
    <View>
      {generateButtonStoryForType('destructive')}
    </View>
  ))
  .add('docs:featured', () => (
    <View>
      {generateButtonStoryForType('featured')}
    </View>
  ))
  .add('docs:withTheme', () => allThemedButtons)
  .add('All Button Types', () => (
    <ScrollView>
      <StoryHeading>All Types</StoryHeading>
      {allButtonStories}
      <StoryHeading>Themed</StoryHeading>
      {allThemedButtons}
    </ScrollView>
  ))
  .add('Edge Cases', () => {
    function getLargeVersion() {
      return (
        <BpkButton
          large
          type="primary"
          title="I also have a really long title"
          onPress={action('Large button with long title pressed')}
          style={styles.buttonStyles}
        />
      );
    }
    function getIconOnlyVersion() {
      return (
        <View>
          <StorySubheading>Passing arbitrary components as the icon prop</StorySubheading>
          <BpkButton
            type="primary"
            title="I am an icon"
            icon={<Text>Foo</Text>}
            iconOnly
            onPress={action('Image component button pressed')}
          />
        </View>
      );
    }
    return (<View>
      <StoryHeading>Edge Cases</StoryHeading>

      <StorySubheading>Long button titles</StorySubheading>
      <BpkButton
        type="primary"
        title="I have a really long title"
        onPress={action('Button with long title pressed')}
        style={styles.buttonStyles}
      />
      {Platform.OS === 'ios' ?
        <View>
          {getLargeVersion()}
          {getIconOnlyVersion()}
        </View>
        : null}

    </View>);
  });
