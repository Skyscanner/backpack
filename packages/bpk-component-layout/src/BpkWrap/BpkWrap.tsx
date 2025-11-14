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

import { Wrap } from '@chakra-ui/react';

import { transformColorProps } from '../colorTokenTransformers';
import { transformSpacingProps } from '../tokenTransformers';

import type { BpkWrapProps } from './BpkWrap.types';

export type Props = BpkWrapProps;

/**
 * BpkWrap is a layout component that provides a wrap layout using Chakra UI's Wrap component.
 * It follows the facade pattern, wrapping Chakra UI's Wrap to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - Wraps children and provides spacing between them
 * - Accepts Backpack spacing tokens as strings (e.g., `spacing="base"`)
 * - Accepts Backpack color tokens for color-related props
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkWrap component
 * @example
 * ```tsx
 * <BpkWrap spacing="base">
 *   <BpkBox>Item 1</BpkBox>
 *   <BpkBox>Item 2</BpkBox>
 * </BpkWrap>
 * ```
 */
const BpkWrap = ({
  as,
  children,
  ...rest
}: Props) => {
  const allowedProps = { ...rest };
  const disallowedProps = ['className'];

  disallowedProps.forEach((prop) => {
     
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  const spacingTransformed = transformSpacingProps(allowedProps);
  const transformedProps = transformColorProps(spacingTransformed);

  return (
    <Wrap
      as={as}
      {...transformedProps}
    >
      {children}
    </Wrap>
  );
};

export default BpkWrap;

