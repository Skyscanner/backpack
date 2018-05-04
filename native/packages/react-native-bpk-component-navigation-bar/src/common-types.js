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
import PropTypes from 'prop-types';
import { type Element } from 'react-native';

type StatusBarStyle = 'light-content' | 'dark-content';

export type TitleWithIcon = {|
  value: string,
  icon: string,
  iconPosition: 'leading' | 'trailing',
|};

export type TitleProp = 'string' | TitleWithIcon | Element<any>;

export const TITLE_PROPTYPE = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconPosition: PropTypes.oneOf(['leading', 'trailing']),
  }),
  PropTypes.element,
]);

export type CommonTheme = {
  navigationBarStatusBarStyle: StatusBarStyle,
  navigationBarBackgroundColor: string,
  navigationBarTintColor: string,
  navigationBarDisabledTintColor: string,
};

// eslint-disable-next-line import/prefer-default-export
export const THEME_ATTRIBUTES = [
  'navigationBarBackgroundColor',
  'navigationBarTintColor',
  'navigationBarDisabledTintColor',
];
