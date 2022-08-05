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

import React from 'react';

import BpkContentCards from '../../packages/bpk-component-content-cards';

const headerText = 'Content cards header text';
const cards = [
  {
    imageLink:
      'https://content.skyscnr.com/m/41c355bf68f93d5b/original/ST3-108-MADPT-DNSW-Q222-Social-Silver-Pitch-6.jpg',
    headline: 'Do this amazing thing number one',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ctaLink: 'https://www.skyscanner.net',
  },
  {
    imageLink:
      'https://content.skyscnr.com/m/2e070403cb8488b8/original/shutterstock_1568380735.jpg',
    headline: 'Do this amazing thing number two',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ctaLink: 'https://www.skyscanner.net',
  },
  {
    imageLink:
      'https://content.skyscnr.com/m/50d9dff3186775ad/original/Condor-Homepage-Hero-Option-3.png',
    headline: 'Do this amazing thing number three',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ctaLink: 'https://www.skyscanner.net',
  },
];

const ExampleWithOneCard = () => (
  <BpkContentCards headerText={headerText} cards={cards.slice(0, 1)} />
);

const ExampleWithTwoCards = () => (
  <BpkContentCards headerText={headerText} cards={cards.slice(0, 2)} />
);

const ExampleWithThreeCards = () => (
  <BpkContentCards headerText={headerText} cards={cards} />
);

export { ExampleWithOneCard, ExampleWithTwoCards, ExampleWithThreeCards };
