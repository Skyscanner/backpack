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
import { storiesOf } from '@storybook/react';

import BpkSelect from 'bpk-component-select';

import {
  colorBlue100,
  colorBlue500,
  colorRed100,
  colorRed500,
  colorYellow100,
  colorYellow500,
} from 'bpk-tokens/tokens/base.es6';

import BpkThemeProvider from './index';
import BpkThemeableText, {
  themeAttributes as buttonThemeAttributes,
} from './bpk-themeable-text/BpkThemeableText';

const generateThemeAttributes = (textColor, textBackgroundColor) => ({
  textColor,
  textBackgroundColor,
});


class BpkThemePicker extends Component {
  constructor(props) {
    super(props);
    this.themes = {
      blue: generateThemeAttributes(colorBlue500, colorBlue100),
      yellow: generateThemeAttributes(colorYellow500, colorYellow100),
      red: generateThemeAttributes(colorRed500, colorRed100),
    };
    this.state = {
      themeId: 'blue',
      theme: this.themes.blue,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      themeId: value,
      theme: this.themes[value],
    });
  }

  render() {
    return (
      <div>
        <BpkSelect
          id="themes"
          name="themes"
          value={this.state.themeId}
          onChange={this.handleChange}
        >
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
        </BpkSelect>
        <BpkThemeProvider theme={this.state.theme} themeAttributes={[...buttonThemeAttributes]}>
          <BpkThemeableText>Hello world</BpkThemeableText>
        </BpkThemeProvider>
      </div>
    );
  }
}

storiesOf('bpk-theming', module)
  .add('Default', () => (
    <BpkThemePicker />
  ));
