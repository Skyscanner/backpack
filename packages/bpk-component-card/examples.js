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

import React, { Fragment } from 'react';
import BpkLink from 'bpk-component-link';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';

import BpkCard from './index';

const shortContent = 'Book your next trip on skyscanner.net.';

const longContent = (
  <Fragment>
    <BpkText tagName="h3" textStyle={TEXT_STYLES.lg}>
      Let&#39;s explore
    </BpkText>
    <BpkText tagName="p">
      It&#39;s your world and we&#39;ll help you explore it. Find the best
      prices across millions of flights, hotels and car hire options to create
      your perfect trip.
      <br />
      <BpkLink href="http://www.skyscanner.net/">Go to Skyscanner</BpkLink>
    </BpkText>
  </Fragment>
);

const DefaultExample = () => (
  <BpkCard onClick={() => window.open('https://www.skyscanner.net/')}>
    {shortContent}
  </BpkCard>
);

const WithHrefExample = () => (
  <BpkCard href="https://skyscanner.net">{shortContent}</BpkCard>
);

const WithoutPaddingExample = () => (
  <BpkCard
    padded={false}
    onClick={() => window.open('https://www.skyscanner.net/')}
  >
    {shortContent}
  </BpkCard>
);

const NonAtomicExample = () => (
  <BpkCard
    atomic={false}
    onClick={() => window.open('https://www.skyscanner.net/')}
  >
    {longContent}
  </BpkCard>
);

const NonAtomicHrefExample = () => (
  <BpkCard atomic={false} href="https://www.skyscanner.net/">
    {longContent}
  </BpkCard>
);

export {
  DefaultExample,
  WithHrefExample,
  WithoutPaddingExample,
  NonAtomicExample,
  NonAtomicHrefExample,
};
