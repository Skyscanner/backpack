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
import { type Node } from 'react-native';
import PropTypes from 'prop-types';
import BpkTextInput, {
  type BpkTextInputProps,
} from 'react-native-bpk-component-text-input';
import { type Code, CODE_PROP_TYPES, type RenderFlag } from './common-types';
import BpkDialingCodeAccessoryView from './BpkDialingCodeAccessoryView';

export type Props = {
  ...$Exact<$Diff<BpkTextInputProps, { accessoryView: ?Node }>>,
  dialingCodeData: Code,
  renderFlag: RenderFlag,
  onDialingCodePress: () => mixed,
};

const BpkPhoneNumberInput = (props: Props) => {
  const {
    renderFlag,
    dialingCodeData,
    editable,
    onDialingCodePress,
    ...rest
  } = props;
  const flag = renderFlag(dialingCodeData);

  return (
    <BpkTextInput
      editable={editable}
      {...rest}
      accessoryView={
        <BpkDialingCodeAccessoryView
          onPress={onDialingCodePress}
          editable={editable}
          flag={flag}
          {...dialingCodeData}
        />
      }
    />
  );
};

const {
  accessoryView: _thisIsIgnored,
  ...textInputPropTypes
} = BpkTextInput.propTypes;
const {
  accessoryView: _thisIsAlsoIgnored,
  ...textInputDefaultProp
} = BpkTextInput.defaultProps;

BpkPhoneNumberInput.propTypes = {
  ...textInputPropTypes,
  dialingCodeData: PropTypes.shape(...CODE_PROP_TYPES).isRequired,
  renderFlag: PropTypes.func.isRequired,
  onDialingCodePress: PropTypes.func.isRequired,
};

BpkPhoneNumberInput.defaultProps = textInputDefaultProp;

export default BpkPhoneNumberInput;
