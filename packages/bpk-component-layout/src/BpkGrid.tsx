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

import cssModules from '../../bpk-react-utils/src/cssModules';
import { getDataComponentAttribute } from '../../bpk-react-utils/src/getDataComponentAttribute';

import { buildLayoutOutput } from './responsiveStyleBuilder';
import { processBpkComponentProps } from './tokenUtils';

import type { BpkGridProps } from './types';

import STYLES from './BpkLayout.module.scss';
import RESPONSIVE_STYLES from './BpkLayoutResponsive.module.scss';


const getClassName = cssModules(STYLES);
const getResponsiveClassName = cssModules(RESPONSIVE_STYLES);

export const BpkGrid = forwardRef<HTMLDivElement, BpkGridProps>(
  (
    { align, autoColumns, autoFlow, autoRows, backgroundColor, children, color, column, inline, justify, row, templateAreas, templateColumns, templateRows, textStyle, ...props },
    ref,
  ) => {
    const processedProps = processBpkComponentProps(props, {
      component: 'BpkGrid',
      responsiveProps: {
        textStyle,
        justifyContent: justify,
        alignItems: align,
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        gridTemplateAreas: templateAreas,
        gridAutoFlow: autoFlow,
        gridAutoRows: autoRows,
        gridAutoColumns: autoColumns,
        gridColumn: column,
        gridRow: row,
      },
    });
    const { hasResponsive, passthrough, style } = buildLayoutOutput(processedProps);

    // If inline, override display via inline style
    if (inline) {
      (style as any).display = 'inline-grid';
    }

    const colorClasses = (color || backgroundColor)
      ? getClassName(
          'bpk-layout',
          color ? `bpk-layout--${color}` : '',
          backgroundColor ? `bpk-layout--${backgroundColor}` : '',
        )
      : undefined;

    const baseClass = !inline
      ? getResponsiveClassName('bpk-layout-grid')
      : getResponsiveClassName('bpk-layout-inline-grid');

    const responsiveClass = hasResponsive
      ? getResponsiveClassName('bpk-responsive')
      : undefined;

    const className = [baseClass, colorClasses, responsiveClass].filter(Boolean).join(' ') || undefined;

    return (
      <div
        ref={ref}
        className={className}
        style={style}
        {...getDataComponentAttribute('Grid')}
        {...passthrough}
      >
        {children}
      </div>
    );
  },
);

BpkGrid.displayName = 'BpkGrid';

export type { BpkGridProps };
