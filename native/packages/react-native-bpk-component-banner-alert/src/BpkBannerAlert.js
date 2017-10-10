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

const dismissablePropType = (props, propName, componentName) => {
  if (props[propName] && props.children !== null) {
    return new Error(`Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to \`${componentName}\`. Banner alert cannot be expanded to show children if it is dismissable.`); // eslint-disable-line max-len
  }

  return false;
};

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorGray50,
  colorGray500,
  colorGray700,
  colorGreen500,
  colorRed500,
  colorYellow500,
  spacingSm,
  spacingBase,
  spacingMd,
  spacingXl,
} = tokens;

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
};

const styles = StyleSheet.create({
  outerContainer: {
      // TODO Replace with borderSm token once available
    borderWidth: 1,
      // TODO Replace with radiiSm token once available
    borderRadius: spacingSm,
  },
  bannerContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    // TODO Replace '1' with borderSm token once available
    minHeight: spacingXl - (1 * 2),
  },
  bannerContainerPadded: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacingSm,
    paddingLeft: spacingMd,
    paddingRight: spacingMd,
    paddingTop: spacingSm,
  },
  bannerContainerPaddedDismissable: {
    paddingRight: 0,
  },
  closeButtonContainer: {
    height: '100%',
    width: ((2 * spacingMd) + spacingBase),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedChildContainer: {
    paddingBottom: spacingSm,
    paddingLeft: spacingMd,
    paddingRight: spacingMd,
  },
  outerContainerSuccess: {
    borderColor: colorGreen500,
  },
  outerContainerWarn: {
    borderColor: colorYellow500,
  },
  outerContainerError: {
    borderColor: colorRed500,
  },
  text: {
    flexGrow: 1,
    paddingLeft: spacingSm,
  },
  icon: {
    width: spacingBase,
    height: spacingBase,
  },
  iconSuccess: {
    tintColor: colorGreen500,
  },
  iconWarn: {
    tintColor: colorYellow500,
  },
  iconError: {
    tintColor: colorRed500,
  },
  button: {
    tintColor: colorGray700,
    width: spacingBase,
    height: spacingBase,
  },
  buttonClose: {
    tintColor: colorGray500,
  },
});

const BpkBannerAlert = (props) => {
  const { type, message, onPress, dismissable, expanded, actionButtonLabel, style, children, ...rest } = props;

  const expandable = children !== null;

  let iconSource = null;
  let buttonIconSource = null;

  const outerStyleFinal = [styles.outerContainer];
  const iconStyle = [styles.icon];
  const buttonIconStyle = [styles.icon, styles.button];
  const expandedChildContainer = [styles.expandedChildContainer];

  if (style) {
    outerStyleFinal.push(style);
  }

  if (type === ALERT_TYPES.SUCCESS) {
    iconSource = tickIcon;
    outerStyleFinal.push(styles.outerContainerSuccess);
    iconStyle.push(styles.iconSuccess);
  } else if (type === ALERT_TYPES.WARN) {
    iconSource = exclamationIcon;
    outerStyleFinal.push(styles.outerContainerWarn);
    iconStyle.push(styles.iconWarn);
  } else if (type === ALERT_TYPES.ERROR) {
    iconSource = exclamationIcon;
    outerStyleFinal.push(styles.outerContainerError);
    iconStyle.push(styles.iconError);
  }

  if (dismissable) {
    buttonIconSource = closeIcon;
    buttonIconStyle.push(styles.closeIcon);
  } else if (children !== null) {
    if (expanded) {
      buttonIconSource = chevronUpIcon;
    } else {
      buttonIconSource = chevronDownIcon;
    }
  }

  const iconComponent = (
    <Image
      style={iconStyle}
      source={iconSource}
    />
  );

  const textComponent = (
    <BpkText textStyle="sm" style={styles.text}>{message}</BpkText>
  );

  const actionComponent = (
    <Image
      style={buttonIconStyle}
      source={buttonIconSource}
    />
  );

  const closeButtonComponent = (
    <TouchableHighlight
      accessibilityComponentType="button"
      onPress={onPress}
      underlayColor={colorGray50}
      accessibilityLabel={actionButtonLabel}
      style={styles.closeButtonContainer}
    >
      {actionComponent}
    </TouchableHighlight>
    );

  const contentPaddedStyle = [styles.bannerContainerPadded];
  if (dismissable) {
    contentPaddedStyle.push(styles.bannerContainerPaddedDismissable);
  }

  let banner = (<View
    style={[contentPaddedStyle]}
  >
    {iconComponent}
    {textComponent}
    {expandable && actionComponent}
  </View>
  );

  if (expandable) {
    banner = (
      <TouchableHighlight
        accessibilityComponentType="button"
        onPress={onPress}
        underlayColor={colorGray50}
        accessibilityLabel={actionButtonLabel}
        style={styles.bannerContainer}
      >
        {banner}
      </TouchableHighlight>
    );
  }

  return (
    <View style={outerStyleFinal} {...rest} >
      <View style={styles.bannerContainer} >
        {banner}
        {dismissable && closeButtonComponent }
      </View>
      {expanded &&
        <View style={expandedChildContainer}>{props.children}</View>
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
  dismissable: dismissablePropType,
  expanded: PropTypes.bool,
  onPress: PropTypes.func,
  actionButtonLabel: PropTypes.oneOfType([
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
  actionButtonLabel: null,
};

export default BpkBannerAlert;
