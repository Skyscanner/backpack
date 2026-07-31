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

/* @flow strict */

import BpkDrawer from './src/BpkDrawer';
import BpkDrawerV2 from './src/BpkDrawerV2/BpkDrawerV2';
import useBpkDrawerV2 from './src/BpkDrawerV2/useBpkDrawerV2';
import useBpkDrawerV2Context from './src/BpkDrawerV2/useBpkDrawerV2Context';
import themeAttributes from './src/themeAttributes';

import type { Props } from './src/BpkDrawer';
import type { SecondaryPanelProps } from './src/types';

export type BpkDrawerProps = Props;
export type { SecondaryPanelProps };
export type { BpkDrawerV2RootProps } from './src/BpkDrawerV2/BpkDrawerV2Root';
export type { BpkDrawerV2RootProviderProps } from './src/BpkDrawerV2/BpkDrawerV2RootProvider';
export type { BpkDrawerV2TriggerProps } from './src/BpkDrawerV2/BpkDrawerV2Trigger';
export type { BpkDrawerV2SwipeAreaProps } from './src/BpkDrawerV2/BpkDrawerV2SwipeArea';
export type { BpkDrawerV2ContentProps } from './src/BpkDrawerV2/BpkDrawerV2Content/BpkDrawerV2Content';
export type { BpkDrawerV2HeaderProps } from './src/BpkDrawerV2/BpkDrawerV2Header/BpkDrawerV2Header';
export type { BpkDrawerV2TitleProps } from './src/BpkDrawerV2/BpkDrawerV2Title/BpkDrawerV2Title';
export type { BpkDrawerV2DescriptionProps } from './src/BpkDrawerV2/BpkDrawerV2Description';
export type { BpkDrawerV2BodyProps } from './src/BpkDrawerV2/BpkDrawerV2Body/BpkDrawerV2Body';
export type { BpkDrawerV2GrabberProps } from './src/BpkDrawerV2/BpkDrawerV2Grabber/BpkDrawerV2Grabber';
export type { BpkDrawerV2CloseTriggerProps } from './src/BpkDrawerV2/BpkDrawerV2CloseTrigger/BpkDrawerV2CloseTrigger';
export type {
  BpkUseDrawerV2Props,
  BpkUseDrawerV2Return,
} from './src/BpkDrawerV2/useBpkDrawerV2';
export type { BpkUseDrawerV2Context } from './src/BpkDrawerV2/useBpkDrawerV2Context';

export default BpkDrawer;
export { BpkDrawerV2, themeAttributes, useBpkDrawerV2, useBpkDrawerV2Context };
