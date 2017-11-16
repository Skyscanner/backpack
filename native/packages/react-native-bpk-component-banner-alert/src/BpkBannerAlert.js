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
  Platform,
  StyleSheet,
  ViewPropTypes,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import {
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
  underlayColor,
  underlayOpacity,
} from 'bpk-tokens/tokens/base.react.native';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';

import { dismissablePropType } from './customPropTypes';

// Slight darkness to use when buttons are pressed in.
const underlay = Platform.select({
  ios: () => setOpacity(underlayColor, underlayOpacity),
  android: () => null,
})();

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
  buttonExpand: {
    color: colorGray700,
  },
  buttonClose: {
    color: colorGray500,
  },
});

const ALERT_TYPE_STYLES = {
  [ALERT_TYPES.SUCCESS]: {
    iconSource: 'tick-circle',
    outerStyle: styles.outerContainerSuccess,
    iconStyle: styles.iconSuccess,
  },
  [ALERT_TYPES.WARN]: {
    iconSource: 'information-circle',
    outerStyle: styles.outerContainerWarn,
    iconStyle: styles.iconWarn,
  },
  [ALERT_TYPES.ERROR]: {
    iconSource: 'information-circle',
    outerStyle: styles.outerContainerError,
    iconStyle: styles.iconError,
  },
  [ALERT_TYPES.NEUTRAL]: {
    iconSource: 'information-circle',
    outerStyle: styles.outerContainerNeutral,
    iconStyle: styles.iconNeutral,
  },
};

const BpkBannerAlert = (props) => {
  const {
    type,
    message,
    onAction,
    dismissable,
    expanded,
    actionButtonLabel,
    style,
    children,
    ...rest
  } = props;

  const expandable = children !== null;

  const outerStyle = [styles.outerContainer];
  const contentPaddedStyle = [styles.bannerContainerPadded];
  const expandedChildContainer = [styles.expandedChildContainer];
  const { iconSource, outerStyle: outerStyleForType, iconStyle } = ALERT_TYPE_STYLES[type] || {};

  outerStyle.push(outerStyleForType);
  if (style) { outerStyle.push(style); }
  if (dismissable) { contentPaddedStyle.push(styles.bannerContainerPaddedDismissable); }

  const banner = (
    <View style={[contentPaddedStyle]}>
      <BpkIcon
        style={iconStyle}
        icon={iconSource}
        small
      />
      <BpkText textStyle="sm" style={styles.text}>{message}</BpkText>
      {expandable && (
        <BpkIcon
          style={styles.buttonExpand}
          icon={expanded ? 'chevron-up' : 'chevron-down'}
          small
        />
      )}
    </View>
  );

  return (
    <View style={outerStyle} {...rest} >
      <View style={styles.bannerContainer} >
        {expandable ? (
          <TouchableHighlight
            accessibilityComponentType="button"
            onPress={onAction}
            underlayColor={underlay}
            accessibilityLabel={actionButtonLabel}
            style={styles.bannerContainer}
          >
            {banner}
          </TouchableHighlight>
        ) : banner}
        {dismissable && (
          <TouchableHighlight
            accessibilityComponentType="button"
            onPress={onAction}
            underlayColor={underlay}
            accessibilityLabel={actionButtonLabel}
            style={styles.closeButtonContainer}
          >
            <View>
              <BpkIcon
                style={styles.buttonClose}
                icon="close"
                small
              />
            </View>
          </TouchableHighlight>
        )}
      </View>
      <BpkAnimateHeight expanded={expanded}>
        <View style={expandedChildContainer}>{props.children}</View>
      </BpkAnimateHeight>
    </View>
  );
};

BpkBannerAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(ALERT_TYPES).map(key => ALERT_TYPES[key])).isRequired,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  dismissable: dismissablePropType,
  expanded: PropTypes.bool,
  onAction: PropTypes.func,
  actionButtonLabel: PropTypes.string,
};

BpkBannerAlert.defaultProps = {
  children: null,
  style: null,
  dismissable: false,
  expanded: false,
  onAction: () => null,
  actionButtonLabel: null,
};

export default BpkBannerAlert;
