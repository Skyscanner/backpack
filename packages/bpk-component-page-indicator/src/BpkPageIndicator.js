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
/* @flow strict */

import React from 'react';
import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';

import NavButton, { DIRECTIONS } from './NavButton';
import STYLES from './BpkPageIndicator.module.scss';

const getClassName = cssModules(STYLES);

const DISPLAYED_TOTAL = 5;
const START_SCROLL_INDEX = Math.floor(DISPLAYED_TOTAL / 2);

export type Props = {
  className: ?string,
  showNav: ?boolean,
  currentIndex: number,
  totalIndicators: number,
  onClick: ?() => void,
  indicatorLabel: string,
  prevNavLabel: string,
  nextNavLabel: string,
  overImage: ?boolean,
};

const BpkPageIndicator = ({
  className,
  currentIndex,
  indicatorLabel,
  nextNavLabel,
  onClick,
  overImage,
  prevNavLabel,
  showNav,
  totalIndicators,
}: Props) => (
  // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
  <div className={className}>
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
          prev
          ariaLabel={prevNavLabel}
        />
      )}
      <div className={getClassName('bpk-page-indicator__container')}>
        <div
          className={getClassName('bpk-page-indicator__indicators-container')}
          style={
            currentIndex > START_SCROLL_INDEX
              ? {
                  '--scroll-index':
                    totalIndicators > DISPLAYED_TOTAL
                      ? Math.min(
                          currentIndex - START_SCROLL_INDEX,
                          totalIndicators - DISPLAYED_TOTAL,
                        )
                      : 0,
                }
              : undefined
          }
        >
          {[...Array(totalIndicators)].map((val, index) => (
            <button
              type="button"
              onClick={(e) => {
                onClick(e, index, DIRECTIONS.INDICATORS);
              }}
              className={getClassName(
                'bpk-page-indicator__indicator',
                overImage && 'bpk-page-indicator__over-image',
                index === currentIndex &&
                  'bpk-page-indicator__indicator--active',
                index === currentIndex &&
                  overImage &&
                  'bpk-page-indicator__over-image--active',
              )}
              aria-label={`${indicatorLabel} ${index + 1}`}
              aria-pressed={currentIndex === index ? 'true' : 'false'}
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
        />
      )}
    </div>
  </div>
);

BpkPageIndicator.propTypes = {
  indicatorLabel: PropTypes.string.isRequired,
  prevNavLabel: PropTypes.string.isRequired,
  nextNavLabel: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  totalIndicators: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  showNav: PropTypes.bool,
  overImage: PropTypes.bool,
};

BpkPageIndicator.defaultProps = {
  onClick: null,
  className: null,
  showNav: false,
  overImage: false,
};

export default BpkPageIndicator;
