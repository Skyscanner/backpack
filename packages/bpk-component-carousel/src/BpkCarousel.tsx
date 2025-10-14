/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2022 Skyscanner Ltd
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

import { type MouseEvent, useRef, useState } from 'react';

import { BREAKPOINTS, useMediaQuery } from '../../bpk-component-breakpoint';
import BpkPageIndicator, { DIRECTIONS, VARIANT } from '../../bpk-component-page-indicator';
import { cssModules } from '../../bpk-react-utils';

import BpkCarouselContainer from './BpkCarouselContainer';
import { scrollToIndex, useScrollToInitialImage } from './utils';

import type { Props } from './types';

import STYLES from './BpkCarousel.module.scss';

const getClassName = cssModules(STYLES);

const BpkCarousel = ({
  accessibilityLabels = {},
  bottom,
  images,
  initialImageIndex = 0,
  onImageChanged = null,
  }: Props) => {
  const [shownImageIndex, updateShownImageIndex] = useState(initialImageIndex);
  const imagesRef = useRef<Array<HTMLElement | null>>([]);
  const isDesktop = useMediaQuery(BREAKPOINTS.ABOVE_TABLET);

  const handleIndicatorClick = (
    e: MouseEvent<HTMLButtonElement>,
    newIndex: number,
  )  => {
    e?.stopPropagation?.();
    let target = newIndex;
    if (newIndex === -1) target = images.length - 1;
    else if (newIndex === images.length) target = 0;

    if (target !== shownImageIndex) scrollToIndex(target, imagesRef);
  };

  useScrollToInitialImage(initialImageIndex!, imagesRef);

  return (
    <div className={getClassName('bpk-carousel')}>
      <BpkCarouselContainer
        images={images}
        onVisible={updateShownImageIndex}
        imagesRef={imagesRef}
        onImageChanged={onImageChanged}
      />
      <div
        className={getClassName('bpk-carousel__page-indicator-over-image')}
        style={bottom ? {
          bottom
        } : undefined}
        data-testid="carousel-page-indicator-container"
      >
        <BpkPageIndicator
          currentIndex={shownImageIndex}
          totalIndicators={images.length}
          variant={VARIANT.overImageSpaced}
          indicatorLabel={accessibilityLabels.indicatorLabel ?? "Go to slide"}
          prevNavLabel={accessibilityLabels.prevNavLabel ?? "Previous slide"}
          nextNavLabel={accessibilityLabels.nextNavLabel ?? "Next slide"}
          showNav={isDesktop}
          onClick={isDesktop ? handleIndicatorClick : () => {}}
        />
      </div>
    </div>
  );
};

export default BpkCarousel;
