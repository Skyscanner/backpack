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

import BpkPrice, { SIZES } from '../../packages/bpk-component-price';

const SmallExample = () => <BpkPrice layout={SIZES.small} title="£1,830" />;

const SmallWithDescriptionExample = () => (
  <BpkPrice layout={SIZES.small} title="£1,830" description="/ night" />
);

const SmallWithSubtitleDescriptionExample = () => (
  <BpkPrice
    layout={SIZES.small}
    subtitle="£209"
    title="£1,830"
    description="/ night"
  />
);

const LargeExample = () => <BpkPrice layout={SIZES.large} title="£1,830" />;

const LargeWithDescriptionExample = () => (
  <BpkPrice layout={SIZES.large} title="£1,830" description="/ night" />
);

const LargeWithSubtitleDescriptionExample = () => (
  <BpkPrice
    layout={SIZES.large}
    subtitle="£209"
    title="£1,830"
    description="/ night"
  />
);

const MixedExample = () => (
  <div>
    <SmallExample />
    <SmallWithDescriptionExample />
    <SmallWithSubtitleDescriptionExample />
    <LargeExample />
    <LargeWithDescriptionExample />
    <LargeWithSubtitleDescriptionExample />
  </div>
);

export {
  SmallExample,
  SmallWithDescriptionExample,
  SmallWithSubtitleDescriptionExample,
  LargeExample,
  LargeWithDescriptionExample,
  LargeWithSubtitleDescriptionExample,
  MixedExample,
};
