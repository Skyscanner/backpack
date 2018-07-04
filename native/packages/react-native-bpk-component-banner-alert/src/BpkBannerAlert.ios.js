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

/* @flow */

import React, { Fragment } from 'react';
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
import { StyleSheet, View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';

import {
  type Props,
  ALERT_TYPES,
  propTypes,
  defaultProps,
} from './common-types';

import AnimateAndFade from './AnimateAndFade';

const STYLES = StyleSheet.create({
  border: {
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
    paddingVertical: spacingMd - borderSizeSm,
    paddingHorizontal: spacingMd,
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
  [ALERT_TYPES.success]: {
    icon: icons['tick-circle'],
    borderStyle: STYLES.borderSuccess,
    iconStyle: STYLES.iconSuccess,
  },
  [ALERT_TYPES.warn]: {
    icon: icons['information-circle'],
    borderStyle: STYLES.borderWarn,
    iconStyle: STYLES.iconWarn,
  },
  [ALERT_TYPES.error]: {
    icon: icons['information-circle'],
    borderStyle: STYLES.borderError,
    iconStyle: STYLES.iconError,
  },
  [ALERT_TYPES.neutral]: {
    icon: icons['information-circle'],
    borderStyle: STYLES.borderNeutral,
    iconStyle: STYLES.iconNeutral,
  },
};

const BpkBannerAlert = (props: Props) => {
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

  const rowContent = (
    <Fragment>
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
    </Fragment>
  );

  return (
    <AnimateAndFade
      {...rest}
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
    >
      <View style={[STYLES.border, borderStyle, bannerStyle]}>
        {expandable ? (
          <BpkTouchableOverlay
            onPress={onToggleExpanded}
            accessibilityComponentType="button"
            accessibilityLabel={toggleExpandedButtonLabel}
            style={rowStyle}
          >
            {rowContent}
          </BpkTouchableOverlay>
        ) : (
          <View style={rowStyle}>{rowContent}</View>
        )}
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
        {expandable && (
          <BpkAnimateHeight
            expanded={expanded}
            innerStyle={STYLES.expandableContent}
          >
            {props.children}
          </BpkAnimateHeight>
        )}
      </View>
    </AnimateAndFade>
  );
};

BpkBannerAlert.propTypes = { ...propTypes };

BpkBannerAlert.defaultProps = { ...defaultProps };

export default BpkBannerAlert;
