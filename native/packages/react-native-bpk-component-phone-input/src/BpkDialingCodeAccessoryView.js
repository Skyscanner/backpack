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

import React, { type Node } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import {
  colorGray100,
  borderSizeSm,
  spacingSm,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import { type Code, type Flag } from './common-types';
import BpkFlag from './BpkFlag';

const styles = StyleSheet.create({
  accessoryView: {
    flexDirection: 'row',
    borderColor: colorGray100,
    borderBottomWidth: borderSizeSm,
    alignItems: 'center',
  },
  outerAccessoryView: {
    justifyContent: 'flex-end',
  },
  accessoryViewiOS: {
    flex: 1, // Required for the height to be correct when wrapped in BpkTouchableOverlay
  },
  flag: {
    marginEnd: spacingSm,
  },
  dialingCode: {
    marginEnd: spacingSm,
  },
  nonEditable: {
    color: colorGray100,
  },
});

type TouchableProps = {
  children: Node,
  onPress: () => mixed,
  style: ?(Object | Array<Object>),
  editable: boolean,
};

const TouchablePlatformComponent = Platform.select({
  ios: BpkTouchableOverlay,
  android: BpkTouchableNativeFeedback,
});

const Touchable = ({ editable, style, children, onPress }: TouchableProps) => {
  const accessibilityTraits = ['button'];
  const platformProps = {};

  if (Platform.OS === 'android') {
    platformProps.borderlessBackground = false;
  }

  if (!editable) {
    accessibilityTraits.push('disabled');
  }

  return (
    <TouchablePlatformComponent
      disabled={!editable}
      style={style}
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={accessibilityTraits}
      {...platformProps}
    >
      {children}
    </TouchablePlatformComponent>
  );
};

export type BpkDialingCodeAccessoryViewProps = {
  ...$Exact<Code>,
  editable: boolean,
  flag: Flag,
  onPress: () => mixed,
};

const BpkDialingCodeAccessoryView = (
  props: BpkDialingCodeAccessoryViewProps,
) => {
  const { dialingCode, flag, onPress, editable } = props;
  const dialingCodeStyle = [styles.dialingCode];
  const arrowStyles = [];
  const accessoryViewStyle = [styles.accessoryView];

  if (Platform.OS === 'ios') {
    accessoryViewStyle.push(styles.accessoryViewiOS);
  }

  if (!editable) {
    dialingCodeStyle.push(styles.nonEditable);
    arrowStyles.push(styles.nonEditable);
  }

  return (
    <Touchable
      style={styles.outerAccessoryView}
      onPress={onPress}
      editable={editable}
    >
      <View style={accessoryViewStyle}>
        <BpkFlag style={styles.flag} width={spacingBase} flag={flag} />
        <BpkText style={dialingCodeStyle} textStyle="base">
          {dialingCode}
        </BpkText>
        <BpkIcon style={arrowStyles} icon={icons['arrow-down']} small />
      </View>
    </Touchable>
  );
};

export default BpkDialingCodeAccessoryView;
