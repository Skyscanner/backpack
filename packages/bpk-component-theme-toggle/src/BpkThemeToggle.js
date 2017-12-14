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

import React from 'react';
import BpkSelect from 'bpk-component-select';

import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';
import bpkCustomThemes from './theming';

const availableThemes = Object.keys(bpkCustomThemes);

const setTheme = (theme) => {
  const htmlElement = getHtmlElement();
  htmlElement.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
};

class BpkThemeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.cycleTheme = this.cycleTheme.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedTheme: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 't') {
      this.cycleTheme();
    }
  }

  handleChange(e) {
    const selectedTheme = e.target.value;
    this.setState({ selectedTheme });
    setTheme(bpkCustomThemes[selectedTheme]);
  }

  cycleTheme() {
    let { selectedTheme } = this.state;
    let selectedIndex = selectedTheme ? (availableThemes.indexOf(selectedTheme) + 1) : 0;
    if (selectedIndex >= availableThemes.length) {
      selectedIndex = 0;
    }
    selectedTheme = availableThemes[selectedIndex];
    this.setState({ selectedTheme });
    setTheme(bpkCustomThemes[selectedTheme]);
  }

  render() {
    const { ...rest } = this.props;
    return (
      <div {...rest}>
        <BpkSelect
          id="theme-select"
          name="theme-select"
          value={this.state.selectedTheme}
          onChange={this.handleChange}
        >
          <option value="" hidden>Change theme</option>
          <option value="skyscanner">None</option>
          { availableThemes.map(themeName => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
      ))}
        </BpkSelect>
      </div>
    );
  }
}

export default BpkThemeToggle;
