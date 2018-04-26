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

const ButtonStorySection = props => (
  <View style={styles.buttonStory} {...props} />
);

const ButtonStory = () => (
  <Fragment>
    <ButtonStorySection>
      <StorySubheading>Default</StorySubheading>
      <BpkButtonLink title="Button" onPress={action(`Button pressed`)} />
      <BpkButtonLink
        disabled
        title="Disabled"
        onPress={action('This should not be possible')}
      />
      <BpkButtonLink
        title="With Leading icon"
        iconAlignment="leading"
        icon="alert--active"
        onPress={action(`Button button-link with icon clicked`)}
      />
      <BpkButtonLink
        title="With Trailing icon"
        iconAlignment="trailing"
        icon="alert--active"
        onPress={action(`Button button-link with icon clicked`)}
      />
    </ButtonStorySection>
    {Platform.OS === 'ios' && (
      <ButtonStorySection>
        <StorySubheading>Large</StorySubheading>
        <BpkButtonLink
          large
          title="Button"
          onPress={action(`Button pressed`)}
        />
        <BpkButtonLink
          large
          disabled
          title="Disabled"
          onPress={action(`This should not be possible`)}
        />
        <BpkButtonLink
          large
          title="With Leading icon"
          icon="alert--active"
          iconAlignment="leading"
          onPress={action(`Button  with icon clicked`)}
        />
        <BpkButtonLink
          large
          title="With trailing icon"
          icon="alert--active"
          iconAlignment="trailing"
          onPress={action(`Button  with trailing icon clicked`)}
        />
      </ButtonStorySection>
    )}
  </Fragment>
);

storiesOf('react-native-bpk-component-button-link', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => <ButtonStory />)
  .add('Themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <ButtonStory />
    </BpkThemeProvider>
  ))
  .add('Edge cases', () => (
    <Fragment>
      <BpkButtonLink
        title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
        onPress={action(`Button pressed`)}
      />
      {Platform.OS === 'ios' && (
        <BpkButtonLink
          large
          title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          onPress={action(`Button pressed`)}
        />
      )}
    </Fragment>
  ));
