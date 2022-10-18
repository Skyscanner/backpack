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
  totalBullets: number,
  onClick: ?() => void,
  ariaLabel: string,
  dark: ?boolean,
};

const KEYS = {
  ENTER: 'Enter',
  SPACE: 'Spacebar',
};

const BpkPageIndicator = (props: Props) => {
  const {
    ariaLabel,
    className,
    currentIndex,
    dark,
    onClick,
    showNav,
    totalBullets,
  } = props;
  const handleKeyboardEvent = (e, index) => {
    if (e.key === KEYS.ENTER || e.key === KEYS.SPACE || e.key === ' ') {
      e.preventDefault();
      onClick(e, index, DIRECTIONS.BULLETS);
    }
  };

  return (
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
          />
        )}
        <div className={getClassName('bpk-page-indicator__container')}>
          <div
            className={getClassName('bpk-page-indicator__bullets-container')}
            style={
              currentIndex > START_SCROLL_INDEX
                ? {
                    '--scroll-index':
                      totalBullets > DISPLAYED_TOTAL
                        ? Math.min(
                            currentIndex - START_SCROLL_INDEX,
                            totalBullets - DISPLAYED_TOTAL,
                          )
                        : 0,
                  }
                : undefined
            }
          >
            {[...Array(totalBullets)].map((val, index) => (
              <button
                type="button"
                tabIndex={0}
                onClick={(e) => {
                  onClick(e, index, DIRECTIONS.BULLETS);
                }}
                onKeyDown={(e) => {
                  handleKeyboardEvent(e, index);
                }}
                className={getClassName(
                  'bpk-page-indicator__bullet',
                  dark && 'bpk-page-indicator__dark',
                  index === currentIndex &&
                    'bpk-page-indicator__bullet--active',
                  index === currentIndex &&
                    dark &&
                    'bpk-page-indicator__dark--active',
                )}
                aria-label={`${ariaLabel} ${index + 1}`}
                aria-pressed={currentIndex === index ? 'true' : 'false'}
                // eslint-disable-next-line react/no-array-index-key
                key={`bullet-${index}`}
              />
            ))}
          </div>
        </div>
        {showNav && (
          <NavButton
            currentIndex={currentIndex}
            onClick={onClick}
            disabled={currentIndex === totalBullets - 1}
          />
        )}
      </div>
    </div>
  );
};

BpkPageIndicator.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  totalBullets: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  showNav: PropTypes.bool,
  dark: PropTypes.bool,
};

BpkPageIndicator.defaultProps = {
  onClick: null,
  className: null,
  showNav: false,
  dark: false,
};

export default BpkPageIndicator;
