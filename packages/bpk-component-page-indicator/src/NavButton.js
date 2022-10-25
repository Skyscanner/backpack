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

import { withButtonAlignment, withRtlSupport } from '../../bpk-component-icon';
import BpkButton from '../../bpk-component-button';
import LeftArrowIcon from '../../bpk-component-icon/lg/chevron-left';
import RightArrowIcon from '../../bpk-component-icon/lg/chevron-right';

export const DIRECTIONS = {
  PREV: 'PREV',
  INDICATORS: 'INDICATORS',
  NEXT: 'NEXT',
};

type Props = {
  direction: $Keys<typeof DIRECTIONS>,
  disabled?: boolean,
  currentIndex: number,
  onClick: ?() => void,
  ariaLabel: string,
};

const AlignedLeftArrowIcon = withButtonAlignment(withRtlSupport(LeftArrowIcon));
const AlignedRightArrowIcon = withButtonAlignment(
  withRtlSupport(RightArrowIcon),
);

const NavButton = (props: Props) => {
  const { ariaLabel, currentIndex, direction, disabled, onClick } = props;
  return (
    <BpkButton
      iconOnly
      link
      onClick={(e) => {
        if (direction === DIRECTIONS.PREV) {
          onClick(e, currentIndex - 1, direction);
        } else {
          onClick(e, currentIndex + 1, direction);
        }
      }}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {direction === DIRECTIONS.PREV ? (
        <AlignedLeftArrowIcon />
      ) : (
        <AlignedRightArrowIcon />
      )}
    </BpkButton>
  );
};

NavButton.propTypes = {
  direction: PropTypes.oneOf(Object.keys(DIRECTIONS)).isRequired,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

NavButton.defaultProps = {
  disabled: false,
  onClick: null,
};

export default NavButton;
