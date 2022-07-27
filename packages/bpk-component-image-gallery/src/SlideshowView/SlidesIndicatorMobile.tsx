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

import React from 'react';

import type { ImageEntry } from '../types';

import STYLES from './SlidesIndicatorMobile.module.scss';

type Props = {
  images: ImageEntry[];
  shownImageIndex: number;
};

const SlidesIndicatorMobile = ({ images, shownImageIndex }: Props) => {
  if (images.length < 2) return null;

  return (
    <div className={STYLES.container}>
      <div
        className={STYLES.row}
        style={
          shownImageIndex > 2
            ? ({
                // the number of "dots" that the element should be scrolled
                '--scroll-index': Math.min(
                  shownImageIndex - 2,
                  images.length - 5,
                ),
              } as React.CSSProperties)
            : undefined
        }
      >
        {images.map((image, index) => {
          const classNames = [STYLES.dot];
          if (index === shownImageIndex) {
            classNames.push(STYLES.active);
          } else if (
            index === shownImageIndex - 1 ||
            index === shownImageIndex + 1
          ) {
            classNames.push(STYLES.siblingToActive);
          }
          return <div className={classNames.join(' ')} key={image.url} />;
        })}
      </div>
    </div>
  );
};

export default SlidesIndicatorMobile;
