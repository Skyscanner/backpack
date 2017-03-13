import React from 'react';
import BpkButton from 'bpk-component-button';
import BpkParagraph from 'bpk-component-paragraph';
import { colors, buttons } from 'bpk-tokens/tokens/base.es6';
import { BpkSpinner, BpkLargeSpinner } from 'bpk-component-spinner';
import { alignToButton, alignToLargeButton } from 'bpk-component-icon';
import TestBpkSmallArrowIcon from 'bpk-component-icon/sm/long-arrow-right';
import TestBpkLargeArrowIcon from 'bpk-component-icon/lg/long-arrow-right';
import TestBpkSmallTrashIcon from 'bpk-component-icon/sm/trash';
import TestBpkLargeTrashIcon from 'bpk-component-icon/lg/trash';
import TestBpkSmallHelpIcon from 'bpk-component-icon/sm/help';
import TestBpkLargeHelpIcon from 'bpk-component-icon/lg/help';

import buttonReadme from 'bpk-component-button/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const AlignedBpkSmallArrowIcon = alignToButton(TestBpkSmallArrowIcon);
const AlignedBpkLargeArrowIcon = alignToLargeButton(TestBpkLargeArrowIcon);
const AlignedBpkSmallTrashIcon = alignToButton(TestBpkSmallTrashIcon);
const AlignedBpkLargeTrashIcon = alignToLargeButton(TestBpkLargeTrashIcon);
const AlignedBpkSmallHelpIcon = alignToButton(TestBpkSmallHelpIcon);
const AlignedBpkLargeHelpIcon = alignToLargeButton(TestBpkLargeHelpIcon);

const components = [
  {
    id: 'primary',
    title: 'Primary',
    blurb: [
      <BpkParagraph>
        The Backpack primary button is available in two sizes and comes with styles for hover, active, disabled and
        selected states.
      </BpkParagraph>,
    ],
    examples: [
      <BpkButton>Primary</BpkButton>,
      ' ',
      <BpkButton selected>Selected</BpkButton>,
      ' ',
      <BpkButton disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large>Primary</BpkButton>,
      ' ',
      <BpkButton large selected>Selected</BpkButton>,
      ' ',
      <BpkButton large disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary',
    blurb: [
      <BpkParagraph>
        Similar to the primary button, the secondary version is available in two sizes and comes with styles for
        hover, active, disabled and selected states.
      </BpkParagraph>,
    ],
    examples: [
      <BpkButton secondary>Secondary</BpkButton>,
      ' ',
      <BpkButton secondary selected>Selected</BpkButton>,
      ' ',
      <BpkButton secondary disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large secondary>Secondary</BpkButton>,
      ' ',
      <BpkButton large secondary selected>Selected</BpkButton>,
      ' ',
      <BpkButton large secondary disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'direct-booking',
    title: 'Direct Booking',
    blurb: [
      <BpkParagraph>
        This button is reserved for sending users to the direct booking form.
      </BpkParagraph>,
    ],
    examples: [
      <BpkButton directBooking>DiBoo</BpkButton>,
      ' ',
      <BpkButton directBooking selected>Selected</BpkButton>,
      ' ',
      <BpkButton directBooking disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large directBooking>DiBoo</BpkButton>,
      ' ',
      <BpkButton large directBooking selected>Selected</BpkButton>,
      ' ',
      <BpkButton large directBooking disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    blurb: 'This button can be used to highlight destructive actions.',
    examples: [
      <BpkButton destructive>Destructive</BpkButton>,
      ' ',
      <BpkButton destructive disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton large destructive>Destructive</BpkButton>,
      ' ',
      <BpkButton large destructive disabled>Disabled</BpkButton>,
    ],
  },
  {
    id: 'icons-and-spinners',
    title: 'Icons & spinners',
    blurb: [
      <BpkParagraph>
        All buttons support nesting icons and spinners, which is useful for improving affordance or indicate loading.
      </BpkParagraph>,
    ],
    examples: [
      <BpkButton>
        Primary <AlignedBpkSmallArrowIcon fill={colors.colorWhite} />
      </BpkButton>,
      ' ',
      <BpkButton>
        Primary <BpkSpinner fill={colors.colorWhite} alignToButton />
      </BpkButton>,
      <br />,
      <br />,
      <BpkButton large>
        Primary <AlignedBpkLargeArrowIcon fill={colors.colorWhite} />
      </BpkButton>,
      ' ',
      <BpkButton large>
        Primary <BpkLargeSpinner fill={colors.colorWhite} alignToButton />
      </BpkButton>,
    ],
  },
  {
    id: 'icon-only',
    title: 'Icon-only buttons',
    blurb: [
      <BpkParagraph>
        Buttons may contain only an icon (without visible text), which is useful for small screen sizes.
      </BpkParagraph>,
    ],
    examples: [
      <BpkButton iconOnly>
        <AlignedBpkSmallArrowIcon fill={colors.colorWhite} />
        <span className="visually-hidden">Search</span>
      </BpkButton>,
      ' ',
      <BpkButton iconOnly secondary>
        <AlignedBpkSmallHelpIcon fill={buttons.buttonSecondaryColor} />
        <span className="visually-hidden">Help</span>
      </BpkButton>,
      ' ',
      <BpkButton iconOnly destructive>
        <AlignedBpkSmallTrashIcon fill={buttons.buttonDestructiveColor} />
        <span className="visually-hidden">Delete</span>
      </BpkButton>,
      <br />,
      <br />,
      <BpkButton large iconOnly>
        <AlignedBpkLargeArrowIcon fill={colors.colorWhite} />
        <span className="visually-hidden">Search</span>
      </BpkButton>,
      ' ',
      <BpkButton large iconOnly secondary>
        <AlignedBpkLargeHelpIcon fill={buttons.buttonSecondaryColor} />
        <span className="visually-hidden">Help</span>
      </BpkButton>,
      ' ',
      <BpkButton large iconOnly destructive>
        <AlignedBpkLargeTrashIcon fill={buttons.buttonDestructiveColor} />
        <span className="visually-hidden">Delete</span>
      </BpkButton>,
    ],
  },
  {
    id: 'link-buttons',
    title: 'Link buttons',
    blurb: [
      <BpkParagraph>
        Link buttons follow the same style as links and are used as a tertiary means of triggering actions. Like all
        other buttons, these are available in two sizes and have hover, active and disabled states.
      </BpkParagraph>,
    ],
    examples: [
      <BpkButton link>Link</BpkButton>,
      ' ',
      <BpkButton link disabled>Disabled</BpkButton>,
      <br />,
      <br />,
      <BpkButton link large>Link</BpkButton>,
      ' ',
      <BpkButton link large disabled>Disabled</BpkButton>,
    ],
  },
];

const ButtonsPage = () => <DocsPageBuilder
  title="Buttons"
  blurb={[
    <BpkParagraph>
      On this page you’ll find examples and information on how to use the button component. If you provide an href, an
      anchor tag is rendered instead.
    </BpkParagraph>,
  ]}
  components={components}
  readme={buttonReadme}
  sassdocId="buttons"
/>;

export default ButtonsPage;
