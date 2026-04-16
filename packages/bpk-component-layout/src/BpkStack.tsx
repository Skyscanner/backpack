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

import type { BpkStackProps } from './types';

import STYLES from './BpkLayout.module.scss';
import RESPONSIVE_STYLES from './BpkLayoutResponsive.module.scss';


const getClassName = cssModules(STYLES);
const getResponsiveClassName = cssModules(RESPONSIVE_STYLES);

export const BpkStack = forwardRef<HTMLDivElement, BpkStackProps>(({ align, backgroundColor, children, color, direction, justify, wrap, ...props }, ref) => {
  const processedProps = processBpkComponentProps(props, {
    component: 'BpkStack',
    responsiveProps: {
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexDirection: direction,
    },
  });
  const { hasResponsive, passthrough, style } = buildLayoutOutput(processedProps);
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
  const className = [getResponsiveClassName('bpk-layout-vstack'), colorClasses, responsiveClass].filter(Boolean).join(' ') || undefined;
  return (
    <div ref={ref} className={className} style={style} {...getDataComponentAttribute('Stack')} {...passthrough}>
      {children}
    </div>
  );
});

BpkStack.displayName = 'BpkStack';

export const BpkHStack = forwardRef<HTMLDivElement, BpkStackProps>(({ align = 'center', backgroundColor, children, color, direction = 'row', justify, wrap, ...props }, ref) => {
  const processedProps = processBpkComponentProps(props, {
    component: 'BpkStack',
    responsiveProps: {
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexDirection: direction,
    },
  });
  const { hasResponsive, passthrough, style } = buildLayoutOutput(processedProps);
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
  const className = [getResponsiveClassName('bpk-layout-hstack'), colorClasses, responsiveClass].filter(Boolean).join(' ') || undefined;
  return (
    <div ref={ref} className={className} style={style} {...getDataComponentAttribute('HStack')} {...passthrough}>
      {children}
    </div>
  );
});

BpkHStack.displayName = 'BpkHStack';

export const BpkVStack = forwardRef<HTMLDivElement, BpkStackProps>(({ align = 'center', backgroundColor, children, color, direction = 'column', justify, wrap, ...props }, ref) => {
  const processedProps = processBpkComponentProps(props, {
    component: 'BpkStack',
    responsiveProps: {
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap,
      flexDirection: direction,
    },
  });
  const { hasResponsive, passthrough, style } = buildLayoutOutput(processedProps);
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
  const className = [getResponsiveClassName('bpk-layout-vstack'), colorClasses, responsiveClass].filter(Boolean).join(' ') || undefined;
  return (
    <div ref={ref} className={className} style={style} {...getDataComponentAttribute('VStack')} {...passthrough}>
      {children}
    </div>
  );
});

BpkVStack.displayName = 'BpkVStack';

export type { BpkStackProps };
