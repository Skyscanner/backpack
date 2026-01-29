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

import BpkText, { TEXT_STYLES, type TextStyle } from '../../../bpk-component-text';

import { useCheckboxCardContext } from './CheckboxCardContext';

export type BpkCheckboxCardLabelProps = {
  /**
   * Label text content (plain string only)
   */
  children: string;

  /**
   * Text style from Backpack typography system
   * @default "heading-5"
   */
  textStyle?: TextStyle;

  /**
   * Maximum number of lines before truncation
   * @default 2
   */
  lineClamp?: number;
};

/**
 * BpkCheckboxCard.Label - Primary label slot component
 *
 * Displays the primary text label using BpkText component.
 * Automatically truncates with ellipsis after the specified number of lines.
 *
 * Connects to the Control component via ARIA labelledby for accessibility.
 *
 * @example
 * <BpkCheckboxCard.Label>
 *   City Centre Location
 * </BpkCheckboxCard.Label>
 *
 * @example With custom text style
 * <BpkCheckboxCard.Label textStyle="heading-4">
 *   Premium Package
 * </BpkCheckboxCard.Label>
 */
export function BpkCheckboxCardLabel({
  children,
  textStyle = TEXT_STYLES.heading5,
  lineClamp = 2,
}: BpkCheckboxCardLabelProps) {
  const { labelId } = useCheckboxCardContext();

  return (
    <BpkText
      id={labelId}
      textStyle={textStyle}
      tagName="span"
      style={{
        display: '-webkit-box',
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {children}
    </BpkText>
  );
}
