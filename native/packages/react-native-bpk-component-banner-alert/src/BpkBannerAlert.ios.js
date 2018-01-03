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

import React from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet } from 'react-native';

import {
  borderRadiusSm,
  borderSizeSm,
  colorGray300,
  colorGray500,
  colorGray700,
  colorGreen500,
  colorRed500,
  colorYellow500,
  lineHeightSm,
  spacingBase,
  spacingMd,
  spacingSm,
  spacingXl,
} from 'bpk-tokens/tokens/base.react.native';

import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';

import AnimateAndFade from './AnimateAndFade';

import {
  dismissablePropType,
  toggleExpandedButtonLabelPropType,
  dismissableLabelPropType,
} from './customPropTypes';

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
    minHeight: spacingXl - borderSizeSm * 2,
  },
  bannerContainerPadded: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: spacingSm,
    paddingLeft: spacingMd,
    paddingRight: spacingMd,
  },
  bannerContainerPaddedDismissable: {
    paddingRight: 0,
  },
  closeButtonContainer: {
    height: '100%',
    width: 2 * spacingMd + spacingBase,
    display: 'flex',
    flexDirection: 'row',
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
    // Calculate the padding required to align the text within the banner
    paddingTop: (spacingXl - 2 * borderSizeSm - lineHeightSm) / 2,
  },
  icon: {
    // Calculate the padding required to align the icon within the banner
    paddingTop: (spacingXl - 2 * borderSizeSm - spacingBase) / 2,
  },
  iconSuccess: {
    color: colorGreen500,
  },
  iconWarn: {
    color: colorYellow500,
  },
  iconError: {
    color: colorRed500,
  },
  iconNeutral: {
    color: colorGray500,
  },
  button: {
    // Calculate the padding required to align the button within the banner
    paddingTop: (spacingXl - 2 * borderSizeSm - spacingBase) / 2,
  },
  buttonExpand: {
    color: colorGray700,
  },
  buttonClose: {
    color: colorGray500,
  },
});

const ALERT_TYPE_STYLES = {
  [ALERT_TYPES.SUCCESS]: {
    iconSource: icons['tick-circle'],
    outerStyle: styles.outerContainerSuccess,
    iconStyle: styles.iconSuccess,
  },
  [ALERT_TYPES.WARN]: {
    iconSource: icons['information-circle'],
    outerStyle: styles.outerContainerWarn,
    iconStyle: styles.iconWarn,
  },
  [ALERT_TYPES.ERROR]: {
    iconSource: icons['information-circle'],
    outerStyle: styles.outerContainerError,
    iconStyle: styles.iconError,
  },
  [ALERT_TYPES.NEUTRAL]: {
    iconSource: icons['information-circle'],
    outerStyle: styles.outerContainerNeutral,
    iconStyle: styles.iconNeutral,
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
    animateOnEnter,
    animateOnLeave,
    children,
    ...rest
  } = props;

  const expandable = children !== null;

  const outerStyle = [styles.outerContainer];
  const contentPaddedStyle = [styles.bannerContainerPadded];
  const expandedChildContainer = [styles.expandedChildContainer];
  const { iconSource, outerStyle: outerStyleForType, iconStyle } =
    ALERT_TYPE_STYLES[type] || {};

  outerStyle.push(outerStyleForType);
  if (dismissable) {
    contentPaddedStyle.push(styles.bannerContainerPaddedDismissable);
  }

  const banner = (
    <View style={[contentPaddedStyle]}>
      <BpkIcon style={[styles.icon, iconStyle]} icon={iconSource} small />
      <BpkText textStyle="sm" style={styles.text}>
        {message}
      </BpkText>
      {expandable && (
        <BpkIcon
          style={[styles.button, styles.buttonExpand]}
          icon={expanded ? icons['chevron-up'] : icons['chevron-down']}
          small
        />
      )}
    </View>
  );

  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      style={outerStyle}
      show={show}
      {...rest}
    >
      <View style={outerStyle}>
        <View style={styles.bannerContainer}>
          {expandable ? (
            <BpkTouchableOverlay
              accessibilityComponentType="button"
              onPress={onToggleExpanded}
              accessibilityLabel={toggleExpandedButtonLabel}
              style={styles.bannerContainer}
            >
              {banner}
            </BpkTouchableOverlay>
          ) : (
            banner
          )}
          {dismissable && (
            <BpkTouchableOverlay
              accessibilityComponentType="button"
              onPress={onDismiss}
              accessibilityLabel={dismissButtonLabel}
              style={styles.closeButtonContainer}
            >
              <View>
                <BpkIcon
                  style={[styles.button, styles.buttonClose]}
                  icon="close"
                  small
                />
              </View>
            </BpkTouchableOverlay>
          )}
        </View>
        <BpkAnimateHeight expanded={expanded}>
          <View style={expandedChildContainer}>{props.children}</View>
        </BpkAnimateHeight>
      </View>
    </AnimateAndFade>
  );
};

BpkBannerAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(ALERT_TYPES)).isRequired,
  animateOnEnter: PropTypes.bool,
  animateOnLeave: PropTypes.bool,
  children: PropTypes.node,
  dismissable: dismissablePropType,
  dismissButtonLabel: dismissableLabelPropType,
  expanded: PropTypes.bool,
  onDismiss: PropTypes.func,
  onToggleExpanded: PropTypes.func,
  show: PropTypes.bool,
  toggleExpandedButtonLabel: toggleExpandedButtonLabelPropType,
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
  toggleExpandedButtonLabel: null,
};

export default BpkBannerAlert;
