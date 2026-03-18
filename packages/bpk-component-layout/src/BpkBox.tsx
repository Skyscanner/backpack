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

import { Box } from '@chakra-ui/react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import { processBpkComponentProps } from './tokenUtils';

import type { BpkBoxProps } from './types';

import STYLES from './BpkBox.module.scss';

const getClassName = cssModules(STYLES);

export const BpkBox = forwardRef<HTMLElement, BpkBoxProps>(
  ({ backgroundColor, boxShadow, children, color, lineClamp, ...props }, ref) => {
    const processedProps = processBpkComponentProps(props, { component: 'BpkBox' });
    const combinedClass = getClassName(
      backgroundColor ? `bpk-box--${backgroundColor}` : '',
      // 'bpk-box' base class is required alongside the modifier to form a two-class
      // compound selector (.bpk-box.bpk-box--text-*), matching BpkText's pattern and
      // beating Chakra emotion's default color specificity.
      color ? 'bpk-box' : '',
      color ? `bpk-box--${color}` : '',
    ) || undefined;

    const lineClampProps = lineClamp != null ? {
      display: '-webkit-box' as const,
      WebkitLineClamp: lineClamp,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden' as const,
    } : {};

    return (
      <Box
        ref={ref}
        // className is allowed here: combinedClass is an internal SCSS module class, not a consumer override.
        // eslint-disable-next-line @skyscanner/rules/forbid-component-props
        className={combinedClass}
        {...getDataComponentAttribute('Box')}
        {...processedProps}
        {...lineClampProps}
        {...(boxShadow ? { boxShadow } : {})}
      >
        {children}
      </Box>
    );
  },
);

BpkBox.displayName = 'BpkBox';

export type { BpkBoxProps };
