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

/* @flow strict */

import PropTypes from 'prop-types';

export const LAYOUTS = {
  small: 'small',
  large: 'large',
};

export type Props = {
  title: string,
  layout: string,
  className: ?string,
  subtitle: ?string,
  description: ?string,
};

export const propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(Object.keys(LAYOUTS)),
  className: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

export const defaultProps = {
  className: null,
  subtitle: null,
  description: null,
};
