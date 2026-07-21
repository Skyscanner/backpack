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

import BpkSheetDrawerBackdrop from './BpkSheetDrawerBackdrop/BpkSheetDrawerBackdrop';
import BpkSheetDrawerBody from './BpkSheetDrawerBody/BpkSheetDrawerBody';
import BpkSheetDrawerCloseTrigger from './BpkSheetDrawerCloseTrigger/BpkSheetDrawerCloseTrigger';
import BpkSheetDrawerContent from './BpkSheetDrawerContent/BpkSheetDrawerContent';
import BpkSheetDrawerDescription from './BpkSheetDrawerDescription';
import BpkSheetDrawerGrabber from './BpkSheetDrawerGrabber/BpkSheetDrawerGrabber';
import BpkSheetDrawerGrabberIndicator from './BpkSheetDrawerGrabber/BpkSheetDrawerGrabberIndicator';
import BpkSheetDrawerHeader from './BpkSheetDrawerHeader/BpkSheetDrawerHeader';
import BpkSheetDrawerRoot from './BpkSheetDrawerRoot';
import BpkSheetDrawerRootProvider from './BpkSheetDrawerRootProvider';
import BpkSheetDrawerSwipeArea from './BpkSheetDrawerSwipeArea';
import BpkSheetDrawerTitle from './BpkSheetDrawerTitle/BpkSheetDrawerTitle';
import BpkSheetDrawerTrigger from './BpkSheetDrawerTrigger';

const BpkSheetDrawer = {
  Root: BpkSheetDrawerRoot,
  RootProvider: BpkSheetDrawerRootProvider,
  Trigger: BpkSheetDrawerTrigger,
  SwipeArea: BpkSheetDrawerSwipeArea,
  Backdrop: BpkSheetDrawerBackdrop,
  Content: BpkSheetDrawerContent,
  Header: BpkSheetDrawerHeader,
  Title: BpkSheetDrawerTitle,
  Description: BpkSheetDrawerDescription,
  Body: BpkSheetDrawerBody,
  Grabber: BpkSheetDrawerGrabber,
  GrabberIndicator: BpkSheetDrawerGrabberIndicator,
  CloseTrigger: BpkSheetDrawerCloseTrigger,
};

export default BpkSheetDrawer;
