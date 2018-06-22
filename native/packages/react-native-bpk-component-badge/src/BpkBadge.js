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

import React from 'react';
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import BpkText from 'react-native-bpk-component-text';
import {
  colorGray700,
  colorGray50,
  colorYellow500,
  colorRed500,
  colorGreen500,
  colorWhite,
  borderRadiusSm,
  borderSizeSm,
  spacingSm,
  spacingMd,
} from 'bpk-tokens/tokens/base.react.native';
import { View, ViewPropTypes, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewBase: {
    paddingHorizontal: spacingMd,
    height: spacingSm * 5,
    justifyContent: 'center',
  },
  viewWarning: {
    backgroundColor: colorYellow500,
  },
  viewSuccess: {
    backgroundColor: colorGreen500,
  },
  viewDestructive: {
    backgroundColor: colorRed500,
  },
  viewLight: {
    backgroundColor: colorGray50,
  },
  viewInverse: {
    backgroundColor: colorWhite,
  },
  viewOutline: {
    paddingHorizontal: spacingMd - borderSizeSm,
    backgroundColor: setOpacity(colorWhite, 0.2),
  },
  textBase: {
    color: colorGray700,
    includeFontPadding: false,
  },
  textDestructive: {
    color: colorWhite,
  },
  textOutline: {
    color: colorWhite,
  },
  borderBase: {
    borderTopLeftRadius: borderRadiusSm,
    borderBottomLeftRadius: borderRadiusSm,
    borderTopRightRadius: borderRadiusSm,
    borderBottomRightRadius: borderRadiusSm,
  },
  borderOutline: {
    borderWidth: borderSizeSm,
    borderColor: colorWhite,
  },
  borderLeft: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: borderRadiusSm,
  },
  borderRight: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: borderRadiusSm,
    borderBottomRightRadius: 0,
  },
});

export const BADGE_TYPES = {
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  light: 'light',
  inverse: 'inverse',
  outline: 'outline',
};

export const BADGE_DOCKED_TYPES = {
  start: 'start',
  end: 'end',
};

export type Props = {
  message: string,
  type: $Keys<typeof BADGE_TYPES>,
  docked: ?$Keys<typeof BADGE_DOCKED_TYPES>,
  style: ?(Object | Array<Object>),
};

const viewStyleMap: { [key: string]: Object | Array<Object> } = {
  [BADGE_TYPES.success]: styles.viewSuccess,
  [BADGE_TYPES.warning]: styles.viewWarning,
  [BADGE_TYPES.destructive]: styles.viewDestructive,
  [BADGE_TYPES.light]: styles.viewLight,
  [BADGE_TYPES.inverse]: styles.viewInverse,
  [BADGE_TYPES.outline]: [styles.viewOutline, styles.borderOutline],
};

const textStyleMap: { [key: string]: Object | Array<Object> } = {
  [BADGE_TYPES.destructive]: styles.textDestructive,
  [BADGE_TYPES.outline]: styles.textOutline,
};

const BpkBadge = (props: Props) => {
  const { message, docked, type, style: userStyle } = props;

  const viewStyle = [styles.viewBase, styles.borderBase];
  const textStyle = [styles.textBase];

  viewStyle.push(viewStyleMap[type]);
  textStyle.push(textStyleMap[type]);

  if (docked === BADGE_DOCKED_TYPES.start) {
    viewStyle.push(styles.borderLeft);
  }

  if (docked === BADGE_DOCKED_TYPES.end) {
    viewStyle.push(styles.borderRight);
  }

  if (userStyle) {
    viewStyle.push(userStyle);
  }

  return (
    <View style={viewStyle}>
      <BpkText style={textStyle} textStyle="xs">
        {message}
      </BpkText>
    </View>
  );
};

BpkBadge.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(BADGE_TYPES)),
  docked: PropTypes.oneOf(Object.keys(BADGE_DOCKED_TYPES)),
  style: ViewPropTypes.style,
};

BpkBadge.defaultProps = {
  type: BADGE_TYPES.warning,
  docked: null,
  style: null,
};

export default BpkBadge;
