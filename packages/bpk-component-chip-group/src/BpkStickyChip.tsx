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

/*
The BpkStickyChip component is a selectable chip with a text icon,
and it has a text fading animation effect when sliding on Mweb.
*/

import { type MutableRefObject, useEffect, useState } from 'react';

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import BpkSelectableChip from '../../bpk-component-chip';
import FilterIconSm from '../../bpk-component-icon/sm/filter';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import type { ChipItem, ChipStyleType } from './BpkMultiSelectChipGroup';

import STYLES from './BpkStickyChip.module.scss';

const getClassName = cssModules(STYLES);

const BpkStickyChip = ({
  chipStyle,
  scrollContainerRef,
  stickyChip,
}: {
  chipStyle: ChipStyleType;
  stickyChip: ChipItem;
  scrollContainerRef: MutableRefObject<HTMLElement | null>;
}) => {
  const [isAtStart, setIsAtStart] = useState(true);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) {
      return () => {};
    }

    const handleScroll = () => {
      const isScrolledToStart = Math.abs(el.scrollLeft) <= 1;
      setIsAtStart(isScrolledToStart);
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => el.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  if (!stickyChip) return null;

  const containerClassNames = getClassName(
    'bpk-sticky-chip-container',
    `bpk-sticky-chip-container--${chipStyle}`,
  );

  return (
    <div className={containerClassNames}>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
        {(isDesktop) => {
          const hideText = !isDesktop && !isAtStart;
          return (
            <BpkSelectableChip
              className={getClassName(
                hideText
                  ? 'bpk-sticky-chip--collapsed'
                  : 'bpk-sticky-chip--expanded',
              )}
              type={chipStyle}
              selected={stickyChip.selected ?? false}
              accessibilityLabel={
                stickyChip.accessibilityLabel || stickyChip.text
              }
              onClick={() => {
                stickyChip.onClick?.(!stickyChip.selected, -1);
              }}
              role="button"
            >
              <span className={getClassName('bpk-sticky-chip')}>
                <FilterIconSm />
                <span
                  className={getClassName(
                    'bpk-sticky-chip--text',
                    hideText
                      ? 'bpk-sticky-chip--hide'
                      : 'bpk-sticky-chip--show',
                  )} {...getDataComponentAttribute('StickyChip')}
                >
                  {stickyChip.text}
                </span>
              </span>
            </BpkSelectableChip>
          );
        }}
      </BpkBreakpoint>
    </div>
  );
};

export default BpkStickyChip;