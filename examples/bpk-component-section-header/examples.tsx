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

import { BpkButtonV2 } from '../../packages/bpk-component-button';
import { withButtonAlignment } from '../../packages/bpk-component-icon/index';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import BpkSectionHeader, {
  SECTION_TYPES,
} from '../../packages/bpk-component-section-header';
import { cssModules } from '../../packages/bpk-react-utils';

import * as STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  SmallLongArrowRightIcon,
);

const btnNode = <BpkButtonV2>Action</BpkButtonV2>;
const btnWithOnlyIconNode = (
  <BpkButtonV2 iconOnly>
    <AlignedSmallLongArrowRightIcon />
  </BpkButtonV2>
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

const WithOnDarkExample = () => (
  <div className={getClassName('bpk-section-header-examples__on-dark')}>
    <BpkSectionHeader
      title="Section title"
      description="Description about this section"
      type={SECTION_TYPES.onDark}
    />
  </div>
);

const MobileExample = () => (
  <BpkSectionHeader
    title="Section title"
    description="Description about this section"
    button={btnWithOnlyIconNode}
  />
);

const MixedExample = () => (
  <div className={getClassName('bpk-section-header-examples__mixed')}>
    <DefaultExample />
    <WithDescriptionExample />
    <WithOnDarkExample />
    <FullExample />
    <MobileExample />
  </div>
);

export {
  DefaultExample,
  WithDescriptionExample,
  WithButtonExample,
  FullExample,
  MobileExample,
  MixedExample,
  WithOnDarkExample,
};
