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

import { Spacer } from '@chakra-ui/react';

import { transformColorProps } from '../colorTokenTransformers';
import { transformSpacingProps } from '../tokenTransformers';

import type { BpkSpacerProps } from './BpkSpacer.types';

export type Props = BpkSpacerProps;

/**
 * BpkSpacer is a layout component that provides flexible spacing using Chakra UI's Spacer component.
 * It follows the facade pattern, wrapping Chakra UI's Spacer to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - A flexible flex spacer that expands along the major axis of its containing flex layout
 * - Accepts Backpack spacing and color tokens
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkSpacer component
 * @example
 * ```tsx
 * <BpkFlex>
 *   <BpkBox>Left content</BpkBox>
 *   <BpkSpacer />
 *   <BpkBox>Right content</BpkBox>
 * </BpkFlex>
 * ```
 */
const BpkSpacer = ({
  as,
  ...rest
}: Props) => {
  const allowedProps = { ...rest };
  const disallowedProps = ['className', 'children']; // Spacer doesn't accept children

  disallowedProps.forEach((prop) => {
     
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  const spacingTransformed = transformSpacingProps(allowedProps);
  const transformedProps = transformColorProps(spacingTransformed);

  return (
    <Spacer
      as={as}
      {...transformedProps}
    />
  );
};

export default BpkSpacer;

