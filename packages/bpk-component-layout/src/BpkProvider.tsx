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

export type BpkProviderProps = {
  children: ReactNode;
};

/**
 * BpkProvider is a no-op component that exists for backward compatibility.
 * 
 * **Note:** With CSS Modules implementation, BpkProvider is no longer required.
 * Layout components now use static CSS classes compiled at build time, so no runtime
 * theme provider is needed. This component is kept for API compatibility but does nothing.
 *
 * **Migration:** You can safely remove BpkProvider from your code. All layout
 * components will work without it.
 *
 * @param {BpkProviderProps} props - The component props
 * @returns {JSX.Element} The rendered children
 * @example
 * ```tsx
 * // Old usage (still works but not required)
 * <BpkProvider>
 *   <YourApp />
 * </BpkProvider>
 *
 * // New usage (recommended)
 * <YourApp />
 * ```
 */
export const BpkProvider = ({ children }: BpkProviderProps) => <>{children}</>;

export default BpkProvider;


