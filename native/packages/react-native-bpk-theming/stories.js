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

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Picker,
} from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BpkButton from 'react-native-bpk-component-button';

import BpkThemeProvider from './index';

const tokens = Platform.OS === 'ios' ?
  require('bpk-tokens/tokens/ios/base.react.native.common.js') :
  require('bpk-tokens/tokens/android/base.react.native.common.js')
;

const generateThemeAttributes = (gradientStartColor, gradientEndColor) => ({
  buttonPrimaryTextColor: tokens.colorWhite,
  buttonPrimaryGradientStartColor: gradientStartColor,
  buttonPrimaryGradientEndColor: gradientEndColor,
  buttonSecondaryTextColor: gradientEndColor,
  buttonSecondaryBackgroundColor: tokens.colorWhite,
  buttonSecondaryBorderColor: gradientEndColor,
});

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: tokens.spacingMd,
    paddingRight: tokens.spacingMd,
  },
  bottomMargin: {
    marginBottom: tokens.spacingMd,
  },
});

class BpkThemePicker extends Component {
  constructor() {
    super();

    this.themes = {
      blue: generateThemeAttributes(tokens.colorBlue400, tokens.colorBlue500),
      yellow: generateThemeAttributes(tokens.colorYellow400, tokens.colorYellow500),
      red: generateThemeAttributes(tokens.colorRed400, tokens.colorRed500),
    };

    this.state = {
      themeId: 'blue',
      theme: this.themes.blue,
    };

    this.switchTheme = this.switchTheme.bind(this);
  }

  switchTheme(value) {
    this.setState({
      themeId: value,
      theme: this.themes[value],
    });
  }

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.themeId}
          onValueChange={this.switchTheme}
        >
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Yellow" value="yellow" />
          <Picker.Item label="Red" value="red" />
        </Picker>
        <BpkThemeProvider theme={this.state.theme}>
          <View>
            <BpkButton
              type="primary"
              title="Book hotel"
              onPress={action('primary themed button pressed')}
              style={styles.bottomMargin}
            />
            <BpkButton
              type="secondary"
              title="Go back"
              onPress={action('secondary themed button pressed')}
            />
          </View>
        </BpkThemeProvider>
      </View>
    );
  }
}

storiesOf('BpkTheming', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
  )
  .add('Default', () => (
    <View>
      <BpkThemePicker />
    </View>
  ));
