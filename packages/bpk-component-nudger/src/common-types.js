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

export type CommonProps<T> = {
  id: string,
  min: T,
  max: T,
  value: T,
  onChange: (T) => mixed,
  className: ?string,
  increaseButtonLabel: string,
  decreaseButtonLabel: string,
  buttonType: string,
};

export const COMMON_PROP_TYPES = {
  id: PropTypes.string.isRequired,
  decreaseButtonLabel: PropTypes.string.isRequired,
  increaseButtonLabel: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(['secondary', 'secondaryOnDark']),
};

export const COMMON_DEFAULT_PROPS = {
  className: null,
  buttonType: 'secondary',
};
