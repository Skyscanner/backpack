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

import { GridItem } from '@chakra-ui/react';

import { getDataComponentAttribute } from '../../bpk-react-utils';

import { processBpkProps } from './tokenUtils';

import type { BpkGridItemProps } from './types';

export const BpkGridItem = ({
  area,
  children,
  colEnd,
  colSpan,
  colStart,
  rowEnd,
  rowSpan,
  rowStart,
  ...props
}: BpkGridItemProps) => {
  const processedProps = processBpkProps(props);

  return (
    <GridItem
      {...getDataComponentAttribute('GridItem')}
      {...processedProps}
      area={area}
      colEnd={colEnd}
      colStart={colStart}
      colSpan={colSpan}
      rowEnd={rowEnd}
      rowStart={rowStart}
      rowSpan={rowSpan}
    >
      {children}
    </GridItem>
  );
};

export type { BpkGridItemProps };

