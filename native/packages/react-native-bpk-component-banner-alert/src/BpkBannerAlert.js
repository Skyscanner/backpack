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
import BpkText from 'react-native-bpk-component-text';

const tickLgIcon = require('./icons/lg/tick-circle.png'); // eslint-disable-line import/no-unresolved
const exclaimationLgIcon = require('./icons/lg/exclaimation-circle.png'); // eslint-disable-line import/no-unresolved

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorGray100,
  colorGray300,
  colorGray700,
  colorGreen500,
  colorYellow500,
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

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
};

const styles = StyleSheet.create({
  banner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colorGray100,
      // TODO Replace with borderSm token once available
    borderWidth: 1,
      // TODO Replace with radiiSm token once available
    borderRadius: spacingSm,
    paddingLeft: spacingSm * 3,
    paddingRight: spacingSm * 3,
      // TODO Replace '1' with borderSm token once available
    height: (spacingLg * 2) - (1 * 2),
  },
  successBanner: {
    borderColor: colorGreen500,
  },
  warnBanner: {
    borderColor: colorYellow500,
  },
  errorBanner: {
    borderColor: colorRed500,
  },
  text: {
    paddingLeft: 10,
  },
  icon: {
    flex: 0,
    width: spacingLg,
    height: spacingLg,
  },
  successIcon: {
    tintColor: colorGreen500,
  },
  warnIcon: {
    tintColor: colorYellow500,
  },
  errorIcon: {
    tintColor: colorRed500,
  },
});

const BpkBannerAlert = (props) => {
  const { type, message, toggleButtonLabel, style, ...rest } = props;

  let iconSource = null;

  const styleFinal = [styles.banner];
  const textStyle = [styles.text];
  const iconStyle = [styles.icon];

  if (style) {
    styleFinal.push(style);
  }

  if (type === ALERT_TYPES.SUCCESS) {
    iconSource = tickLgIcon;
    styleFinal.push(styles.successBanner);
    iconStyle.push(styles.successIcon);
  } else if (type === ALERT_TYPES.WARN) {
    iconSource = exclaimationLgIcon;
    styleFinal.push(styles.warnBanner);
    iconStyle.push(styles.warnIcon);
  } else if (type === ALERT_TYPES.ERROR) {
    iconSource = exclaimationLgIcon;
    styleFinal.push(styles.errorBanner);
    iconStyle.push(styles.errorIcon);
  }

  // if (small) {
  //   styleFinal.push(styles.smallInput);
  //   textStyle.push(styles.smallText);
  //   iconStyle.push(styles.smallIcon);
  // }
  // if (disabled) {
  //   textStyle.push(styles.disabledText);
  // }
  // if (value === '') {
  //   textStyle.push(styles.placeholderText);
  // }
  // if (valid !== null) {
  //   // TODO Update to use Backpack-native Icon solution once implemented https://gojira.skyscanner.net/browse/BPK-841

  //   if (valid) {
  //     if (small) {
  //       iconSource = tickSmIcon;
  //     } else {
  //       iconSource = tickLgIcon;
  //     }
  //   } else if (small) {
  //     iconSource = exclaimationSmIcon;
  //   } else {
  //     iconSource = exclaimationLgIcon;
  //   }


  //   if (valid) {
  //     styleFinal.push(styles.validOuter);
  //     iconStyle.push(styles.validIcon);
  //   } else {
  //     styleFinal.push(styles.errorOuter);
  //     iconStyle.push(styles.invalidIcon);
  //   }
  // }

  // if (innerStyle) { styleFinal.push(innerStyle); }

  return (
    <View
      style={styleFinal}
      {...rest}
    >
      {iconSource &&
        <Image
          style={iconStyle}
          source={iconSource}
        />
      }
      <BpkText
        textStyle="lg"
        style={textStyle}
      >
        {message}
      </BpkText>
    </View>
  );
};

BpkBannerAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
  ]).isRequired,
  toggleButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkBannerAlert.defaultProps = {
  toggleButtonLabel: null,
  style: null,
};

export default BpkBannerAlert;
