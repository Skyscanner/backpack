/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
/* @flow strict */

import React, { type Element, type ComponentType } from 'react';
import PropTypes from 'prop-types';
import { cssModules, wrapDisplayName } from 'bpk-react-utils';

import STYLES from './withDescription.css';

const getClassName = cssModules(STYLES);

export default function withDescription(Component: ComponentType<any>, description: string): ComponentType<any> {
  const WithDescription = props => {
    const { children, ...rest } = props;

    return (
      <span>
        <Component {...rest}>{children}</Component>
        <span className={getClassName('bpk-icon-description')}>{description}</span>
      </span>
    );
  };

  WithDescription.displayName = wrapDisplayName(Component, 'withDescription');

  return WithDescription;
}
