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

import { Content } from './subcomponents/Content';
import Control from './subcomponents/Control';
import { Description } from './subcomponents/Description';
import { Icon } from './subcomponents/Icon';
import { Image } from './subcomponents/Image';
import { Inline } from './subcomponents/Inline';
import { Label } from './subcomponents/Label';
import { Price } from './subcomponents/Price';
import { Root } from './subcomponents/Root';
import { Stack } from './subcomponents/Stack';

/**
 * Main BpkCheckboxCard compound component
 * Combines all sub-components into a single exportable object
 */
export const BpkCheckboxCard = Object.assign(Root, {
  /**
   * Root container - manages state and provides context
   */
  Root,

  /**
   * Hidden checkbox input - handles form state
   */
  Control,

  /**
   * Content container - flexible layout
   */
  Content,

  /**
   * Icon slot - displays Backpack icons
   */
  Icon,

  /**
   * Image slot - displays images
   */
  Image,

  /**
   * Label slot - primary text with line clamping
   */
  Label,

  /**
   * Description slot - secondary text with line clamping
   */
  Description,

  /**
   * Price slot - displays price information
   */
  Price,

  /**
   * Stack primitive - vertical layout
   */
  Stack,

  /**
   * Inline primitive - horizontal layout
   */
  Inline,
});

export default BpkCheckboxCard;

// Export subcomponent prop types
export type { RootProps } from './subcomponents/Root';
export type { ContentProps } from './subcomponents/Content';
export type { IconProps } from './subcomponents/Icon';
export type { ImageProps } from './subcomponents/Image';
export type { LabelProps } from './subcomponents/Label';
export type { DescriptionProps } from './subcomponents/Description';
export type { PriceProps } from './subcomponents/Price';
export type { StackProps } from './subcomponents/Stack';
export type { InlineProps } from './subcomponents/Inline';

// Backward-compatible type aliases
export type { RootProps as BpkCheckboxCardRootProps } from './subcomponents/Root';
export type { ContentProps as BpkCheckboxCardContentProps } from './subcomponents/Content';
export type { IconProps as BpkCheckboxCardIconProps } from './subcomponents/Icon';
export type { ImageProps as BpkCheckboxCardImageProps } from './subcomponents/Image';
export type { LabelProps as BpkCheckboxCardLabelProps } from './subcomponents/Label';
export type { DescriptionProps as BpkCheckboxCardDescriptionProps } from './subcomponents/Description';
export type { PriceProps as BpkCheckboxCardPriceProps } from './subcomponents/Price';
export type { StackProps as BpkCheckboxCardStackProps } from './subcomponents/Stack';
export type { InlineProps as BpkCheckboxCardInlineProps } from './subcomponents/Inline';

// Export context and common types
export { useCheckboxCardContext } from './subcomponents/CheckboxCardContext';
export type { CheckboxCardContextValue } from './subcomponents/CheckboxCardContext';
export * from './common-types';
