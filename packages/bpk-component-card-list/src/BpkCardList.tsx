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

import { cssModules } from '../../bpk-react-utils';
import BpkSectionHeader from '../../bpk-component-section-header';
import { BpkButtonV2 } from '../../bpk-component-button';
import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';

import STYLES from './BpkCardList.module.scss';
import BpkCardListGrid from './BpkCardListGrid';
import BpkCardListRail from './BpkCardListRail';
import BpkCardListRow from './BpkCardListRow';
import BpkCardListStack from './BpkCardListStack';

const getClassName = cssModules(STYLES);

export type layoutDesktopProps = 'row' | 'grid';
export type layoutMobileProps = 'rail' | 'stack';

const MAX_ITEMS = 12; // MAX should be 12 for Desktop Grid and Mobile Stack
const DEFAULT_ITEMS = 3;

type BpkChipGroup = any;
type BpkAccessoryTypes = 'expand' | 'button' | 'pagination';

export type BpkCardListProps = {
  title: string;
  description?: string;
  buttonText?: string; // For Button in Section Header
  onButtonClick?: () => void;
  chipGroup?: BpkChipGroup;
  cardList: ReactElement[];
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
  const allCards = cardList.slice(0, MAX_ITEMS);
  const [visibleCards, setVisibleCards] = useState(
    cardList.slice(0, initiallyShownCards),
  );
  const [collapsed, setCollapsed] = useState(true);

  const cards = visibleCards.map((card: ReactElement) => (
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
        button={
          buttonText && (
            <BpkButtonV2 onClick={onButtonClick}>{buttonText}</BpkButtonV2>
          )
        }
      />

      {chipGroup && (
        <div className={getClassName(`bpk-card-list--chip-group`)}>
          {chipGroup}
        </div>
      )}

      <div className={getClassName('bpk-card-list--card-list')}>
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(isActive) => {
            if (isActive) {
              return layoutMobile === 'rail' ? (
                <BpkCardListRail>{allCards}</BpkCardListRail>
              ) : (
                <BpkCardListStack
                  accessory={accessory}
                  expandText={expandText}
                  showContent={showContent}
                  hideContent={hideContent}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                >
                  {cards}
                </BpkCardListStack>
              );
            }

            return layoutDesktop === 'grid' ? (
              <BpkCardListGrid
                accessory={accessory}
                expandText={expandText}
                cards={visibleCards}
                showContent={showContent}
                hideContent={hideContent}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              >
                {visibleCards}
              </BpkCardListGrid>
            ) : (
              <BpkCardListRow
                accessory={accessory === 'pagination' && !expandText}
                numberOfCardsToShow={initiallyShownCards}
              >
                {allCards}
              </BpkCardListRow>
            );
          }}
        </BpkBreakpoint>
      </div>
    </div>
  );
};

export default BpkCardList;
