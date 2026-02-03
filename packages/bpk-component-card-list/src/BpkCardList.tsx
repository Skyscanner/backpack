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
import BpkButton from '../../bpk-component-button';
import BpkSectionHeader from '../../bpk-component-section-header';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

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

const DEFAULT_ITEMS_DESKTOP = 3;
const DEFAULT_ITEMS_MOBILE = 2;

const BpkCardList = (props: CardListProps) => {
  const {
    accessibilityLabels,
    accessoryDesktop,
    accessoryMobile,
    buttonContent,
    buttonHref,
    cardList,
    chipGroup,
    description,
    expandText,
    initiallyShownCardsDesktop = DEFAULT_ITEMS_DESKTOP,
    initiallyShownCardsMobile = DEFAULT_ITEMS_MOBILE,
    layoutDesktop,
    layoutMobile,
    onButtonClick,
    onExpandClick,
    title,
  } = props;

  const shouldShowHeaderButton = (isMobile: boolean) => {
    if (!buttonContent) return false;
    if (isMobile) {
      return accessoryMobile !== ACCESSORY_MOBILE_TYPES.button;
    }
    return accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.button;
  };

  const headerButton = buttonContent && (
    <BpkButton
      onClick={onButtonClick}
      href={buttonHref}
      data-testid="bpk-card-list-header-button"
    >
      {buttonContent}
    </BpkButton>
  );

  return (
    <div
      className={getClassName('bpk-card-list')}
      {...getDataComponentAttribute('CardList')}
      data-testid="bpk-card-list"
    >
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {(isMobile) => (
          <>
            {(title !== undefined) && (
              <BpkSectionHeader
                title={title}
                description={description}
                button={shouldShowHeaderButton(isMobile) ? headerButton : null}
              />
            )}

            {chipGroup}

            <div
              className={getClassName('bpk-card-list--card-list')}
              data-testid="bpk-card-list--card-list"
            >
              {isMobile ? (
                <>
                  {layoutMobile === LAYOUTS.rail && (
                    <BpkCardListRowRailContainer
                      initiallyShownCards={initiallyShownCardsMobile}
                      layout={layoutMobile}
                      accessibilityLabels={accessibilityLabels}
                      isMobile
                    >
                      {cardList}
                    </BpkCardListRowRailContainer>
                  )}
                  {layoutMobile === LAYOUTS.stack && (
                    <BpkCardListGridStack
                      accessory={accessoryMobile}
                      initiallyShownCards={initiallyShownCardsMobile}
                      buttonContent={buttonContent}
                      expandText={expandText}
                      onButtonClick={onButtonClick}
                      onExpandClick={onExpandClick}
                      layout={layoutMobile}
                      buttonHref={buttonHref}
                    >
                      {cardList}
                    </BpkCardListGridStack>
                  )}
                </>
              ) : (
                <>
                  {layoutDesktop === LAYOUTS.row &&
                    accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.expand &&
                    accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.button && (
                      <BpkCardListRowRailContainer
                        accessory={accessoryDesktop}
                        initiallyShownCards={initiallyShownCardsDesktop}
                        layout={layoutDesktop}
                        accessibilityLabels={accessibilityLabels}
                      >
                        {cardList}
                      </BpkCardListRowRailContainer>
                    )}
                  {layoutDesktop === LAYOUTS.grid &&
                    accessoryDesktop !== ACCESSORY_DESKTOP_TYPES.pagination && (
                      <BpkCardListGridStack
                        accessory={accessoryDesktop}
                        initiallyShownCards={initiallyShownCardsDesktop}
                        buttonContent={buttonContent}
                        expandText={expandText}
                        onButtonClick={onButtonClick}
                        onExpandClick={onExpandClick}
                        layout={layoutDesktop}
                        buttonHref={buttonHref}
                      >
                        {cardList}
                      </BpkCardListGridStack>
                    )}
                </>
              )}
            </div>
          </>
        )}
      </BpkBreakpoint>
    </div>
  );
};

export default BpkCardList;