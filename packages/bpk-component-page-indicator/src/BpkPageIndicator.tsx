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

import type { CSSProperties, MouseEvent } from 'react';

import { cssModules } from '../../bpk-react-utils';

import NavButton, { DIRECTIONS } from './NavButton';

import STYLES from './BpkPageIndicator.module.scss';

const getClassName = cssModules(STYLES);

const DISPLAYED_TOTAL = 5;
const START_SCROLL_INDEX = Math.floor(DISPLAYED_TOTAL / 2);

export const VARIANT = {
  default: 'default',
  overImage: 'overImage',
} as const;

type Variant = typeof VARIANT[keyof typeof VARIANT];
type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];

export type Props = {
  indicatorLabel?: string,
  prevNavLabel?: string,
  nextNavLabel?: string,
  currentIndex: number,
  totalIndicators: number,
  variant?: Variant,
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    newIndex: number,
    direction: Direction,
  ) => void,
  className?: string,
  showNav?: boolean,
}

const BpkPageIndicator = ({
  className = undefined,
  currentIndex,
  indicatorLabel,
  nextNavLabel,
  onClick = () => {},
  prevNavLabel,
  showNav = false,
  totalIndicators,
  variant = VARIANT.default,
}: Props) => {
  /**
   * This validation is used to avoid an a11y issue when onClick isn't available.
   * In this case, we can set aria-hidden = true to let screen reader skip reading page indicator dots.
   * and render the dot as div rather than button to align with aria-hidden = true.
  */
  const isInteractive = !!onClick;

  type CustomCSSProperties = CSSProperties & {
    '--scroll-index'?: number,
  };

  const customStyle : CustomCSSProperties = {
    '--scroll-index': 
      totalIndicators > DISPLAYED_TOTAL
        ? Math.min(currentIndex - START_SCROLL_INDEX, totalIndicators - DISPLAYED_TOTAL)
        : 0,
  };

  return (
    <div
      className={className}
      aria-hidden={isInteractive ? 'false': 'true'}
      data-testid="indicator-container"
    >
      <div
        className={getClassName(
          'bpk-page-indicator',
          showNav && 'bpk-page-indicator__showNav',
        )}
      >
        {showNav && (
          <NavButton
            currentIndex={currentIndex}
            onClick={onClick}
            disabled={currentIndex === 0}
            direction={DIRECTIONS.PREV}
            ariaLabel={prevNavLabel}
          />
        )}
        <div className={getClassName('bpk-page-indicator__container')}>
          <div
            className={getClassName('bpk-page-indicator__indicators-container')}
            style={
              currentIndex > START_SCROLL_INDEX
                ? customStyle
                : undefined
            }
          >
            {[...Array(totalIndicators)].map((val, index) => isInteractive ? (
              <button
                type="button"
                onClick={(e) => {
                  onClick(e, index, DIRECTIONS.INDICATORS);
                }}
                className={getClassName(
                  'bpk-page-indicator__indicator',
                  `bpk-page-indicator__indicator--${variant}`,
                  index === currentIndex &&
                  `bpk-page-indicator__indicator--active-${variant}`,
                )}
                aria-label={`${indicatorLabel} ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : 'false'}
                // eslint-disable-next-line react/no-array-index-key
                key={`indicator-${index}`}
              />
            ) : (
              <div
                className={getClassName(
                  'bpk-page-indicator__indicator',
                  `bpk-page-indicator__indicator--${variant}`,
                  index === currentIndex &&
                  `bpk-page-indicator__indicator--active-${variant}`,
                )}
                // eslint-disable-next-line react/no-array-index-key
                key={`indicator-${index}`}
              />
            ))}
          </div>
        </div>
        {showNav && (
          <NavButton
            currentIndex={currentIndex}
            onClick={onClick}
            disabled={currentIndex === totalIndicators - 1}
            ariaLabel={nextNavLabel}
            direction={DIRECTIONS.NEXT}
          />
        )}
      </div>
    </div>
  )
};

export default BpkPageIndicator;
