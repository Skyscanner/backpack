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

import { StyleSheet } from 'react-native';
import {
  colorBlue500,
  colorGray300,
  spacingSm,
  spacingXl,
} from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  view: {
    height: spacingXl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLarge: {
    height: spacingXl + spacingSm,
  },
  viewLeading: {
    flexDirection: 'row-reverse',
  },
  text: {
    color: colorBlue500,
  },
  textDisabled: {
    color: colorGray300,
  },
  icon: {
    color: colorBlue500,
    marginLeft: spacingSm,
  },
  iconLeading: {
    marginLeft: 0,
    marginRight: spacingSm,
  },
});

export default styles;
