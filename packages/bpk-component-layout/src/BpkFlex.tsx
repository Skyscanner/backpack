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

import type { BpkFlexProps } from './types';

import STYLES from './BpkLayout.module.scss';


const getClassName = cssModules(STYLES);

export const BpkFlex = forwardRef<HTMLDivElement, BpkFlexProps>(
  ({ align, backgroundColor, basis, children, color, direction, grow, inline, justify, shrink, textStyle, wrap, ...props }, ref) => {
    const bp = useBreakpoint();
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
    const { htmlProps, styleProps } = splitProps(processedProps);
    const resolvedStyle = resolveAllResponsive(styleProps, bp);

    // Handle textStyle separately — it was passed through the responsive pipeline
    // but needs to be resolved to actual CSS properties.
    const resolvedTextStyleName = resolvedStyle.textStyle;
    delete resolvedStyle.textStyle;
    if (resolvedTextStyleName) {
      const textStyleCSS = resolveTextStyle(resolvedTextStyleName as string);
      if (textStyleCSS) {
        Object.assign(resolvedStyle, textStyleCSS);
      }
    }

    resolvedStyle.display = inline ? 'inline-flex' : 'flex';

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
        style={resolvedStyle}
        {...getDataComponentAttribute('Flex')}
        {...htmlProps}
      >
        {children}
      </div>
    );
  },
);

BpkFlex.displayName = 'BpkFlex';

export type { BpkFlexProps };
