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

import { useScrollToInitialImage } from './utils';
import BpkCarouselContainer from './BpkCarouselContainer';
import type { Props } from './types';
import STYLES from './BpkCarousel.module.scss';

const getClassName = cssModules(STYLES);

const BpkCarousel = ({
  images,
  indicatorClassName,
  indicatorLabel = 'go to slide',
  initialImageIndex = 0,
  onImageChanged = null,
}: Props) => {
  const [shownImageIndex, updateShownImageIndex] = useState(initialImageIndex);
  const imagesRef = useRef<Array<HTMLElement | null>>([]);

  useScrollToInitialImage(initialImageIndex!, imagesRef);

  return (
    <>
      <BpkCarouselContainer
        images={images}
        onVisible={updateShownImageIndex}
        imagesRef={imagesRef}
        onImageChanged={onImageChanged}
      />
      <BpkPageIndicator
        currentIndex={shownImageIndex}
        totalIndicators={images.length}
        className={getClassName('bpk-carousel-slides-indicator', indicatorClassName)}
        variant={VARIANT.overImage}
        indicatorLabel={indicatorLabel}
        prevNavLabel="Previous slide"
        nextNavLabel="Next slide"
      />
    </>
  );
};

export default BpkCarousel;
