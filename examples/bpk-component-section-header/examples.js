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

import BpkSectionHeader from '../../packages/bpk-component-section-header';

const DefaultExample = () => <BpkSectionHeader title="Section title" />;

const WithDescriptionExample = () => (
  <BpkSectionHeader
    title="Section title"
    description="Description about this section"
  />
);

const WithButtonExample = () => (
  <BpkSectionHeader
    title="Section title"
    button={<button type="button">View more</button>}
  />
);

const FullExample = () => (
  <BpkSectionHeader
    title="Section title"
    description="Description about this section"
    button={<button type="button">View more</button>}
  />
);

export {
  DefaultExample,
  WithDescriptionExample,
  WithButtonExample,
  FullExample,
};
