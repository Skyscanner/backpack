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

import {
  CONTEXT_MENU_ITEM_VARIANTS,
  type BpkContextMenuItemVariant,
} from './common-types';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuItemProps = {
  children: ReactNode;
  /**
   * Unique value for this item — required by Ark UI. Passed back to
   * onSelect handlers so consumers can identify the selected item.
   */
  value: string;
  /**
   * Optional icon rendered on the start (left) side of the row.
   * Typically used for action items (e.g. `+` for "Plan a new trip").
   */
  startIcon?: ReactNode;
  /**
   * Optional icon rendered on the end (right) side of the row.
   * Typically used for indicators such as a chevron on a sub-menu trigger.
   */
  endIcon?: ReactNode;
  variant?: BpkContextMenuItemVariant;
  disabled?: boolean;
  /** Fires when the item is activated by pointer or keyboard. */
  onSelect?: () => void;
};

const BpkContextMenuItem = ({
  children,
  disabled = false,
  endIcon,
  onSelect,
  startIcon,
  value,
  variant = CONTEXT_MENU_ITEM_VARIANTS.default,
}: BpkContextMenuItemProps) => (
  <Menu.Item
    value={value}
    disabled={disabled}
    onSelect={onSelect}
    className={getClassName(
      'bpk-context-menu__item',
      variant === CONTEXT_MENU_ITEM_VARIANTS.destructive &&
        'bpk-context-menu__item--destructive',
    )}
    {...getDataComponentAttribute('ContextMenuItem')}
  >
    {startIcon && (
      <span className={getClassName('bpk-context-menu__item-icon')}>
        {startIcon}
      </span>
    )}
    <span className={getClassName('bpk-context-menu__item-label')}>
      {children}
    </span>
    {endIcon && (
      <span className={getClassName('bpk-context-menu__item-end-icon')}>
        {endIcon}
      </span>
    )}
  </Menu.Item>
);

export default BpkContextMenuItem;
