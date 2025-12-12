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

import { Grid } from '@chakra-ui/react';

import { processBpkProps, processResponsiveStringProp } from './tokenUtils';

import type { BpkGridProps } from './types';

export const BpkGrid = ({
  align,
  autoColumns,
  autoFlow,
  autoRows,
  children,
  column,
  columnGap,
  inline,
  justify,
  row,
  rowGap,
  templateAreas,
  templateColumns,
  templateRows,
  ...props
}: BpkGridProps) => {
  const processedProps = processBpkProps(props);
  const processedJustify = processResponsiveStringProp(justify, 'justifyContent');
  const processedAlign = processResponsiveStringProp(align, 'alignItems');
  const processedTemplateColumns = processResponsiveStringProp(templateColumns, 'gridTemplateColumns');
  const processedTemplateRows = processResponsiveStringProp(templateRows, 'gridTemplateRows');
  const processedTemplateAreas = processResponsiveStringProp(templateAreas, 'gridTemplateAreas');
  const processedAutoFlow = processResponsiveStringProp(autoFlow, 'gridAutoFlow');
  const processedAutoRows = processResponsiveStringProp(autoRows, 'gridAutoRows');
  const processedAutoColumns = processResponsiveStringProp(autoColumns, 'gridAutoColumns');

  return (
    <Grid
      {...processedProps}
      justifyContent={processedJustify}
      alignItems={processedAlign}
      gridTemplateColumns={processedTemplateColumns}
      gridTemplateRows={processedTemplateRows}
      gridTemplateAreas={processedTemplateAreas}
      gridAutoFlow={processedAutoFlow}
      gridAutoRows={processedAutoRows}
      gridAutoColumns={processedAutoColumns}
      rowGap={rowGap}
      columnGap={columnGap}
      gridColumn={column}
      gridRow={row}
      display={inline ? 'inline-grid' : undefined}
    >
      {children}
    </Grid>
  );
};

export type { BpkGridProps };
