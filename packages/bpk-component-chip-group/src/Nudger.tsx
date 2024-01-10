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

import { BpkButtonV2, BUTTON_TYPES } from '../../bpk-component-button';
import type { ChipStyleType } from './BpkChipGroup';
import { CHIP_TYPES } from '../../bpk-component-chip';
import ArrowLeft from '../../bpk-component-icon/sm/long-arrow-left';
import ArrowRight from '../../bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment } from '../../bpk-component-icon/index';

import STYLES from './Nudger.module.scss';
import { cssModules, isRTL } from '../../bpk-react-utils/index';
import { RefObject, useEffect, useState } from 'react';

const getClassName = cssModules(STYLES);


const CHIP_STYLE_TO_BUTTON_STYLE = {
  [CHIP_TYPES.default]: BUTTON_TYPES.secondary,
  [CHIP_TYPES.onDark]: BUTTON_TYPES.secondaryOnDark,
  [CHIP_TYPES.onImage]: BUTTON_TYPES.primaryOnDark,
}


type Props = {
  chipStyle: ChipStyleType;
  scrollContainerRef: RefObject<HTMLElement>;
  leading?: boolean;
}


const AlignedLeftArrowIcon = withButtonAlignment(ArrowLeft);
const AlignedRightArrowIcon = withButtonAlignment(ArrowRight);

const SCROLL_DISTANCE = 100;

const Nudger = ({chipStyle = CHIP_TYPES.default, leading = false, scrollContainerRef}: Props) => {
  const classNames = getClassName(
    'bpk-chip-group-nudger',
    `bpk-chip-group-nudger--${leading ? "leading" : "trailing"}`
  )

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
      const showLeadingIndicator = scrollValue > 0;
      const showTrailingIndicator = scrollValue < scrollWidth - offsetWidth;

      setShow((leading && showLeadingIndicator) || (!leading && showTrailingIndicator))
    }, 100);
    return () => clearInterval(interval);
  }, [leading, rtl, scrollContainerRef]);

  return show && (
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
