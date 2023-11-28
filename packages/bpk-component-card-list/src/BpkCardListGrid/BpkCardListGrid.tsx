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
import type { BpkAccessoryTypes } from '../BpkAccessory';

import STYLES from './BpkCardListGrid.module.scss';

const getClassName = cssModules(STYLES);

const DEBOUNCE_TIME = 100;
const DEFAULT_ITEMS = 3;

type BpkCardListGridProps = {
  accessory?: BpkAccessoryTypes;
  buttonText?: string;
  cardList: JSX.Element[];
  expandText?: string;
  initiallyShownCards?: number;
}

const BpkCardListGrid = ({
  accessory,
  buttonText,
  cardList,
  expandText,
  initiallyShownCards = DEFAULT_ITEMS,
}: BpkCardListGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [cardHeight, setCardHeight] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const showContent = () => {
    setShowAll(true);
  };

  const hideContent = () => {
    setShowAll(false);
  };

  const debouncedGetWidth = debounce(() => {
    if (!containerRef.current) {
      return;
    }

    setCardHeight(cardRef.current?.clientHeight || 0);
  }, DEBOUNCE_TIME);

  useEffect(() => {
    setCardHeight(cardRef.current?.clientHeight || 0);
  }, []);

  // Listen for screen width
  useEffect(() => {
    window.addEventListener('resize', debouncedGetWidth);
    return () => {
      window.removeEventListener('resize', debouncedGetWidth);
    };
  });

  const cards = cardList.map((card: any, index: number) => (
    <div
      ref={cardRef}
      className={getClassName('bpk-card-list-grid--card')}
      style={{
        flexBasis: `${Math.floor((1 / initiallyShownCards) * 100) - 1}%`,
      }}
    >
      {card}
    </div>
  ));

  return (
    <>
      <div
        ref={containerRef}
        className={getClassName('bpk-card-list-grid')}
        style={{
          height: showAll ? 'auto' : `${cardHeight + 15}px`,
        }}
      >
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
