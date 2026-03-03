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

import { Content } from './subcomponents/Content';
import Control from './subcomponents/Control';
import { Description } from './subcomponents/Description';
import { Icon } from './subcomponents/Icon';
import { Image } from './subcomponents/Image';
import { Indicator } from './subcomponents/Indicator';
import { Inline } from './subcomponents/Inline';
import { Label } from './subcomponents/Label';
import { Price } from './subcomponents/Price';
import { Root } from './subcomponents/Root';
import { Stack } from './subcomponents/Stack';

/**
 * BpkCheckboxCard - Compound component for selectable cards.
 *
 * Follows the Ark UI compound component pattern. Use `BpkCheckboxCard.Root`
 * as the container, then compose slots inside `BpkCheckboxCard.Content`.
 *
 * @example Standard layout
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Stack gap="md" align="center">
 *       <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *       <BpkCheckboxCard.Price price="£85" />
 *     </BpkCheckboxCard.Stack>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @example Corner indicator layout
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Indicator />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 */
const BpkCheckboxCard = Object.assign(Root, {
  Root,
  Control,
  Content,
  Icon,
  Image,
  Indicator,
  Label,
  Description,
  Price,
  Stack,
  Inline,
});

export { BpkCheckboxCard };
export default BpkCheckboxCard;

// Subcomponent prop types
export type { RootProps, RootProps as BpkCheckboxCardRootProps } from './subcomponents/Root';
export type { ContentProps, ContentProps as BpkCheckboxCardContentProps } from './subcomponents/Content';
export type { IconProps, IconProps as BpkCheckboxCardIconProps } from './subcomponents/Icon';
export type { ImageProps, ImageProps as BpkCheckboxCardImageProps } from './subcomponents/Image';
export type { LabelProps, LabelProps as BpkCheckboxCardLabelProps } from './subcomponents/Label';
export type { DescriptionProps, DescriptionProps as BpkCheckboxCardDescriptionProps } from './subcomponents/Description';
export type { PriceProps, PriceProps as BpkCheckboxCardPriceProps } from './subcomponents/Price';
export type { StackProps, StackProps as BpkCheckboxCardStackProps } from './subcomponents/Stack';
export type { IndicatorProps } from './subcomponents/Indicator';
export type { InlineProps } from './subcomponents/Inline';

// Context and common types
export { useCheckboxCardContext } from './subcomponents/CheckboxCardContext';
export type { CheckboxCardContextValue } from './subcomponents/CheckboxCardContext';
export * from './common-types';
