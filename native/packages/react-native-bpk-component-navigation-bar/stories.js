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
import { I18nManager, Image, Platform } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import BpkThemeProvider from 'react-native-bpk-theming';
import BpkCard from 'react-native-bpk-component-card';
import BpkText from 'react-native-bpk-component-text';

import themeAttributes from '../../storybook/themeAttributes';
import BpkNavigationBar, {
  BpkNavigationBarButtonAndroid,
  BpkNavigationBarBackButtonIOS,
  BpkNavigationBarTextButtonIOS,
} from './index';

const exampleLogo = require('./logo.png');

const backIcon = () =>
  I18nManager.isRTL ? 'native-android--forward' : 'native-android--back';

const backButton = Platform.select({
  android: () => (
    <BpkNavigationBarButtonAndroid
      title="Back"
      icon={backIcon()}
      onPress={action('Tapped leading button')}
    />
  ),
  ios: () => (
    <BpkNavigationBarBackButtonIOS
      title="Back"
      showTitle
      onPress={action('Tapped leading button')}
    />
  ),
});

const cancelButton = Platform.select({
  android: () => (
    <BpkNavigationBarButtonAndroid
      title="Close"
      icon="close"
      onPress={action('Tapped leading button')}
    />
  ),
  ios: () => (
    <BpkNavigationBarTextButtonIOS
      title="Cancel"
      onPress={action('Tapped leading button')}
    />
  ),
});

const doneButton = Platform.select({
  android: () => (
    <BpkNavigationBarButtonAndroid
      title="Done"
      icon="tick"
      onPress={action('Tapped trailing button')}
    />
  ),
  ios: () => (
    <BpkNavigationBarTextButtonIOS
      title="Done"
      emphasize
      onPress={action('Tapped trailing button')}
    />
  ),
});

storiesOf('react-native-bpk-component-navigation-bar', module)
  .add('docs:default', () => (
    <BpkNavigationBar leadingButton={backButton()} title="Backpack" />
  ))
  .add('docs:modal', () => (
    <BpkNavigationBar
      leadingButton={cancelButton()}
      trailingButton={doneButton()}
      title="Backpack"
    />
  ))
  .add('docs:subtitle-view', () => (
    <BpkNavigationBar
      leadingButton={backButton()}
      title="Backpack"
      subtitleView={
        <BpkCard onPress={action('Card pressed')}>
          <BpkText>Hello</BpkText>
        </BpkCard>
      }
    />
  ))
  .add('extreme example', () => (
    <BpkNavigationBar
      leadingButton={
        <BpkNavigationBarButtonAndroid
          title="Back"
          icon={backIcon()}
          onPress={action('Tapped leading button')}
        />
      }
      title="This is a very long title with a lot of content"
    />
  ))
  .add('themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <BpkNavigationBar
        leadingButton={backButton()}
        title={<Image source={exampleLogo} />}
      />
    </BpkThemeProvider>
  ));
