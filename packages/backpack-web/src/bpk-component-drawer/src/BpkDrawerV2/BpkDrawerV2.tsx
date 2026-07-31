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

import BpkDrawerV2Backdrop from './BpkDrawerV2Backdrop/BpkDrawerV2Backdrop';
import BpkDrawerV2Body from './BpkDrawerV2Body/BpkDrawerV2Body';
import BpkDrawerV2CloseTrigger from './BpkDrawerV2CloseTrigger/BpkDrawerV2CloseTrigger';
import BpkDrawerV2Content from './BpkDrawerV2Content/BpkDrawerV2Content';
import BpkDrawerV2Description from './BpkDrawerV2Description';
import BpkDrawerV2Grabber from './BpkDrawerV2Grabber/BpkDrawerV2Grabber';
import BpkDrawerV2GrabberIndicator from './BpkDrawerV2Grabber/BpkDrawerV2GrabberIndicator';
import BpkDrawerV2Header from './BpkDrawerV2Header/BpkDrawerV2Header';
import BpkDrawerV2Root from './BpkDrawerV2Root';
import BpkDrawerV2RootProvider from './BpkDrawerV2RootProvider';
import BpkDrawerV2SwipeArea from './BpkDrawerV2SwipeArea';
import BpkDrawerV2Title from './BpkDrawerV2Title/BpkDrawerV2Title';
import BpkDrawerV2Trigger from './BpkDrawerV2Trigger';

const BpkDrawerV2 = {
  Root: BpkDrawerV2Root,
  RootProvider: BpkDrawerV2RootProvider,
  Trigger: BpkDrawerV2Trigger,
  SwipeArea: BpkDrawerV2SwipeArea,
  Backdrop: BpkDrawerV2Backdrop,
  Content: BpkDrawerV2Content,
  Header: BpkDrawerV2Header,
  Title: BpkDrawerV2Title,
  Description: BpkDrawerV2Description,
  Body: BpkDrawerV2Body,
  Grabber: BpkDrawerV2Grabber,
  GrabberIndicator: BpkDrawerV2GrabberIndicator,
  CloseTrigger: BpkDrawerV2CloseTrigger,
};

export default BpkDrawerV2;
