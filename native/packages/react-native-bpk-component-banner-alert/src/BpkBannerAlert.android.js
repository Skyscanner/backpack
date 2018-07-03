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
  spacingMd,
  spacingBase,
  spacingLg,
  colorRed500,
  colorGray50,
  colorGray500,
  colorGreen500,
  colorYellow500,
  borderRadiusSm,
} from 'bpk-tokens/tokens/base.react.native';
import { StyleSheet, View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkButtonLink from 'react-native-bpk-component-button-link';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';

import {
  type Props,
  ALERT_TYPES,
  commonPropTypes,
  commonDefaultProps,
} from './common-types';

import AnimateAndFade from './AnimateAndFade';

const STYLES = StyleSheet.create({
  background: {
    // required for AnimateAndFade to work correctly :/
    minHeight: 1, // eslint-disable-line backpack/use-tokens
    borderRadius: borderRadiusSm,
    backgroundColor: colorGray50,
  },
  row: {
    minHeight: spacingBase * 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacingLg,
    paddingVertical: spacingMd,
  },
  icon: {
    marginEnd: spacingMd,
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
    marginStart: spacingMd,
  },
  expandIcon: {
    marginStart: spacingMd,
  },
  expandableContent: {
    paddingBottom: spacingBase,
    paddingHorizontal: spacingLg,
  },
});

const ALERT_TYPE_STYLES = {
  [ALERT_TYPES.success]: {
    icon: icons['tick-circle'],
    iconStyle: STYLES.iconSuccess,
  },
  [ALERT_TYPES.warn]: {
    icon: icons['information-circle'],
    iconStyle: STYLES.iconWarn,
  },
  [ALERT_TYPES.error]: {
    icon: icons['information-circle'],
    iconStyle: STYLES.iconError,
  },
  [ALERT_TYPES.neutral]: {
    icon: icons['information-circle'],
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
    bannerStyle,
    animateOnEnter,
    animateOnLeave,
    children,
    ...rest
  } = props;

  const expandable = children !== null;
  const { icon, iconStyle } = ALERT_TYPE_STYLES[type] || {};

  const rowContent = (
    <Fragment>
      <BpkIcon style={[STYLES.icon, iconStyle]} icon={icon} small />
      <BpkText style={STYLES.message} textStyle="sm">
        {message}
      </BpkText>
      {expandable && (
        <BpkIcon
          style={STYLES.expandIcon}
          icon={expanded ? icons['chevron-up'] : icons['chevron-down']}
          small
        />
      )}
      {dismissable && (
        <BpkButtonLink
          style={STYLES.closeButton}
          title={dismissButtonLabel}
          onPress={onDismiss}
        />
      )}
    </Fragment>
  );

  return (
    <AnimateAndFade
      animateOnEnter={animateOnEnter}
      animateOnLeave={dismissable || animateOnLeave}
      show={show}
      {...rest}
    >
      <View style={[STYLES.background, bannerStyle]}>
        {expandable ? (
          <BpkTouchableNativeFeedback
            onPress={onToggleExpanded}
            accessibilityComponentType="button"
            accessibilityLabel={toggleExpandedButtonLabel}
          >
            <View style={STYLES.row}>{rowContent}</View>
          </BpkTouchableNativeFeedback>
        ) : (
          <View style={STYLES.row}>{rowContent}</View>
        )}
        {expandable && (
          <BpkAnimateHeight
            expanded={expanded}
            innerStyle={STYLES.expandableContent}
          >
            {children}
          </BpkAnimateHeight>
        )}
      </View>
    </AnimateAndFade>
  );
};

BpkBannerAlert.propTypes = commonPropTypes;

BpkBannerAlert.defaultProps = commonDefaultProps;

export default BpkBannerAlert;
