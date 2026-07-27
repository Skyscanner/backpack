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

import { cssModules } from '../../bpk-react-utils';

import useMenuTriggerFocusGuard from './useMenuTriggerFocusGuard';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuTriggerProps = {
  children: ReactNode;
  /**
   * Accessible label for the trigger button. Required when the trigger
   * contains only an icon with no visible text.
   */
  'aria-label'?: string;
  /**
   * When true, merges trigger behaviour (aria-haspopup, aria-expanded, click
   * handler) onto the child element instead of rendering a Backpack-owned
   * wrapper button.
   *
   * **Requirement:** the child must be a native DOM element or a component
   * wrapped in React.forwardRef that spreads `...rest` onto its root node.
   * Plain function components without forwardRef will silently drop the merged
   * props and the menu will not open.
   */
  asChild?: boolean;
};

const BpkContextMenuTrigger = ({
  'aria-label': ariaLabel,
  asChild = false,
  children,
}: BpkContextMenuTriggerProps) => {
  const { onBlur, onFocus } = useMenuTriggerFocusGuard();

  return (
    <Menu.Trigger
      asChild={asChild}
      aria-label={ariaLabel}
      className={asChild ? undefined : getClassName('bpk-context-menu__trigger')}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </Menu.Trigger>
  );
};

export default BpkContextMenuTrigger;
