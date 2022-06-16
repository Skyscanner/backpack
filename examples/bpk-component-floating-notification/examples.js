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

import React from 'react';

import BpkFloatingNotification, {
  THEME,
} from '../../packages/bpk-component-floating-notification';
import BpkIconHeart from '../../packages/bpk-component-icon/sm/heart';
import BpkIconInformationCircle from '../../packages/bpk-component-icon/sm/information-circle';

const DefaultExample = () => <BpkFloatingNotification text="Saved" />;

const IconExample = () => (
  <BpkFloatingNotification icon={BpkIconHeart} text="Saved" />
);

const CtaExample = () => (
  <BpkFloatingNotification ctaText="View" text="Saved" />
);

const CtaIconLongTextExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    icon={BpkIconHeart}
    text="Killer Combo saved to New York and Miami 🎉"
  />
);

const CtaIconLongTextDarkModeExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    theme={THEME.dark}
    icon={BpkIconInformationCircle}
    text="Killer Combo saved to New York and Miami 🎉"
  />
);

const VisualTestExample = () => (
  <>
    <BpkFloatingNotification text="Saved" />
    <BpkFloatingNotification icon={BpkIconHeart} text="Saved" />
    <BpkFloatingNotification ctaText="View" text="Saved" />
    <BpkFloatingNotification
      ctaText="View"
      icon={BpkIconHeart}
      text="Killer Combo saved to New York and Miami 🎉"
    />
    <BpkFloatingNotification
      ctaText="View"
      theme={THEME.dark}
      icon={BpkIconInformationCircle}
      text="Killer Combo saved to New York and Miami 🎉"
    />
  </>
);

export {
  CtaIconLongTextExample,
  CtaIconLongTextDarkModeExample,
  CtaExample,
  DefaultExample,
  IconExample,
  VisualTestExample,
};
