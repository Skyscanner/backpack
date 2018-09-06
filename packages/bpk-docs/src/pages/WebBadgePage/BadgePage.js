/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import BpkBadge, { BADGE_TYPES } from 'bpk-component-badge';
import BpkSmallFlightIcon from 'bpk-component-icon/sm/flight';
import BpkSmallCarIcon from 'bpk-component-icon/sm/cars';
import BpkSmallHotelIcon from 'bpk-component-icon/sm/hotels';

import { cssModules } from 'bpk-react-utils';

import badgeReadme from 'bpk-component-badge/README.md';

import STYLES from './badge-page.css';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import Paragraph from '../../components/Paragraph';

const getClassName = cssModules(STYLES);
const badgeClassName = getClassName('bpkdocs-badge-page__badge-spacing');

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        The default behaviour for a badge is to sit next to other objects with
        text aligned to the baseline.
      </Paragraph>,
    ],
    examples: [
      <BpkBadge className={badgeClassName}>Apples</BpkBadge>,
      <BpkBadge className={badgeClassName}>Bananas</BpkBadge>,
      <BpkBadge className={badgeClassName}>Strawberries</BpkBadge>,
      <BpkBadge className={badgeClassName}>Pears</BpkBadge>,
    ],
  },
  {
    id: 'docked',
    title: 'Docked',
    blurb: [
      <Paragraph>
        A badge can also be configured to have a top-right, or top-left modifier
        to pin it to the corner of its parent.
      </Paragraph>,
    ],
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
        Using this configuration will visually center the badge. Note: the text
        will not align to the baseline.
      </Paragraph>,
    ],
    examples: [
      <BpkBadge centered className={badgeClassName}>
        Apples
      </BpkBadge>,
      <BpkBadge centered className={badgeClassName}>
        Bananas
      </BpkBadge>,
      <BpkBadge centered className={badgeClassName}>
        Strawberries
      </BpkBadge>,
      <BpkBadge centered>Pears</BpkBadge>,
    ],
  },
  {
    id: 'success',
    title: 'Success',
    blurb: [
      <Paragraph>The success badge is a green color as shown below.</Paragraph>,
    ],
    examples: [
      <BpkBadge type={BADGE_TYPES.success} className={badgeClassName}>
        Apples
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.success} className={badgeClassName}>
        Bananas
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.success} className={badgeClassName}>
        Strawberries
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.success} className={badgeClassName}>
        Pears
      </BpkBadge>,
    ],
  },
  {
    id: 'destructive',
    title: 'Destructive',
    blurb: [
      <Paragraph>
        The destructive badge is a red color as shown below.
      </Paragraph>,
    ],
    examples: [
      <BpkBadge type={BADGE_TYPES.destructive} className={badgeClassName}>
        Apples
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.destructive} className={badgeClassName}>
        Bananas
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.destructive} className={badgeClassName}>
        Strawberries
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.destructive} className={badgeClassName}>
        Pears
      </BpkBadge>,
    ],
  },
  {
    id: 'light',
    title: 'Light',
    blurb: [
      <Paragraph>The light badge is a gray color as shown below.</Paragraph>,
    ],
    dark: true,
    examples: [
      <BpkBadge type={BADGE_TYPES.light} className={badgeClassName}>
        Apples
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.light} className={badgeClassName}>
        Bananas
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.light} className={badgeClassName}>
        Strawberries
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.light} className={badgeClassName}>
        Pears
      </BpkBadge>,
    ],
  },
  {
    id: 'inverse',
    title: 'Inverse',
    blurb: [<Paragraph>The inverse badge is white as shown below.</Paragraph>],
    dark: true,
    examples: [
      <BpkBadge type={BADGE_TYPES.inverse} className={badgeClassName}>
        Apples
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.inverse} className={badgeClassName}>
        Bananas
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.inverse} className={badgeClassName}>
        Strawberries
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.inverse} className={badgeClassName}>
        Pears
      </BpkBadge>,
    ],
  },
  {
    id: 'outline',
    title: 'Outline',
    blurb: [
      <Paragraph>
        The outline badge has a somewhat transparent background as shown below.
      </Paragraph>,
    ],
    dark: true,
    examples: [
      <BpkBadge type={BADGE_TYPES.outline} className={badgeClassName}>
        Apples
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.outline} className={badgeClassName}>
        Bananas
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.outline} className={badgeClassName}>
        Strawberries
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.outline} className={badgeClassName}>
        Pears
      </BpkBadge>,
    ],
  },
  {
    id: 'with-icons',
    title: 'With icons',
    blurb: [
      <Paragraph>
        When badges contain icons, the icons are resized to fit and have some
        margin applied. The badge&apos;s height also increases slightly.
      </Paragraph>,
    ],
    examples: [
      <BpkBadge type={BADGE_TYPES.success} className={badgeClassName}>
        <BpkSmallFlightIcon /> Flights
      </BpkBadge>,
      <BpkBadge type={BADGE_TYPES.warning} className={badgeClassName}>
        <BpkSmallHotelIcon /> + <BpkSmallCarIcon /> Multiple
      </BpkBadge>,
    ],
  },
];

const BadgePage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Badge"
    components={components}
    readme={badgeReadme}
    sassdocId="badges"
    {...rest}
  />
);

export default BadgePage;
