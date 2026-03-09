/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { BpkDialogWrapper } from './src/BpkDialogWrapper/BpkDialogWrapper';
import Portal from './src/Portal';
import TransitionInitialMount from './src/TransitionInitialMount';
import cssModules from './src/cssModules';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import deprecated from './src/deprecated';
import {
  isDeviceIphone,
  isDeviceIpad,
  isDeviceIos,
} from './src/deviceDetection';
import { getDataComponentAttribute } from './src/getDataComponentAttribute';
import isRTL from './src/isRTL';
import { setNativeValue } from './src/nativeEventHandler';
import { SURFACE_COLORS } from './src/surfaceColors';
import withDefaultProps from './src/withDefaultProps';
import wrapDisplayName from './src/wrapDisplayName';

export type { SurfaceBgColor } from './src/surfaceColors';
export {
  Portal,
  TransitionInitialMount,
  cssModules,
  deprecated,
  withDefaultProps,
  wrapDisplayName,
  isDeviceIphone,
  isDeviceIpad,
  isDeviceIos,
  isRTL,
  BpkDialogWrapper,
  setNativeValue,
  getDataComponentAttribute,
  SURFACE_COLORS,
};
export default {
  Portal,
  TransitionInitialMount,
  cssModules,
  deprecated,
  withDefaultProps,
  wrapDisplayName,
  isDeviceIphone,
  isDeviceIpad,
  isDeviceIos,
  isRTL,
  BpkDialogWrapper,
  setNativeValue,
  getDataComponentAttribute,
  SURFACE_COLORS,
};
