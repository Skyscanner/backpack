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

import type { ReactElement } from 'react';
import { useState } from 'react';

import { BpkButtonV2 } from '../../../bpk-component-button';
import { cssModules } from '../../../bpk-react-utils';
import BpkExpand from '../BpkExpand';
import type { BpkAccessoryTypes } from '../BpkAccessory';

import STYLES from './BpkCardListGrid.module.scss';

const getClassName = cssModules(STYLES);

const DEFAULT_ITEMS = 4;

type BpkCardListGridProps = {
  accessory?: BpkAccessoryTypes;
  buttonText?: string;
  cardList: ReactElement[];
  expandText?: string;
  initiallyShownCards?: number;
};

const BpkCardListGrid = ({
  accessory,
  buttonText,
  cardList,
  expandText,
  initiallyShownCards = DEFAULT_ITEMS,
}: BpkCardListGridProps) => {
  const [showAll, setShowAll] = useState(false);

  const showContent = () => {
    setShowAll(true);
  };

  const hideContent = () => {
    setShowAll(false);
  };

  const cards = cardList.map((card: any, index: number) => (
    <div className={getClassName('bpk-card-list-grid--card')}>{card}</div>
  ));

  return (
    <>
      <div
        className={getClassName(
          `bpk-card-list-grid`,
          'flex-wrap'
        )}
      >
        {!showAll ? cards.slice(0, initiallyShownCards) : cards}
      </div>

      {!buttonText &&
        (accessory === 'expand' ? (
          <BpkExpand showContent={showContent} hideContent={hideContent} />
        ) : (
          <BpkButtonV2>Action</BpkButtonV2>
        ))}
    </>
  );
};

export default BpkCardListGrid;
