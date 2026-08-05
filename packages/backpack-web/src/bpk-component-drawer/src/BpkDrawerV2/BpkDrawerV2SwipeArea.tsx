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

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import STYLES from './BpkDrawerV2SwipeArea.module.scss';

const getClassName = cssModules(STYLES);

export type BpkDrawerV2SwipeAreaProps = Omit<
  DrawerSwipeAreaProps,
  'className' | 'style'
>;

const BpkDrawerV2SwipeArea = ({
  ...rest
}: BpkDrawerV2SwipeAreaProps) => (
  <Drawer.SwipeArea
    {...rest}
    className={getClassName('bpk-drawer-v2__swipe-area')}
    {...getDataComponentAttribute('DrawerV2SwipeArea')}
  />
);

export default BpkDrawerV2SwipeArea;
