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
import useCurrentBreakpoint from './useCurrentBreakpoint';

import type { BpkFlexProps } from './types';

import STYLES from './BpkLayout.module.scss';


const getClassName = cssModules(STYLES);

export const BpkFlex = forwardRef<HTMLDivElement, BpkFlexProps>(
  ({ align, backgroundColor, basis, children, color, direction, grow, inline, justify, shrink, textStyle, wrap, ...props }, ref) => {
    const currentBreakpoint = useCurrentBreakpoint();
    const processedProps = processBpkComponentProps(props, {
      component: 'BpkFlex',
      responsiveProps: {
        textStyle,
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis,
      },
    });
    const { passthrough, style } = buildLayoutOutput(processedProps, currentBreakpoint);

    // Set default display if not already set by a user-provided display prop
    if (!style.display) {
      style.display = inline ? 'inline-flex' : 'flex';
    } else if (inline) {
      style.display = 'inline-flex';
    }

    const className = (color || backgroundColor)
      ? getClassName(
          'bpk-layout',
          color ? `bpk-layout--${color}` : '',
          backgroundColor ? `bpk-layout--${backgroundColor}` : '',
        )
      : undefined;

    return (
      <div
        ref={ref}
        className={className}
        style={style}
        {...getDataComponentAttribute('Flex')}
        {...passthrough}
      >
        {children}
      </div>
    );
  },
);

BpkFlex.displayName = 'BpkFlex';

export type { BpkFlexProps };
