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

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import STYLES from './BpkSheetDrawerContent.module.scss';

const getClassName = cssModules(STYLES);

export type BpkSheetDrawerContentProps = Omit<
  ComponentProps<typeof Drawer.Content>,
  'children' | 'className' | 'style'
> & {
  children: ReactNode;
};

const BpkSheetDrawerContent = ({
  children,
  draggable = true,
  ...rest
}: BpkSheetDrawerContentProps) => (
  <Drawer.Positioner
    className={getClassName('bpk-sheet-drawer__positioner')}
    {...getDataComponentAttribute('SheetDrawerPositioner')}
  >
    <Drawer.Content
      {...rest}
      className={getClassName('bpk-sheet-drawer__content')}
      draggable={draggable}
      {...getDataComponentAttribute('SheetDrawerContent')}
    >
      {children}
    </Drawer.Content>
  </Drawer.Positioner>
);

export default BpkSheetDrawerContent;
