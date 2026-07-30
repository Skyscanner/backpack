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

import { Menu } from '@ark-ui/react';

import HeartOutlineIcon from '../../bpk-component-icon/lg/heart--outline';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import useMenuTriggerFocusGuard from './useMenuTriggerFocusGuard';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuSaveTriggerProps = {
  /** Accessible label for the button. Required. */
  'aria-label': string;
};

const BpkContextMenuSaveTrigger = ({
  'aria-label': ariaLabel,
}: BpkContextMenuSaveTriggerProps) => {
  const { onBlur, onFocus } = useMenuTriggerFocusGuard();

  return (
    <Menu.Trigger
      aria-label={ariaLabel}
      className={getClassName('bpk-context-menu__save-trigger')}
      onFocus={onFocus}
      onBlur={onBlur}
      {...getDataComponentAttribute('ContextMenuSaveTrigger')}
    >
      <HeartOutlineIcon />
    </Menu.Trigger>
  );
};

export default BpkContextMenuSaveTrigger;
