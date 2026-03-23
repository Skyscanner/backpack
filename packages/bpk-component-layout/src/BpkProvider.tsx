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

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

import BpkDirectionProvider from './BpkDirectionProvider';
import { createBpkConfig } from './theme';

export interface BpkProviderProps {
  children: ReactNode;
}

/**
 * Creates a Chakra UI system with Backpack token mappings
 * Chakra UI 3.0 uses `createSystem` with `defaultConfig` and custom config
 */
// Remove Chakra's global CSS to prevent style conflicts with Backpack components
const { globalCss: _chakraGlobalCss, ...defaultConfigWithoutGlobalCss } =
  defaultConfig;

const bpkSystem = createSystem(defaultConfigWithoutGlobalCss, createBpkConfig());

/**
 * BpkProvider - Provides Chakra UI context and RTL direction for Backpack components.
 *
 * Wraps children with:
 * - Chakra UI token system (layout tokens and theming)
 * - BpkDirectionProvider (bridges document.dir to Ark UI's LocaleProvider)
 *
 * All Ark-based Backpack components require this provider to support RTL.
 *
 * @param {BpkProviderProps} props - The provider props.
 * @returns {JSX.Element} The provider wrapping its children with Chakra and direction context.
 */
export const BpkProvider = ({ children }: BpkProviderProps): JSX.Element => (
  <ChakraProvider value={bpkSystem}>
    <BpkDirectionProvider>{children}</BpkDirectionProvider>
  </ChakraProvider>
);
