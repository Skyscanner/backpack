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

import PropTypes from 'prop-types';
import React from 'react';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import { useSwipeable } from 'react-swipeable';
import BpkButton from 'bpk-component-button';
import LeftArrowIcon from 'bpk-component-icon/lg/chevron-left';
import RightArrowIcon from 'bpk-component-icon/lg/chevron-right';
import { isRTL, cssModules } from 'bpk-react-utils';

import STYLES from './BpkPageIndicator.module.scss';

const getClassName = cssModules(STYLES);
const AlignedLeftArrowIcon = withButtonAlignment(withRtlSupport(LeftArrowIcon));
const AlignedRightArrowIcon = withButtonAlignment(
  withRtlSupport(RightArrowIcon),
);
const DISPLAYED_TOTAL = 5;
const START_SCROLL_INDEX = Math.floor(DISPLAYED_TOTAL / 2);

export type Props = {
  className: ?string,
  showNav?: boolean,
  dark?: boolean,
  currentItem: number,
  totalItems: number,
  updateItemCallback?: Function,
  itemClassName?: string,
  activeItemClassName?: string,
  ariaLabel?: string,
};

const KEYS = {
  ENTER: 'Enter',
  SPACE: 'Spacebar',
};

const BpkPageIndicator = (props: Props) => {
  const {
    activeItemClassName,
    ariaLabel,
    className,
    currentItem,
    dark,
    itemClassName,
    showNav,
    totalItems,
    updateItemCallback,
    ...rest
  } = props;
  const classNames = getClassName('bpk-page-indicator', className);

  const updateItem = (index) => {
    let newItem = index;
    if (index < 0) {
      newItem = totalItems - 1;
    }
    if (index >= totalItems) {
      newItem = 0;
    }
    updateItemCallback(newItem);
  };

  const handleKeyboardEvent = (e, index) => {
    if (e.key === KEYS.ENTER || e.key === KEYS.SPACE || e.key === ' ') {
      e.preventDefault();
      updateItemCallback(index);
    }
  };

  const direction = isRTL() ? 1 : -1;
  const handlers = useSwipeable({
    onSwipedLeft: () => updateItem(currentItem - direction),
    onSwipedRight: () => updateItem(currentItem + direction),
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  const bulletArray = [];
  for (let i = 0; i < totalItems; i += 1) {
    bulletArray.push(i);
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div {...handlers} className={classNames} {...rest}>
      {showNav && (
        <BpkButton
          iconOnly
          link
          onClick={() => {
            updateItem(currentItem - 1);
          }}
        >
          <AlignedLeftArrowIcon
            className={dark && getClassName('bpk-page-indicator__dark--arrow')}
          />
        </BpkButton>
      )}
      <div className={getClassName('bpk-page-indicator__container')}>
        <div
          className={getClassName('bpk-page-indicator__bulletsContainer')}
          style={
            currentItem > START_SCROLL_INDEX
              ? {
                  '--scroll-index':
                    totalItems > DISPLAYED_TOTAL
                      ? Math.min(
                          currentItem - START_SCROLL_INDEX,
                          totalItems - DISPLAYED_TOTAL,
                        )
                      : 0,
                }
              : undefined
          }
        >
          {bulletArray.map((index) => (
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                updateItem(index);
              }}
              onKeyDown={(e) => {
                handleKeyboardEvent(e, index);
              }}
              className={getClassName(
                'bpk-page-indicator__bullet',
                index === currentItem && 'bpk-page-indicator__bullet--active',
                index === currentItem && activeItemClassName,
                dark && 'bpk-page-indicator__dark',
                dark &&
                  index === currentItem &&
                  'bpk-page-indicator__dark--active',
                itemClassName,
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
          onClick={() => {
            updateItem(currentItem + 1);
          }}
        >
          <AlignedRightArrowIcon
            className={dark && getClassName('bpk-page-indicator__dark--arrow')}
          />
        </BpkButton>
      )}
    </div>
  );
};

BpkPageIndicator.propTypes = {
  currentItem: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  updateItemCallback: PropTypes.func,
  className: PropTypes.string,
  showNav: PropTypes.bool,
  dark: PropTypes.bool,
  itemClassName: PropTypes.string,
  activeItemClassName: PropTypes.string,
  ariaLabel: PropTypes.string,
};

BpkPageIndicator.defaultProps = {
  updateItemCallback: null,
  className: null,
  ariaLabel: 'Go to Slide',
  itemClassName: null,
  activeItemClassName: null,
  showNav: false,
  dark: false,
};

export default BpkPageIndicator;
