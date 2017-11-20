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
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkThemeProvider from 'react-native-bpk-theming';
import { spacingXl, spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkSwitch from './index';
import { StorySubheading } from '../../storybook/TextStyles';
import themeAttributes from '../../storybook/themeAttributes';

const styles = StyleSheet.create({
  //  Necessary because on iOS the switches get left aligned, on Android right
  // aligned. This normalises it so that both screenshots are comparable.
  viewWidth: {
    width: spacingXl * 1.5,
  },
  bottomMargin: {
    marginBottom: spacingBase,
  },
});

class SwitchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: false };
  }
  render() {
    return (
      <BpkSwitch value={this.state.value} onValueChange={(value) => { this.setState({ value }); }} />
    );
  }
}

storiesOf('BpkSwitch', module)
  .add('docs:default', () => (
    <View style={styles.viewWidth}>
      <View style={styles.bottomMargin}>
        <StorySubheading>On</StorySubheading>
        <BpkSwitch value />
      </View>
      <View>
        <StorySubheading>Off</StorySubheading>
        <BpkSwitch />
      </View>
    </View>
  ))
  .add('All types', () => (
    <View>
      <View style={styles.bottomMargin}>
        <StorySubheading>Default</StorySubheading>
        <SwitchContainer />
      </View>
      <View>
        <StorySubheading>Themed</StorySubheading>
        <BpkThemeProvider theme={themeAttributes}>
          <SwitchContainer />
        </BpkThemeProvider>
      </View>
    </View>
  ));
