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

import { useState } from 'react';

import { cssModules } from '../../bpk-react-utils';
import BpkSectionHeader from '../../bpk-component-section-header';
import { BpkButtonV2 } from '../../bpk-component-button';
import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';

import STYLES from './BpkCardList.module.scss';
import type { BpkAccessoryTypes } from './BpkAccessory';
import BpkAccessory from './BpkAccessory';

const getClassName = cssModules(STYLES);

export type layoutDesktopProps = 'row' | 'grid';
export type layoutMobileProps = 'rail' | 'stack';

const MAX_ITEMS = 12; // MAX should be 12 for Desktop Grid and Mobile Stack
const DEFAULT_ITEMS = 3;

type BpkChipGroup = any;

export type BpkCardListProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  chipGroup?: BpkChipGroup;
  cardList: JSX.Element[];
  initiallyShownCards?: number;
  layoutDesktop: 'row' | 'grid';
  layoutMobile: 'rail' | 'stack';
  accessory?: BpkAccessoryTypes;
  expandString?: string;
};

const CARDS_PER_ROW = 3;

const BpkCardList = ({
  accessory,
  buttonText,
  cardList,
  chipGroup,
  description,
  expandString,
  initiallyShownCards = 3,
  layoutDesktop,
  layoutMobile,
  onButtonClick,
  title,
}: BpkCardListProps) => {
  const [cards, setCards] = useState(cardList.slice(0, initiallyShownCards));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLayout, setCurrentLayout] = useState();
  const cardRows = [];

  for (let i = 0; i < cards.length; i += CARDS_PER_ROW) {
    cardRows.push(cards.slice(i, i + CARDS_PER_ROW));
  }

  const showContent = () => {
    setCards(cardList);
  };
  const hideContent = () => {
    setCards(cardList.slice(0, initiallyShownCards));
  };

  return (
    <div className={getClassName('bpk-card-list')}>
      <BpkSectionHeader
        title={title}
        description={description}
        button={buttonText && <BpkButtonV2>{buttonText}</BpkButtonV2>}
      />
      <div className={getClassName(`bpk-card-list--chip-group`)}>
        {chipGroup}
      </div>
      {/* <BpkBreakpoint query={BREAKPOINTS.MOBILE}>

      </BpkBreakpoint> */}
      <div
        className={getClassName(
          'bpk-card-list--card-list',
          `bpk-card-list--card-list--${layoutDesktop}`,
        )}
      >
        {cardRows.map((row) => (
          <div className={getClassName('bpk-card-list--card-list--row')}>
            {row.map((card) => (
              <div className={getClassName('bpk-card-list--card-list--card')}>
                {card}
              </div>
            ))}
          </div>
        ))}
      </div>

      {!buttonText && accessory && (
        <BpkAccessory
          {...{
            accessory,
            currentIndex,
            hideContent,
            setCurrentIndex,
            showContent,
          }}
        />
      )}
    </div>
  );
};

export default BpkCardList;
