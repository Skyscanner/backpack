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
   * Optional trailing element rendered on the end side of the row.
   * Typically an icon (e.g. `+` for "Plan a new trip", bookmark for
   * "Quick save", chevron for a nested menu entry point).
   */
  endIcon?: ReactNode;
  variant?: BpkContextMenuItemVariant;
  disabled?: boolean;
  onClick?: () => void;
};

const BpkContextMenuItem = ({
  children,
  disabled = false,
  endIcon,
  onClick,
  value,
  variant = CONTEXT_MENU_ITEM_VARIANTS.default,
}: BpkContextMenuItemProps) => (
    <Menu.Item
      value={value}
      disabled={disabled}
      onClick={onClick}
      className={getClassName(
        'bpk-context-menu__item',
        variant === CONTEXT_MENU_ITEM_VARIANTS.destructive &&
          'bpk-context-menu__item--destructive',
      )}
      {...getDataComponentAttribute('ContextMenuItem')}
    >
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
