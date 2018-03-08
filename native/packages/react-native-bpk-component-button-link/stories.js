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
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkButtonLink from './src/BpkButtonLink';
import { StorySubheading } from '../../storybook/TextStyles';
import themeAttributes from '../../storybook/themeAttributes';
import CenterDecorator from '../../storybook/CenterDecorator';

const styles = StyleSheet.create({
  buttonStory: {
    alignItems: 'flex-start',
    paddingBottom: spacingBase,
  },
});

const ButtonStory = props => <View style={styles.buttonStory} {...props} />;

const createButtonStory = () => {
  const getLargeVersion = () => (
    <ButtonStory key="large">
      <StorySubheading>Large</StorySubheading>
      <BpkButtonLink
        large
        title="Button"
        onPress={action(`Button pressed`)}
        style={styles.buttonLinkStyles}
      />
      <BpkButtonLink
        large
        disabled
        title="Disabled"
        onPress={action(`This should not be possible`)}
        style={styles.buttonLinkStyles}
      />
      <BpkButtonLink
        large
        title="With Leading icon"
        icon="alert--active"
        iconAlignment="leading"
        onPress={action(`Button  with icon clicked`)}
        style={styles.buttonLinkStyles}
      />
      <BpkButtonLink
        large
        title="With trailing icon"
        icon="alert--active"
        iconAlignment="trailing"
        onPress={action(`Button  with trailing icon clicked`)}
        style={styles.buttonLinkStyles}
      />
    </ButtonStory>
  );

  return [
    <ButtonStory key="default">
      <StorySubheading>Default</StorySubheading>
      <BpkButtonLink
        title="Button"
        onPress={action(`Button pressed`)}
        style={styles.buttonLinkStyles}
      />
      <BpkButtonLink
        disabled
        title="Disabled"
        onPress={action('This should not be possible')}
        style={styles.buttonLinkStyles}
      />
      <BpkButtonLink
        title="With Leading icon"
        iconAlignment="leading"
        icon="alert--active"
        onPress={action(`Button button-link with icon clicked`)}
        style={styles.buttonLinkStyles}
      />
      <BpkButtonLink
        title="With Trailing icon"
        iconAlignment="trailing"
        icon="alert--active"
        onPress={action(`Button button-link with icon clicked`)}
        style={styles.buttonLinkStyles}
      />
    </ButtonStory>,
    Platform.OS === 'ios' ? getLargeVersion() : null,
  ];
};

const allThemedButtons = (
  <BpkThemeProvider theme={themeAttributes}>
    <View>{createButtonStory()}</View>
  </BpkThemeProvider>
);

storiesOf('react-native-bpk-component-button-link', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => createButtonStory())
  .add('docs:withTheme', () => allThemedButtons);
