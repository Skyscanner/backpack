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
/* eslint react/no-array-index-key: 0 */

import React from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkText from '../../bpk-component-text';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { cssModules } from '../../bpk-react-utils';

import BpkContentCard from './BpkContentCard';
import STYLES from './BpkContentCards.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  heading: string,
  cards: Array<{
    image: {
      url: string,
      alt?: string,
    },
    headline: string,
    description: string,
    href: string,
  }>,
};

const BpkContentCards = ({ cards, heading }: Props) => {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div>
      <BpkText
        tagName="h2"
        className={getClassName('bpk-content-cards--header-text')}
      >
        {heading}
      </BpkText>
      <div role="list" className={getClassName('bpk-content-cards--layout')}>
        {cards.map((card, index) => (
          <div role="listitem" key={index}>
            <BpkContentCard
              card={card}
              layout={cards.length === 1 ? 'HORIZONTAL' : 'VERTICAL'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BpkContentCards;
