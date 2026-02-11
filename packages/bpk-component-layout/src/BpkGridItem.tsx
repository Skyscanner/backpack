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

import type { CSSProperties } from 'react';

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
  const processed = processBpkProps(props);

  // Separate style props from HTML props
  const styles: Record<string, any> = {};
  const htmlProps: Record<string, any> = {};

  const styleKeys = new Set([
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingStart', 'paddingEnd', 'paddingInline',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginStart', 'marginEnd', 'marginInline',
    'gap', 'spacing', 'rowGap', 'columnGap',
    'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
    'top', 'right', 'bottom', 'left',
  ]);

  Object.keys(processed).forEach((key) => {
    if (styleKeys.has(key)) {
      styles[key] = processed[key];
    } else {
      htmlProps[key] = processed[key];
    }
  });

  if (area) styles.gridArea = area;
  if (colSpan) styles.gridColumn = `span ${colSpan}`;
  if (colStart) styles.gridColumnStart = colStart;
  if (colEnd) styles.gridColumnEnd = colEnd;
  if (rowSpan) styles.gridRow = `span ${rowSpan}`;
  if (rowStart) styles.gridRowStart = rowStart;
  if (rowEnd) styles.gridRowEnd = rowEnd;

  return <div style={styles as CSSProperties} {...htmlProps}>{children}</div>;
};

export type { BpkGridItemProps };
