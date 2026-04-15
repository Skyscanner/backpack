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

import { buildLayoutOutput } from './responsiveStyleBuilder';
import { processBpkComponentProps } from './tokenUtils';

import type { BpkGridItemProps } from './types';

import STYLES from './BpkLayout.module.scss';
import RESPONSIVE_STYLES from './BpkLayoutResponsive.module.scss';


const getClassName = cssModules(STYLES);
const getResponsiveClassName = cssModules(RESPONSIVE_STYLES);

export const BpkGridItem = forwardRef<HTMLDivElement, BpkGridItemProps>(
  ({ area, backgroundColor, children, colEnd, colSpan, colStart, color, rowEnd, rowSpan, rowStart, textStyle, ...props }, ref) => {
    const processedProps = processBpkComponentProps({ textStyle, ...props }, { component: 'BpkGridItem' });
    const { hasResponsive, passthrough, style } = buildLayoutOutput(processedProps);

    // Apply grid item placement props as inline styles
    if (area != null) (style as any).gridArea = area;
    // Use "span N / span N" format to ensure forward-only spanning
    if (colSpan != null) (style as any).gridColumn = `span ${colSpan}/span ${colSpan}`;
    if (colStart != null) (style as any).gridColumnStart = String(colStart);
    if (colEnd != null) (style as any).gridColumnEnd = String(colEnd);
    if (rowSpan != null) (style as any).gridRow = `span ${rowSpan}/span ${rowSpan}`;
    if (rowStart != null) (style as any).gridRowStart = String(rowStart);
    if (rowEnd != null) (style as any).gridRowEnd = String(rowEnd);

    const colorClasses = (color || backgroundColor)
      ? getClassName(
          'bpk-layout',
          color ? `bpk-layout--${color}` : '',
          backgroundColor ? `bpk-layout--${backgroundColor}` : '',
        )
      : undefined;

    const responsiveClass = hasResponsive
      ? getResponsiveClassName('bpk-responsive')
      : undefined;

    const className = [colorClasses, responsiveClass].filter(Boolean).join(' ') || undefined;

    return (
      <div
        ref={ref}
        className={className}
        style={style}
        {...getDataComponentAttribute('GridItem')}
        {...passthrough}
      >
        {children}
      </div>
    );
  },
);

BpkGridItem.displayName = 'BpkGridItem';

export type { BpkGridItemProps };
