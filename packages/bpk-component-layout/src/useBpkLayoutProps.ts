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

import { transformColorProps } from './colorTokenTransformers';
import { transformSpacingProps } from './tokenTransformers';

/**
 * Options for transforming layout props
 */
export interface TransformBpkLayoutPropsOptions {
  /**
   * List of props to explicitly disallow (e.g., ['className', 'children'])
   * @default ['className']
   */
  disallowedProps?: string[];
}

/**
 * Transforms Backpack layout component props by:
 * 1. Filtering out disallowed props
 * 2. Transforming Backpack spacing tokens to Chakra UI values
 * 3. Transforming Backpack color tokens to CSS custom properties
 *
 * This is a common utility used by all Bpk layout components to ensure
 * consistent prop transformation logic.
 *
 * @param {Record<string, any>} props - The props object to transform
 * @param {TransformBpkLayoutPropsOptions} options - Options for transformation
 * @returns {Record<string, any>} The transformed props object ready to be passed to Chakra UI components
 *
 * @example
 * ```tsx
 * const BpkBox = ({ as, children, ...rest }: BpkBoxProps) => {
 *   const transformedProps = transformBpkLayoutProps(rest);
 *   return <Box as={as} {...transformedProps}>{children}</Box>;
 * };
 * ```
 */
export const transformBpkLayoutProps = (
  props: Record<string, any>,
  options: TransformBpkLayoutPropsOptions = {},
): Record<string, any> => {
  const { disallowedProps = ['className'] } = options;

  // Filter out disallowed props (defensive programming)
  // This ensures only explicitly allowed props are passed to Chakra UI components
  // TypeScript will catch invalid props at compile time, this is runtime safety
  const allowedProps = { ...props };

  disallowedProps.forEach((prop) => {
    delete allowedProps[prop as keyof typeof allowedProps];
  });

  // Transform Backpack spacing tokens to Chakra UI values
  const spacingTransformed = transformSpacingProps(allowedProps);

  // Transform Backpack color tokens to CSS custom properties
  const transformedProps = transformColorProps(spacingTransformed);

  return transformedProps;
};

