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

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import { BpkButtonV2 } from '../../bpk-component-button';
import BpkSectionHeader from '../../bpk-component-section-header';
import { cssModules } from '../../bpk-react-utils';

import BpkCardListGrid from './BpkCardListGrid';
import BpkCardListRail from './BpkCardListRail';
import BpkCardListRow from './BpkCardListRow';
import BpkCardListStack from './BpkCardListStack';
import { ACCESSORY_TYPES, LAYOUTS, type CardListProps } from './common-types';

import STYLES from './BpkCardList.module.scss';

const getClassName = cssModules(STYLES);
const MAX_ITEMS = 12; // MAX should be 12 for Desktop Grid and Mobile Stack
const DEFAULT_ITEMS = 3;

const BpkCardList = (props: CardListProps) => {
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

  const [visibleCards, setVisibleCards] = useState(
    cardList.slice(0, initiallyShownCards),
  );
  const [collapsed, setCollapsed] = useState(true);

  const showContent = () => {
    setVisibleCards(cardList.slice(0, MAX_ITEMS));

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
              if (layoutMobile === LAYOUTS.rail) {
                return <BpkCardListRail>{cardList}</BpkCardListRail>;
              }
              const { accessory } = props;

              let modeProps = {};
              if (accessory === ACCESSORY_TYPES.Expand) {
                modeProps = {
                  accessory,
                  expandText: props.expandText,
                  onButtonClick: props.onButtonClick,
                };
              } else if (accessory === ACCESSORY_TYPES.Button) {
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
                  {visibleCards}
                </BpkCardListStack>
              );
            }

            if (layoutDesktop === LAYOUTS.row) {
              const { accessory, ariaLabelIndicator, ariaLabelNext, ariaLabelPrev } = props;
              return (
                <BpkCardListRow
                  accessory={button ? undefined : accessory}
                  numberOfCardsToShow={initiallyShownCards}
                  ariaLabelNext={ariaLabelNext}
                  ariaLabelPrev={ariaLabelPrev}
                  ariaLabelIndicator={ariaLabelIndicator}
                >
                  {cardList}
                </BpkCardListRow>
              );
            }

            const { accessory } = props;
            let accessoryProps = {};
            if (accessory === ACCESSORY_TYPES.Expand) {
              accessoryProps = {
                accessory,
                expandText: props.expandText,
                onButtonClick: props.onButtonClick,
              };
            } else if (accessory === ACCESSORY_TYPES.Button) {
              accessoryProps = {
                accessory,
                buttonText: props.buttonText,
                onButtonClick: props.onButtonClick,
                href: props.href,
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
