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

import { Grid } from '@chakra-ui/react/grid';

import { getDataComponentAttribute } from '../../bpk-react-utils';

import { processBpkComponentProps } from './tokenUtils';

import type { BpkGridProps } from './types';

export const BpkGrid = forwardRef<HTMLDivElement, BpkGridProps>(
  (
    { align, autoColumns, autoFlow, autoRows, children, column, inline, justify, row, templateAreas, templateColumns, templateRows, textStyle, ...props },
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

    return (
      <Grid
        ref={ref}
        {...getDataComponentAttribute('Grid')}
        {...processedProps}
        display={inline ? 'inline-grid' : undefined}
      >
        {children}
      </Grid>
    );
  },
);

BpkGrid.displayName = 'BpkGrid';

export type { BpkGridProps };
