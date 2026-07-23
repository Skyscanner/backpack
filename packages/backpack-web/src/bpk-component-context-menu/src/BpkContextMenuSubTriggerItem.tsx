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

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuSubTriggerItemProps = {
  children: ReactNode;
  /**
   * Optional trailing element rendered on the end side of the row.
   * Typically a chevron icon to indicate a nested menu.
   */
  endIcon?: ReactNode;
};

const BpkContextMenuSubTriggerItem = ({
  children,
  endIcon,
}: BpkContextMenuSubTriggerItemProps) => (
  <Menu.TriggerItem
    className={getClassName('bpk-context-menu__item')}
    {...getDataComponentAttribute('ContextMenuSubTriggerItem')}
  >
    <span className={getClassName('bpk-context-menu__item-label')}>
      {children}
    </span>
    {endIcon && (
      <span className={getClassName('bpk-context-menu__item-end-icon')}>
        {endIcon}
      </span>
    )}
  </Menu.TriggerItem>
);

export default BpkContextMenuSubTriggerItem;
