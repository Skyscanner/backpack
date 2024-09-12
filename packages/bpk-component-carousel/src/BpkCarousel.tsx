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

import { useRef, useState } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkPageIndicator, { VARIANT } from '../../bpk-component-page-indicator';
import { cssModules } from '../../bpk-react-utils';

import BpkCarouselContainer from './BpkCarouselContainer';
import { useScrollToInitialImage } from './utils';

import type { Props } from './types';

import STYLES from './BpkCarousel.module.scss';

const getClassName = cssModules(STYLES);

const BpkCarousel = ({
  bottom,
  images,
  initialImageIndex = 0,
  onImageChanged = null,
}: Props) => {
  const [shownImageIndex, updateShownImageIndex] = useState(initialImageIndex);
  const imagesRef = useRef<Array<HTMLElement | null>>([]);

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
          variant={VARIANT.overImage}
          indicatorLabel="Go to slide"
          prevNavLabel="Previous slide"
          nextNavLabel="Next slide"
        />
      </div>
    </div>
  );
};

export default BpkCarousel;
