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

export type BpkLayoutProviderProps = {
  children: ReactNode;
};

/**
 * BpkLayoutProvider is a no-op component that exists for backward compatibility.
 * 
 * **Note:** With CSS Modules implementation, BpkLayoutProvider is no longer required.
 * Layout components now use static CSS classes compiled at build time, so no runtime
 * theme provider is needed. This component is kept for API compatibility but does nothing.
 *
 * **Migration:** You can safely remove BpkLayoutProvider from your code. All layout
 * components will work without it.
 *
 * @param {BpkLayoutProviderProps} props - The component props
 * @returns {JSX.Element} The rendered children
 * @example
 * ```tsx
 * // Old usage (still works but not required)
 * <BpkLayoutProvider>
 *   <YourApp />
 * </BpkLayoutProvider>
 *
 * // New usage (recommended)
 * <YourApp />
 * ```
 */
export const BpkLayoutProvider = ({ children }: BpkLayoutProviderProps) => {
  return <>{children}</>;
};

export default BpkLayoutProvider;
