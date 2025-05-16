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

import BpkPageIndicator from '../../../bpk-component-page-indicator';
import BpkCardListCarousel from './BpkCardListCarousel';
import { cssModules } from '../../../bpk-react-utils';
import {
  ACCESSORY_DESKTOP_TYPES,
  LAYOUTS,
  type CardListRowRailProps,
} from '../common-types';

import STYLES from './BpkCardListRowRailContainer.module.scss';

const getClassName = cssModules(STYLES);

const BpkCardListRowRail = (props: CardListRowRailProps) => {
  const { accessory, children, initiallyShownCards, layout } = props;

  const totalIndicators = children.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  let accessoryContent = null;

  if (layout === LAYOUTS.row && accessory === ACCESSORY_DESKTOP_TYPES.Pagination) {
    accessoryContent = (
      <BpkPageIndicator
        currentIndex={currentIndex}
        totalIndicators={totalIndicators}
        onClick={(_e, index) => {
          setCurrentIndex(index);
        }}
        showNav
        indicatorLabel="Go to slide"
        prevNavLabel="Previous slide"
        nextNavLabel="Next slide"
      />
    );
  }

  return (
    <div
      className={getClassName('bpk-card-list-row-rail')}
      data-testid="bpk-card-list-row-rail')}"
    >
      <BpkCardListCarousel
        children={children}
        initiallyShownCards={initiallyShownCards}
        layout={layout}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <div
        role="region"
        aria-label="pagination"
        className={getClassName(`bpk-card-list-row-rail__accessory`)}
        data-testid="bpk-card-list-row-rail__accessory"
      >
        {accessoryContent}
      </div>
    </div>
  );
};

export default BpkCardListRowRail;
