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

import {
  colorBlue500,
  buttonHeight,
  buttonPaddingVertical,
  borderRadiusSm,
  spacingSm,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import { Platform, StyleSheet } from 'react-native';

const base = StyleSheet.create({
  container: {
    borderRadius: borderRadiusSm,
    height: buttonHeight,
  },
  button: {
    borderRadius: borderRadiusSm,
    height: buttonHeight,
    paddingVertical: buttonPaddingVertical,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: Platform.select({
    ios: () => ({
      color: colorBlue500,
    }),
    android: () => ({
      color: colorBlue500,
    }),
  })(),
  icon: Platform.select({
    ios: () => ({
      marginLeft: spacingSm,
    }),
    android: () => ({
      lineHeight: spacingBase,
      marginLeft: spacingSm,
    }),
  })(),
});

const modifiers = {
  iconLeading: StyleSheet.create({
    view: {
      flexDirection: 'row-reverse',
    },
    icon: {
      marginLeft: 0,
      marginRight: spacingSm,
    },
  }),
};

const themeMappings = {
  text: {
    color: 'buttonLinkTextColor',
  },
};

const styles = {
  base,
  modifiers,
  themeMappings,
};

export default styles;
