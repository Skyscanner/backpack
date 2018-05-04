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
  BpkNavigationBarIconButtonIOS,
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
      icon="native-android--close"
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
  android: (disabled = false) => (
    <BpkNavigationBarButtonAndroid
      title="Done"
      icon="tick"
      onPress={action('Tapped trailing button')}
      disabled={disabled}
    />
  ),
  ios: (disabled = false) => (
    <BpkNavigationBarTextButtonIOS
      title="Done"
      emphasize
      onPress={action('Tapped trailing button')}
      disabled={disabled}
    />
  ),
});

const addButton = Platform.select({
  android: () => (
    <BpkNavigationBarButtonAndroid
      title="Done"
      icon="plus"
      onPress={action('Tapped trailing button')}
    />
  ),
  ios: () => (
    <BpkNavigationBarIconButtonIOS
      title="Add"
      icon="share--ios"
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
  .add('docs:icon-in-title', () => (
    <BpkNavigationBar
      leadingButton={backButton()}
      title={{ value: 'Checkout', icon: 'lock', iconPosition: 'leading' }}
    />
  ))
  .add('themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <BpkNavigationBar
        leadingButton={backButton()}
        title={<Image source={exampleLogo} />}
      />
    </BpkThemeProvider>
  ))
  .add('extreme example', () => (
    <BpkNavigationBar
      leadingButton={backButton()}
      title="This is a very long title with a lot of content"
    />
  ))
  .add('disabled button', () => (
    <BpkNavigationBar
      leadingButton={cancelButton()}
      trailingButton={doneButton(true)}
      title="Backpack"
    />
  ))
  .add('iOS icon button', () => (
    <BpkNavigationBar trailingButton={addButton()} title="Backpack" />
  ));
