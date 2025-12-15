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

import { BpkBox } from './BpkBox';
import { processResponsiveProps } from './tokenUtils';

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
  const responsiveGridProps = processResponsiveProps({
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
    rowGap,
    columnGap,
  });

  return (
    <BpkBox
      display={inline ? 'inline-grid' : 'grid'}
      {...responsiveGridProps}
      {...props}
    >
      {children}
    </BpkBox>
  );
};

export default BpkGrid;
export type { BpkGridProps };
