/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withButtonAlignment, withLargeButtonAlignment, withRtlSupport } from '../bpk-component-icon';
import SmallLongArrowRightIcon from '../bpk-component-icon/sm/long-arrow-right';
import LargeLongArrowRightIcon from '../bpk-component-icon/lg/long-arrow-right';
import BpkButton from './index';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(withRtlSupport(SmallLongArrowRightIcon));
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(withRtlSupport(LargeLongArrowRightIcon));

storiesOf('bpk-component-button', module)
  .add('Primary', () => (
    <div>
      &nbsp;<BpkButton onClick={action('primary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton selected onClick={action('primary selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton large onClick={action('large primary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large selected onClick={action('large primary selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Secondary', () => (
    <div>
      &nbsp;<BpkButton secondary onClick={action('secondary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton secondary selected onClick={action('secondary selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton secondary disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton secondary large onClick={action('large secondary clicked')}>Button</BpkButton>
      &nbsp;<BpkButton
        secondary
        large
        selected
        onClick={action('large secondary selected clicked')}
      >
        Selected
            </BpkButton>
      &nbsp;<BpkButton secondary large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Destructive', () => (
    <div>
      &nbsp;<BpkButton destructive onClick={action('destructive clicked')}>Button</BpkButton>
      &nbsp;<BpkButton destructive disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton destructive large onClick={action('large destructive clicked')}>Button</BpkButton>
      &nbsp;<BpkButton destructive large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Link button', () => (
    <div>
      &nbsp;<BpkButton link onClick={action('link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton link selected onClick={action('link button selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton link disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton link large onClick={action('large link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton link large selected onClick={action('large link button selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton link large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Featured', () => (
    <div>
      &nbsp;<BpkButton featured onClick={action('featured button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton featured selected onClick={action('featured button selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton featured disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
      &nbsp;<BpkButton featured large onClick={action('featured button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton featured large selected onClick={action('featured button selected clicked')}>Selected</BpkButton>
      &nbsp;<BpkButton featured large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkButton>
    </div>
  ))
  .add('Icon-only button', () => (
    <div>
      <div>
        <BpkButton iconOnly onClick={action('iconOnly button clicked')}>
          <AlignedSmallLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly secondary onClick={action('iconOnly button secondary clicked')}>
          <AlignedSmallLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly destructive onClick={action('iconOnly button destructive clicked')}>
          <AlignedSmallLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly selected onClick={action('iconOnly button selected clicked')}>
          <AlignedSmallLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
          <AlignedSmallLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly featured onClick={action('iconOnly button featured clicked')}>
          <AlignedSmallLongArrowRightIcon />
        </BpkButton>&nbsp;
      </div>
      <div>
        <BpkButton iconOnly large onClick={action('large iconOnly button clicked')}>
          <AlignedLargeLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large secondary onClick={action('large iconOnly button secondary clicked')}>
          <AlignedLargeLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large destructive onClick={action('large iconOnly button destructive clicked')}>
          <AlignedLargeLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large selected onClick={action('large iconOnly button selected clicked')}>
          <AlignedLargeLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
          <AlignedLargeLongArrowRightIcon />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large featured onClick={action('large iconOnly button featured clicked')}>
          <AlignedLargeLongArrowRightIcon />
        </BpkButton>&nbsp;
      </div>
    </div>
  ))
  .add('Mixture', () => (
    <div>
      &nbsp;<BpkButton onClick={action('primary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton secondary onClick={action('secondary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton destructive onClick={action('destructive button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton link onClick={action('link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton featured onClick={action('featured button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large onClick={action('primary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large secondary onClick={action('secondary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large destructive onClick={action('destructive button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large link onClick={action('link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large featured onClick={action('featured button clicked')}>Button</BpkButton>
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      &nbsp;<BpkButton href="#" onClick={action('primary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" secondary onClick={action('secondary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" destructive onClick={action('destructive anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" link onClick={action('link anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" featured onClick={action('featured anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large onClick={action('primary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large secondary onClick={action('secondary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large destructive onClick={action('destructive anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large link onClick={action('link anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large featured onClick={action('featured anchor clicked')}>Button</BpkButton>
    </div>
  ));
