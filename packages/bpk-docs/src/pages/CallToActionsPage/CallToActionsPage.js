import React from 'react';
import BpkCtaButton from 'bpk-component-cta-button';
import BpkParagraph from 'bpk-component-paragraph';
import { BpkCode } from 'bpk-component-code';
import { alignToButton, alignToLargeButton } from 'bpk-component-icon';

import TestBpkSmallBaggageIcon from 'bpk-component-icon/sm/baggage';
import TestBpkLargeBaggageIcon from 'bpk-component-icon/lg/baggage';
import TestBpkSmallFlagIcon from 'bpk-component-icon/sm/flag';
import TestBpkLargeFlagIcon from 'bpk-component-icon/lg/flag';
import TestBpkSmallCafeIcon from 'bpk-component-icon/sm/cafe';
import TestBpkLargeCafeIcon from 'bpk-component-icon/lg/cafe';
import TestBpkSmallLightningIcon from 'bpk-component-icon/sm/lightning';
import TestBpkLargeLightningIcon from 'bpk-component-icon/lg/lightning';

import ctaButtonReadme from 'bpk-component-cta-button/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const AlignedBpkSmallBaggageIcon = alignToButton(TestBpkSmallBaggageIcon);
const AlignedBpkLargeBaggageIcon = alignToLargeButton(TestBpkLargeBaggageIcon);
const AlignedBpkSmallFlagIcon = alignToButton(TestBpkSmallFlagIcon);
const AlignedBpkLargeFlagIcon = alignToLargeButton(TestBpkLargeFlagIcon);
const AlignedBpkSmallLightningIcon = alignToButton(TestBpkSmallLightningIcon);
const AlignedBpkLargeLightningIcon = alignToLargeButton(TestBpkLargeLightningIcon);
const AlignedBpkSmallCafeIcon = alignToButton(TestBpkSmallCafeIcon);
const AlignedBpkLargeCafeIcon = alignToLargeButton(TestBpkLargeCafeIcon);

const iconSmallBaggage = <AlignedBpkSmallBaggageIcon />;
const iconLargeBaggage = <AlignedBpkLargeBaggageIcon />;
const iconSmallFlag = <AlignedBpkSmallFlagIcon />;
const iconLargeFlag = <AlignedBpkLargeFlagIcon />;
const iconSmallLightning = <AlignedBpkSmallLightningIcon />;
const iconLargeLightning = <AlignedBpkLargeLightningIcon />;
const iconSmallCafe = <AlignedBpkSmallCafeIcon />;
const iconLargeCafe = <AlignedBpkLargeCafeIcon />;

