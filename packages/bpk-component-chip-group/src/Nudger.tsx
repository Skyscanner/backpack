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
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import ArrowLeft from '../../bpk-component-icon/sm/long-arrow-left';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import ArrowRight from '../../bpk-component-icon/sm/long-arrow-right';
import { cssModules, isRTL } from '../../bpk-react-utils/index';
import { withButtonAlignment } from '../../bpk-component-icon/index';

import type { ChipStyleType } from './BpkChipGroup';
import STYLES from './Nudger.module.scss';

const getClassName = cssModules(STYLES);


const CHIP_STYLE_TO_BUTTON_STYLE = {
  [CHIP_TYPES.default]: BUTTON_TYPES.secondary,
  [CHIP_TYPES.onDark]: BUTTON_TYPES.secondaryOnDark,
  [CHIP_TYPES.onImage]: BUTTON_TYPES.primaryOnDark,
}


type Props = {
  chipStyle?: ChipStyleType;
  scrollContainerRef: MutableRefObject<HTMLElement | null>;
  leading?: boolean;
}


const AlignedLeftArrowIcon = withButtonAlignment(ArrowLeft);
const AlignedRightArrowIcon = withButtonAlignment(ArrowRight);

// TODO: how many px to scroll on click?
const SCROLL_DISTANCE = 100;

const Nudger = ({chipStyle = CHIP_TYPES.default, leading = false, scrollContainerRef}: Props) => {
  const [show, setShow] = useState(false);

  const rtl = isRTL();
  const isLeft = (leading && !rtl) || (!leading && rtl);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollContainerRef.current) {
        return;
      }

      const { offsetWidth, scrollLeft, scrollWidth } = scrollContainerRef.current;
      const scrollValue = rtl ? -Math.floor(scrollLeft) : Math.ceil(scrollLeft);
      const showLeading = scrollValue > 0;
      const showTrailing = scrollValue < scrollWidth - offsetWidth;

      setShow((leading && showLeading) || (!leading && showTrailing))
    }, 100);
    return () => clearInterval(interval);
  }, [leading, rtl, scrollContainerRef]);

  const classNames = getClassName(
    'bpk-chip-group-nudger',
    `bpk-chip-group-nudger--${leading ? "leading" : "trailing"}`,
    !show && `bpk-chip-group-nudger--hidden`,
  )

  return (
      <BpkButtonV2
        className={classNames}
        type={CHIP_STYLE_TO_BUTTON_STYLE[chipStyle]}
        iconOnly
        disabled={!show}
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
  );
}

export default Nudger;
