import React from 'react';
import BpkCard from 'bpk-component-card';
import BpkParagraph from 'bpk-component-paragraph';

import cardReadme from 'bpk-component-card/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        The default card comes with padding already applied to get you up and running quickly and has normal and
        hover states baked in.
      </BpkParagraph>,
    ],
    examples: [
      <BpkCard>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: 'For full flexibility you can opt to remove the default padding.',
    examples: [
      <BpkCard padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkCard>,
    ],
  },
];

const CardsPage = () => <DocsPageBuilder
  title="Cards"
  blurb={[
    <BpkParagraph>
      Cards are used to group related items within the UI. They allow complex datasets to be broken down into
      individual, distinct areas for easy consumption. Cards are quite often used as a signifier to give affordance
      to a clickable set of elements e.g. a flight itinerary.
    </BpkParagraph>,
  ]}
  components={components}
  readme={cardReadme}
  sassdocId="cards"
/>;

export default CardsPage;
