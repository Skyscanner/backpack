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
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import BpkContentCard from './BpkContentCard';
import STYLES from './BpkContentCards.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  headerText: string;
  cards: Array<{
    image: {
      url: string;
      alt?: string;
    };
    headline: string;
    description: string;
    href: string;
  }>;
};

const BpkContentCards = ({ cards, headerText }: Props) => {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div>
      <BpkText
        tagName="h2"
        className={getClassName('bpk-content-cards--header-text')}
      >
        {headerText}
      </BpkText>
      <div role="list" className={getClassName('bpk-content-cards--layout')}>
        {cards.map((card) => (
          <div role="listitem">
            <BpkContentCard
              key={card.image.url}
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
