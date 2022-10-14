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

import PropTypes from 'prop-types';
import React from 'react';

export type Props = {
  prev?: boolean,
  disabled?: boolean,
  currentIndex: number,
  onClick: ?() => void,
};

export const DIRECTIONS = {
  PREV: -1,
  BULLETS: 0,
  NEXT: 1,
};

const AlignedLeftArrowIcon = withButtonAlignment(withRtlSupport(LeftArrowIcon));
const AlignedRightArrowIcon = withButtonAlignment(
  withRtlSupport(RightArrowIcon),
);

const NavButton = (props: Props) => {
  const { currentIndex, disabled, onClick, prev } = props;
  return (
    <BpkButton
      iconOnly
      link
      onClick={(e) => {
        if (prev) {
          onClick(e, currentIndex - 1, DIRECTIONS.PREV);
        } else {
          onClick(e, currentIndex + 1, DIRECTIONS.NEXT);
        }
      }}
      aria-label={prev ? 'Previous Slide' : 'Next Slide'}
      disabled={disabled}
    >
      {prev ? <AlignedLeftArrowIcon /> : <AlignedRightArrowIcon />}
    </BpkButton>
  );
};

NavButton.propTypes = {
  prev: PropTypes.bool,
  disabled: PropTypes.bool,
  currentIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

NavButton.defaultProps = {
  prev: false,
  disabled: false,
  onClick: null,
};

export default NavButton;
