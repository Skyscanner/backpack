import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import TOKENS from '../bpk-tokens/tokens/base.common';
import { withButtonAlignment, withLargeButtonAlignment } from '../bpk-component-icon';
import SmallLongArrowRightIcon from '../bpk-component-icon/sm/long-arrow-right';
import LargeLongArrowRightIcon from '../bpk-component-icon/lg/long-arrow-right';
import BpkButton from './index';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(SmallLongArrowRightIcon);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(LargeLongArrowRightIcon);

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
          <AlignedSmallLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly secondary onClick={action('iconOnly button secondary clicked')}>
          <AlignedSmallLongArrowRightIcon fill={TOKENS.buttonSecondaryColor} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly selected onClick={action('iconOnly button selected clicked')}>
          <AlignedSmallLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
          <AlignedSmallLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly featured onClick={action('iconOnly button featured clicked')}>
          <AlignedSmallLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
      </div>
      <div>
        <BpkButton iconOnly large onClick={action('large iconOnly button clicked')}>
          <AlignedLargeLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large secondary onClick={action('large iconOnly button secondary clicked')}>
          <AlignedLargeLongArrowRightIcon fill={TOKENS.buttonSecondaryColor} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large selected onClick={action('large iconOnly button selected clicked')}>
          <AlignedLargeLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
          <AlignedLargeLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
        <BpkButton iconOnly large featured onClick={action('large iconOnly button featured clicked')}>
          <AlignedLargeLongArrowRightIcon fill={TOKENS.colorWhite} />
        </BpkButton>&nbsp;
      </div>
    </div>
  ))
  .add('Mixture', () => (
    <div>
      &nbsp;<BpkButton onClick={action('primary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton secondary onClick={action('secondary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton link onClick={action('link button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton featured onClick={action('featured button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large onClick={action('primary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large secondary onClick={action('secondary button clicked')}>Button</BpkButton>
      &nbsp;<BpkButton large link onClick={action('link button clicked')}>Button</BpkButton>
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      &nbsp;<BpkButton href="#" onClick={action('primary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" secondary onClick={action('secondary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" link onClick={action('link anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" featured onClick={action('featured anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large onClick={action('primary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large secondary onClick={action('secondary anchor clicked')}>Button</BpkButton>
      &nbsp;<BpkButton href="#" large link onClick={action('link anchor clicked')}>Button</BpkButton>
    </div>
  ));
