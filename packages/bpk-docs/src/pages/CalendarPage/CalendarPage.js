import React from 'react';
import BpkBadge from 'bpk-component-badge';
import BpkParagraph from 'bpk-component-paragraph';

import badgeReadme from 'bpk-component-badge/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        The default behaviour for a badge is to sit next to other objects with text aligned to the baseline.
      </BpkParagraph>,
    ],
    examples: [
      <BpkBadge className="bpkdocs-badge-page__badge-spacing">Apples</BpkBadge>,
      <BpkBadge className="bpkdocs-badge-page__badge-spacing">Bananas</BpkBadge>,
      <BpkBadge className="bpkdocs-badge-page__badge-spacing">Strawberries</BpkBadge>,
      <BpkBadge>Pears</BpkBadge>,
    ],
  },
  {
    id: 'docked',
    title: 'Docked',
    blurb: [<BpkParagraph>A badge can also be configured to have a top-right, or top-left modifier to pin it
    to the corner of its parent.</BpkParagraph>],
    examples: [
      <div className="bpkdocs-badge-page__badge-container">
        <BpkBadge docked="right">Advert</BpkBadge>
      </div>,
    ],
  },
  {
    id: 'visually-centered',
    title: 'Visually centered',
    blurb: [
      <BpkParagraph>
        Using this configuration will visually center the badge. Note: the text will not align to the baseline.
      </BpkParagraph>,
    ],
    examples: [
      <BpkBadge centered className="bpkdocs-badge-page__badge-spacing">Apples</BpkBadge>,
      <BpkBadge centered className="bpkdocs-badge-page__badge-spacing">Bananas</BpkBadge>,
      <BpkBadge centered className="bpkdocs-badge-page__badge-spacing">Strawberries</BpkBadge>,
      <BpkBadge centered>Pears</BpkBadge>,
    ],
  },
];

const BadgePage = () => <DocsPageBuilder
  title="Calendar"
  blurb={[
    <BpkParagraph>
      Badges are labels which hold small amounts of information. They are currently available in one colour.
      Badges are most often used as counters, such as an indication of unread notifications.
    </BpkParagraph>,
  ]}
  components={components}
  readme={badgeReadme}
  sassdocId="badge"
/>;

export default BadgePage;
