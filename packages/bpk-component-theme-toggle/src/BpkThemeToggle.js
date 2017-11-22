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
import { BpkButtonLink } from 'bpk-component-link';

import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';
import bpkCustomTheme from './theming';

const setTheme = (theme) => {
  const htmlElement = getHtmlElement();
  htmlElement.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
};

class BpkThemeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.switchTheme = this.switchTheme.bind(this);
    this.state = {
      enableCustomTheme: false,
    };
  }

  switchTheme(e) {
    e.preventDefault();

    const theme = !this.state.enableCustomTheme ? bpkCustomTheme : null;
    setTheme(theme);

    this.setState({ enableCustomTheme: !this.state.enableCustomTheme });
  }

  render() {
    return (
      <BpkButtonLink
        title="Switch Theme"
        onClick={this.switchTheme}
      >
        Switch Theme
      </BpkButtonLink>
    );
  }
}

export default BpkThemeToggle;
