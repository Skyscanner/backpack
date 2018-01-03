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

import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';

import {
  borderRadiusSm,
  colorBlue500,
  colorGray50,
  colorGray500,
  colorGreen500,
  colorRed500,
  colorYellow500,
  spacingBase,
  spacingLg,
  spacingMd,
  spacingSm,
  spacingXxl,
} from 'bpk-tokens/tokens/base.react.native';

import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';

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
  mainContainer: {
    paddingVertical: spacingBase,
    paddingHorizontal: spacingLg,
    backgroundColor: colorGray50,
    minHeight: spacingXxl + spacingBase,
    flex: 1,
  },
  dismissableContainer: {
    paddingHorizontal: spacingLg - spacingMd,
    backgroundColor: colorGray50,
    justifyContent: 'center',
  },
  childrenContainer: {
    paddingVertical: spacingSm,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
  icon: {
    paddingRight: spacingSm,
    paddingTop: spacingSm - 1,
  },
  dismissLabel: {
    color: colorBlue500,
  },
  dismissButtonContainer: {
    padding: spacingMd,
    borderRadius: borderRadiusSm,
  },
  dismissButtonContainerRadius: {
    borderRadius: borderRadiusSm,
  },
});

const ALERT_TYPE_STYLES = {
  [ALERT_TYPES.SUCCESS]: {
    iconSource: icons['tick-circle'],
    iconStyle: {
      color: colorGreen500,
    },
  },
  [ALERT_TYPES.WARN]: {
    iconSource: icons['information-circle'],
    iconStyle: {
      color: colorYellow500,
    },
  },
  [ALERT_TYPES.ERROR]: {
    iconSource: icons['information-circle'],
    iconStyle: {
      color: colorRed500,
    },
  },
  [ALERT_TYPES.NEUTRAL]: {
    iconSource: icons['information-circle'],
    iconStyle: {
      color: colorGray500,
    },
  },
};

const DismissableButton = ({ dismissButtonLabel, onDismiss }) => (
  <View style={styles.dismissableContainer}>
    <View style={styles.dismissButtonContainerRadius}>
      <TouchableNativeFeedback
        accessibilityComponentType="button"
        accessibilityLabel={dismissButtonLabel}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={onDismiss}
      >
        <View style={styles.dismissButtonContainer}>
          <BpkText textStyle="sm" emphasize style={styles.dismissLabel}>
            {dismissButtonLabel.toUpperCase()}
          </BpkText>
        </View>
      </TouchableNativeFeedback>
    </View>
  </View>
);
const ExpandableContent = ({ expanded, children }) => (
  <BpkAnimateHeight expanded={expanded}>
    <View style={styles.childrenContainer}>{children}</View>
  </BpkAnimateHeight>
);
const ExpandableIcon = ({ expanded }) => (
  <View style={styles.dismissableContainer}>
    <BpkIcon
      style={styles.icon}
      icon={expanded ? icons['chevron-up'] : icons['chevron-down']}
      small
    />
  </View>
);

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

  const mainContent = (
    <View style={styles.flexRow}>
      <View style={styles.mainContainer}>
        <View style={styles.flexRow}>
          <BpkIcon style={[styles.icon, iconStyle]} icon={iconSource} small />
          <BpkText style={styles.text} textStyle="sm">
            {message}
          </BpkText>
        </View>
        {expandable && (
          <ExpandableContent expanded={expanded}>{children}</ExpandableContent>
        )}
      </View>
      {dismissable && (
        <DismissableButton
          dismissButtonLabel={dismissButtonLabel}
          onDismiss={onDismiss}
        />
      )}
      {expandable && <ExpandableIcon expanded={expanded} />}
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
          accessibilityLabel={toggleExpandedButtonLabel}
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
  style: ViewPropTypes.style,
  toggleExpandedButtonLabel: toggleExpandedButtonLabelPropType,
};

DismissableButton.propTypes = {
  dismissButtonLabel: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

ExpandableContent.propTypes = {
  expanded: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

ExpandableIcon.propTypes = {
  expanded: PropTypes.bool.isRequired,
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
