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

import React from 'react';

import BpkPrice, { SIZES, ALIGNS } from '../../packages/bpk-component-price';

const SmallLeftExample = () => <BpkPrice title="£1,830" />;

const SmallLeftWithDescriptionExample = () => (
  <BpkPrice title="£1,830" description="a night" />
);

const SmallLeftWithSubtitleDescriptionExample = () => (
  <BpkPrice subtitle="£209" title="£1,830" description="a night" />
);

const SmallRightExample = () => (
  <BpkPrice title="£1,830" align={ALIGNS.right} />
);

const SmallRightWithDescriptionExample = () => (
  <BpkPrice title="£1,830" description="a night" align={ALIGNS.right} />
);

const SmallRightWithSubtitleDescriptionExample = () => (
  <BpkPrice
    subtitle="£209"
    title="£1,830"
    description="a night"
    align={ALIGNS.right}
  />
);

const LargeLeftExample = () => <BpkPrice size={SIZES.large} title="£1,830" />;

const LargeLeftWithDescriptionExample = () => (
  <BpkPrice size={SIZES.large} title="£1,830" description="a night" />
);

const LargeLeftWithSubtitleDescriptionExample = () => (
  <BpkPrice
    size={SIZES.large}
    subtitle="£209"
    title="£1,830"
    description="a night"
  />
);

const LargeLeftLongPriceExample = () => (
  // eslint-disable-next-line backpack/use-tokens
  <div style={{ width: 184 }}>
    <BpkPrice
      size={SIZES.large}
      subtitle="£209"
      title="£1,830,123,123"
      description="a night"
    />
    <BpkPrice
      size={SIZES.large}
      subtitle="£209"
      title="ZK 20,309"
      description="a night"
    />
  </div>
);

const MixedExample = () => (
  <div>
    <SmallLeftExample />
    <SmallLeftWithDescriptionExample />
    <SmallLeftWithSubtitleDescriptionExample />
    <SmallRightExample />
    <SmallRightWithDescriptionExample />
    <SmallRightWithSubtitleDescriptionExample />
    <LargeLeftExample />
    <LargeLeftWithDescriptionExample />
    <LargeLeftWithSubtitleDescriptionExample />
    <LargeLeftLongPriceExample />
  </div>
);

export {
  SmallLeftExample,
  SmallLeftWithDescriptionExample,
  SmallLeftWithSubtitleDescriptionExample,
  SmallRightExample,
  SmallRightWithDescriptionExample,
  SmallRightWithSubtitleDescriptionExample,
  LargeLeftExample,
  LargeLeftWithDescriptionExample,
  LargeLeftWithSubtitleDescriptionExample,
  LargeLeftLongPriceExample,
  MixedExample,
};
