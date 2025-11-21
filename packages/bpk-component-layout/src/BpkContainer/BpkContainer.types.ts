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

import type { BpkBaseLayoutProps } from '../BpkBaseLayoutProps.types';
import type { ResponsiveValue } from '../BpkBox/BpkBox.types';

/**
 * Container-specific props for BpkContainer
 * Includes all Chakra UI Container component props
 */
export interface BpkContainerSpecificProps {
  /**
   * If `true`, container will center its children regardless of their width.
   * @default false
   */
  centerContent?: ResponsiveValue<boolean>;

  /**
   * The max-width of the container
   */
  maxW?: ResponsiveValue<string | number>;

  /**
   * The size variant of the container (from theme)
   */
  size?: ResponsiveValue<string>;
}

/**
 * Complete props interface for BpkContainer
 * Combines base layout props with Container-specific props
 */
export interface BpkContainerProps extends BpkBaseLayoutProps, BpkContainerSpecificProps {}

