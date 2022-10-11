/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkText from '../../bpk-component-text';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkContentCard.module.scss';

const getClassName = cssModules(STYLES);

type CardLayout = 'HORIZONTAL' | 'VERTICAL';

type Props = {
  card: {
    image: {
      url: string,
      alt?: string,
    },
    headline: string,
    description: string,
    href: string,
  },
  layout: CardLayout,
};

const BpkContentCard = ({ card, layout }: Props) => (
  <a
    className={getClassName(
      'bpk-content-card--link',
      layout === 'HORIZONTAL'
        ? 'bpk-content-card--horizontal'
        : 'bpk-content-card--vertical',
    )}
    href={card.href}
    target="_blank"
    rel="noreferrer"
  >
    <div className={getClassName('bpk-content-card--image-container')}>
      <img
        className={getClassName('bpk-content-card--image')}
        alt={card.image.alt || ''}
        src={card.image.url}
        loading="lazy"
      />
    </div>

    <div>
      <BpkText
        className={getClassName('bpk-content-card--headline')}
        tagName="h3"
      >
        {card.headline}
      </BpkText>
      <BpkText
        className={getClassName('bpk-content-card--description')}
        tagName="p"
      >
        {card.description}
      </BpkText>
    </div>
  </a>
);

export default BpkContentCard;
