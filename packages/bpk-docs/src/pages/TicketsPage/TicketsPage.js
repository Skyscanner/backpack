import React from 'react';
import BpkTicket from 'bpk-component-ticket';
import BpkParagraph from 'bpk-component-paragraph';
import BpkRouterLink from 'bpk-component-router-link';

import ticketReadme from 'bpk-component-ticket/readme.md';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        The default ticket positions its stub content to the right of the main content.
      </BpkParagraph>,
    ],
    examples: [
      <BpkTicket stub="Lorem ipsum dolor sit amet.">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ],
  },
  {
    id: 'vertical',
    title: 'Vertical',
    blurb: [
      <BpkParagraph>
        The stub can be positioned to the bottom as well.
      </BpkParagraph>,
    ],
    examples: [
      <BpkTicket stub="Lorem ipsum dolor sit amet." vertical>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: 'For full flexibility you can opt to remove the default padding and roll your own.',
    examples: [
      <BpkTicket stub="Lorem ipsum dolor sit amet." padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkTicket>,
    ],
  },
];

const TicketsPage = () => <DocsPageBuilder
  title="Tickets"
  blurb={[
    <BpkParagraph>
      Tickets combine the look and feel of <BpkRouterLink to={ROUTES.CARDS}>Cards</BpkRouterLink>
      with an added separation line to divide their content into two distinct areas.
      They can be configured to display both horizontally and vertically.
    </BpkParagraph>,
  ]}
  components={components}
  readme={ticketReadme}
/>;

export default TicketsPage;
