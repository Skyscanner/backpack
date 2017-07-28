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
import BpkTicket from 'bpk-component-ticket';
import BpkRouterLink from 'bpk-component-router-link';

import ticketReadme from 'bpk-component-ticket/readme.md';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        The default ticket positions its stub content to the right of the main content.
      </Paragraph>,
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
      <Paragraph>
        The stub can be positioned to the bottom as well.
      </Paragraph>,
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
    <Paragraph>
      Tickets combine the look and feel of <BpkRouterLink to={ROUTES.CARDS}>Cards</BpkRouterLink> with
      an added separation line to divide their content into two distinct areas.
      They can be configured to display both horizontally and vertically.
    </Paragraph>,
  ]}
  components={components}
  readme={ticketReadme}
/>;

export default TicketsPage;
