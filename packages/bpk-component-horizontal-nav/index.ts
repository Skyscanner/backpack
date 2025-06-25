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
/* @flow strict */

import BpkHorizontalNav, {
  HORIZONTAL_NAV_TYPES,
  type Props as NavProps,
} from './src/BpkHorizontalNav';
import BpkHorizontalNavItem, {
  type Props as ItemProps,
  themeAttributes,
} from './src/BpkHorizontalNavItem';

export type BpkHorizontalNavProps = NavProps;
export type BpkHorizontalNavItemProps = ItemProps;
export { HORIZONTAL_NAV_TYPES, BpkHorizontalNavItem, themeAttributes };
export default BpkHorizontalNav;
