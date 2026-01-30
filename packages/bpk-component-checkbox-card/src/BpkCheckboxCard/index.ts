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
 * BpkCheckboxCard - Compound Component for Selectable Cards
 *
 * A flexible, accessible checkbox card component following the Ark UI
 * compound component pattern. Supports both simple and complex layouts
 * with full theme customization.
 *
 * @example Simple usage
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>Option</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @example Complex layout
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Content orientation="vertical">
 *     <BpkCheckboxCard.Icon><LandmarkIcon /></BpkCheckboxCard.Icon>
 *     <BpkCheckboxCard.Stack gap="sm">
 *       <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *       <BpkCheckboxCard.Description>Central location</BpkCheckboxCard.Description>
 *     </BpkCheckboxCard.Stack>
 *     <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 */

import { BpkCheckboxCardRoot } from './BpkCheckboxCardRoot';
import { BpkCheckboxCardControl } from './BpkCheckboxCardControl';
import { BpkCheckboxCardContent } from './BpkCheckboxCardContent';
import { BpkCheckboxCardIcon } from './BpkCheckboxCardIcon';
import { BpkCheckboxCardImage } from './BpkCheckboxCardImage';
import { BpkCheckboxCardLabel } from './BpkCheckboxCardLabel';
import { BpkCheckboxCardDescription } from './BpkCheckboxCardDescription';
import { BpkCheckboxCardPrice } from './BpkCheckboxCardPrice';
import { BpkCheckboxCardStack } from './BpkCheckboxCardStack';
import { BpkCheckboxCardInline } from './BpkCheckboxCardInline';

/**
 * Main BpkCheckboxCard compound component
 * Combines all sub-components into a single exportable object
 */
export const BpkCheckboxCard = Object.assign(BpkCheckboxCardRoot, {
  /**
   * Root container - manages state and provides context
   */
  Root: BpkCheckboxCardRoot,

  /**
   * Hidden checkbox input - handles form state
   */
  Control: BpkCheckboxCardControl,

  /**
   * Content container - flexible layout
   */
  Content: BpkCheckboxCardContent,

  /**
   * Icon slot - displays Backpack icons
   */
  Icon: BpkCheckboxCardIcon,

  /**
   * Image slot - displays images
   */
  Image: BpkCheckboxCardImage,

  /**
   * Label slot - primary text with line clamping
   */
  Label: BpkCheckboxCardLabel,

  /**
   * Description slot - secondary text with line clamping
   */
  Description: BpkCheckboxCardDescription,

  /**
   * Price slot - displays price information
   */
  Price: BpkCheckboxCardPrice,

  /**
   * Stack primitive - vertical layout
   */
  Stack: BpkCheckboxCardStack,

  /**
   * Inline primitive - horizontal layout
   */
  Inline: BpkCheckboxCardInline,
});

export default BpkCheckboxCard;

// Export all prop types
export type { BpkCheckboxCardRootProps } from './BpkCheckboxCardRoot';
export type { BpkCheckboxCardContentProps } from './BpkCheckboxCardContent';
export type { BpkCheckboxCardIconProps } from './BpkCheckboxCardIcon';
export type { BpkCheckboxCardImageProps } from './BpkCheckboxCardImage';
export type { BpkCheckboxCardLabelProps } from './BpkCheckboxCardLabel';
export type { BpkCheckboxCardDescriptionProps } from './BpkCheckboxCardDescription';
export type { BpkCheckboxCardPriceProps } from './BpkCheckboxCardPrice';
export type { BpkCheckboxCardStackProps } from './BpkCheckboxCardStack';
export type { BpkCheckboxCardInlineProps } from './BpkCheckboxCardInline';

// Export context and common types
export { useCheckboxCardContext } from './CheckboxCardContext';
export type { CheckboxCardContextValue } from './CheckboxCardContext';
export * from './common-types';
