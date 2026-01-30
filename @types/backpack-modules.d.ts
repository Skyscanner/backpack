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

// Type declarations for untyped @backpack/* modules
// These modules are written in JavaScript and don't have their own type definitions

declare module '@backpack/bpk-animate-height' {
  import { ComponentType } from 'react';
  const AnimateHeight: ComponentType<any>;
  export default AnimateHeight;
}

declare module '@backpack/bpk-component-close-button' {
  import { ComponentType } from 'react';
  const BpkCloseButton: ComponentType<any>;
  export default BpkCloseButton;
}

declare module '@backpack/bpk-component-flare' {
  import { ComponentType } from 'react';
  export const BpkContentBubble: ComponentType<any>;
  export const BpkFlareBar: ComponentType<any>;
  const BpkFlare: ComponentType<any>;
  export default BpkFlare;
}

declare module '@backpack/bpk-component-form-validation' {
  import { ComponentType } from 'react';
  const BpkFormValidation: ComponentType<any>;
  export default BpkFormValidation;
}

declare module '@backpack/bpk-component-label' {
  import { ComponentType } from 'react';
  const BpkLabel: ComponentType<any>;
  export default BpkLabel;
}

declare module '@backpack/bpk-theming' {
  import { ComponentType, Context } from 'react';
  export const BpkThemeProvider: ComponentType<any>;
  export const BpkThemeContext: Context<any>;
  export function themeAttributes(attributes: string[]): any;
}
