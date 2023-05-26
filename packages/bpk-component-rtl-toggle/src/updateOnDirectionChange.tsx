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

import type { ComponentType } from 'react';
import { Component } from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

import { getHtmlElement, DIRECTION_CHANGE_EVENT } from './utils';

const updateOnDirectionChange = (
  EnhancedComponent: ComponentType<any> | string,
) => {
  class UpdateOnDirectionChange extends Component {
    public static displayName: string;

    componentDidMount() {
      const htmlElement = getHtmlElement();
      if (htmlElement instanceof HTMLElement) {
        htmlElement.addEventListener(
          DIRECTION_CHANGE_EVENT,
          this.onDirectionChange,
          false,
        );
      }
    }

    componentWillUnmount() {
      const htmlElement = getHtmlElement();
      if (htmlElement instanceof HTMLElement) {
        htmlElement.removeEventListener(
          DIRECTION_CHANGE_EVENT,
          this.onDirectionChange,
          false,
        );
      }
    }

    onDirectionChange = () => {
      this.forceUpdate();
    };

    render() {
      return <EnhancedComponent {...this.props} />;
    }
  }

  UpdateOnDirectionChange.displayName = wrapDisplayName(
    EnhancedComponent,
    'updateOnDirectionChange',
  );

  return UpdateOnDirectionChange;
};

export default updateOnDirectionChange;
