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

const tickSmIcon = require('./icons/sm/tick-circle.png'); // eslint-disable-line import/no-unresolved
const tickLgIcon = require('./icons/lg/tick-circle.png'); // eslint-disable-line import/no-unresolved
const exclaimationSmIcon = require('./icons/sm/exclaimation-circle.png'); // eslint-disable-line import/no-unresolved
const exclaimationLgIcon = require('./icons/lg/exclaimation-circle.png'); // eslint-disable-line import/no-unresolved

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  borderSizeSm,
  colorGray100,
  colorGray300,
  colorGray700,
  colorGreen500,
  colorRed500,
  spacingBase,
  spacingLg,
  spacingMd,
  spacingSm,
  spacingXl,
  textLgFontSize,
  textLgFontWeight,
  textLgLineHeight,
  textXsFontSize,
  textXsFontWeight,
  textXsLineHeight,
} = tokens;

const styles = StyleSheet.create({
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colorGray100,
    borderWidth: borderSizeSm,
      // TODO Replace with radiiSm token once available
    borderRadius: spacingSm,
    paddingLeft: spacingSm * 3,
    paddingRight: spacingSm * 3,
    height: (spacingLg * 2) - (1 * 2),
  },
  text: {
    flex: 1,
    padding: 0,
    fontSize: textLgFontSize,
    color: colorGray700,
    fontWeight: textLgFontWeight,
    fontFamily: Platform.OS === 'android' ? tokens.fontFamilyEmphasize : tokens.fontFamily,
    lineHeight: textLgLineHeight,
    height: '100%',
  },
  smallInput: {
    paddingLeft: spacingMd,
    paddingRight: spacingMd,
    height: spacingXl - (1 * 2),
  },
  smallText: {
    fontSize: textXsFontSize,
    fontWeight: textXsFontWeight,
    fontFamily: tokens.fontFamily,
    lineHeight: textXsLineHeight,
  },
  placeholderText: {
    fontStyle: 'italic',
  },
  disabledText: {
    color: colorGray100,
  },
  icon: {
    flex: 0,
    width: spacingLg,
    height: spacingLg,
  },
  validIcon: {
    tintColor: colorGreen500,
  },
  invalidIcon: {
    tintColor: colorRed500,
  },
  smallIcon: {
    width: spacingBase,
    height: spacingBase,
  },
});

const BpkTextInput = (props) => {
  const { small, valid, value, disabled, style: innerStyle, ...rest } = props;

  let iconSource = null;

  const style = [styles.input];
  const textStyle = [styles.text];
  const iconStyle = [styles.icon];
  if (small) {
    style.push(styles.smallInput);
    textStyle.push(styles.smallText);
    iconStyle.push(styles.smallIcon);
  }
  if (disabled) {
    textStyle.push(styles.disabledText);
  }
  if (value === '') {
    textStyle.push(styles.placeholderText);
  }
  if (valid !== null) {
    // TODO Update to use Backpack-native Icon solution once implemented https://gojira.skyscanner.net/browse/BPK-841

    if (valid) {
      if (small) {
        iconSource = tickSmIcon;
      } else {
        iconSource = tickLgIcon;
      }
    } else if (small) {
      iconSource = exclaimationSmIcon;
    } else {
      iconSource = exclaimationLgIcon;
    }


    if (valid) {
      style.push(styles.validOuter);
      iconStyle.push(styles.validIcon);
    } else {
      style.push(styles.errorOuter);
      iconStyle.push(styles.invalidIcon);
    }
  }

  if (innerStyle) { style.push(innerStyle); }

  return (
    <View
      style={style}
    >
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor={colorGray300}
        style={textStyle}
        editable={!disabled}
        value={value}
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

BpkTextInput.propTypes = {
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  style: TextInput.propTypes.style,
  valid: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

BpkTextInput.defaultProps = {
  disabled: false,
  small: false,
  style: null,
  valid: null,
};

export default BpkTextInput;
