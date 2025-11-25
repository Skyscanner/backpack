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

import { ChakraProvider } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface BpkProviderProps {
  children: ReactNode;
}

/**
 * BpkProvider - Provides Chakra UI context for Backpack layout components
 * 
 * Note: Chakra UI 3.30.0 may not require a theme prop, or uses a different theme structure.
 * We'll start without a custom theme and add it if needed.
 */
export const BpkProvider = ({ children }: BpkProviderProps) => {
  // For now, use ChakraProvider without theme to avoid _config errors
  // Theme configuration will be handled through Panda CSS and token mapping
  return <ChakraProvider>{children}</ChakraProvider>;
};

