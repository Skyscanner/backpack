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

import { type MutableRefObject, useEffect, useState } from 'react';

import { BpkButtonV2, BUTTON_TYPES } from '../../bpk-component-button';
import { CHIP_TYPES } from '../../bpk-component-chip';
import { withButtonAlignment } from '../../bpk-component-icon/index';
import ArrowLeft from '../../bpk-component-icon/sm/long-arrow-left';
import ArrowRight from '../../bpk-component-icon/sm/long-arrow-right';
import { cssModules, isRTL } from '../../bpk-react-utils/index';

import type { ChipStyleType } from './BpkMultiSelectChipGroup';

import STYLES from './Nudger.module.scss';

const getClassName = cssModules(STYLES);

const CHIP_STYLE_TO_BUTTON_STYLE = {
  [CHIP_TYPES.default]: BUTTON_TYPES.secondary,
  [CHIP_TYPES.onDark]: BUTTON_TYPES.secondaryOnDark,
  [CHIP_TYPES.onImage]: BUTTON_TYPES.primaryOnDark,
}

export const POSITION = {
  leading: 'leading',
  trailing: 'trailing',
} as const;

type Props = {
  ariaLabel: string;
  chipStyle?: ChipStyleType;
  scrollContainerRef: MutableRefObject<HTMLElement | null>;
  position: (typeof POSITION)[keyof typeof POSITION];
}

const AlignedLeftArrowIcon = withButtonAlignment(ArrowLeft);
const AlignedRightArrowIcon = withButtonAlignment(ArrowRight);

// Chosen based on feeling good with the example stories
const SCROLL_DISTANCE = 150;

// Threshold to account for minor scroll rounding errors near edges
const SCROLL_MARGIN = 2;

const Nudger = ({
  ariaLabel,
  chipStyle = CHIP_TYPES.default,
  position,
  scrollContainerRef
}: Props) => {
  const [show, setShow] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const leading = position === POSITION.leading;
  const rtl = isRTL();
  const isLeft = (leading && !rtl) || (!leading && rtl);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollContainerRef.current) {
        return;
      }

      const { offsetWidth, scrollLeft, scrollWidth } = scrollContainerRef.current;
      const scrollValue = rtl ? -Math.floor(scrollLeft) : Math.ceil(scrollLeft);
      const maxScrollValue = scrollWidth - offsetWidth;
      const showLeading = scrollValue > SCROLL_MARGIN;
      const showTrailing = scrollValue < maxScrollValue - SCROLL_MARGIN;

      setShow(showLeading || showTrailing);
      setEnabled((leading && showLeading) || (!leading && showTrailing))
    }, 100);
    return () => clearInterval(interval);
  }, [leading, rtl, scrollContainerRef]);

  const classNames = getClassName(
    'bpk-chip-group-nudger',
    `bpk-chip-group-nudger--${leading ? "leading" : "trailing"}`,
  )

  return show ? (
    <div className={classNames}>
      <BpkButtonV2
        title={ariaLabel}
        type={CHIP_STYLE_TO_BUTTON_STYLE[chipStyle]}
        iconOnly
        disabled={!enabled}
        onClick={() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
              left: isLeft ? -SCROLL_DISTANCE : SCROLL_DISTANCE,
              behavior: 'smooth',
            });
          }
        }}
      >
        {isLeft ? <AlignedLeftArrowIcon /> : <AlignedRightArrowIcon />}
      </BpkButtonV2>
    </div>
  ) : null;
}

export default Nudger;
