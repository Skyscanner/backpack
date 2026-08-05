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

import type { ComponentProps, ReactNode } from 'react';

import { Drawer } from '@ark-ui/react';

import { cssModules, getDataComponentAttribute } from '../../../../bpk-react-utils';

import STYLES from './BpkDrawerV2Grabber.module.scss';

const getClassName = cssModules(STYLES);

export type BpkDrawerV2GrabberProps = Omit<
  ComponentProps<typeof Drawer.Grabber>,
  'children' | 'className' | 'style'
> & {
  children?: ReactNode;
};

const BpkDrawerV2Grabber = ({
  children,
  ...rest
}: BpkDrawerV2GrabberProps) => (
  <Drawer.Grabber
    {...rest}
    className={getClassName('bpk-drawer-v2__grabber')}
    {...getDataComponentAttribute('DrawerV2Grabber')}
  >
    {children ?? <BpkDrawerV2GrabberIndicator />}
  </Drawer.Grabber>
);

const BpkDrawerV2GrabberIndicator = () => (
  <Drawer.GrabberIndicator
    className={getClassName('bpk-drawer-v2__grabber-indicator')}
    {...getDataComponentAttribute('DrawerV2GrabberIndicator')}
  />
);

export default BpkDrawerV2Grabber;
export { BpkDrawerV2GrabberIndicator };
