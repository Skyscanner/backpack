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

import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { BpkButtonV2 } from '../../../bpk-component-button';
import { cssModules } from '../../../bpk-react-utils';
import BpkExpand from '../BpkExpand';

import STYLES from './BpkCardListGrid.module.scss';

const getClassName = cssModules(STYLES);

const DEBOUNCE_TIME = 100;
const MIN_CARD_WIDTH = 281;
const DEFAULT_ITEMS = 3;

const BpkCardListGrid = ({
  accessory, // EXPAND OR BUTTON
  buttonText,
  cardList,
  children,
  expandText,
}: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [showAll, setShowAll] = useState(false);
  // const [visibleCards, setVisibleCards] = useState([]);

  const showContent = () => {
    if (containerRef.current) {
      containerRef.current.style.height = `auto`;
    }
    setShowAll(true);
  }

  const hideContent = () => {
    if (containerRef.current) {
      containerRef.current.style.height = `${(cardRef.current?.clientHeight || 0) + 15}px`;
    }
    setShowAll(false);
  }

  /*
  Calculate the number of cards that can be displayed on a page
  The +2 is to avoid the calculation error caused by clientWidth in rounding
  */
  const calculateNumberOfDisplay = (): number =>
    Math.floor((containerWidth + 2) / MIN_CARD_WIDTH);

  // The number of cards that can be displayed on a page
  let numberOfDisplay = calculateNumberOfDisplay();

  const debouncedGetWidth = debounce(() => {
    if (!containerRef.current) {
      return;
    }
    // Get the latest width of the container and card
    setContainerWidth(containerRef.current?.clientWidth || 0);
    if (containerRef.current) {
      containerRef.current.style.height = `${(cardRef.current?.clientHeight || 0) + 15}px`;
    }

    // Recalculate and initialize component position
    numberOfDisplay = calculateNumberOfDisplay();
  }, DEBOUNCE_TIME);

  useEffect(() => {
    setContainerWidth(containerRef.current?.clientWidth || 0);
    if(containerRef.current) {
      containerRef.current.style.height = `${(cardRef.current?.clientHeight || 0) + 15}px`;
    }
  }, []);

  // Listen for screen width
  useEffect(() => {
    window.addEventListener('resize', debouncedGetWidth);
    return () => {
      window.removeEventListener('resize', debouncedGetWidth);
    };
  });

  const cards = cardList.map((card: any, index: number) => {
    if (index === 0) {
      return (<div ref={cardRef} className={getClassName('bpk-card-list-grid--card')}>{card}</div>)
    }
    return (
      <div className={getClassName('bpk-card-list-grid--card')}>{card}</div>
    )
  });


  return (
    <>
      <div ref={containerRef} className={getClassName('bpk-card-list-grid')}>
        {/* {cards.slice(
          0,
          numberOfDisplay < DEFAULT_ITEMS ? numberOfDisplay : DEFAULT_ITEMS,
        )} */}
        {cards}
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
