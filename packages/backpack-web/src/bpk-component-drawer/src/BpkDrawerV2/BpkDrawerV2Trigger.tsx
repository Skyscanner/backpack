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

import type { ReactElement, ReactNode } from 'react';

import { Drawer } from '@ark-ui/react';

import { getDataComponentAttribute } from '../../../bpk-react-utils';

type BpkDrawerV2TriggerBaseProps = {
  value?: string;
};

type BpkDrawerV2TriggerWithAsChildProps = BpkDrawerV2TriggerBaseProps & {
  asChild: true;
  children: ReactElement;
};

type BpkDrawerV2TriggerWithoutAsChildProps = BpkDrawerV2TriggerBaseProps & {
  asChild?: false;
  children: ReactNode;
};

export type BpkDrawerV2TriggerProps =
  | BpkDrawerV2TriggerWithAsChildProps
  | BpkDrawerV2TriggerWithoutAsChildProps;

const BpkDrawerV2Trigger = ({
  asChild,
  children,
  value,
}: BpkDrawerV2TriggerProps) => (
  <Drawer.Trigger
    asChild={asChild}
    value={value}
    {...getDataComponentAttribute('DrawerV2Trigger')}
  >
    {children}
  </Drawer.Trigger>
);

export default BpkDrawerV2Trigger;
