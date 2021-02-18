/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import React from 'react';

import BpkCard from './index';

const textContent = `It's your world and we'll help you explore it. Find the best prices across millions of flights, hotels and car hire options to create your perfect trip.`;

const DefaultExample = () => <BpkCard>{textContent}</BpkCard>;

const WithHrefExample = () => (
  <BpkCard href="https://skyscanner.net">
    Pressing this card will open https://skyscanner.net.
  </BpkCard>
);

const WithoutPaddingExample = () => (
  <BpkCard padded={false}>{textContent}</BpkCard>
);

export { DefaultExample, WithHrefExample, WithoutPaddingExample };
