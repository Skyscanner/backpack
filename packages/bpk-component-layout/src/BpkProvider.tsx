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

import { ChakraProvider, createSystem } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { createBpkTheme } from './theme';

export interface BpkProviderProps {
  children: ReactNode;
}

/**
 * Creates a Chakra UI system with Backpack token mappings
 * Chakra UI 3.0 uses `createSystem` instead of `extendTheme`
 * The system will automatically merge with defaultSystem
 */
const bpkSystem = createSystem({
  theme: createBpkTheme(),
});

/**
 * BpkProvider - Provides Chakra UI context for Backpack layout components
 * 
 * Chakra UI 3.0 requires the `value` prop to be set to a system object.
 * We create a custom system with Backpack tokens using createSystem.
 */
export const BpkProvider = ({ children }: BpkProviderProps) => {
  // Use the custom system with Backpack tokens
  // createSystem automatically merges with defaultSystem
  return <ChakraProvider value={bpkSystem}>{children}</ChakraProvider>;
};

