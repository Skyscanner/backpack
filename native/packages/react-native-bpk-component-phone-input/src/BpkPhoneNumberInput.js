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

import React, { cloneElement } from 'react';
import { type Node, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BpkTextInput, {
  type BpkTextInputProps,
} from 'react-native-bpk-component-text-input';
import BpkSelect from 'react-native-bpk-component-select';
import { type Code, CODE_PROP_TYPES, type RenderFlag } from './common-types';

export type Props = {
  ...$Exact<$Diff<BpkTextInputProps, { accessoryView: ?Node }>>,
  dialingCode: Code,
  renderFlag: RenderFlag,
  onDialingCodePress: () => mixed,
};

const styles = StyleSheet.create({
  accessoryViewiOS: {
    justifyContent: 'flex-end',
  },
});

const BpkPhoneNumberInput = (props: Props) => {
  const {
    renderFlag,
    dialingCode,
    editable,
    onDialingCodePress,
    ...rest
  } = props;
  let flag = renderFlag(dialingCode);
  if (flag) {
    flag = cloneElement(flag, {
      resizeMode: flag.props.resizeMode || 'contain',
    });
  }

  return (
    <BpkTextInput
      editable={editable}
      keyboardType="phone-pad"
      {...rest}
      accessoryView={
        <BpkSelect
          onPress={onDialingCodePress}
          label={dialingCode.dialingCode}
          disabled={!editable}
          image={flag}
          showImage
          style={Platform.select({
            android: null,
            ios: styles.accessoryViewiOS,
          })}
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
  dialingCode: PropTypes.shape(...CODE_PROP_TYPES).isRequired,
  renderFlag: PropTypes.func.isRequired,
  onDialingCodePress: PropTypes.func.isRequired,
};

BpkPhoneNumberInput.defaultProps = textInputDefaultProp;

export default BpkPhoneNumberInput;
