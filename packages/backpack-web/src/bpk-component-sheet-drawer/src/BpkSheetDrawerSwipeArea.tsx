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

import { Drawer, type DrawerSwipeAreaProps } from '@ark-ui/react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkSheetDrawerSwipeArea.module.scss';

const getClassName = cssModules(STYLES);

export type BpkSheetDrawerSwipeAreaProps = Omit<
  DrawerSwipeAreaProps,
  'className' | 'style'
>;

const BpkSheetDrawerSwipeArea = ({
  ...rest
}: BpkSheetDrawerSwipeAreaProps) => (
  <Drawer.SwipeArea
    {...rest}
    className={getClassName('bpk-sheet-drawer__swipe-area')}
    {...getDataComponentAttribute('SheetDrawerSwipeArea')}
  />
);

export default BpkSheetDrawerSwipeArea;
