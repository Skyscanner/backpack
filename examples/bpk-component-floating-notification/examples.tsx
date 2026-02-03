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
// @ts-nocheck

import BpkFloatingNotification from '../../packages/bpk-component-floating-notification';
import BpkIconHeart from '../../packages/bpk-component-icon/sm/heart';
import BpkIconInformationCircle from '../../packages/bpk-component-icon/sm/information-circle';

const DefaultExample = () => (
  <BpkFloatingNotification text="Saved" hideAfter={8000} />
);

const IconExample = () => (
  <BpkFloatingNotification icon={BpkIconHeart} text="Saved" hideAfter={8000} />
);

const CtaExample = () => (
  <BpkFloatingNotification ctaText="View" text="Saved" hideAfter={8000} />
);

const CtaIconLongTextExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    icon={BpkIconHeart}
    text="Killer Combo saved to New York and Miami 🎉"
    hideAfter={8000}
  />
);

const VisualTestExample = () => (
  <BpkFloatingNotification
    animateOnEnter
    animateOnExit
    ctaText="View"
    // Apply a exceptionally large number to hideAfter to effectively keep the UI around forever
    // largest 32 bit signed integer, maximum value for setTimeout. Around 28 days. :)
    hideAfter={2_147_483_647}
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
