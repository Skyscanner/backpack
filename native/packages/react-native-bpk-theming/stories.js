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

import BpkText from 'react-native-bpk-component-text';

import BpkThemeProvider, { withTheme } from './index';

const tokens = Platform.OS === 'ios' ?
  require('bpk-tokens/tokens/ios/base.react.native.common.js') :
  require('bpk-tokens/tokens/android/base.react.native.common.js')
;

// TODO when a themeable component is created, import and use that
// instead of making one here.
const BpkThemeableText = withTheme((props) => {
  const { theme, style: outerStyle, ...rest } = props;
  const innerStyle = {
    color: theme.textOnPrimaryColor,
  };
  return <BpkText {...rest} style={[outerStyle, innerStyle]} />;
});

class BpkThemePicker extends Component {
  constructor() {
    super();

    this.themes = {
      blue: {
        textOnPrimaryColor: tokens.colorBlue500,
      },
      green: {
        textOnPrimaryColor: tokens.colorGreen500,
      },
      red: {
        textOnPrimaryColor: tokens.colorRed500,
      },
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
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Red" value="red" />
        </Picker>
        <BpkThemeProvider theme={this.state.theme}>
          <View>
            <BpkThemeableText textStyle="xxl">Flights to Edinburgh</BpkThemeableText>
            <BpkThemeableText textStyle="xl">Flights to Edinburgh</BpkThemeableText>
            <BpkThemeableText textStyle="lg">Flights to Edinburgh</BpkThemeableText>
            <BpkThemeableText textStyle="base">Flights to Edinburgh</BpkThemeableText>
            <BpkThemeableText textStyle="sm">Flights to Edinburgh</BpkThemeableText>
            <BpkThemeableText textStyle="xs">Flights to Edinburgh</BpkThemeableText>
          </View>
        </BpkThemeProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: tokens.spacingMd,
    paddingRight: tokens.spacingMd,
  },
});

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
