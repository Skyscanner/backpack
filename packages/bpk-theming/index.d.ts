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

import type { ElementType, CSSProperties, ReactNode } from 'react';

export interface BpkThemeProviderProps {
  children: ReactNode;
  themeAttributes: string | string[];
  theme?: Record<string, string> | null;
  component?: ElementType;
  style?: CSSProperties;
  [rest: string]: unknown;
}

declare const BpkThemeProvider: (props: BpkThemeProviderProps) => JSX.Element;

export default BpkThemeProvider;
