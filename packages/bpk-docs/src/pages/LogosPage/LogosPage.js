import React from 'react';
import BpkLink from 'bpk-component-link';
import BpkParagraph from 'bpk-component-paragraph';
import { BpkCloudLogo, BpkInlineLogo, BpkStackedLogo, BpkTianxunLogo, BpkTianxunStackedLogo } from 'bpk-component-logo';

import logoReadme from 'bpk-component-logo/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const blurb = [
  <BpkParagraph>
    There are a few different versions of the Skyscanner logo available. In general, all logos should be used in white,
    reversed out of a colored background. When it’s not possible to reverse the logo out of a color, the preferred usage
    is using Blue-500 or Gray-500. No other colors should be used.
  </BpkParagraph>,
  <BpkParagraph>
    As with using any logo, please ensure there’s sufficient clear space surrounding it and consider color, contrast,
    and legibility to ensure it’s shown at its best.
  </BpkParagraph>,
];

const components = [
  {
    id: 'inline',
    title: 'Inline',
    examples: [
      <BpkInlineLogo />,
    ],
    blurb: 'This is the preferred usage of the logo.',
  },
  {
    id: 'stacked',
    title: 'Stacked',
    examples: [
      <BpkStackedLogo />,
    ],
    blurb: 'Stacked logos should only be used when confined to a small square e.g. a social media avatars.',
  },
  {
    id: 'cloud',
    title: 'Cloud',
    examples: [
      <BpkCloudLogo />,
    ],
    blurb: 'The cloud is useful for things such as app icons and favicons.',
  },
  {
    id: 'tianxun',
    title: 'Tianxun',
    examples: [
      <BpkTianxunLogo />,
    ],
    blurb: 'This is the preferred usage for Skyscanner in China.',
  },
  {
    id: 'tianxun-stacked',
    title: 'Tianxun stacked',
    examples: [
      <BpkTianxunStackedLogo />,
    ],
    blurb: [
      <BpkParagraph>
        Similar to the stacked version of the Skyscanner logo, this should only be used when confined to a small square
        e.g. a social media avatars.
      </BpkParagraph>,
    ],
  },
];

const customSections = [
  {
    id: 'localised-product-logos',
    title: 'Localised Product Logos',
    content: [
      <BpkParagraph>
        Skyscanner also maintains specific logos for our product verticals, for example: ‘Skyscanner Flights’,
        ‘Skyscanner Hotels’ etc. These are not widely used on our product and as such are not maintained in Backpack.
        Please contact the <BpkLink href="mailto: creative@skyscanner.net">creative team </BpkLink> if you require
        these.
      </BpkParagraph>,
    ],
  },
];

const LogosPage = () => <DocsPageBuilder
  title="Logos"
  blurb={blurb}
  components={components}
  customSections={customSections}
  readme={logoReadme}
  sassdocId="svgs-mixin-bpk-logo-cloud"
/>;

export default LogosPage;
