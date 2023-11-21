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

import { useCallback, type MouseEvent, useState } from 'react';

import BpkPageIndicator from '../../../bpk-component-page-indicator';
import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCardListRow.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListRow = ({
  accessory,
  children,
  numberOfCardsToShow,
}: any) => {
  const [index, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(
    children.slice(0, numberOfCardsToShow),
  );
  const numberOfItems = children.length;

  // const withinBounds = (value: number) => (value < 0 ? 0 : value);

  const handleArrowClick = useCallback(
    (newIndex, type) => {
      setCurrentIndex(newIndex);
      const maxValue = (newIndex + 1) * numberOfCardsToShow;
      // TODO: work out range when not exact multiple?
      const newCards = children.slice(maxValue - numberOfCardsToShow, maxValue);
      return setVisibleCards(newCards);
    },
    [children, numberOfCardsToShow],
  );

  return (
    <>
      <div className={getClassName(`bpk-card-list--row`)}>
        {visibleCards}
      </div>
      {accessory && (
        <BpkPageIndicator
          currentIndex={index}
          totalIndicators={Math.min(numberOfItems / numberOfCardsToShow)}
          indicatorLabel=""
          prevNavLabel=""
          nextNavLabel=""
          showNav
          onClick={(
            e: MouseEvent<HTMLButtonElement>,
            newIndex: number,
            direction: string,
          ) => {
            handleArrowClick(newIndex, direction);
          }}
        />
      )}
    </>
  );
};

export default BpkCardListRow;
