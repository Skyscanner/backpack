/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import BpkFloatingNotification from '../../packages/bpk-component-floating-notification';
import BpkIconHeart from '../../packages/bpk-component-icon/sm/heart';
import BpkIconInformationCircle from '../../packages/bpk-component-icon/sm/information-circle';

const hideAfterHack = {
  // Apply a exceptionally large number to hideAfter to effectively keep the UI around forever
  hideAfter: 2_147_483_647, // largest 32 bit signed integer, maximum value for setTimeout. Around 28 days. :)
};

const DefaultExample = () => (
  <BpkFloatingNotification text="Saved" {...hideAfterHack} />
);

const IconExample = () => (
  <BpkFloatingNotification
    icon={BpkIconHeart}
    text="Saved"
    {...hideAfterHack}
  />
);

const CtaExample = () => (
  <BpkFloatingNotification ctaText="View" text="Saved" {...hideAfterHack} />
);

const CtaIconLongTextExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    icon={BpkIconHeart}
    text="Killer Combo saved to New York and Miami 🎉"
    {...hideAfterHack}
  />
);

const VisualTestExample = () => (
  <BpkFloatingNotification
    animateOnEnter
    animateOnExit
    ctaText="View"
    {...hideAfterHack}
    icon={BpkIconInformationCircle}
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  />
);

export {
  CtaIconLongTextExample,
  CtaExample,
  DefaultExample,
  IconExample,
  VisualTestExample,
};
