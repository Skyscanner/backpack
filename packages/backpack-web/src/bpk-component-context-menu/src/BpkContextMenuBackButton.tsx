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

import { withRtlSupport } from '../../bpk-component-icon';
import ChevronLeftIconBase from '../../bpk-component-icon/sm/chevron-left';
import { cssModules } from '../../bpk-react-utils';

import { useBpkContextMenuNav } from './BpkContextMenuNavContext';
import useMenuTriggerFocusGuard from './useMenuTriggerFocusGuard';

import STYLES from './BpkContextMenu.module.scss';

const ChevronLeftIcon = withRtlSupport(ChevronLeftIconBase);

const getClassName = cssModules(STYLES);

export type BpkContextMenuBackButtonProps = {
  /** Accessible label and visible text for the back button. Defaults to "Back". */
  label?: string;
};

const ROOT_PANEL = 'root';

const BpkContextMenuBackButton = ({
  label = 'Back',
}: BpkContextMenuBackButtonProps) => {
  const nav = useBpkContextMenuNav();
  const { onBlur, onFocus } = useMenuTriggerFocusGuard();

  return (
    <Menu.Context>
      {(api) => (
        <Menu.Item
          value="_back"
          closeOnSelect={false}
          onSelect={() => {
            if (nav && nav.activePanel !== ROOT_PANEL) {
              nav.goBack();
            } else {
              api.setOpen(false);
            }
          }}
          className={getClassName('bpk-context-menu__back-button')}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <span className={getClassName('bpk-context-menu__back-button-icon')}>
            <ChevronLeftIcon />
          </span>
          {label}
        </Menu.Item>
      )}
    </Menu.Context>
  );
};

export default BpkContextMenuBackButton;
