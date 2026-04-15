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

import type { StyleBreakpointKey } from './tokens';
import type { BpkStackProps } from './types';

import STYLES from './BpkLayout.module.scss';


const getClassName = cssModules(STYLES);

function useStackProps(
  props: Omit<BpkStackProps, 'backgroundColor' | 'children' | 'color'>,
  defaultDirection: string,
  bp: StyleBreakpointKey,
) {
  const processedProps = processBpkComponentProps(props, { component: 'BpkStack' });

  // Map Stack option keys to CSS flex property names before splitting.
  // These come out of processBpkComponentProps with their original names
  // and need to be renamed so splitProps recognises them as CSS properties.
  const { align, direction, justify, wrap: flexWrap, ...rest } = processedProps;
  const mapped: Record<string, any> = { ...rest };
  if (direction !== undefined) mapped.flexDirection = direction;
  if (align !== undefined) mapped.alignItems = align;
  if (justify !== undefined) mapped.justifyContent = justify;
  if (flexWrap !== undefined) mapped.flexWrap = flexWrap;

  const { htmlProps, styleProps } = splitProps(mapped);
  const resolvedStyle = resolveAllResponsive(styleProps, bp);

  // Resolve textStyle
  const resolvedTextStyleName = resolvedStyle.textStyle;
  delete resolvedStyle.textStyle;
  if (resolvedTextStyleName) {
    const textStyleCSS = resolveTextStyle(resolvedTextStyleName as string);
    if (textStyleCSS) {
      Object.assign(resolvedStyle, textStyleCSS);
    }
  }

  resolvedStyle.display = 'flex';
  if (!resolvedStyle.flexDirection) {
    resolvedStyle.flexDirection = defaultDirection;
  }

  return { resolvedStyle, htmlProps };
}

export const BpkStack = forwardRef<HTMLDivElement, BpkStackProps>(({ backgroundColor, children, color, ...props }, ref) => {
  const bp = useBreakpoint();
  const { htmlProps, resolvedStyle } = useStackProps(props, 'column', bp);
  const classNames = (color || backgroundColor)
    ? getClassName(
        'bpk-layout',
        color ? `bpk-layout--${color}` : '',
        backgroundColor ? `bpk-layout--${backgroundColor}` : '',
      )
    : undefined;
  return (
    <div ref={ref} className={classNames} style={resolvedStyle} {...getDataComponentAttribute('Stack')} {...htmlProps}>
      {children}
    </div>
  );
});

BpkStack.displayName = 'BpkStack';

export const BpkHStack = forwardRef<HTMLDivElement, BpkStackProps>(({ backgroundColor, children, color, ...props }, ref) => {
  const bp = useBreakpoint();
  const { htmlProps, resolvedStyle } = useStackProps(props, 'row', bp);
  if (!resolvedStyle.alignItems) resolvedStyle.alignItems = 'center';
  const classNames = (color || backgroundColor)
    ? getClassName(
        'bpk-layout',
        color ? `bpk-layout--${color}` : '',
        backgroundColor ? `bpk-layout--${backgroundColor}` : '',
      )
    : undefined;
  return (
    <div ref={ref} className={classNames} style={resolvedStyle} {...getDataComponentAttribute('HStack')} {...htmlProps}>
      {children}
    </div>
  );
});

BpkHStack.displayName = 'BpkHStack';

export const BpkVStack = forwardRef<HTMLDivElement, BpkStackProps>(({ backgroundColor, children, color, ...props }, ref) => {
  const bp = useBreakpoint();
  const { htmlProps, resolvedStyle } = useStackProps(props, 'column', bp);
  if (!resolvedStyle.alignItems) resolvedStyle.alignItems = 'center';
  const classNames = (color || backgroundColor)
    ? getClassName(
        'bpk-layout',
        color ? `bpk-layout--${color}` : '',
        backgroundColor ? `bpk-layout--${backgroundColor}` : '',
      )
    : undefined;
  return (
    <div ref={ref} className={classNames} style={resolvedStyle} {...getDataComponentAttribute('VStack')} {...htmlProps}>
      {children}
    </div>
  );
});

BpkVStack.displayName = 'BpkVStack';

export type { BpkStackProps };
