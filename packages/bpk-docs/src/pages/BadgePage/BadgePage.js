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
import BpkBadge from 'bpk-component-badge';
import { cssModules } from 'bpk-react-utils';

import badgeReadme from 'bpk-component-badge/readme.md';

import STYLES from './badge-page.scss';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const getClassName = cssModules(STYLES);
const badgeClassName = getClassName('bpkdocs-badge-page__badge-spacing');

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        The default behaviour for a badge is to sit next to other objects with text aligned to the baseline.
      </Paragraph>,
    ],
    examples: [
      <BpkBadge className={badgeClassName}>Apples</BpkBadge>,
      <BpkBadge className={badgeClassName}>Bananas</BpkBadge>,
      <BpkBadge className={badgeClassName}>Strawberries</BpkBadge>,
      <BpkBadge>Pears</BpkBadge>,
    ],
  },
  {
    id: 'docked',
    title: 'Docked',
    blurb: [<Paragraph>A badge can also be configured to have a top-right, or top-left modifier to pin it
    to the corner of its parent.</Paragraph>],
    examples: [
      <div className={getClassName('bpkdocs-badge-page__badge-container')}>
        <BpkBadge docked="right">Advert</BpkBadge>
      </div>,
    ],
  },
  {
    id: 'visually-centered',
    title: 'Visually centered',
    blurb: [
      <Paragraph>
        Using this configuration will visually center the badge. Note: the text will not align to the baseline.
      </Paragraph>,
    ],
    examples: [
      <BpkBadge centered className={badgeClassName}>Apples</BpkBadge>,
      <BpkBadge centered className={badgeClassName}>Bananas</BpkBadge>,
      <BpkBadge centered className={badgeClassName}>Strawberries</BpkBadge>,
      <BpkBadge centered>Pears</BpkBadge>,
    ],
  },
];

const BadgePage = () => <DocsPageBuilder
  title="Badge"
  blurb={[
    <Paragraph>
      Badges are labels which hold small amounts of information. They are currently available in one colour.
      Badges are most often used as counters, such as an indication of unread notifications.
    </Paragraph>,
  ]}
  components={components}
  readme={badgeReadme}
  sassdocId="badges"
/>;

export default BadgePage;
