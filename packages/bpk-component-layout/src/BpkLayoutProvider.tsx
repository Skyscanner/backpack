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

import type React from 'react';
import type { ReactNode } from 'react';

export interface BpkLayoutProviderProps {
  children: ReactNode;
}

/**
 * BpkLayoutProvider - Kept for backwards compatibility.
 *
 * Layout components (BpkBox, BpkFlex, BpkGrid, BpkStack, etc.) no longer
 * require a provider. They use CSS Modules and inline styles directly.
 *
 * This component is a passthrough that simply renders its children.
 * It can be safely removed from your app, but keeping it is harmless.
 *
 * @deprecated No provider is needed for layout components.
 * @returns {ReactNode} The children as-is.
 */
export const BpkLayoutProvider = ({
  children,
}: BpkLayoutProviderProps): React.JSX.Element => (
   
  <>{children}</>
);
