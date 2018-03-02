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

import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import BpkThemeProvider from 'react-native-bpk-theming';
import { View, Platform, StyleSheet } from 'react-native';
import { spacingMd } from 'bpk-tokens/tokens/base.react.native';

import BpkButtonLink from './src/BpkButtonLink';
import { StorySubheading } from '../../storybook/TextStyles';
import themeAttributes from '../../storybook/themeAttributes';

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  buttonLinkStyles: {
    marginBottom: spacingMd,
    marginRight: spacingMd,
  },
});

const generateButtonStory = () => {
  function getLargeVersion() {
    return (
      <View>
        <StorySubheading>Large</StorySubheading>
        <View style={styles.btnContainer}>
          <BpkButtonLink
            large
            title="Button"
            onPress={action(`Button pressed`)}
            style={styles.buttonLinkStyles}
          />
        </View>
        <View style={styles.btnContainer}>
          <BpkButtonLink
            large
            title="With Leading icon"
            icon="alert--active"
            iconAlignment="leading"
            onPress={action(`Button  with icon clicked`)}
            style={styles.buttonLinkStyles}
          />
        </View>
        <View style={styles.btnContainer}>
          <BpkButtonLink
            large
            title="With trailing icon"
            icon="alert--active"
            iconAlignment="trailing"
            onPress={action(`Button  with trailing icon clicked`)}
            style={styles.buttonLinkStyles}
          />
        </View>
      </View>
    );
  }
  return (
    <View>
      <StorySubheading>Default</StorySubheading>
      <View style={styles.btnContainer}>
        <BpkButtonLink
          title="Button"
          onPress={action(`Button pressed`)}
          style={styles.buttonLinkStyles}
        />
      </View>
      <View style={styles.btnContainer}>
        <BpkButtonLink
          title="With Leading icon"
          iconAlignment="leading"
          icon="alert--active"
          onPress={action(`Button button-link with icon clicked`)}
          style={styles.buttonLinkStyles}
        />
      </View>
      <View style={styles.btnContainer}>
        <BpkButtonLink
          title="With Trailing icon"
          iconAlignment="trailing"
          icon="alert--active"
          onPress={action(`Button button-link with icon clicked`)}
          style={styles.buttonLinkStyles}
        />
      </View>
      {Platform.OS === 'ios' ? getLargeVersion() : null}
    </View>
  );
};

const allThemedButtons = (
  <BpkThemeProvider theme={themeAttributes}>
    <View>{generateButtonStory()}</View>
  </BpkThemeProvider>
);

storiesOf('BpkButtonLink', module)
  .add('docs:default', () => <View>{generateButtonStory()}</View>)
  .add('docs:withTheme', () => allThemedButtons);
