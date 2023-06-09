// /*
//  * Backpack - Skyscanner's Design System
// *
// * Copyright 2016 Skyscanner Ltd
// *
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// *   http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// */

import BpkBottomSheet from '../../packages/bpk-component-bottom-sheet';

const DefaultExample = () => (
  <BpkBottomSheet closeButtonLabel="Close modal">
    This is a default bottom sheet. You can put anything you want in here.
  </BpkBottomSheet>
);

const WithTitleExample = () => (
  <BpkBottomSheet closeButtonLabel="Close modal" title="Bottom Sheet Title">
    This is a bottom sheet with a title. You can put anything you want in here.
  </BpkBottomSheet>
);

const WithActionExample = () => (
  <BpkBottomSheet
    closeButtonLabel="Close modal"
    actionText="Action"
    action={() => {}}
  >
    This is a bottom sheet with an action. You can put anything you want in
    here.
  </BpkBottomSheet>
);

const WithTitleAndActionExample = () => (
  <BpkBottomSheet
    closeButtonLabel="Close modal"
    title="Title"
    actionText="Action"
    action={() => {}}
  >
    This is a bottom sheet with a title and an action. You can put anything you
    want in here.
  </BpkBottomSheet>
);
const WithNoCloseButtonExample = () => (
  <BpkBottomSheet isClosable={false}>
    This is a bottom sheet without a close button. It will still close if you
    click the background. You can put anything you want in here.
  </BpkBottomSheet>
);

const WithTitleAndNoCloseButtonExample = () => (
  <BpkBottomSheet isClosable={false} title="Title">
    This is a bottom sheet without a close button. It will still close if you
    click the background. You can put anything you want in here.
  </BpkBottomSheet>
);
export {
  DefaultExample,
  WithTitleExample,
  WithActionExample,
  WithTitleAndActionExample,
  WithNoCloseButtonExample,
  WithTitleAndNoCloseButtonExample,
};
