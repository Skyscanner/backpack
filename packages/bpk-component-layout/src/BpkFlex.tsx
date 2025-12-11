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

import { Flex } from '@chakra-ui/react';

import { processBpkProps, processResponsiveStringProp } from './tokenUtils';

import type { BpkFlexProps } from './types';

export const BpkFlex = ({
  align,
  basis,
  children,
  direction,
  grow,
  inline,
  justify,
  shrink,
  wrap,
  ...props
}: BpkFlexProps) => {
  const processedProps = processBpkProps(props);
  const processedDirection = processResponsiveStringProp(direction, 'flexDirection');
  const processedJustify = processResponsiveStringProp(justify, 'justifyContent');
  const processedAlign = processResponsiveStringProp(align, 'alignItems');
  const processedWrap = processResponsiveStringProp(wrap, 'flexWrap');

  return (
    <Flex
      {...processedProps}
      flexDirection={processedDirection}
      justifyContent={processedJustify}
      alignItems={processedAlign}
      flexWrap={processedWrap}
      flexGrow={grow}
      flexShrink={shrink}
      flexBasis={basis}
      display={inline ? 'inline-flex' : undefined}
    >
      {children}
    </Flex>
  );
};

export type { BpkFlexProps };
