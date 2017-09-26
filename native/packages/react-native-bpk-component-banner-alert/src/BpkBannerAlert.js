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

const tickIcon = require('./icons/lg/tick-circle.png'); // eslint-disable-line import/no-unresolved
const exclaimationIcon = require('./icons/lg/exclaimation-circle.png'); // eslint-disable-line import/no-unresolved
const closeIcon = require('./icons/lg/close.png'); // eslint-disable-line import/no-unresolved
const chevronUpIcon = require('./icons/lg/chevron-up.png'); // eslint-disable-line import/no-unresolved
const chevronDownIcon = require('./icons/lg/chevron-down.png'); // eslint-disable-line import/no-unresolved

const stylePropType = (props, propName, componentName) => {
  const value = StyleSheet.flatten(props[propName]);

  if (value === undefined) return false;

  if (value.fontWeight) {
    return new Error(`Invalid prop \`${propName}\` with \`fontWeight\` value \`${value.fontWeight}\` supplied to \`${componentName}\`. Use \`emphasize\` prop instead.`); // eslint-disable-line max-len
  }

  return false;
};

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
    flex: 1,
  },
  icon: {
    flex: 0,
    width: spacingLg,
    height: spacingLg,
  },
  actionIcon: {
    tintColor: colorGray300,
    width: spacingBase,
    height: spacingBase,
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
  const { type, message, dismissable, expanded, toggleButtonLabel, style, ...rest } = props;

  let iconSource = null;
  let actionIconSource = null;

  const styleFinal = [styles.banner];
  const textStyle = [styles.text];
  const iconStyle = [styles.icon];
  const actionIconStyle = [styles.icon, styles.actionIcon];

  if (style) {
    styleFinal.push(style);
  }

  if (type === ALERT_TYPES.SUCCESS) {
    iconSource = tickIcon;
    styleFinal.push(styles.successBanner);
    iconStyle.push(styles.successIcon);
  } else if (type === ALERT_TYPES.WARN) {
    iconSource = exclaimationIcon;
    styleFinal.push(styles.warnBanner);
    iconStyle.push(styles.warnIcon);
  } else if (type === ALERT_TYPES.ERROR) {
    iconSource = exclaimationIcon;
    styleFinal.push(styles.errorBanner);
    iconStyle.push(styles.errorIcon);
  }


  if (dismissable) {
    actionIconSource = closeIcon;
  } else if (props.children !== null) {
    if (expanded) {
      actionIconSource = chevronUpIcon;
    } else {
      actionIconSource = chevronDownIcon;
    }
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
  //       iconSource = tickIcon;
  //     }
  //   } else if (small) {
  //     iconSource = exclaimationSmIcon;
  //   } else {
  //     iconSource = exclaimationIcon;
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
      {actionIconSource &&
        <Image
          style={actionIconStyle}
          source={actionIconSource}
        />
      }
      {expanded &&
      <View>
        {props.children}
      </View>
      }
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
  children: PropTypes.node,
  expanded: PropTypes.bool,
  toggleButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  style: stylePropType,
};

BpkBannerAlert.defaultProps = {
  children: null,
  expanded: false,
  toggleButtonLabel: null,
  style: null,
};

export default BpkBannerAlert;
