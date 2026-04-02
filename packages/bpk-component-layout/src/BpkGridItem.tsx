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

import { GridItem } from '@chakra-ui/react';

import { getDataComponentAttribute } from '../../bpk-react-utils';

import { processBpkProps, normalizeResponsiveObject } from './tokenUtils';

import type { BpkGridItemProps } from './types';
import type { TextStyle } from '../../bpk-component-text/src/BpkText';

export const BpkGridItem = forwardRef<HTMLDivElement, BpkGridItemProps>(
  ({ area, children, colEnd, colSpan, colStart, rowEnd, rowSpan, rowStart, textStyle, ...props }, ref) => {
    const processedProps = processBpkProps(props);
    const normalizedTextStyle =
      textStyle && typeof textStyle === 'object'
        ? normalizeResponsiveObject<TextStyle>(textStyle as Record<string, TextStyle>)
        : textStyle;

    return (
      <GridItem
        ref={ref}
        {...getDataComponentAttribute('GridItem')}
        {...processedProps}
        area={area}
        colEnd={colEnd}
        colStart={colStart}
        colSpan={colSpan}
        rowEnd={rowEnd}
        rowStart={rowStart}
        rowSpan={rowSpan}
        textStyle={normalizedTextStyle}
      >
        {children}
      </GridItem>
    );
  },
);

BpkGridItem.displayName = 'BpkGridItem';

export type { BpkGridItemProps };

