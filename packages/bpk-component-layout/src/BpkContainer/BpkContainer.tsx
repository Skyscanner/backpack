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

import { Container } from '@chakra-ui/react';

import { transformColorProps } from '../colorTokenTransformers';
import { transformSpacingProps } from '../tokenTransformers';

import type { BpkContainerProps } from './BpkContainer.types';

export type Props = BpkContainerProps;

/**
 * BpkContainer is a layout component that provides a container layout using Chakra UI's Container component.
 * It follows the facade pattern, wrapping Chakra UI's Container to provide a Backpack-specific API.
 *
 * **Key Features:**
 * - Sets margin-left and margin-right to auto to keep content centered
 * - Sets a default max-width
 * - Accepts Backpack spacing and color tokens
 * - Does not support className prop to maintain Backpack design system consistency
 *
 * @param {Props} props - The component props
 * @returns {JSX.Element} The rendered BpkContainer component
 * @example
 * ```tsx
 * <BpkContainer centerContent padding="base">
 *   Content here
 * </BpkContainer>
 * ```
 */
const BpkContainer = ({
  as,
  children,
  ...rest
}: Props) => {
  const allowedProps = { ...rest };
  const disallowedProps = ['className'];

  disallowedProps.forEach((prop) => {
    // eslint-disable-next-line no-param-reassign
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  const spacingTransformed = transformSpacingProps(allowedProps);
  const transformedProps = transformColorProps(spacingTransformed);

  return (
    <Container
      as={as}
      {...transformedProps}
    >
      {children}
    </Container>
  );
};

export default BpkContainer;

