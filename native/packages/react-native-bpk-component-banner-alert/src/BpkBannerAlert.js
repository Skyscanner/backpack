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
import { setOpacity } from 'bpk-tokens';
import BpkText from 'react-native-bpk-component-text';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';

const tickIcon = require('./icons/lg/tick-circle.png'); // eslint-disable-line import/no-unresolved
const informationIcon = require('./icons/lg/information-circle.png'); // eslint-disable-line import/no-unresolved
const neutralIcon = require('./icons/lg/information-circle.png'); // eslint-disable-line import/no-unresolved
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

// Slight darkness to use when buttons are pressed in.
const underlayColor = Platform.select({
  ios: () => setOpacity(tokens.underlayColor, tokens.underlayOpacity),
  android: () => null,
})();

const {
  borderRadiusSm,
  borderSizeSm,
  colorGray300,
  colorGray500,
  colorGray700,
  colorGreen500,
  colorRed500,
  colorYellow500,
  spacingBase,
  spacingMd,
  spacingSm,
  spacingXl,
} = tokens;

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  NEUTRAL: 'neutral',
};

const styles = StyleSheet.create({
  outerContainer: {
    borderWidth: borderSizeSm,
    borderRadius: borderRadiusSm,
    overflow: 'hidden',
  },
  bannerContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    minHeight: spacingXl - (borderSizeSm * 2),
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
  outerContainerNeutral: {
    borderColor: colorGray300,
  },
  text: {
    flex: 1,
    flexGrow: 1,
    paddingLeft: spacingSm,
    color: colorGray700,
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
  iconNeutral: {
    tintColor: colorGray500,
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
  const { type, message, onAction, dismissable, expanded, actionButtonLabel, style, children, ...rest } = props;

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
    iconSource = informationIcon;
    outerStyleFinal.push(styles.outerContainerWarn);
    iconStyle.push(styles.iconWarn);
  } else if (type === ALERT_TYPES.ERROR) {
    iconSource = informationIcon;
    outerStyleFinal.push(styles.outerContainerError);
    iconStyle.push(styles.iconError);
  } else if (type === ALERT_TYPES.NEUTRAL) {
    iconSource = neutralIcon;
    outerStyleFinal.push(styles.outerContainerNeutral);
    iconStyle.push(styles.iconNeutral);
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
      onPress={onAction}
      underlayColor={underlayColor}
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
        onPress={onAction}
        underlayColor={underlayColor}
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
      <BpkAnimateHeight expanded={expanded}>
        <View style={expandedChildContainer}>{props.children}</View>
      </BpkAnimateHeight>
    </View>
  );
};

BpkBannerAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
    ALERT_TYPES.NEUTRAL,
  ]).isRequired,
  children: PropTypes.node,
  dismissable: dismissablePropType,
  expanded: PropTypes.bool,
  onAction: PropTypes.func,
  actionButtonLabel: PropTypes.string,
  style: stylePropType,
};

BpkBannerAlert.defaultProps = {
  children: null,
  dismissable: false,
  expanded: false,
  onAction: () => null,
  style: null,
  actionButtonLabel: null,
};

export default BpkBannerAlert;
