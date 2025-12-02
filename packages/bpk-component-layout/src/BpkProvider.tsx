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

export interface BpkProviderProps {
  children: ReactNode;
}

/**
 * BpkProvider - Layout components no longer require a runtime styling context.
 *
 * The Backpack layout system is powered by PandaCSS styled-system with static CSS
 * generated at build time. This provider is kept for API compatibility and simply
 * renders its children without modifying context.
 */
export const BpkProvider = ({ children }: BpkProviderProps) => {
  return <>{children}</>;
};
