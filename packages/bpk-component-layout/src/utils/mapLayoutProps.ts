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

import { processBpkProps } from '../tokenUtils';

const PROP_TO_VAR: Record<string, string> = {
  // Spacing
  padding: '--bpk-p',
  paddingLeft: '--bpk-pl',
  paddingRight: '--bpk-pr',
  paddingTop: '--bpk-pt',
  paddingBottom: '--bpk-pb',
  paddingInline: '--bpk-px',
  margin: '--bpk-m',
  gap: '--bpk-gap',

  // Flex
  display: '--bpk-display',
  flexDirection: '--bpk-flex-dir',
  justifyContent: '--bpk-jc',
  alignItems: '--bpk-ai',
  alignContent: '--bpk-ac',
  flexWrap: '--bpk-flex-wrap',
  flexGrow: '--bpk-flex-grow',
  flexShrink: '--bpk-flex-shrink',
  flexBasis: '--bpk-flex-basis',
  order: '--bpk-order',
  alignSelf: '--bpk-align-self',
  justifySelf: '--bpk-justify-self',

  // Size
  width: '--bpk-w',
  height: '--bpk-h',

  // Position
  position: '--bpk-pos',
  top: '--bpk-top',
  right: '--bpk-right',
  bottom: '--bpk-bottom',
  left: '--bpk-left',

  // Grid
  gridTemplateColumns: '--bpk-grid-tc',
  gridTemplateRows: '--bpk-grid-tr',
  gridTemplateAreas: '--bpk-grid-ta',
  gridAutoFlow: '--bpk-grid-af',
  gridAutoRows: '--bpk-grid-ar',
  gridAutoColumns: '--bpk-grid-ac',
  gridColumn: '--bpk-grid-col',
  gridRow: '--bpk-grid-row',
  rowGap: '--bpk-row-gap',
  columnGap: '--bpk-col-gap',
};

const isScalarValue = (value: unknown): value is string | number => (
  typeof value === 'string' || typeof value === 'number'
);

export const mapLayoutToVars = <T extends Record<string, any>>(props: T) => {
  const processedProps = processBpkProps(props);
  const cssVars: Record<string, string> = {};
  const rest: Record<string, any> = {};

  Object.entries(processedProps).forEach(([key, value]) => {
    const cssVar = PROP_TO_VAR[key];
    if (cssVar && isScalarValue(value)) {
      cssVars[cssVar] = String(value);
      // Keep the processed prop on the element as a runtime fallback to
      // preserve previous processBpkProps behaviour and responsive support.
      rest[key] = value;
      return;
    }

    rest[key] = value;
  });

  return { cssVars, rest };
};

export default mapLayoutToVars;

