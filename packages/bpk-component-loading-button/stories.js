import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { withButtonAlignment, withLargeButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import BaggageIconSm from 'bpk-component-icon/sm/baggage';
import BaggageIconLg from 'bpk-component-icon/lg/baggage';

import BpkLoadingButton from './index';

storiesOf('bpk-component-loading-button', module)
  .add('Primary', () => (
    <div>
      &nbsp;
      <BpkLoadingButton onClick={action('primary clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton selected onClick={action('primary selected clicked')}>Selected</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>&nbsp;

      &nbsp;
      <BpkLoadingButton large onClick={action('large primary clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large selected onClick={action('large primary selected clicked')}>Selected</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>
    </div>
  ))
  .add('Secondary', () => (
    <div>
      &nbsp;
      <BpkLoadingButton secondary onClick={action('secondary clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton secondary selected onClick={action('secondary selected clicked')}>Selected</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton secondary disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton secondary loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>&nbsp;

      &nbsp;
      <BpkLoadingButton secondary large onClick={action('large secondary clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        secondary
        large
        selected
        onClick={action('large secondary selected clicked')}
      >
        Selected
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton secondary large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton secondary large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>
    </div>
  ))
  .add('Destructive', () => (
    <div>
      <BpkLoadingButton destructive onClick={action('destructive clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton destructive disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton destructive loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>&nbsp;

      &nbsp;
      <BpkLoadingButton destructive large onClick={action('large destructive clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        destructive
        large
        disabled
        onClick={action('THIS SHOULD NOT HAPPEN')}
      >
        Disabled
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton destructive large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>
    </div>
  ))
  .add('Link button', () => (
    <div>
      <BpkLoadingButton link onClick={action('link button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link selected onClick={action('link button selected clicked')}>Selected</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link large onClick={action('large link button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        link large selected onClick={action('large link button selected clicked')}
      >Selected</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>
    </div>
  ))
  .add('Featured', () => (
    <div>
      <BpkLoadingButton featured onClick={action('featured button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        featured
        selected
        onClick={action('featured button selected clicked')}
      >Selected</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton featured disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton featured loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>&nbsp;

      &nbsp;
      <BpkLoadingButton featured large onClick={action('featured button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        featured large selected onClick={action('featured button selected clicked')}
      >Selected</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton featured large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>Disabled</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton featured large loading onClick={action('THIS SHOULD NOT HAPPEN')}>Loading</BpkLoadingButton>
    </div>
  ))
  .add('Icon-only button', () => (
    <div>
      <BpkLoadingButton iconOnly onClick={action('iconOnly button clicked')} />&nbsp;
      <BpkLoadingButton iconOnly secondary onClick={action('iconOnly button secondary clicked')} />&nbsp;
      <BpkLoadingButton iconOnly destructive onClick={action('iconOnly button destructive clicked')} />&nbsp;
      <BpkLoadingButton iconOnly selected onClick={action('iconOnly button selected clicked')} />&nbsp;
      <BpkLoadingButton iconOnly disabled onClick={action('THIS SHOULD NOT HAPPEN')} />&nbsp;
      <BpkLoadingButton iconOnly loading onClick={action('THIS SHOULD NOT HAPPEN')} />&nbsp;
      <BpkLoadingButton iconOnly featured onClick={action('iconOnly button featured clicked')} />&nbsp;

      &nbsp;<BpkLoadingButton iconOnly large onClick={action('large iconOnly button clicked')} />&nbsp;
      <BpkLoadingButton iconOnly large secondary onClick={action('large iconOnly button secondary clicked')} />&nbsp;
      <BpkLoadingButton iconOnly large destructive onClick={action('large iconOnly button destructive clicked')} />
      &nbsp;
      <BpkLoadingButton iconOnly large selected onClick={action('large iconOnly button selected clicked')} />&nbsp;
      <BpkLoadingButton iconOnly large disabled onClick={action('THIS SHOULD NOT HAPPEN')} />&nbsp;
      <BpkLoadingButton iconOnly large loading onClick={action('THIS SHOULD NOT HAPPEN')} />&nbsp;
      <BpkLoadingButton iconOnly large featured onClick={action('large iconOnly button featured clicked')} />&nbsp;
    </div>
  ))
  .add('Mixture', () => (
    <div>
      <BpkLoadingButton onClick={action('primary button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton secondary onClick={action('secondary button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton destructive onClick={action('destructive button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link onClick={action('link button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton featured onClick={action('featured button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton iconOnly onClick={action('iconOnly button clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>&nbsp;

      &nbsp;
      <BpkLoadingButton large onClick={action('primary button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large secondary onClick={action('secondary button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large destructive onClick={action('destructive button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large link onClick={action('link button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large featured onClick={action('featured button clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton iconOnly large onClick={action('large iconOnly button clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      <BpkLoadingButton href="#" onClick={action('primary anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" secondary onClick={action('secondary anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" destructive onClick={action('destructive anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" link onClick={action('link anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" featured onClick={action('featured anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" iconOnly onClick={action('iconOnly anchor clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>&nbsp;

      &nbsp;
      <BpkLoadingButton href="#" large onClick={action('primary anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" large secondary onClick={action('secondary anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        href="#" large destructive onClick={action('destructive anchor clicked')}
      >Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" large link onClick={action('link anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" large featured onClick={action('featured anchor clicked')}>Button</BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton href="#" large iconOnly onClick={action('iconOnly anchor clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
    </div>
  ))
  .add('Custom Icon', () => {
    const AlignedIconSm = withButtonAlignment(withRtlSupport(BaggageIconSm));
    const iconSm = <AlignedIconSm />;

    const AlignedIconLg = withLargeButtonAlignment(withRtlSupport(BaggageIconLg));
    const iconLg = <AlignedIconLg />;

    return (<div>
      <BpkLoadingButton icon={iconSm} onClick={action('primary clicked')}>Button</BpkLoadingButton>
      &nbsp;<BpkLoadingButton
        selected iconSelected={iconSm} onClick={action('primary selected clicked')}
      >Selected</BpkLoadingButton>
      &nbsp;<BpkLoadingButton
        disabled iconDisabled={iconSm} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Disabled</BpkLoadingButton>
      &nbsp;<BpkLoadingButton
        loading iconLoading={iconSm} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Loading</BpkLoadingButton>
      &nbsp;<BpkLoadingButton iconOnly icon={iconSm} onClick={action('iconOnly clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>&nbsp;

      &nbsp;<BpkLoadingButton
        large icon={iconLg} onClick={action('large primary clicked')}
      >Button</BpkLoadingButton>
      &nbsp;<BpkLoadingButton
        large selected iconSelected={iconLg} onClick={action('large primary selected clicked')}
      >Selected</BpkLoadingButton>
      &nbsp;<BpkLoadingButton
        large disabled iconDisabled={iconLg} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Disabled</BpkLoadingButton>
      &nbsp;<BpkLoadingButton
        large loading iconLoading={iconLg} onClick={action('THIS SHOULD NOT HAPPEN')}
      >Loading</BpkLoadingButton>
      &nbsp;<BpkLoadingButton large iconOnly icon={iconLg} onClick={action('large iconOnly clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
    </div>);
  });
