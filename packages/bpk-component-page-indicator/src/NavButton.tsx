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

import type { MouseEvent } from 'react';

import BpkButton, { BUTTON_TYPES } from '../../bpk-component-button';
import { withLargeButtonAlignment, withRtlSupport } from '../../bpk-component-icon';
import LeftArrowIcon from '../../bpk-component-icon/lg/chevron-left';
import RightArrowIcon from '../../bpk-component-icon/lg/chevron-right';
import SmallLeftArrowIcon from '../../bpk-component-icon/sm/chevron-left';
import SmallRightArrowIcon from '../../bpk-component-icon/sm/chevron-right';
import { cssModules } from '../../bpk-react-utils';

import { VARIANT } from './common-types';

import type { Variant } from './common-types';

import STYLES from './BpkPageIndicator.module.scss';

const getClassName = cssModules(STYLES);

export const DIRECTIONS = {
  PREV: 'PREV',
  INDICATORS: 'INDICATORS',
  NEXT: 'NEXT',
} as const;

type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];
type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];

type Props = {
  ariaLabel: string | undefined;
  currentIndex: number;
  direction: Direction;
  disabled?: boolean;
  onClick?: (
    event: MouseEvent<HTMLButtonElement>,
    newIndex: number,
    direction: Direction,
  ) => void;
  type?: ButtonType;
  variant?: Variant;
};

const AlignedLeftArrowIcon = withLargeButtonAlignment(withRtlSupport(LeftArrowIcon));
const AlignedRightArrowIcon = withLargeButtonAlignment(withRtlSupport(RightArrowIcon));
const RtlSmallLeftArrowIcon = withRtlSupport(SmallLeftArrowIcon);
const RtlSmallRightArrowIcon = withRtlSupport(SmallRightArrowIcon);

const NavButton = ({
  ariaLabel,
  currentIndex,
  direction,
  disabled = false,
  onClick = () => {},
  type = BUTTON_TYPES.link,
  variant,
}: Props) => {
  const isCarousel = variant === VARIANT.carousel;
  const PrevIcon = isCarousel ? RtlSmallLeftArrowIcon : AlignedLeftArrowIcon;
  const NextIcon = isCarousel ? RtlSmallRightArrowIcon : AlignedRightArrowIcon;
  const button = (
    <BpkButton
      iconOnly
      type={type}
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={isCarousel ? getClassName('bpk-page-indicator__nav-carousel-button') : undefined}
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
        <PrevIcon />
      ) : (
        <NextIcon />
      )}
    </BpkButton>
  );

  if (isCarousel) {
    return (
      <span className={getClassName('bpk-page-indicator__nav-carousel')}>
        {button}
      </span>
    );
  }

  return button;
};

export default NavButton;
