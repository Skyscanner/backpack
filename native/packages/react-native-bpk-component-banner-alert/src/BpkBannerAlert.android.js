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
  StyleSheet,
  ViewPropTypes,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  colorGray50,
  colorGray500,
  colorGreen500,
  colorBlue500,
  colorRed500,
  colorYellow500,
  spacingBase,
  spacingSm,
  spacingLg,
  spacingXxl,
} from 'bpk-tokens/tokens/base.react.native';

import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'react-native-bpk-component-text';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkIcon from 'react-native-bpk-component-icon';

import { dismissablePropType } from './customPropTypes';

import AnimateAndFade from './AnimateAndFade';

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  NEUTRAL: 'neutral',
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: spacingBase,
    paddingHorizontal: spacingLg,
    backgroundColor: colorGray50,
    minHeight: spacingXxl + spacingBase,
    flex: 1,
  },
  dismissableContainer: {
    paddingVertical: spacingBase,
    paddingHorizontal: spacingLg,
    backgroundColor: colorGray50,
  },
  childrenContainer: {
    paddingVertical: spacingSm,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: spacingLg,
    backgroundColor: colorGray50,
  },
  text: {
    flex: 1,
  },
  icon: {
    paddingRight: spacingSm,
    paddingTop: spacingSm - spacingSm / spacingSm,
  },
  dismiss: {
    color: colorBlue500,
  },
});

const ALERT_TYPE_STYLES = {
  [ALERT_TYPES.SUCCESS]: {
    iconSource: 'tick-circle',
    iconStyle: {
      color: colorGreen500,
    },
  },
  [ALERT_TYPES.WARN]: {
    iconSource: 'information-circle',
    iconStyle: {
      color: colorYellow500,
    },
  },
  [ALERT_TYPES.ERROR]: {
    iconSource: 'information-circle',
    iconStyle: {
      color: colorRed500,
    },
  },
  [ALERT_TYPES.NEUTRAL]: {
    iconSource: 'information-circle',
    iconStyle: {
      color: colorGray500,
    },
  },
};

const BpkBannerAlert = props => {
  const {
    type,
    message,
    onDismiss,
    onToggleExpanded,
    dismissable,
    expanded,
    dismissButtonLabel,
    toggleExpandedButtonLabel,
    show,
    style: userStyle,
    animateOnEnter,
    animateOnLeave,
    children,
    ...rest
  } = props;

  const expandable = children !== null;
  const { iconSource, iconStyle } = ALERT_TYPE_STYLES[type] || {};

  const dismissableContent = (
    <TouchableNativeFeedback
      accessibilityComponentType="button"
      accessibilityLabel="dismiss"
      background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      useForeground
      onPress={onDismiss}
    >
      <View style={styles.actionContainer}>
        <BpkText textStyle="sm" emphasize style={styles.dismiss}>
          DISMISS
        </BpkText>
      </View>
    </TouchableNativeFeedback>
  );
  const expandableContent = (
    <BpkAnimateHeight expanded={expanded}>
      <View style={styles.childrenContainer}>{children}</View>
    </BpkAnimateHeight>
  );
  const expandableIcon = (
    <View style={styles.dismissableContainer}>
      <BpkIcon
        style={styles.icon}
        icon={expanded ? 'chevron-up' : 'chevron-down'}
        small
      />
    </View>
  );
  const mainContent = (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <BpkIcon style={[styles.icon, iconStyle]} icon={iconSource} small />
          <BpkText style={styles.text} textStyle="sm">
            {message}
          </BpkText>
        </View>
        {expandable && expandableContent}
      </View>
      {dismissable && dismissableContent}
      {expandable && expandableIcon}
    </View>
  );
  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
      style={userStyle}
      {...rest}
    >
      {expandable ? (
        <TouchableWithoutFeedback
          accessibilityComponentType="button"
          accessibilityLabel="expand"
          onPress={onToggleExpanded}
        >
          {mainContent}
        </TouchableWithoutFeedback>
      ) : (
        mainContent
      )}
    </AnimateAndFade>
  );
};

BpkBannerAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(ALERT_TYPES).map(key => ALERT_TYPES[key]))
    .isRequired,
  animateOnEnter: PropTypes.bool,
  animateOnLeave: PropTypes.bool,
  children: PropTypes.node,
  dismissable: dismissablePropType,
  dismissButtonLabel: PropTypes.string,
  expanded: PropTypes.bool,
  onDismiss: PropTypes.func,
  onToggleExpanded: PropTypes.func,
  show: PropTypes.bool,
  style: ViewPropTypes.style,
  toggleExpandedButtonLabel: PropTypes.string,
};

BpkBannerAlert.defaultProps = {
  animateOnEnter: false,
  animateOnLeave: false,
  children: null,
  dismissable: false,
  dismissButtonLabel: null,
  expanded: false,
  onDismiss: null,
  onToggleExpanded: null,
  show: true,
  style: null,
  toggleExpandedButtonLabel: null,
};

export default BpkBannerAlert;
