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
import { useState, Children } from 'react';

import BpkPageIndicator from '../../../bpk-component-page-indicator';
import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';
import { ACCESSORY_DESKTOP_TYPES, LAYOUTS } from '../common-types';

import BpkCardListCarousel from './BpkCardListCarousel';

import type { CardListRowRailProps } from '../common-types';

import STYLES from './BpkCardListRowRailContainer.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListRowRailContainer = (props: CardListRowRailProps) => {
  const {
    accessibilityLabels,
    accessory,
    children,
    initiallyShownCards,
    isMobile = false,
    layout,
  } = props;

  const childrenCount = Children.count(children);
  const totalIndicators = Math.ceil(childrenCount / initiallyShownCards);
  const showAccessory = childrenCount > initiallyShownCards;

  const [currentIndex, setCurrentIndex] = useState(0);

  const accessoryContent =
    layout === LAYOUTS.row &&
    accessory === ACCESSORY_DESKTOP_TYPES.pagination ? (
      <BpkPageIndicator
        currentIndex={currentIndex}
        totalIndicators={totalIndicators}
        onClick={(_e, index) => setCurrentIndex(index)}
        showNav
        indicatorLabel={accessibilityLabels?.indicatorLabel ?? 'Go to slide'}
        prevNavLabel={accessibilityLabels?.prevNavLabel ?? 'Previous slide'}
        nextNavLabel={accessibilityLabels?.nextNavLabel ?? 'Next slide'}
      />
    ) : null;

  return (
    <div
      className={getClassName('bpk-card-list-row-rail')}
      {...getDataComponentAttribute('CardListRowRailContainer')}
      data-testid="bpk-card-list-row-rail"
    >
      <BpkCardListCarousel
        initiallyShownCards={initiallyShownCards}
        layout={layout}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        isMobile={isMobile}
        carouselLabel={accessibilityLabels?.carouselLabel}
        slideLabel={accessibilityLabels?.slideLabel}
      >
        {children}
      </BpkCardListCarousel>

      {accessoryContent && showAccessory && (
        <div
          role="region"
          aria-label="pagination"
          className={getClassName(`bpk-card-list-row-rail__accessory`)}
          data-testid="bpk-card-list-row-rail__accessory"
        >
          {accessoryContent}
        </div>
      )}
    </div>
  );
};

export default BpkCardListRowRailContainer;
