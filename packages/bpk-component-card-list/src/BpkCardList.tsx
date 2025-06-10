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

import BpkCardListGridStack from './BpkCardListGridStack';
import BpkCardListRowRailContainer from './BpkCardListRowRail';
import {
  ACCESSORY_DESKTOP_TYPES,
  ACCESSORY_MOBILE_TYPES,
  LAYOUTS,
} from './common-types';

import type CardListProps from './common-types';

import STYLES from './BpkCardList.module.scss';

const getClassName = cssModules(STYLES);

const DEFAULT_ITEMS = 3;

const BpkCardList = (props: CardListProps) => {
  const {
    accessoryDesktop,
    accessoryMobile,
    buttonHref,
    buttonText,
    cardList,
    chipGroup,
    description,
    expandText,
    initiallyShownCards = DEFAULT_ITEMS,
    layoutDesktop,
    layoutMobile,
    onButtonClick,
    onExpandClick,
    title,
  } = props;

  const [showHeaderButton, setShowHeaderButton] = useState(false);

  const headerButton = buttonText && (
    <BpkButtonV2
      onClick={onButtonClick}
      href={buttonHref}
      data-testid="bpk-card-list-header-button"
    >
      {buttonText}
    </BpkButtonV2>
  );

  return (
    <div className={getClassName('bpk-card-list')} data-testid="bpk-card-list">
      <BpkSectionHeader
        title={title}
        description={description}
        button={showHeaderButton ? headerButton : null}
      />

      {chipGroup}

      <div
        className={getClassName('bpk-card-list--card-list')}
        data-testid="bpk-card-list--card-list"
      >
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          {(isActive) => {
            if (isActive) {
              setShowHeaderButton(
                !!buttonText &&
                  accessoryMobile !== ACCESSORY_MOBILE_TYPES.button,
              );

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

              if (layoutMobile === LAYOUTS.stack) {
                return (
                  <BpkCardListGridStack
                    accessory={accessoryMobile}
                    initiallyShownCards={initiallyShownCards}
                    buttonText={buttonText}
                    expandText={expandText}
                    onButtonClick={onButtonClick}
                    onExpandClick={onExpandClick}
                    layout={layoutMobile}
                    buttonHref={buttonHref}
                  >
                    {cardList}
                  </BpkCardListGridStack>
                );
              }
            }

            /// ///// Desktop Cases ////////
            setShowHeaderButton(
              !!buttonText &&
                accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.button,
            );

            if (
              layoutDesktop === LAYOUTS.row &&
              accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.expand &&
              accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.button
            ) {
              return (
                <BpkCardListRowRailContainer
                  accessory={accessoryDesktop}
                  initiallyShownCards={initiallyShownCards}
                  layout={layoutDesktop}
                >
                  {cardList}
                </BpkCardListRowRailContainer>
              );
            }

            if (
              layoutDesktop === LAYOUTS.grid &&
              accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.pagination
            ) {
              return (
                <BpkCardListGridStack
                  accessory={accessoryDesktop}
                  initiallyShownCards={initiallyShownCards}
                  buttonText={buttonText}
                  expandText={expandText}
                  onButtonClick={onButtonClick}
                  onExpandClick={onExpandClick}
                  layout={layoutDesktop}
                  buttonHref={buttonHref}
                >
                  {cardList}
                </BpkCardListGridStack>
              );
            }

            return null;
          }}
        </BpkBreakpoint>
      </div>
    </div>
  );
};

export default BpkCardList;
