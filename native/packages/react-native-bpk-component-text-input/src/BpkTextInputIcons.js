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
import { StyleSheet, I18nManager } from 'react-native';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import {
  colorRed500,
  colorGreen500,
  spacingSm,
} from 'bpk-tokens/tokens/base.react.native';

// Required so that it appears in the same place as the clear button.
// TODO put these into tokens because this isn't so nice.
const iconPlacement = I18nManager.isRTL ? 9 : spacingSm * 1.5;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: iconPlacement,
  },
  valid: {
    color: colorGreen500,
  },
  invalid: {
    color: colorRed500,
  },
});

const ValidIcon = () => (
  <BpkIcon icon={icons.tick} small style={[styles.icon, styles.valid]} />
);

const InvalidIcon = () => (
  <BpkIcon
    icon={icons['exclamation-circle']}
    small
    style={[styles.icon, styles.invalid]}
  />
);

export { ValidIcon, InvalidIcon };
