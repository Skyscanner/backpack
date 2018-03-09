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

import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const PickerItem = PropTypes.shape({
  value: PropTypes.any,
  label: PropTypes.string,
  hint: PropTypes.string,
  pickerLabel: PropTypes.string,
});

export const defaultProps = {
  ref: () => null,
  onSelectionChange: () => null,
  options: [],
  selectedOption: null,
  label: '',
  style: null,
  valid: null,
  validationMessage: '',
  onFocus: () => null,
  onBlur: () => null,
  prevLabel: 'PREV',
  nextLabel: 'NEXT',
  doneLabel: 'DONE',
};

export const propTypes = {
  ref: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(PickerItem),
  selectedOption: PropTypes.oneOfType([
    PropTypes.instanceOf(PickerItem),
    PropTypes.string,
    PropTypes.null,
  ]),
  onSelectionChange: PropTypes.func,
  label: PropTypes.string,
  style: ViewPropTypes.style,
  valid: PropTypes.oneOf(true, false, null),
  validationMessage: PropTypes.string,
  prevLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  doneLabel: PropTypes.string,
};
