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

import { Box } from '@chakra-ui/react';

import { processBpkProps, processResponsiveProps } from './tokenUtils';

import type { BpkBoxProps } from './types';

const RESPONSIVE_LAYOUT_PROP_KEYS = [
  // Display
  'display',
  // Flex container props
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignContent',
  // Flex item props
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'order',
  'alignSelf',
  'justifySelf',
  // Grid container props
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridTemplateAreas',
  'gridAutoFlow',
  'gridAutoRows',
  'gridAutoColumns',
  // Grid item placement props (useful on Box when composing grids)
  'gridColumn',
  'gridRow',
] as const;

export const BpkBox = ({ children, ...props }: BpkBoxProps) => {
  // Process props to convert Backpack tokens to Chakra UI format
  const processedProps = processBpkProps(props);

  // className is explicitly excluded from props to prevent style overrides
  const responsiveLayoutProps: Record<string, any> = {};
  RESPONSIVE_LAYOUT_PROP_KEYS.forEach((key) => {
    if ((processedProps as any)[key] !== undefined) {
      responsiveLayoutProps[key] = (processedProps as any)[key];
    }
  });

  // Map Backpack breakpoint keys to Chakra breakpoint keys for layout props.
  // NOTE: Do not include spacing props here (e.g. gap/rowGap/columnGap) as those
  // are already normalized and token-converted by processBpkProps.
  const processedResponsiveLayoutProps = processResponsiveProps(responsiveLayoutProps);

  return (
    <Box {...processedProps} {...processedResponsiveLayoutProps}>
      {children}
    </Box>
  );
};

export type { BpkBoxProps };
