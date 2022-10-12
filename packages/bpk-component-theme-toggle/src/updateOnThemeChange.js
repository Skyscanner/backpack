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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { wrapDisplayName } from '../../bpk-react-utils';

import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';

const updateOnThemeChange = (EnhancedComponent) => {
  class UpdateOnThemeChange extends Component {
    constructor() {
      super();
      this.state = {
        theme: null,
      };
    }

    componentDidMount() {
      getHtmlElement().addEventListener(
        THEME_CHANGE_EVENT,
        this.onThemeChange,
        false,
      );
    }

    componentWillUnmount() {
      getHtmlElement().removeEventListener(
        THEME_CHANGE_EVENT,
        this.onThemeChange,
        false,
      );
    }

    onThemeChange = (e) => {
      const { theme } = e.detail;
      this.setState({ theme });
      this.forceUpdate();
    };

    render() {
      return <EnhancedComponent theme={this.state.theme} {...this.props} />;
    }
  }

  UpdateOnThemeChange.displayName = wrapDisplayName(
    EnhancedComponent,
    'updateOnThemeChange',
  );

  UpdateOnThemeChange.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return UpdateOnThemeChange;
};

export default updateOnThemeChange;
