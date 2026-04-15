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

import { forwardRef } from 'react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { resolveTextStyle } from './theme';
import { processBpkComponentProps, splitProps } from './tokenUtils';
import { useBreakpoint, resolveAllResponsive } from './useBreakpoint';

import type { BpkGridItemProps } from './types';

import STYLES from './BpkLayout.module.scss';


const getClassName = cssModules(STYLES);

export const BpkGridItem = forwardRef<HTMLDivElement, BpkGridItemProps>(
  ({ area, backgroundColor, children, colEnd, colSpan, colStart, color, rowEnd, rowSpan, rowStart, textStyle, ...props }, ref) => {
    const bp = useBreakpoint();
    const processedProps = processBpkComponentProps({ textStyle, ...props }, { component: 'BpkGridItem' });
    const { htmlProps, styleProps } = splitProps(processedProps);
    const resolvedStyle = resolveAllResponsive(styleProps, bp);

    const resolvedTextStyleName = resolvedStyle.textStyle;
    delete resolvedStyle.textStyle;
    if (resolvedTextStyleName) {
      const textStyleCSS = resolveTextStyle(resolvedTextStyleName as string);
      if (textStyleCSS) {
        Object.assign(resolvedStyle, textStyleCSS);
      }
    }

    // Map grid item placement props to CSS properties
    if (area) resolvedStyle.gridArea = area;
    if (colSpan) resolvedStyle.gridColumn = `span ${colSpan}/span ${colSpan}`;
    if (colStart) resolvedStyle.gridColumnStart = colStart;
    if (colEnd) resolvedStyle.gridColumnEnd = colEnd;
    if (rowSpan) resolvedStyle.gridRow = `span ${rowSpan}/span ${rowSpan}`;
    if (rowStart) resolvedStyle.gridRowStart = rowStart;
    if (rowEnd) resolvedStyle.gridRowEnd = rowEnd;

    const classNames = (color || backgroundColor)
      ? getClassName(
          'bpk-layout',
          color ? `bpk-layout--${color}` : '',
          backgroundColor ? `bpk-layout--${backgroundColor}` : '',
        )
      : undefined;

    return (
      <div
        ref={ref}
        className={classNames}
        style={Object.keys(resolvedStyle).length > 0 ? resolvedStyle : undefined}
        {...getDataComponentAttribute('GridItem')}
        {...htmlProps}
      >
        {children}
      </div>
    );
  },
);

BpkGridItem.displayName = 'BpkGridItem';

export type { BpkGridItemProps };
