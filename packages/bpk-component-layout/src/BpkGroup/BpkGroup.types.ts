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

/**
 * Group-specific props for BpkGroup
 * Group uses flexbox props from base layout, no additional specific props needed
 */
export interface BpkGroupSpecificProps {
  // Group doesn't have specific props beyond base layout props
  // It uses flexbox props from BpkBaseLayoutProps
}

/**
 * Complete props interface for BpkGroup
 * Combines base layout props with Group-specific props
 */
export interface BpkGroupProps extends BpkBaseLayoutProps, BpkGroupSpecificProps {}

