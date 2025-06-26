/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { Component } from 'react';

import BpkLabel from '../../bpk-component-label';
import BpkSelect from '../../bpk-component-select';
import { cssModules } from '../../bpk-react-utils';

import bpkCustomThemes from './theming';
import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';

import STYLES from './BpkThemeToggle.module.scss';

const inputId = 'theme-select';
const getClassName = cssModules(STYLES);
const availableThemes = Object.keys(bpkCustomThemes);

const setTheme = (theme: any) => {
  const htmlElement = getHtmlElement();
  // @ts-expect-error TS(2531): Object is possibly 'null'.
  htmlElement.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }),
  );
};

class BpkThemeToggle extends Component {
  constructor(props: any) {
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

  handleKeyDown = (e: any) => {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 't') {
      this.cycleTheme();
    }
  };

  handleChange = (e: any) => {
    const selectedTheme = e.target.value;
    this.setState({ selectedTheme });
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    setTheme(bpkCustomThemes[selectedTheme]);
  };

  cycleTheme = () => {
    // @ts-expect-error TS(2339): Property 'selectedTheme' does not exist on type 'R... Remove this comment to see the full error message
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
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    setTheme(bpkCustomThemes[selectedTheme]);
  };

  render() {
    const { ...rest } = this.props;
    return (
      <div {...rest}>
        <span className={getClassName('bpk-theme-toggle__label')}>
          <BpkLabel
          // @ts-expect-error
          htmlFor={inputId}>Change theme</BpkLabel>
        </span>
        <BpkSelect
          id={inputId}
          name={inputId}
          // @ts-expect-error TS(2339): Property 'selectedTheme' does not exist on type 'R... Remove this comment to see the full error message
          value={this.state.selectedTheme}
          onChange={this.handleChange}
        >
          <option value="" hidden>
            Change theme
          </option>
          <option value="skyscanner">None</option>
          {availableThemes.map((themeName) => (
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
