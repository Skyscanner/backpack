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
// @ts-nocheck

import type { MutableRefObject, ReactNode} from 'react';
import { memo, useState } from 'react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import BpkCarouselImage from './BpkCarouselImage';
import { useIntersectionObserver } from './utils';

import type { OnImageChangedHandler } from './types';

import STYLES from './BpkCarouselContainer.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  images: ReactNode[];
  onVisible: (visibleIndex: number) => void;
  imagesRef: MutableRefObject<Array<HTMLElement | null>>;
  onImageChanged: OnImageChangedHandler
};

const BpkScrollContainer = memo(({ images, imagesRef, onImageChanged, onVisible }: Props) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const observeImageChange = useIntersectionObserver(onVisible, {
    root,
    threshold: 0.5,
  }, onImageChanged);
  const observeCycleScroll = useIntersectionObserver(
    (index) => {
      const container = root;
      const imageElement = imagesRef.current && imagesRef.current[index];
      if (container && imageElement) {
        // Some browsers and test environments don't support smooth scrolling,
        // so we must fall back to simply setting scrollLeft
        if (container.scroll && typeof container.scroll === 'function') {
          container.scroll({
            left: imageElement.offsetLeft,
            behavior: 'auto',
          });
        } else {
          container.scrollLeft = imageElement.offsetLeft;
        }
      }
    },
    // when threshold was 1, the loop behaviour (mobile) was not working as expected. This seems to fix it.
    { root, threshold: 0.98 },
  );

  if (images.length === 1) {
    return (
      <div
        className={getClassName('bpk-carousel-container')}
        {...getDataComponentAttribute('CarouselContainer')}
        role="list"
        data-testid="image-gallery-scroll-container"
      >
        <BpkCarouselImage image={images[0]} index={0} />
      </div>
    );
  }

  return (
    <div
      className={getClassName('bpk-carousel-container')}
      {...getDataComponentAttribute('CarouselContainer')}
      ref={setRoot}
      data-testid="image-gallery-scroll-container"
      role="list"
    >
      <BpkCarouselImage
        image={images[images.length - 1]}
        index={images.length - 1}
        ref={(el) => {
          observeCycleScroll(el);
          observeImageChange(el);
        }}
      />
      {images.map((image, index) => (
        <BpkCarouselImage
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          image={image}
          index={index}
          ref={(el) => {
            // eslint-disable-next-line no-param-reassign
            imagesRef.current[index] = el;
            observeImageChange(el);
          }}
        />
      ))}
      <BpkCarouselImage
        image={images[0]}
        index={0}
        ref={(el) => {
          observeCycleScroll(el);
          observeImageChange(el);
        }}
      />
    </div>
  );
});

export default BpkScrollContainer;