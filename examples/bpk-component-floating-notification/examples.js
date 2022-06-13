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

import BpkFloatingNotification from '../../packages/bpk-component-floating-notification';

const DefaultExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    icon
    text="Saved"
  ></BpkFloatingNotification>
);

const DarkModeExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    darkMode
    icon
    text="Saved"
  ></BpkFloatingNotification>
);

const LongTextExample = () => (
  <BpkFloatingNotification
    ctaText="View"
    icon
    text="Killer Combo saved to New York and Miami 🎉"
  ></BpkFloatingNotification>
);

const NoCTAExample = () => (
  <BpkFloatingNotification icon text="Saved" ></BpkFloatingNotification>
);

const NoCTALongTextExample = () => (
  <BpkFloatingNotification icon text="Killer Combo saved to New York and Miami 🎉" ></BpkFloatingNotification>
);

const NoIconExample = () => (
  <BpkFloatingNotification ctaText="View" text="Saved"></BpkFloatingNotification>
);

const OnlyTextExample = () => (
  <BpkFloatingNotification text="Saved"></BpkFloatingNotification>
);

export { DefaultExample, DarkModeExample, LongTextExample, NoCTAExample, NoCTALongTextExample, NoIconExample, OnlyTextExample };
