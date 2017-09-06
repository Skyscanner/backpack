/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import {
  TextInput,
  Platform,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { colorGray100, colorRed600, colorGreen600, colorGray300, colorGray700 }
from 'bpk-tokens/tokens/ios/base.react.native.es6';

const IOS_TOKENS = require('bpk-tokens/tokens/ios/base.react.native.common.js');
const ANDROID_TOKENS = require('bpk-tokens/tokens/android/base.react.native.common.js');

const tokens = Platform.select({
  ios: () => IOS_TOKENS,
  android: () => ANDROID_TOKENS,
})();

const styles = StyleSheet.create({
  base: {
    borderColor: colorGray100,
    borderWidth: 1,
    borderRadius: tokens.spacingSm, // TODO SWAP OUT FOR CORRECT TOKEN
    // height: 48,
    padding: tokens.spacingSm * 3,
    fontSize: tokens.textLgFontSize,
    color: colorGray700,
  },
  small: {
    // height: 32,
    padding: tokens.spacingMd,
    fontSize: tokens.textXsFontSize + 1,
  },
  placeholder: {
    fontStyle: 'italic',
    color: colorGray300,
  },
  disabled: {
    color: colorGray100,
  },
  error: {
    backgroundColor: colorRed600,
  },
  valid: {
    backgroundColor: colorGreen600,
  },
});

const BpkInput = (props) => {
  const { small, valid, onTextChanged, text, placeholderText, disabled, style: innerStyle, ...rest } = props;

  const style = [styles.base];
  if (small) { style.push(styles.small); }
  if (disabled) { style.push(styles.disabled); }
  if (text === '') { style.push(styles.placeholder); }
  if (valid !== null) {
    if (valid) {
      style.push(styles.valid);
    } else {
      style.push(styles.error);
    }
  }
  if (innerStyle) { style.push(innerStyle); }

  return (
    <TextInput
      style={style}
      editable={!disabled}
      value={text}
      onChangeText={onTextChanged}
      placeholder={placeholderText}
      {...rest}
    />
  );
};

BpkInput.propTypes = {
  disabled: PropTypes.bool,
  onTextChanged: PropTypes.func,
  small: PropTypes.bool,
  valid: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  placeholderText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

BpkInput.defaultProps = {
  disabled: false,
  onTextChanged: null,
  small: false,
  style: null,
  valid: null,
};

export default BpkInput;
