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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkContextMenu.module.scss';

const getClassName = cssModules(STYLES);

export type BpkContextMenuItemGroupProps = {
  children: ReactNode;
};

// role="group" gives screen readers group-boundary announcements.
// Menu.ItemGroup is intentionally avoided here: it auto-generates an id and
// sets aria-labelledby, which would dangle without a paired ItemGroupLabel.
// The current design uses visual separators rather than labelled groups, so
// a plain role="group" div is the correct semantic choice.
const BpkContextMenuItemGroup = ({
  children,
}: BpkContextMenuItemGroupProps) => (
  <div role="group" className={getClassName('bpk-context-menu__item-group')}>
    {children}
  </div>
);

export default BpkContextMenuItemGroup;
