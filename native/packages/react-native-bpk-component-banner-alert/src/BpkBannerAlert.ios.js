/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import {
  spacingSm,
  spacingMd,
  spacingXl,
  colorRed500,
  colorGray300,
  colorGray500,
  colorGreen500,
  colorYellow500,
  borderSizeSm,
  borderRadiusSm,
} from 'bpk-tokens/tokens/base.react.native';
import BpkText from 'react-native-bpk-component-text';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';

import ALERT_TYPES from './AlertTypes';
import AnimateAndFade from './AnimateAndFade';

import {
  dismissablePropType,
  toggleExpandedButtonLabelPropType,
  dismissableLabelPropType,
} from './customPropTypes';

const STYLES = StyleSheet.create({
  border: {
    minHeight: spacingXl, // animate height is janky if we don't provide this ¯\_(ツ)_/¯
    borderWidth: borderSizeSm,
    borderRadius: borderRadiusSm,
  },
  borderSuccess: {
    borderColor: colorGreen500,
  },
  borderWarn: {
    borderColor: colorYellow500,
  },
  borderError: {
    borderColor: colorRed500,
  },
  borderNeutral: {
    borderColor: colorGray300,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: spacingMd - borderSizeSm,
    paddingHorizontal: spacingMd,
  },
  rowCloseButtonTapAreaOffset: {
    paddingEnd: spacingXl,
  },
  icon: {
    marginEnd: spacingSm,
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
  message: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: spacingMd,
  },
  expandIcon: {
    paddingStart: spacingMd,
  },
  expandableContent: {
    padding: spacingMd,
    paddingTop: 0,
  },
});

const ALERT_TYPE_STYLES = {
  [ALERT_TYPES.SUCCESS]: {
    icon: icons['tick-circle'],
    borderStyle: STYLES.borderSuccess,
    iconStyle: STYLES.iconSuccess,
  },
  [ALERT_TYPES.WARN]: {
    icon: icons['information-circle'],
    borderStyle: STYLES.borderWarn,
    iconStyle: STYLES.iconWarn,
  },
  [ALERT_TYPES.ERROR]: {
    icon: icons['information-circle'],
    borderStyle: STYLES.borderError,
    iconStyle: STYLES.iconError,
  },
  [ALERT_TYPES.NEUTRAL]: {
    icon: icons['information-circle'],
    borderStyle: STYLES.borderNeutral,
    iconStyle: STYLES.iconNeutral,
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
    bannerStyle,
    ...rest
  } = props;

  const expandable = children !== null;
  const alertTypeStyles = ALERT_TYPE_STYLES[type] || {};
  const { icon, borderStyle, iconStyle } = alertTypeStyles;

  const rowStyle = [STYLES.row];

  if (dismissable) {
    rowStyle.push(STYLES.rowCloseButtonTapAreaOffset);
  }

  const ExpandToggleView = expandToggleViewProps => (
    <BpkTouchableOverlay
      {...expandToggleViewProps}
      onPress={onToggleExpanded}
      accessibilityComponentType="button"
      accessibilityLabel={toggleExpandedButtonLabel}
    />
  );

  const RowView = expandable
    ? ExpandToggleView
    : viewProps => <View {...viewProps} />;

  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
      {...rest}
    >
      <View style={[STYLES.border, borderStyle, bannerStyle]}>
        <RowView style={rowStyle}>
          <BpkIcon style={[STYLES.icon, iconStyle]} icon={icon} small />
          <BpkText textStyle="sm" style={STYLES.message}>
            {message}
          </BpkText>
          {expandable && (
            <BpkIcon
              style={STYLES.expandIcon}
              icon={expanded ? icons['chevron-up'] : icons['chevron-down']}
              small
            />
          )}
        </RowView>
        {dismissable && (
          <BpkTouchableOverlay
            accessibilityComponentType="button"
            accessibilityLabel={dismissButtonLabel}
            onPress={onDismiss}
            style={STYLES.closeButton}
          >
            <BpkIcon icon="close" small />
          </BpkTouchableOverlay>
        )}
        {props.children && (
          <BpkAnimateHeight
            expanded={expanded}
            style={STYLES.expandableContent}
          >
            {props.children}
          </BpkAnimateHeight>
        )}
      </View>
    </AnimateAndFade>
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
  bannerStyle: ViewPropTypes.style,
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
  bannerStyle: null,
};

export default BpkBannerAlert;
