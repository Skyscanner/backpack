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
import BpkButton from '../../packages/bpk-component-button';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import SmallLongArrowLeftIcon from '../../packages/bpk-component-icon/sm/long-arrow-left';
import { withButtonAlignment } from '../../packages/bpk-component-icon/index';
import { cssModules, isRTL } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const cls = cssModules(STYLES);

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  SmallLongArrowRightIcon,
);

const AlignedSmallLongArrowLeftIcon = withButtonAlignment(
  SmallLongArrowLeftIcon,
);

const btnNode = <BpkButton CommonProps={{ blank: false }}>Action</BpkButton>;
const btnWithOnlyIconNode = (
  <BpkButton
    className={cls('bpk-component-section-header--btn')}
    CommonProps={{ blank: false }}
  >
    <AlignedSmallLongArrowRightIcon />
  </BpkButton>
);

const DefaultExample = () => <BpkSectionHeader title="Section title" />;

const WithDescriptionExample = () => (
  <BpkSectionHeader
    title="Section title"
    description="Description about this section"
  />
);

const WithButtonExample = () => (
  <BpkSectionHeader title="Section title" button={btnNode} />
);

const FullExample = () => (
  <BpkSectionHeader
    title="Section title"
    description="Description about this section"
    button={btnNode}
  />
);

const MobileExample = () => (
  <BpkSectionHeader
    title="Section title"
    description="Description about this section"
    button={btnWithOnlyIconNode}
  />
);

export {
  DefaultExample,
  WithDescriptionExample,
  WithButtonExample,
  FullExample,
  MobileExample,
};
