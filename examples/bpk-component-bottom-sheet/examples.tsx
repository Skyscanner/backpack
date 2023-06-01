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

import BpkBottomSheet from '../../packages/bpk-component-bottom-sheet';
import { action } from '../../packages/bpk-storybook-utils';

const DefaultExample = () => (
  <BpkBottomSheet closeButtonLabel="Close">
    This is a default bottom sheet with a close button and accessible label. You
    can put anything you want in here.
  </BpkBottomSheet>
);

const WithTitleExample = () => (
  <BpkBottomSheet title="Ratings" closeButtonLabel="Close">
    This is a bottom sheet with a title, a close button with accessible label.
    You can put anything you want in here.
  </BpkBottomSheet>
);

const WithActionExample = () => (
  <BpkBottomSheet
    actionText="Ratings"
    action={action('Whatever you want')}
    closeButtonLabel="Close"
  >
    This is a bottom sheet with an action & action text, a close button with
    accessible label. You can put anything you want in here.
  </BpkBottomSheet>
);

const WithTitleAndActionExample = () => (
  <BpkBottomSheet
    title="Ratings"
    actionText="Reviews"
    action={action('Whatever you want')}
    closeButtonLabel="Close"
  >
    This is a bottom sheet with a title & action & action text, a close button
    with accessible label. You can put anything you want in here.
  </BpkBottomSheet>
);

const WithNoCloseButtonExample = () => (
  <BpkBottomSheet isClosable={false}>
    This is a bottom sheet that has no close button. You can put anything you
    want in here.
  </BpkBottomSheet>
);

export {
  DefaultExample,
  WithTitleExample,
  WithActionExample,
  WithTitleAndActionExample,
  WithNoCloseButtonExample,
};