const components = [
  {
    id: 'primary',
    title: 'Primary',
    blurb: [
      <BpkParagraph>
        The Backpack primary call to action is available in two sizes and comes with styles for hover, active,
        disabled and selected states.
      </BpkParagraph>,
    ],
    examples: [
      <BpkCtaButton>Primary</BpkCtaButton>,
      ' ',
      <BpkCtaButton selected>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton loading>Loading</BpkCtaButton>,
      <br />,
      <br />,
      <BpkCtaButton large>Primary</BpkCtaButton>,
      ' ',
      <BpkCtaButton large selected>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton large disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton large loading>Loading</BpkCtaButton>,
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    blurb: [
      <BpkParagraph>
        Similar to the primary call to action, the secondary version is available in two sizes and comes with styles for
        hover, active, disabled and selected states.
      </BpkParagraph>,
    ],
    examples: [
      <BpkCtaButton secondary>Secondary</BpkCtaButton>,
      ' ',
      <BpkCtaButton secondary selected>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton secondary disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton secondary loading>Loading</BpkCtaButton>,
      <br />,
      <br />,
      <BpkCtaButton large secondary>Secondary</BpkCtaButton>,
      ' ',
      <BpkCtaButton large secondary selected>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton large secondary disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton large secondary loading>Loading</BpkCtaButton>,
    ],
  },
  {
    id: 'featured',
    title: 'Featured',
    blurb: [
      <BpkParagraph>
        This call to action is reserved for featured buttons.
      </BpkParagraph>,
    ],
    examples: [
      <BpkCtaButton featured>Featured</BpkCtaButton>,
      ' ',
      <BpkCtaButton featured selected>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton featured disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton featured loading>Loading</BpkCtaButton>,
      <br />,
      <br />,
      <BpkCtaButton large featured>Featured</BpkCtaButton>,
      ' ',
      <BpkCtaButton large featured selected>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton large featured disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton large featured loading>Loading</BpkCtaButton>,
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    blurb: 'This call to action can be used to highlight destructive actions.',
    examples: [
      <BpkCtaButton destructive>Destructive</BpkCtaButton>,
      ' ',
      <BpkCtaButton destructive disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton destructive loading>Loading</BpkCtaButton>,
      <br />,
      <br />,
      <BpkCtaButton large destructive>Destructive</BpkCtaButton>,
      ' ',
      <BpkCtaButton large destructive disabled>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton large destructive loading>Loading</BpkCtaButton>,
    ],
  },
  {
    id: 'icon-only',
    title: 'Icon-only call to actions',
    blurb: [
      <BpkParagraph>
        Call to actions may contain only an icon (without visible text), which is useful for small screen sizes.
      </BpkParagraph>,
    ],
    examples: [
      <BpkCtaButton iconOnly>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton iconOnly secondary>
        <span className="visually-hidden">Help</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton iconOnly destructive>
        <span className="visually-hidden">Delete</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton iconOnly disabled>
        <span className="visually-hidden">Disabled</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton iconOnly loading>
        <span className="visually-hidden">Loading</span>
      </BpkCtaButton>,
      <br />,
      <br />,
      <BpkCtaButton large iconOnly>
        <span className="visually-hidden">Search</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton large iconOnly secondary>
        <span className="visually-hidden">Help</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton large iconOnly destructive>
        <span className="visually-hidden">Delete</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton large iconOnly disabled>
        <span className="visually-hidden">Disabled</span>
      </BpkCtaButton>,
      ' ',
      <BpkCtaButton large iconOnly loading>
        <span className="visually-hidden">Loading</span>
      </BpkCtaButton>,
    ],
  },
  {
    id: 'custom-icons',
    title: 'Custom icons',
    blurb: [
      <BpkParagraph>
        Call to actions can have custom icons for the <BpkCode>enabled</BpkCode>, <BpkCode>selected</BpkCode> and
        <BpkCode>disabled</BpkCode> states.
      </BpkParagraph>,
    ],
    examples: [
      <BpkCtaButton icon={iconSmallBaggage}>Primary</BpkCtaButton>,
      ' ',
      <BpkCtaButton selected iconSelected={iconSmallFlag}>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton disabled iconDisabled={iconSmallLightning}>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton loading iconLoading={iconSmallCafe}>Loading</BpkCtaButton>,
      <br />,
      <br />,
      <BpkCtaButton large icon={iconLargeBaggage}>Primary</BpkCtaButton>,
      ' ',
      <BpkCtaButton large selected iconSelected={iconLargeFlag}>Selected</BpkCtaButton>,
      ' ',
      <BpkCtaButton large disabled iconDisabled={iconLargeLightning}>Disabled</BpkCtaButton>,
      ' ',
      <BpkCtaButton large loading iconLoading={iconLargeCafe}>Loading</BpkCtaButton>,
    ],
  },
];

const CallToActionsPage = () => <DocsPageBuilder
  title="Call to actions"
  blurb={[
    <BpkParagraph>
      On this page you’ll find examples and information on how to use the cta-button (call to action) button component.
      If you provide an href, an anchor tag is rendered instead.
    </BpkParagraph>,
    <BpkParagraph>
      Call to action buttons have as default icons <BpkCode>long-arrow-right</BpkCode> when the button is enabled,
      selected or disabled and <BpkCode>BpkSpinner</BpkCode> when the button is loading. Any of these icons can
      be changed.
    </BpkParagraph>,
  ]}
  components={components}
  readme={ctaButtonReadme}
  sassdocId="buttons"
/>;

export default CallToActionsPage;
