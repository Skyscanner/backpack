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

import { Drawer, Portal } from '@ark-ui/react';

import { cssModules, getDataComponentAttribute } from '../../../../bpk-react-utils';

import STYLES from './BpkDrawerV2Backdrop.module.scss';

const getClassName = cssModules(STYLES);

const BpkDrawerV2Backdrop = () => (
  <Portal>
    <Drawer.Backdrop
      className={getClassName('bpk-drawer-v2__backdrop')}
      {...getDataComponentAttribute('DrawerV2Backdrop')}
    />
  </Portal>
);

export default BpkDrawerV2Backdrop;
