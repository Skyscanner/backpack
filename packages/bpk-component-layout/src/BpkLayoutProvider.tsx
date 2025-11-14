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

export type BpkLayoutProviderProps = {
  children: ReactNode;
};

/**
 * BpkLayoutProvider wraps Chakra UI's ChakraProvider with Backpack's theme configuration.
 * This ensures that BpkBox and other layout components use Backpack's tokens and breakpoints.
 *
 * **Important:** This should be placed at the root of your application, wrapping all components
 * that use BpkBox or other layout components.
 *
 * @param {BpkLayoutProviderProps} props - The component props
 * @returns {JSX.Element} The rendered BpkLayoutProvider component
 * @example
 * ```tsx
 * import { BpkLayoutProvider } from '@skyscanner/backpack-web/bpk-component-layout';
 *
 * function App() {
 *   return (
 *     <BpkLayoutProvider>
 *       <YourApp />
 *     </BpkLayoutProvider>
 *   );
 * }
 * ```
 */
// @ts-expect-error - ChakraProvider accepts 'value' prop in v3 but TypeScript types may not be fully updated
export const BpkLayoutProvider = ({ children }: BpkLayoutProviderProps) => <ChakraProvider value={backpackSystem}>{children}</ChakraProvider>;

export default BpkLayoutProvider;

