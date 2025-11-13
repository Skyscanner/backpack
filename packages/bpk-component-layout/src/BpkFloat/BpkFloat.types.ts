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

import type { ResponsiveValue } from '../BpkBox/BpkBox.types';
import type { BpkBaseLayoutProps } from '../BpkBaseLayoutProps.types';

/**
 * Float-specific props for BpkFloat
 */
export interface BpkFloatSpecificProps {
  /**
   * The CSS float property
   */
  float?: ResponsiveValue<'left' | 'right' | 'none' | 'inherit'>;

  /**
   * The CSS clear property
   */
  clear?: ResponsiveValue<'left' | 'right' | 'both' | 'none' | 'inherit'>;
}

/**
 * Complete props interface for BpkFloat
 * Combines base layout props with Float-specific props
 */
export interface BpkFloatProps extends BpkBaseLayoutProps, BpkFloatSpecificProps {}

