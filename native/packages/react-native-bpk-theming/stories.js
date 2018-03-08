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

import React, { Component } from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View, Picker } from 'react-native';
import BpkButton from 'react-native-bpk-component-button';
import {
  spacingMd,
  colorWhite,
  colorRed400,
  colorRed500,
  colorBlue400,
  colorBlue500,
  colorYellow400,
  colorYellow500,
} from 'bpk-tokens/tokens/base.react.native';
import CenterDecorator from '../../storybook/CenterDecorator';

import BpkThemeProvider from './index';

const generateThemeAttributes = (gradientStartColor, gradientEndColor) => ({
  buttonPrimaryTextColor: colorWhite,
  buttonPrimaryGradientStartColor: gradientStartColor,
  buttonPrimaryGradientEndColor: gradientEndColor,
  buttonSecondaryTextColor: gradientEndColor,
  buttonSecondaryBackgroundColor: colorWhite,
  buttonSecondaryBorderColor: gradientEndColor,
});

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: spacingMd,
  },
});

class BpkThemePicker extends Component {
  constructor() {
    super();

    this.themes = {
      blue: generateThemeAttributes(colorBlue400, colorBlue500),
      yellow: generateThemeAttributes(colorYellow400, colorYellow500),
      red: generateThemeAttributes(colorRed400, colorRed500),
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

storiesOf('react-native-bpk-theming', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <View>
      <BpkThemePicker />
    </View>
  ));
