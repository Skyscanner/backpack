import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { withButtonAlignment, withLargeButtonAlignment } from 'bpk-component-icon';
import BaggageIconSm from 'bpk-component-icon/sm/baggage';
import BaggageIconLg from 'bpk-component-icon/lg/baggage';

import BpkCtaButton from './index';

storiesOf('bpk-component-cta-button', module)
  .add('Primary', () => (
    <div>
      &nbsp;<BpkCtaButton onClick={action('primary clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton selected onClick={action('primary selected clicked')}>Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton large onClick={action('large primary clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton large selected onClick={action('large primary selected clicked')}>Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>
    </div>
  ))
  .add('Secondary', () => (
    <div>
      &nbsp;<BpkCtaButton secondary onClick={action('secondary clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton secondary selected onClick={action('secondary selected clicked')}>Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton secondary disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton secondary loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton secondary large onClick={action('large secondary clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton
        secondary
        large
        selected
        onClick={action('large secondary selected clicked')}
      >
        Selected
      </BpkCtaButton>
      &nbsp;<BpkCtaButton secondary large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton secondary large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>
    </div>
  ))
  .add('Destructive', () => (
    <div>
      &nbsp;<BpkCtaButton destructive onClick={action('destructive clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton destructive disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton destructive loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton destructive large onClick={action('large destructive clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton destructive large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton destructive large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>
    </div>
  ))
  .add('Link button', () => (
    <div>
      &nbsp;<BpkCtaButton link onClick={action('link button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton link selected onClick={action('link button selected clicked')}>Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton link disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton link loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>
      &nbsp;<BpkCtaButton link large onClick={action('large link button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton
        link large selected onClick={action('large link button selected clicked')}
      >Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton link large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton link large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>
    </div>
  ))
  .add('Featured', () => (
    <div>
      &nbsp;<BpkCtaButton featured onClick={action('featured button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton featured selected onClick={action('featured button selected clicked')}>Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton featured disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton featured loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton featured large onClick={action('featured button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton
        featured large selected onClick={action('featured button selected clicked')}
      >Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton featured large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton featured large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkCtaButton>
    </div>
  ))
  .add('Icon-only button', () => (
    <div>
      <BpkCtaButton iconOnly onClick={action('iconOnly button clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly secondary onClick={action('iconOnly button secondary clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly destructive onClick={action('iconOnly button destructive clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly selected onClick={action('iconOnly button selected clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly loading onClick={action('THIS SHOULD NOT HAPPEN')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly featured onClick={action('iconOnly button featured clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton iconOnly large onClick={action('large iconOnly button clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly large secondary onClick={action('large iconOnly button secondary clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly large destructive onClick={action('large iconOnly button destructive clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly large selected onClick={action('large iconOnly button selected clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly large loading onClick={action('THIS SHOULD NOT HAPPEN')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
      <BpkCtaButton iconOnly large featured onClick={action('large iconOnly button featured clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;
    </div>
  ))
  .add('Mixture', () => (
    <div>
      <BpkCtaButton onClick={action('primary button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton secondary onClick={action('secondary button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton destructive onClick={action('destructive button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton link onClick={action('link button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton featured onClick={action('featured button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton iconOnly onClick={action('iconOnly button clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton large onClick={action('primary button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton large secondary onClick={action('secondary button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton large destructive onClick={action('destructive button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton large link onClick={action('link button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton large featured onClick={action('featured button clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton iconOnly large onClick={action('large iconOnly button clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      <BpkCtaButton href="#" onClick={action('primary anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" secondary onClick={action('secondary anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" destructive onClick={action('destructive anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" link onClick={action('link anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" featured onClick={action('featured anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" iconOnly onClick={action('iconOnly anchor clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton href="#" large onClick={action('primary anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" large secondary onClick={action('secondary anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton
        href="#" large destructive onClick={action('destructive anchor clicked')}
      >Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" large link onClick={action('link anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" large featured onClick={action('featured anchor clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton href="#" large iconOnly onClick={action('iconOnly anchor clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>
    </div>
  ))
  .add('Custom Icon', () => {
    const AlignedIconSm = withButtonAlignment(BaggageIconSm);
    const iconSm = <AlignedIconSm />;

    const AlignedIconLg = withLargeButtonAlignment(BaggageIconLg);
    const iconLg = <AlignedIconLg />;

    return (<div>
      &nbsp;<BpkCtaButton icon={iconSm} onClick={action('primary clicked')}>Button</BpkCtaButton>
      &nbsp;<BpkCtaButton
        selected iconSelected={iconSm} onClick={action('primary selected clicked')}
      >Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton
        disabled iconDisabled={iconSm} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton
        loading iconLoading={iconSm} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Loading</BpkCtaButton>
      &nbsp;<BpkCtaButton iconOnly icon={iconSm} onClick={action('iconOnly clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>&nbsp;

      &nbsp;<BpkCtaButton
        large icon={iconLg} onClick={action('large primary clicked')}
      >Button</BpkCtaButton>
      &nbsp;<BpkCtaButton
        large selected iconSelected={iconLg} onClick={action('large primary selected clicked')}
      >Selected</BpkCtaButton>
      &nbsp;<BpkCtaButton
        large disabled iconDisabled={iconLg} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Disabled</BpkCtaButton>
      &nbsp;<BpkCtaButton
        large loading iconLoading={iconLg} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Loading</BpkCtaButton>
      &nbsp;<BpkCtaButton large iconOnly icon={iconLg} onClick={action('large iconOnly clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>
    </div>);
  });
