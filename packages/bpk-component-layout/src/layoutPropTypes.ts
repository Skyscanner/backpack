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

/**
 * Constrained value types for layout props
 * These types ensure API stability and design system consistency
 */

/**
 * CSS display values
 */
export type DisplayValue = 
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'grid'
  | 'none'
  | 'table'
  | 'table-cell'
  | 'table-row';

/**
 * CSS flex-direction values
 */
export type FlexDirectionValue = 
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';

/**
 * CSS flex-wrap values
 */
export type FlexWrapValue = 
  | 'nowrap'
  | 'wrap'
  | 'wrap-reverse';

/**
 * CSS align-items values
 */
export type AlignItemsValue = 
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

/**
 * CSS align-content values
 */
export type AlignContentValue = 
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'stretch';

/**
 * CSS align-self values
 */
export type AlignSelfValue = 
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

/**
 * CSS justify-content values
 */
export type JustifyContentValue = 
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

/**
 * CSS justify-items values
 */
export type JustifyItemsValue = 
  | 'start'
  | 'end'
  | 'center'
  | 'stretch';

/**
 * CSS justify-self values
 */
export type JustifySelfValue = 
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'stretch';

/**
 * CSS overflow values
 */
export type OverflowValue = 
  | 'visible'
  | 'hidden'
  | 'scroll'
  | 'auto'
  | 'clip';

/**
 * CSS position values
 */
export type PositionValue = 
  | 'static'
  | 'relative'
  | 'absolute'
  | 'fixed'
  | 'sticky';

/**
 * CSS border-style values
 */
export type BorderStyleValue = 
  | 'none'
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

/**
 * CSS text-align values
 */
export type TextAlignValue = 
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'start'
  | 'end';

/**
 * CSS text-transform values
 */
export type TextTransformValue = 
  | 'none'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'full-width';

/**
 * CSS text-decoration values
 */
export type TextDecorationValue = 
  | 'none'
  | 'underline'
  | 'overline'
  | 'line-through';

/**
 * CSS cursor values (common values)
 */
export type CursorValue = 
  | 'auto'
  | 'default'
  | 'pointer'
  | 'not-allowed'
  | 'wait'
  | 'text'
  | 'move'
  | 'grab'
  | 'grabbing'
  | 'zoom-in'
  | 'zoom-out'
  | 'crosshair'
  | 'help'
  | 'progress';

/**
 * CSS pointer-events values
 */
export type PointerEventsValue = 
  | 'auto'
  | 'none'
  | 'visiblePainted'
  | 'visibleFill'
  | 'visibleStroke'
  | 'visible'
  | 'painted'
  | 'fill'
  | 'stroke'
  | 'all'
  | 'inherit';

/**
 * CSS visibility values
 */
export type VisibilityValue = 
  | 'visible'
  | 'hidden'
  | 'collapse';

/**
 * Runtime validation functions (development mode only)
 * @param {string} value - The value to validate
 * @returns {boolean} Whether the value is a valid DisplayValue
 */
export const isValidDisplayValue = (value: string): value is DisplayValue => {
  const validValues: DisplayValue[] = ['block', 'inline', 'inline-block', 'flex', 'grid', 'none', 'table', 'table-cell', 'table-row'];
  return validValues.includes(value as DisplayValue);
};

export const isValidFlexDirectionValue = (value: string): value is FlexDirectionValue => {
  const validValues: FlexDirectionValue[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  return validValues.includes(value as FlexDirectionValue);
};

export const isValidFlexWrapValue = (value: string): value is FlexWrapValue => {
  const validValues: FlexWrapValue[] = ['nowrap', 'wrap', 'wrap-reverse'];
  return validValues.includes(value as FlexWrapValue);
};

export const isValidAlignItemsValue = (value: string): value is AlignItemsValue => {
  const validValues: AlignItemsValue[] = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
  return validValues.includes(value as AlignItemsValue);
};

export const isValidJustifyContentValue = (value: string): value is JustifyContentValue => {
  const validValues: JustifyContentValue[] = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
  return validValues.includes(value as JustifyContentValue);
};

export const isValidOverflowValue = (value: string): value is OverflowValue => {
  const validValues: OverflowValue[] = ['visible', 'hidden', 'scroll', 'auto', 'clip'];
  return validValues.includes(value as OverflowValue);
};

export const isValidPositionValue = (value: string): value is PositionValue => {
  const validValues: PositionValue[] = ['static', 'relative', 'absolute', 'fixed', 'sticky'];
  return validValues.includes(value as PositionValue);
};

export const isValidBorderStyleValue = (value: string): value is BorderStyleValue => {
  const validValues: BorderStyleValue[] = ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'];
  return validValues.includes(value as BorderStyleValue);
};

export const isValidTextAlignValue = (value: string): value is TextAlignValue => {
  const validValues: TextAlignValue[] = ['left', 'right', 'center', 'justify', 'start', 'end'];
  return validValues.includes(value as TextAlignValue);
};

export const isValidTextTransformValue = (value: string): value is TextTransformValue => {
  const validValues: TextTransformValue[] = ['none', 'uppercase', 'lowercase', 'capitalize', 'full-width'];
  return validValues.includes(value as TextTransformValue);
};

export const isValidTextDecorationValue = (value: string): value is TextDecorationValue => {
  const validValues: TextDecorationValue[] = ['none', 'underline', 'overline', 'line-through'];
  return validValues.includes(value as TextDecorationValue);
};

export const isValidCursorValue = (value: string): value is CursorValue => {
  const validValues: CursorValue[] = ['auto', 'default', 'pointer', 'not-allowed', 'wait', 'text', 'move', 'grab', 'grabbing', 'zoom-in', 'zoom-out', 'crosshair', 'help', 'progress'];
  return validValues.includes(value as CursorValue);
};

export const isValidPointerEventsValue = (value: string): value is PointerEventsValue => {
  const validValues: PointerEventsValue[] = ['auto', 'none', 'visiblePainted', 'visibleFill', 'visibleStroke', 'visible', 'painted', 'fill', 'stroke', 'all', 'inherit'];
  return validValues.includes(value as PointerEventsValue);
};

export const isValidVisibilityValue = (value: string): value is VisibilityValue => {
  const validValues: VisibilityValue[] = ['visible', 'hidden', 'collapse'];
  return validValues.includes(value as VisibilityValue);
};


