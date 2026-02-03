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
// @ts-nocheck

import BpkBackgroundImage from './src/BpkBackgroundImage';
import BpkImage from './src/BpkImage';
import BORDER_RADIUS_STYLES from './src/BpkImageBorderRadiusStyles';
import withLazyLoading from './src/withLazyLoading';
import withLoadingBehavior from './src/withLoadingBehavior';

import type { BpkBackgroundImageProps } from './src/BpkBackgroundImage';

export type { BpkBackgroundImageProps };

export default BpkImage;
export {
  BpkBackgroundImage,
  withLazyLoading,
  withLoadingBehavior,
  BORDER_RADIUS_STYLES,
};
