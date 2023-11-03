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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCarouselSlidesIndicator.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  length: number;
  activeIndex: number;
};

const BpkSCarousellidesIndicator = ({ activeIndex, length }: Props) => {
  if (length < 2) return null;

  // scroll starting from 3 dot until last 5, unless there are less than 5
  const activeDotIndex = Math.min(Math.max(0, activeIndex - 2), Math.max(0, length - 5));

  return (
    <div className={getClassName('bpk-carousel-slides-indicator')}>
      <div
        className={getClassName('bpk-carousel-slides-indicator__row')}
        style={
          {
            '--scroll-index': activeDotIndex,
          } as React.CSSProperties
        }
      >
        {Array.from({ length }).map((_, index) => (
          <div
            className={getClassName(`${getClassName('bpk-carousel-slides-indicator__dot')} ${index === activeIndex - 1 || index === activeIndex + 1 ? getClassName('bpk-carousel-slides-indicator__siblingToActive') : ''} ${index === activeIndex ? getClassName('bpk-carousel-slides-indicator__active') : ''}`)}

            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BpkSCarousellidesIndicator;
