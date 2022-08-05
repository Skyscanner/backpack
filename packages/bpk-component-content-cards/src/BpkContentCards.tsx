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
/* @flow strict */

import React from 'react';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import ContentCard from './ContentCard';
import STYLES from './BpkContentCards.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  headerText: string;
  cards: Array<{
    imageLink?: string;
    headline?: string;
    description?: string;
    ctaLink?: string;
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
        className={getClassName('bpk-content-card__headerText')}
      >
        {headerText}
      </BpkText>
      <div className={getClassName('bpk-content-card__layout')}>
        {cards.map((card) => (
          <ContentCard
            key={card.imageLink}
            card={card}
            layout={cards.length === 1 ? 'HORIZONTAL' : 'VERTICAL'}
          />
        ))}
      </div>
    </div>
  );
};

export default BpkContentCards;
