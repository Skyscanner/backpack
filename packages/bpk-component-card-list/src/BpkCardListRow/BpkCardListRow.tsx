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
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
} from 'react';

import debounce from 'lodash/debounce';

// @ts-ignore
import BpkPageIndicator from '../../../bpk-component-page-indicator';
import { cssModules, isRTL } from '../../../bpk-react-utils';

import type { ACCESSORY_TYPES } from '../common-types';

import STYLES from './BpkCardListRow.module.scss';

const getClassName = cssModules(STYLES);
const DEBOUNCE_TIME = 150;
let setVisibleIndexes: (array: number[]) => {};

type BpkCardListRowProps = {
  accessory?: typeof ACCESSORY_TYPES.Pagination;
  ariaLabelIndicator: string;
  ariaLabelNext: string;
  ariaLabelPrev: string;
  children: ReactElement[];
  numberOfCardsToShow: number;
};

const BpkCardListRow = ({
  accessory,
  ariaLabelIndicator,
  ariaLabelNext,
  ariaLabelPrev,
  children,
  numberOfCardsToShow,
}: BpkCardListRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [pageIndex, setCurrentPageIndex] = useState(0);

  const numberOfCards = children.length;
  let numberOfDisplay = numberOfCardsToShow;
  const numberOfIndicators = Math.ceil(numberOfCards / numberOfDisplay);

  const [indicators, setNumberOfIndicators] = useState(numberOfIndicators);

  const touchEnd = useCallback(
    (nextCardIndex: number): boolean =>
      (numberOfCards - nextCardIndex) * cardWidth <= containerWidth,
    [cardWidth, numberOfCards, containerWidth],
  );

  const touchStart = (nextCardIndex: number): boolean => nextCardIndex <= 0;

  const setScrollPosition = (xOffset: number) => {
    if (!containerRef.current?.scroll) {
      return;
    }
    containerRef.current.scroll({
      left: isRTL() ? -xOffset : xOffset,
      behavior: 'smooth',
    });
  };

  const debouncedGetWidth = debounce(() => {
    if (!containerRef.current) {
      return;
    }
    setContainerWidth(containerRef.current?.clientWidth || 0);
    setCardWidth(cardRef.current?.clientWidth || 0);
    numberOfDisplay = numberOfCardsToShow;
    setScrollPosition(0);
    setCardIndex(0);
    setCurrentPageIndex(0);
  }, DEBOUNCE_TIME);

  useEffect(() => {
    setContainerWidth(containerRef.current?.clientWidth || 0);
    setCardWidth(cardRef.current?.clientWidth || 0);
  }, []);

  useEffect(() => {
    setScrollPosition(cardIndex * cardWidth);
  }, [cardIndex, cardWidth]);

  useEffect(() => {
    if (numberOfDisplay !== Infinity && numberOfDisplay > 0) {
      setVisibleIndexes &&
        setVisibleIndexes(
          Array.from(Array(numberOfDisplay), (_, i) => i + cardIndex),
        );
      setNumberOfIndicators(Math.ceil(numberOfCards / numberOfDisplay));
    }
  }, [cardIndex, numberOfDisplay, numberOfCards, indicators]);

  useEffect(() => {
    window.addEventListener('resize', debouncedGetWidth);
    return () => {
      window.removeEventListener('resize', debouncedGetWidth);
    };
  });

  const handleArrowClick = useCallback(
    (newIndex, direction) => {
      if (!containerWidth || !cardWidth) {
        return;
      }

      if (direction === 'NEXT') {
        setCurrentPageIndex(newIndex);
        const nextCardIndex = cardIndex + numberOfDisplay;
        if (touchEnd(nextCardIndex)) {
          setCardIndex(numberOfCards - numberOfDisplay);
        } else {
          setCardIndex(nextCardIndex);
        }
      }
      if (direction === 'PREV') {
        setCurrentPageIndex(newIndex);
        const nextCardIndex = cardIndex - numberOfDisplay;
        if (touchStart(nextCardIndex)) {
          setCardIndex(0);
        } else {
          setCardIndex(nextCardIndex);
        }
      }
      if (direction === 'INDICATORS') {
        setCurrentPageIndex(newIndex);
        setCardIndex(newIndex * numberOfDisplay);
      }
    },
    [
      cardIndex,
      cardWidth,
      containerWidth,
      numberOfCards,
      numberOfDisplay,
      touchEnd,
    ],
  );

  return (
    <div className={getClassName('bpk-card-list-row')}>
      <div
        data-testid="container"
        className={getClassName('bpk-card-list-row__cards')}
        ref={containerRef}
      >
        {children.map((card, index) => (
          <div
            key={`card-${index + 1}`}
            className={getClassName(
              'bpk-card-list-row__card',
              numberOfCardsToShow < 5 && 'bpk-card-list-row__card-padding',
            )}
            ref={cardRef}
            style={{ width: `calc(100% / ${numberOfDisplay})` }}
          >
            {card}
          </div>
        ))}
      </div>

      {accessory && numberOfIndicators > 1 && (
        <BpkPageIndicator
          currentIndex={pageIndex}
          totalIndicators={numberOfIndicators}
          indicatorLabel={ariaLabelIndicator}
          prevNavLabel={ariaLabelPrev}
          nextNavLabel={ariaLabelNext}
          showNav
          onClick={(
            e: MouseEvent<HTMLButtonElement>,
            newIndex: number,
            direction: 'NEXT' | 'PREV' | 'INDICATORS',
          ) => {
            handleArrowClick(newIndex, direction);
          }}
        />
      )}
    </div>
  );
};

export default BpkCardListRow;
