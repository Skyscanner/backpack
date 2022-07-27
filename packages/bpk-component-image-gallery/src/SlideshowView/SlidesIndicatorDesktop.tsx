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

import React, { useLayoutEffect, useRef } from 'react';

import type { ImageEntry } from '../types';

import STYLES from './SlidesIndicatorDesktop.module.scss';
import { getResizedImage } from './utils';

type Props = {
  images: ImageEntry[];
  shownImageIndex: number;
  updateShownImageIndex: (index: number) => void;
};

const SlidesIndicatorDesktop = ({
  images,
  shownImageIndex,
  updateShownImageIndex,
}: Props) => {
  const activeThumbnailRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    activeThumbnailRef.current?.scrollIntoView({
      block: 'nearest',
    });
  }, [shownImageIndex]);

  return (
    <div className={STYLES.row} role="list">
      {images.map((image, index) => (
        <div
          role="listitem"
          key={image.url}
          ref={index === shownImageIndex ? activeThumbnailRef : undefined}
        >
          <button
            type="button"
            className={STYLES.thumbnail}
            aria-current={shownImageIndex === index}
            onClick={() => updateShownImageIndex(index)}
          >
            <img
              src={getResizedImage(image.url, '160px:160px', 80)}
              alt=""
              className={STYLES.image}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SlidesIndicatorDesktop;
