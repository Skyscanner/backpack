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

export const CLEAR_BUTTON_MODES = {
  never: 'never',
  whileEditing: 'whileEditing',
  always: 'always',
};

export const INPUT_TYPES = {
  text: 'text',
  email: 'email',
  number: 'number',
  password: 'password',
  tel: 'tel',
};

export type Props = {
  id: string,
  name: string,
  value: string,
  type: $Keys<typeof INPUT_TYPES>,
  className: ?string,
  valid: ?boolean,
  large: boolean,
  docked: boolean,
  dockedFirst: boolean,
  dockedMiddle: boolean,
  dockedLast: boolean,
  inputRef: ?(?HTMLInputElement) => mixed,
  clearButtonMode: $Keys<typeof CLEAR_BUTTON_MODES>,
  clearButtonLabel: ?string,
  onClear: ?(event: SyntheticEvent<HTMLButtonElement>) => mixed,
};

export const clearablePropType = (
  props: Props,
  propName: string,
  componentName: string,
): ?Error => {
  const createError = (message) =>
    new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. ${message}.`,
    );

  const propBeingChecked = props[propName];
  if (
    props.clearButtonMode &&
    props.clearButtonMode !== CLEAR_BUTTON_MODES.never
  ) {
    if (!propBeingChecked) {
      return createError(
        `When \`clearButtonMode\` is not 'never', \`${propName}\` must be supplied`,
      );
    }

    switch (propName) {
      case 'clearButtonLabel':
        return typeof propBeingChecked === 'string'
          ? null
          : createError(`\`clearButtonLabel\` must be a string`);
      case 'onClear':
        return typeof propBeingChecked === 'function'
          ? null
          : createError(`\`onClear\` must be a function`);
      default:
        return null;
    }
  }
  return null;
};

export const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    INPUT_TYPES.text,
    INPUT_TYPES.email,
    INPUT_TYPES.number,
    INPUT_TYPES.password,
    INPUT_TYPES.tel,
  ]),
  className: PropTypes.string,
  valid: PropTypes.bool,
  large: PropTypes.bool,
  docked: PropTypes.bool,
  dockedFirst: PropTypes.bool,
  dockedMiddle: PropTypes.bool,
  dockedLast: PropTypes.bool,
  inputRef: PropTypes.func,
  clearButtonMode: PropTypes.oneOf(Object.keys(CLEAR_BUTTON_MODES)),
  clearButtonLabel: clearablePropType,
  onClear: clearablePropType,
};

export const defaultProps = {
  type: INPUT_TYPES.text,
  className: null,
  valid: null,
  large: false,
  docked: false,
  dockedFirst: false,
  dockedMiddle: false,
  dockedLast: false,
  inputRef: null,
  clearButtonMode: CLEAR_BUTTON_MODES.never,
  clearButtonLabel: null,
  onClear: null,
};
