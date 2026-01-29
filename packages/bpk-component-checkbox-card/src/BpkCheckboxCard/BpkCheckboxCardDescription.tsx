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

export type BpkCheckboxCardDescriptionProps = {
  /**
   * Description text content (plain string only)
   */
  children: string;

  /**
   * Text style from Backpack typography system
   * @default "body-default"
   */
  textStyle?: TextStyle;

  /**
   * Maximum number of lines before truncation
   * @default 3
   */
  lineClamp?: number;
};

/**
 * BpkCheckboxCard.Description - Secondary description slot component
 *
 * Displays secondary descriptive text using BpkText component.
 * Automatically truncates with ellipsis after the specified number of lines.
 *
 * Connects to the Control component via ARIA describedby for accessibility.
 *
 * @example
 * <BpkCheckboxCard.Description>
 *   Central location with easy access to main attractions
 * </BpkCheckboxCard.Description>
 *
 * @example With custom line clamp
 * <BpkCheckboxCard.Description lineClamp={2}>
 *   Short description
 * </BpkCheckboxCard.Description>
 */
export function BpkCheckboxCardDescription({
  children,
  textStyle = TEXT_STYLES.bodyDefault,
  lineClamp = 3,
}: BpkCheckboxCardDescriptionProps) {
  const { descriptionId } = useCheckboxCardContext();

  return (
    <BpkText
      id={descriptionId}
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
