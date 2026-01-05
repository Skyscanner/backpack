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

import type { ChangeEvent } from 'react';
import { Component } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkLabel from '../../bpk-component-label';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkSelect from '../../bpk-component-select';
import { cssModules } from '../../bpk-react-utils';

import bpkCustomThemes from './theming';
import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';

import type { Theme } from './theming';

import STYLES from './BpkThemeToggle.module.scss';

const inputId = 'theme-select';
const getClassName = cssModules(STYLES);
const availableThemes = Object.keys(bpkCustomThemes);

const setTheme = (theme: Theme | undefined) => {
  const htmlElement = getHtmlElement();
  if (htmlElement) {
    htmlElement.dispatchEvent(
      new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }),
    );
  }
};

type State = {
  selectedTheme: string;
};

class BpkThemeToggle extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      selectedTheme: '',
    };
  }

  componentDidMount() {
    document.addEventListener(
      'keydown',
      this.handleKeyDown as (event: Event) => void,
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.handleKeyDown as (event: Event) => void,
    );
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.metaKey && e.key.toLowerCase() === 't') {
      this.cycleTheme();
    }
  };

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    this.setState({ selectedTheme });
    setTheme(selectedTheme ? bpkCustomThemes[selectedTheme] : undefined);
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
    setTheme(selectedTheme ? bpkCustomThemes[selectedTheme] : undefined);
  };

  render() {
    return (
      <div>
        <span className={getClassName('bpk-theme-toggle__label')}>
          <BpkLabel htmlFor={inputId}>Change theme</BpkLabel>
        </span>
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
