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

import type { ReactNode } from 'react';

import { ChakraProvider, createSystem, defaultBaseConfig } from '@chakra-ui/react';

import { createBpkConfig } from './theme';

export interface BpkLayoutProviderProps {
  children: ReactNode;
}

/**
 * Creates a Chakra UI system with Backpack token mappings.
 *
 * Uses `defaultBaseConfig` (conditions + utilities only) instead of
 * `defaultConfig` to avoid bundling ~141KB of unused component recipes.
 * See: https://chakra-ui.com/guides/component-bundle-optimization
 */
const bpkSystem = createSystem(defaultBaseConfig, createBpkConfig());

/**
 * BpkLayoutProvider - Provides context for Backpack layout components only.
 *
 * Wraps children with the Chakra UI system context configured with Backpack
 * tokens (spacing, breakpoints). This is the minimal provider needed by
 * layout primitives (BpkBox, BpkFlex, BpkGrid, BpkStack, etc.).
 *
 * Use this instead of BpkProvider when you only need layout components and
 * want to avoid bundling Ark UI (used by BpkCheckboxV2, BpkSegmentedControlV2,
 * and other Ark-based components).
 *
 * @param {BpkLayoutProviderProps} props - The provider props.
 * @returns {JSX.Element} The provider wrapping its children with Chakra context.
 */
export const BpkLayoutProvider = ({
  children,
}: BpkLayoutProviderProps): JSX.Element => (
  <ChakraProvider value={bpkSystem}>{children}</ChakraProvider>
);
