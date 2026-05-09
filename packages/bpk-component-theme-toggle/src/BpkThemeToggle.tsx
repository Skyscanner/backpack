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

import BpkLabel from '../../bpk-component-label';
import BpkSelect from '../../bpk-component-select';
import BpkVisuallyHidden from '../../bpk-component-visually-hidden';
import { getDataComponentAttribute } from '../../bpk-react-utils';

import bpkCustomThemes from './theming';
import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';

import type { Theme } from './theming';

const inputId = 'theme-select';
const availableThemes = Object.keys(bpkCustomThemes);

const setTheme = (theme: Theme | undefined) => {
  const htmlElement = getHtmlElement();
  if (htmlElement) {
    htmlElement.dispatchEvent(
      new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }),
    );
  }
};

type Props = Record<string, never>;

type State = {
  selectedTheme: string;
};

class BpkThemeToggle extends Component<Props, State> {
  constructor(props: Props) {
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
    const { ...rest } = this.props;
    return (
      <div {...getDataComponentAttribute('ThemeToggle')} {...rest}>
        <BpkVisuallyHidden>
          <BpkLabel htmlFor={inputId}>Change theme</BpkLabel>
        </BpkVisuallyHidden>
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