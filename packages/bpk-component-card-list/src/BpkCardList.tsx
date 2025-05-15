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

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import { BpkButtonV2 } from '../../bpk-component-button';
import BpkSectionHeader from '../../bpk-component-section-header';
import { cssModules } from '../../bpk-react-utils';

import BpkCardListGridStack from './BpkCardListGridStack';
import BpkCardListRowRail from './BpkCardListRowRail';
import BpkCardListRowRailContainer from './BpkCardListRowRail';
import { ACCESSORY_TYPES, LAYOUTS } from './common-types';

import type CardListProps from './common-types';

import STYLES from './BpkCardList.module.scss';

const getClassName = cssModules(STYLES);

const DEFAULT_ITEMS = 3;

const BpkCardList = (props: CardListProps) => {
  const {
    accessory,
    buttonHref,
    buttonText,
    chipGroup,
    cardList,
    description,
    expandText,
    initiallyShownCards = DEFAULT_ITEMS,
    layoutDesktop,
    layoutMobile,
    onButtonClick,
    title,
  } = props;

  const button = buttonText && accessory !== ACCESSORY_TYPES.Button && (
    <BpkButtonV2 onClick={onButtonClick} href={buttonHref}>
      {buttonText}
    </BpkButtonV2>
  );

  return (
    <div className={getClassName('bpk-card-list')} data-testid="bpk-card-list">
      <BpkSectionHeader
        title={title}
        description={description}
        button={button}
      />

      {chipGroup}

      <div
        className={getClassName('bpk-card-list--card-list')}
        data-testid="bpk-card-list--card-list"
      >
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(isActive) => {
            if (isActive) {
              if (
                layoutMobile === LAYOUTS.stack &&
                (accessory === ACCESSORY_TYPES.Expand ||
                  accessory === ACCESSORY_TYPES.Button)
              ) {
                return (
                  <BpkCardListGridStack
                    accessory={accessory}
                    initiallyShownCards={initiallyShownCards}
                    buttonText={buttonText}
                    expandText={expandText}
                    onButtonClick={onButtonClick}
                    layout={layoutMobile}
                  >
                    {cardList}
                  </BpkCardListGridStack>
                );
              }

              if (layoutMobile === LAYOUTS.rail) {
                return (
                  <BpkCardListRowRailContainer
                    initiallyShownCards={initiallyShownCards}
                    layout={layoutMobile}
                  >
                    {cardList}
                  </BpkCardListRowRailContainer>
                );
              }

              return <div />;
            }

            if (
              layoutDesktop === LAYOUTS.row &&
              (accessory === ACCESSORY_TYPES.Pagination ||
                accessory === undefined)
            ) {
              return (
                <BpkCardListRowRailContainer
                  accessory={accessory}
                  initiallyShownCards={initiallyShownCards}
                  layout={layoutDesktop}
                >
                  {cardList}
                </BpkCardListRowRailContainer>
              );
            }

            if (
              layoutDesktop === LAYOUTS.grid &&
              (accessory === ACCESSORY_TYPES.Expand ||
                accessory === ACCESSORY_TYPES.Button)
            ) {
              return (
                <BpkCardListGridStack
                  accessory={accessory}
                  initiallyShownCards={initiallyShownCards}
                  buttonText={buttonText}
                  expandText={expandText}
                  onButtonClick={onButtonClick}
                  layout={layoutDesktop}
                >
                  {cardList}
                </BpkCardListGridStack>
              );
            }
            return <div />;
          }}
        </BpkBreakpoint>
      </div>
    </div>
  );
};

export default BpkCardList;
