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

import React, { useEffect, useRef } from 'react';

import type { ImageEntry } from '../types';

import {
  useInfiniteContainerScrollHandler,
  useUpdateShownImageIndexWhenVisible,
} from './utils';
import STYLES from './ScrollContainer.module.scss';

type Props = {
  images: ImageEntry[];
  shownImageIndex: number;
  updateShownImageIndex: React.Dispatch<React.SetStateAction<number>>;
  shownImageRef: React.MutableRefObject<HTMLDivElement | null>;
};

const ScrollContainer = ({
  images,
  shownImageIndex,
  shownImageRef,
  updateShownImageIndex,
}: Props) => {
  const [containerRef, observe] = useUpdateShownImageIndexWhenVisible(
    updateShownImageIndex,
  );
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.focus();
    }
  }, []);

  const onContainerScroll = useInfiniteContainerScrollHandler();

  if (images.length === 1) {
    return (
      <div
        className={STYLES.container}
        data-testid="image-gallery-scroll-container"
        // https://accessibilityinsights.io/info-examples/web/scrollable-region-focusable/
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={innerRef}
      >
        <Image image={images[0]} index={0} />
      </div>
    );
  }

  return (
    <div
      className={STYLES.container}
      // https://accessibilityinsights.io/info-examples/web/scrollable-region-focusable/
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      ref={(node) => {
        containerRef(node);
        innerRef.current = node;
      }}
      onScroll={onContainerScroll}
      data-testid="image-gallery-scroll-container"
    >
      <Image
        image={images[images.length - 1]}
        index={images.length - 1}
        key="scroll-to-last"
      />
      {images.map((image, index) => (
        <Image
          key={image.url}
          image={image}
          index={index}
          ref={(el) => {
            if (index === shownImageIndex) {
              // eslint-disable-next-line no-param-reassign
              shownImageRef.current = el;
            }
            observe(el);
          }}
        />
      ))}
      <Image image={images[0]} index={0} key="scroll-to-first" />
    </div>
  );
};

type ImageProps = {
  image: ImageEntry;
  index: number;
};
const Image = React.forwardRef<HTMLDivElement, ImageProps>(
  ({ image, index }, ref) => (
    <div
      className={STYLES.imageContainer}
      key={image.url}
      data-index={index}
      ref={ref}
    >
      <img src={image.url} alt="" className={STYLES.image} />
    </div>
  ),
);

export default ScrollContainer;
