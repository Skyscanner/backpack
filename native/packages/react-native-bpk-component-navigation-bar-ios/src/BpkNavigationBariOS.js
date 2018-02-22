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
/* @flow */

import React from 'react';
import BPKNavigationBariOSInternal, {
  propTypes as internalPropTypes,
  defaultProps as internalDefaultProps,
} from './BpkNavigationBariOSInternal';

const EXPOSED_PROP_TYPES = [
  'title',
  'leftButtonText',
  'rightButtonText',
  'onLeftButtonTap',
  'onRightButtonTap',
  'prefersLargeTitles',
  'extendsBehindStatusBar',
];

type Props = {
  title: string,
};

const propTypes = Object.assign(
  {},
  ...Object.keys(internalPropTypes)
    .filter(key => EXPOSED_PROP_TYPES.includes(key))
    .map(key => ({
      [key]: internalPropTypes[key],
    })),
);

const defaultProps = Object.assign(
  {},
  ...Object.keys(internalDefaultProps)
    .filter(
      key => EXPOSED_PROP_TYPES.includes(key) && internalDefaultProps[key],
    )
    .map(key => ({
      [key]: internalPropTypes[key],
    })),
);

const BpkNavigationBariOS = (props: Props) => (
  <BPKNavigationBariOSInternal {...props} />
);

BpkNavigationBariOS.propTypes = propTypes;
BpkNavigationBariOS.defaultProps = defaultProps;

export default BpkNavigationBariOS;
export { propTypes };
