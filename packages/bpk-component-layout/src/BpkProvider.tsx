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

import { ChakraProvider } from '@chakra-ui/react';

import { backpackSystem } from './backpackTheme';

export type BpkProviderProps = {
  children: ReactNode;
};

/**
 * BpkProvider wraps Chakra UI's ChakraProvider with a system configuration that disables CSS-in-JS.
 *
 * **Important:** This provider is **required** when using Chakra UI components.
 * It provides the system configuration that disables Chakra UI's runtime CSS generation,
 * allowing CSS Modules to handle all styling instead.
 *
 * **Key Features:**
 * - Disables Chakra UI's CSS cascade layers (`disableLayers: true`)
 * - Disables Chakra UI's preflight (CSS reset) (`preflight: false`)
 * - Removes global CSS injection
 * - Keeps Chakra UI component functionality (like `as` prop, responsive logic)
 * - All styling is handled by CSS Modules (zero CSS-in-runtime)
 * - **No Chakra UI system styles are injected** - completely CSS-in-runtime free
 *
 * @param {BpkProviderProps} props - The component props
 * @returns {JSX.Element} The rendered BpkProvider component
 * @example
 * ```tsx
 * import { BpkProvider, BpkBox } from '@skyscanner/backpack-web/bpk-component-layout';
 *
 * function App() {
 *   return (
 *     <BpkProvider>
 *       <BpkBox padding="base" bg="surface-highlight">
 *         Content
 *       </BpkBox>
 *     </BpkProvider>
 *   );
 * }
 * ```
 */
export const BpkProvider = ({ children }: BpkProviderProps) => (
  <ChakraProvider value={backpackSystem}>{children}</ChakraProvider>
);

export default BpkProvider;


