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
  Image,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'react-native-bpk-component-text';

const tickIcon = require('./icons/lg/tick-circle.png'); // eslint-disable-line import/no-unresolved
const exclamationIcon = require('./icons/lg/exclamation-circle.png'); // eslint-disable-line import/no-unresolved
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
  colorGray50,
  colorGreen500,
  colorRed500,
  colorYellow500,
  spacingBase,
  spacingLg,
  spacingSm,
} = tokens;

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
};

const styles = StyleSheet.create({
  banner: {
    borderColor: colorGray100,
      // TODO Replace with borderSm token once available
    borderWidth: 1,
      // TODO Replace with radiiSm token once available
    borderRadius: spacingSm,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // TODO Replace '1' with borderSm token once available
    height: (spacingLg * 2) - (1 * 2),
    paddingLeft: spacingSm * 3,
    paddingRight: spacingSm * 3,
  },
  childStyle: {
    padding: spacingSm * 3,
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
  const { type, message, onPress, dismissable, expanded, toggleButtonLabel, style, children, ...rest } = props;

  const clickable = dismissable || children !== null;

  let iconSource = null;
  let actionIconSource = null;

  const styleFinal = [styles.banner];
  const textStyle = [styles.text];
  const contentStyle = [styles.content];
  const iconStyle = [styles.icon];
  const actionIconStyle = [styles.icon, styles.actionIcon];
  const childStyle = [styles.childStyle];

  if (style) {
    styleFinal.push(style);
  }

  if (type === ALERT_TYPES.SUCCESS) {
    iconSource = tickIcon;
    styleFinal.push(styles.successBanner);
    iconStyle.push(styles.successIcon);
  } else if (type === ALERT_TYPES.WARN) {
    iconSource = exclamationIcon;
    styleFinal.push(styles.warnBanner);
    iconStyle.push(styles.warnIcon);
  } else if (type === ALERT_TYPES.ERROR) {
    iconSource = exclamationIcon;
    styleFinal.push(styles.errorBanner);
    iconStyle.push(styles.errorIcon);
  }

  if (dismissable) {
    actionIconSource = closeIcon;
  } else if (children !== null) {
    if (expanded) {
      actionIconSource = chevronUpIcon;
    } else {
      actionIconSource = chevronDownIcon;
    }
  }

  return (
    <View
      style={styleFinal}
      {...rest}
    >
      <TouchableHighlight
        accessibilityComponentType="button"
        onPress={clickable ? onPress : null}
        underlayColor={colorGray50}
      >
        <View
          style={contentStyle}
        >
          {iconSource &&
            <Image
              style={iconStyle}
              source={iconSource}
            />
          }
          <BpkText textStyle="lg" style={textStyle}>{message}</BpkText>
          {actionIconSource &&
            <Image
              style={actionIconStyle}
              source={actionIconSource}
            />
          }
        </View>
      </TouchableHighlight>
      {expanded &&
        <View style={childStyle}>{props.children}</View>
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
  dismissable: PropTypes.bool,
  expanded: PropTypes.bool,
  onPress: PropTypes.func,
  toggleButtonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  style: stylePropType,
};

BpkBannerAlert.defaultProps = {
  children: null,
  dismissable: false,
  expanded: false,
  onPress: () => null,
  style: null,
  toggleButtonLabel: null,
};

export default BpkBannerAlert;
