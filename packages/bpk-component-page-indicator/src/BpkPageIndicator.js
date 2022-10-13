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

import { withButtonAlignment, withRtlSupport } from '../../bpk-component-icon';
import BpkButton from '../../bpk-component-button';
import LeftArrowIcon from '../../bpk-component-icon/lg/chevron-left';
import RightArrowIcon from '../../bpk-component-icon/lg/chevron-right';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkPageIndicator.module.scss';

import React from 'react';
import PropTypes from 'prop-types';

const getClassName = cssModules(STYLES);
const AlignedLeftArrowIcon = withButtonAlignment(withRtlSupport(LeftArrowIcon));
const AlignedRightArrowIcon = withButtonAlignment(
  withRtlSupport(RightArrowIcon),
);
const DISPLAYED_TOTAL = 5;
const START_SCROLL_INDEX = Math.floor(DISPLAYED_TOTAL / 2);

export type Props = {
  className: ?string,
  showNav: ?boolean,
  currentIndex: number,
  totalBullets: number,
  onClick: ?() => void,
  ariaLabel: ?string,
};

const KEYS = {
  ENTER: 'Enter',
  SPACE: 'Spacebar',
};

const DIRECTIONS = {
  PREV: -1,
  BULLETS: 0,
  NEXT: 1,
};

const BpkPageIndicator = (props: Props) => {
  const {
    ariaLabel,
    className,
    currentIndex,
    onClick,
    showNav,
    totalBullets,
    ...rest
  } = props;
  const classNames = getClassName('bpk-page-indicator', className);

  const handleKeyboardEvent = (e, index) => {
    if (e.key === KEYS.ENTER || e.key === KEYS.SPACE || e.key === ' ') {
      e.preventDefault();
      onClick(e, index, DIRECTIONS.BULLETS);
    }
  };

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div className={classNames} {...rest}>
      {showNav && (
        <BpkButton
          iconOnly
          link
          onClick={(e) => {
            onClick(e, currentIndex - 1, DIRECTIONS.PREV);
          }}
          aria-label="Previous Slide"
          disabled={currentIndex === 0}
        >
          <AlignedLeftArrowIcon />
        </BpkButton>
      )}
      <div className={getClassName('bpk-page-indicator__container')}>
        <div
          className={getClassName('bpk-page-indicator__bulletsContainer')}
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
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                onClick(e, index, DIRECTIONS.BULLETS);
              }}
              onKeyDown={(e) => {
                handleKeyboardEvent(e, index);
              }}
              className={getClassName(
                'bpk-page-indicator__bullet',
                index === currentIndex && 'bpk-page-indicator__bullet--active',
              )}
              aria-label={`${ariaLabel} ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {showNav && (
        <BpkButton
          iconOnly
          link
          onClick={(e) => {
            onClick(e, currentIndex + 1, DIRECTIONS.NEXT);
          }}
          aria-label="Next Slide"
          disabled={currentIndex === totalBullets - 1}
        >
          <AlignedRightArrowIcon />
        </BpkButton>
      )}
    </div>
  );
};

BpkPageIndicator.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  totalBullets: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  showNav: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

BpkPageIndicator.defaultProps = {
  onClick: null,
  className: null,
  ariaLabel: 'Go to Slide',
  showNav: false,
};

export default BpkPageIndicator;
