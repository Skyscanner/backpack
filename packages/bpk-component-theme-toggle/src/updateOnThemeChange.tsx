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

import PropTypes from 'prop-types';
import { Component } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

import { getHtmlElement, THEME_CHANGE_EVENT } from './utils';

const updateOnThemeChange = (EnhancedComponent: any) => {
  class UpdateOnThemeChange extends Component {
    constructor() {
      // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
      super();
      this.state = {
        theme: null,
      };
    }

    componentDidMount() {
      // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
      getHtmlElement().addEventListener(
        THEME_CHANGE_EVENT,
        this.onThemeChange,
        false,
      );
    }

    componentWillUnmount() {
      // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
      getHtmlElement().removeEventListener(
        THEME_CHANGE_EVENT,
        this.onThemeChange,
        false,
      );
    }

    onThemeChange = (e: any) => {
      const { theme } = e.detail;
      this.setState({ theme });
      this.forceUpdate();
    };

    render() {
      // @ts-expect-error TS(2339) FIXME: Property 'theme' does not exist on type 'Readonly<... Remove this comment to see the full error message
      return <EnhancedComponent theme={this.state.theme} {...this.props} />;
    }
  }

  // @ts-expect-error TS(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
  UpdateOnThemeChange.displayName = wrapDisplayName(
    EnhancedComponent,
    'updateOnThemeChange',
  );

  // @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
  UpdateOnThemeChange.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return UpdateOnThemeChange;
};

export default updateOnThemeChange;
