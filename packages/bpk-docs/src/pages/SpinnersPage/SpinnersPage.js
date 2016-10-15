import React from 'react';
import BpkParagraph from 'bpk-component-paragraph';
import { BpkSpinner, BpkLargeSpinner, BpkExtraLargeSpinner } from 'bpk-component-spinner';

import spinnerReadme from 'bpk-component-spinner/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const blurb = [
  <BpkParagraph>
    Spinners are used to to indicate that a part of the product is loading or performing a task. These are available in
    3 sizes, small (18px), large (24px) and extra-large (48px).
  </BpkParagraph>,
];

const components = [
  {
    id: 'small',
    title: 'Small',
    examples: [
      <BpkSpinner />,
    ],
  },
  {
    id: 'large',
    title: 'Large',
    examples: [
      <BpkLargeSpinner />,
    ],
  },
  {
    id: 'extra-large',
    title: 'Extra large',
    examples: [
      <BpkExtraLargeSpinner />,
    ],
  },
];

const SpinnersPage = () => <DocsPageBuilder
  title="Spinners"
  blurb={blurb}
  components={components}
  readme={spinnerReadme}
  sassdocId="svgs-mixin-bpk-spinner"
/>;

export default SpinnersPage;
