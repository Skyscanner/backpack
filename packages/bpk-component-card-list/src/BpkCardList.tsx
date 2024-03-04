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
import { BpkAccessoryTypes, type BpkCardListProps } from './common-types';

const getClassName = cssModules(STYLES);
const MAX_ITEMS = 12; // MAX should be 12 for Desktop Grid and Mobile Stack
const DEFAULT_ITEMS = 3;

const BpkCardList = (props: BpkCardListProps) => {
  const {
    buttonText,
    cardList,
    description,
    initiallyShownCards = DEFAULT_ITEMS,
    layoutDesktop,
    layoutMobile,
    onButtonClick,
    title,
  } = props;
  const allCards = cardList.slice(0, MAX_ITEMS);

  // TODO: might be worth putting them under a HOC
  const [visibleCards, setVisibleCards] = useState(
    cardList.slice(0, initiallyShownCards),
  );
  const [collapsed, setCollapsed] = useState(true);

  const cards = visibleCards.map((card: ReactElement) => (
    <div className={getClassName('bpk-card-list--card-list--card')}>{card}</div>
  ));

  const showContent = () => {
    setVisibleCards(cardList);

    onButtonClick?.();
  };

  const hideContent = () => {
    setVisibleCards(cardList.slice(0, initiallyShownCards));

    onButtonClick?.();
  };

  const button = buttonText && (
    <BpkButtonV2 onClick={onButtonClick}>{buttonText}</BpkButtonV2>
  );

  return (
    <div className={getClassName('bpk-card-list')}>
      <BpkSectionHeader
        title={title}
        description={description}
        button={button}
      />

      <div className={getClassName('bpk-card-list--card-list')}>
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(isActive) => {
            if (isActive) {
              if (layoutMobile === 'rail') {
                return <BpkCardListRail>{allCards}</BpkCardListRail>;
              }
              const { accessory } = props;

              let modeProps = {};
              if (accessory === BpkAccessoryTypes.Expand) {
                modeProps = {
                  accessory,
                  expandText: props.expandText,
                  onButtonClick: props.onButtonClick,
                };
              } else if (accessory === BpkAccessoryTypes.Button) {
                modeProps = {
                  accessory,
                  buttonText: props.buttonText,
                  onButtonClick: props.onButtonClick,
                };
              }
              return (
                <BpkCardListStack
                  showContent={showContent}
                  hideContent={hideContent}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  {...modeProps}
                >
                  {cards}
                </BpkCardListStack>
              );
            }

            if (layoutDesktop === 'row') {
              const { accessory } = props;
              return (
                <BpkCardListRow
                  accessory={button ? undefined : accessory}
                  numberOfCardsToShow={initiallyShownCards}
                >
                  {allCards}
                </BpkCardListRow>
              );
            }

            const { accessory } = props;
            let accessoryProps = {};
            if (accessory === BpkAccessoryTypes.Expand) {
              accessoryProps = {
                accessory,
                expandText: props.expandText,
                onButtonClick: props.onButtonClick,
              };
            } else if (accessory === BpkAccessoryTypes.Button) {
              accessoryProps = {
                accessory,
                buttonText: props.buttonText,
                onButtonClick: props.onButtonClick,
              };
            }
            return (
              <BpkCardListGrid
                showContent={showContent}
                hideContent={hideContent}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                {...accessoryProps}
              >
                {visibleCards}
              </BpkCardListGrid>
            );
          }}
        </BpkBreakpoint>
      </div>
    </div>
  );
};

export default BpkCardList;
