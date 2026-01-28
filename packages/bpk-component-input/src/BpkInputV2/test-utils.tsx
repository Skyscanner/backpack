/* eslint-disable import/prefer-default-export */
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

import type { ReactElement } from 'react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render } from '@testing-library/react';


import type { RenderOptions, RenderResult } from '@testing-library/react';

/**
 * Custom render function that wraps components with ChakraProvider context.
 * This is required for testing components that use Chakra UI components.
 *
 * @param {ReactElement} ui - The React element to render
 * @param {Omit<RenderOptions, 'wrapper'>} options - Optional render options from @testing-library/react
 * @returns {RenderResult} RenderResult from @testing-library/react
 */
export const renderWithChakra = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(
    <ChakraProvider value={defaultSystem}>
      {ui}
    </ChakraProvider>,
    options,
  );
