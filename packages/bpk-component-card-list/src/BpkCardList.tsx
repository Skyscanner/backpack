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
import BpkCardListRow from './BpkCardListRow/BpkCardListRow';
import BpkCardListGrid from './BpkCardListGrid';
import BpkCardListStack from './BpkCardListStack';
import BpkCardListRail from './BpkCardListRail';

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
  expandText?: string;
};

const BpkCardList = ({
  accessory,
  buttonText,
  cardList,
  chipGroup,
  description,
  expandText,
  initiallyShownCards = DEFAULT_ITEMS,
  layoutDesktop,
  layoutMobile,
  onButtonClick,
  title,
}: BpkCardListProps) => {
  const [visibleCards, setVisibleCards] = useState(
    cardList.slice(0, initiallyShownCards),
  );

  const cards = visibleCards.map((card) => (
    <div className={getClassName('bpk-card-list--card-list--card')}>{card}</div>
  ));

  const showContent = () => {
    setVisibleCards(cardList);
  };
  const hideContent = () => {
    setVisibleCards(cardList.slice(0, initiallyShownCards));
  };

  return (
    <div className={getClassName('bpk-card-list')}>
      <BpkSectionHeader
        title={title}
        description={description}
        button={buttonText && <BpkButtonV2>{buttonText}</BpkButtonV2>}
      />
      {/* <div className={getClassName(`bpk-card-list--chip-group`)}>
        {chipGroup}
      </div> */}

      <div className={getClassName('bpk-card-list--card-list')}>
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(isActive) => {
            if (isActive) {
              return layoutMobile === 'rail' ? (
                <BpkCardListRail>{cards}</BpkCardListRail>
              ) : (
                <BpkCardListStack
                  accessory={accessory}
                  buttonText={buttonText}
                  expandText={expandText}
                  showContent={showContent}
                  hideContent={hideContent}
                >
                  {cards}
                </BpkCardListStack>
              );
            }

            return layoutDesktop === 'grid' ? (
              <BpkCardListGrid
                accessory={accessory}
                buttonText={buttonText}
                expandText={expandText}
                cardList={cardList}
              />
            ) : (
              <BpkCardListRow
                accessory={accessory === 'pagination' && !buttonText}
                numberOfCardsToShow={initiallyShownCards}
              >
                {cardList}
              </BpkCardListRow>
            );
          }}
        </BpkBreakpoint>
      </div>
    </div>
  );
};

export default BpkCardList;
