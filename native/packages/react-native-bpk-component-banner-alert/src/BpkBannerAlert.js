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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import AnimateAndFade from './AnimateAndFade';

import { dismissablePropType } from './customPropTypes';

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

class BpkBannerAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      dismissed: false,
    };

    this.onToggleExpanded = this.onToggleExpanded.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ dismissed: true });
    if (this.props.onAction !== null) {
      this.props.onAction();
    }
  }

  onToggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
    if (this.props.onAction !== null) {
      this.props.onAction();
    }
  }

  render() {
    const {
      type,
      message,
      onAction,
      dismissable,
      animateOnEnter,
      actionButtonLabel,
      style,
      children,
      ...rest
    } = this.props;

    const outerStyle = [styles.outerContainer];
    const contentPaddedStyle = [styles.bannerContainerPadded];
    const expandedChildContainer = [styles.expandedChildContainer];
    const { iconSource, outerStyle: outerStyleForType, iconStyle } = ALERT_TYPE_STYLES[type] || {};

    const expandable = children !== null;
    const show = !this.state.dismissed;

    outerStyle.push(outerStyleForType);
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
            icon={this.state.expanded ? 'chevron-up' : 'chevron-down'}
            small
          />
        )}
      </View>
    );

    return (
      <AnimateAndFade style={style} animateOnEnter={animateOnEnter} animateOnLeave show={show}>
        <View style={outerStyle} {...rest} >
          <View style={styles.bannerContainer} >
            {expandable ? (
              <TouchableHighlight
                accessibilityComponentType="button"
                onPress={this.onToggleExpanded}
                underlayColor={underlayColor}
                accessibilityLabel={actionButtonLabel}
                style={styles.bannerContainer}
              >
                {banner}
              </TouchableHighlight>
               ) : banner}
            {dismissable && (
            <TouchableHighlight
              accessibilityComponentType="button"
              onPress={this.onDismiss}
              underlayColor={underlayColor}
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
          <BpkAnimateHeight expanded={this.state.expanded}>
            <View style={expandedChildContainer}>{this.props.children}</View>
          </BpkAnimateHeight>
        </View>
      </AnimateAndFade>
    );
  }
}

BpkBannerAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(ALERT_TYPES).map(key => ALERT_TYPES[key])).isRequired,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  dismissable: dismissablePropType,
  animateOnEnter: PropTypes.bool,
  onAction: PropTypes.func,
  actionButtonLabel: PropTypes.string,
};

BpkBannerAlert.defaultProps = {
  children: null,
  style: null,
  dismissable: false,
  animateOnEnter: false,
  onAction: () => null,
  actionButtonLabel: null,
};

export default BpkBannerAlert;
