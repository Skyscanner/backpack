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

import type { ReactNode } from 'react';

import { Menu } from '@ark-ui/react';

import { getDataComponentAttribute } from '../../bpk-react-utils';

import type {
  BpkContextMenuOpenChangeDetails,
  BpkContextMenuSelectionDetails,
} from './common-types';

export type BpkContextMenuRootProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (details: BpkContextMenuOpenChangeDetails) => void;
  onSelect?: (details: BpkContextMenuSelectionDetails) => void;
  open?: boolean;
};

const BpkContextMenuRoot = ({
  children,
  defaultOpen,
  onOpenChange,
  onSelect,
  open,
}: BpkContextMenuRootProps) => (
  <Menu.Root
    defaultOpen={defaultOpen}
    onOpenChange={onOpenChange}
    onSelect={onSelect}
    open={open}
    unmountOnExit
    {...getDataComponentAttribute('ContextMenu')}
  >
    {children}
  </Menu.Root>
);

export default BpkContextMenuRoot;
