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

import {BUTTON_TYPES, BpkButtonV2} from '../../bpk-component-button';
import { withButtonAlignment, withRtlSupport } from '../../bpk-component-icon';
import LeftArrowIcon from '../../bpk-component-icon/lg/chevron-left';
import RightArrowIcon from '../../bpk-component-icon/lg/chevron-right';

export const DIRECTIONS = {
  PREV: 'PREV',
  INDICATORS: 'INDICATORS',
  NEXT: 'NEXT',
} as const;

type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];

interface Props {
  ariaLabel: string | undefined,
  currentIndex: number,
  direction: Direction,
  disabled?: boolean,
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    newIndex: number,
    direction: Direction,
  ) => void,
};

const AlignedLeftArrowIcon = withButtonAlignment(withRtlSupport(LeftArrowIcon));
const AlignedRightArrowIcon = withButtonAlignment(
  withRtlSupport(RightArrowIcon),
);

const NavButton: React.FC<Props> = ({
  ariaLabel,
  currentIndex,
  direction,
  disabled = false,
  onClick = () => {},
}: Props) => (
    <BpkButtonV2
      iconOnly
      type={BUTTON_TYPES.link}
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
    </BpkButtonV2>
  );

export default NavButton;
