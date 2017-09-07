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
  View,
  TextInput,
Image,
  Platform,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const IOS_TOKENS = require('bpk-tokens/tokens/ios/base.react.native.common.js');
const ANDROID_TOKENS = require('bpk-tokens/tokens/android/base.react.native.common.js');

const tokens = Platform.select({
  ios: () => IOS_TOKENS,
  android: () => ANDROID_TOKENS,
})();

const styles = StyleSheet.create({
  baseOuter: {
    borderColor: tokens.colorGray100,
    borderWidth: 1,
    borderRadius: tokens.spacingSm, // TODO SWAP OUT FOR CORRECT TOKEN
    padding: tokens.spacingSm * 3,
    flexDirection: 'row',
  },
  baseText: {
    fontSize: tokens.textLgFontSize,
    color: tokens.colorGray700,
    width: 'auto',
    flex: 1,
  },
  smallOuter: {
    padding: tokens.spacingMd,
  },
  smallText: {
    fontSize: tokens.textXsFontSize,
  },
  placeholderText: {
    fontStyle: 'italic',
    color: tokens.colorGray300,
  },
  disabledText: {
    color: tokens.colorGray100,
  },
  errorOuter: {
    // backgroundColor: colorRed100,
  },
  validOuter: {
    // backgroundColor: colorGreen100,
  },
  baseIcon: {
    flex: 0,
    width: 20,
    height: 20,
  },
  smallIcon: {
    width: 13,
    height: 13,
  },
});

const BpkInput = (props) => {
  const { small, valid, onTextChanged, text, placeholderText, disabled, style: innerStyle, ...rest } = props;

  let iconSource = null;

  const outerStyle = [styles.baseOuter];
  const textStyle = [styles.baseText];
  const iconStyle = [styles.baseIcon];
  if (small) {
    outerStyle.push(styles.smallOuter);
    textStyle.push(styles.smallText);
    iconStyle.push(styles.smallIcon);
  }
  if (disabled) {
    textStyle.push(styles.disabledText);
  }
  if (text === '') {
    textStyle.push(styles.placeholderText);
  }
  if (valid !== null) {
    iconSource = valid ? require('./tick-circle-green-500.png') : require('./exclamation-circle-red-500.png'); // eslint-disable-line
    if (valid) {
      outerStyle.push(styles.validOuter);
    } else {
      outerStyle.push(styles.errorOuter);
    }
  }

  if (innerStyle) { outerStyle.push(innerStyle); }


  return (
    <View
      style={outerStyle}
    >
      <TextInput
        style={textStyle}
        editable={!disabled}
        value={text}
        onChangeText={onTextChanged}
        placeholder={placeholderText}
        {...rest}
      />
      {iconSource &&
        <Image
          style={iconStyle}
          source={iconSource}
        />
      }
    </View>
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
