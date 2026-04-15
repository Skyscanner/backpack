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

import type { BpkBoxProps } from './types';

import STYLES from './BpkLayout.module.scss';
import RESPONSIVE_STYLES from './BpkLayoutResponsive.module.scss';


const getClassName = cssModules(STYLES);
const getResponsiveClassName = cssModules(RESPONSIVE_STYLES);

export const BpkBox = forwardRef<HTMLDivElement, BpkBoxProps>(
  ({ backgroundColor, children, color, ...props }, ref) => {
    const processedProps = processBpkComponentProps(props, { component: 'BpkBox' });
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

    const className = [colorClasses, responsiveClass].filter(Boolean).join(' ') || undefined;

    return (
      <div
        ref={ref}
        className={className}
        style={style}
        {...getDataComponentAttribute('Box')}
        {...passthrough}
      >
        {children}
      </div>
    );
  },
);

BpkBox.displayName = 'BpkBox';

export type { BpkBoxProps };
