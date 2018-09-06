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
import BpkLabel from 'bpk-component-label';
import BpkSelect from 'bpk-component-select';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkThemeToggle.css';
import bpkCustomThemes from './theming';
import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';

const inputId = 'theme-select';
const getClassName = cssModules(STYLES);
const availableThemes = Object.keys(bpkCustomThemes);

const setTheme = theme => {
  const htmlElement = getHtmlElement();
  htmlElement.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }),
  );
};

class BpkThemeToggle extends React.Component {
  constructor(props) {
    super(props);
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

  handleKeyDown = e => {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 't') {
      this.cycleTheme();
    }
  };

  handleChange = e => {
    const selectedTheme = e.target.value;
    this.setState({ selectedTheme });
    setTheme(bpkCustomThemes[selectedTheme]);
  };

  cycleTheme = () => {
    let { selectedTheme } = this.state;
    const selectedIndex = selectedTheme
      ? availableThemes.indexOf(selectedTheme) + 1
      : 0;
    if (selectedIndex >= availableThemes.length) {
      selectedTheme = '';
    } else {
      selectedTheme = availableThemes[selectedIndex];
    }
    this.setState({ selectedTheme });
    setTheme(bpkCustomThemes[selectedTheme]);
  };

  render() {
    const { ...rest } = this.props;
    return (
      <div {...rest}>
        <BpkLabel
          className={getClassName('bpk-theme-toggle__label')}
          htmlFor={inputId}
        >
          Change theme
        </BpkLabel>
        <BpkSelect
          id={inputId}
          name={inputId}
          value={this.state.selectedTheme}
          onChange={this.handleChange}
        >
          <option value="" hidden>
            Change theme
          </option>
          <option value="skyscanner">None</option>
          {availableThemes.map(themeName => (
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
