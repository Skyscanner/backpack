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

/* @flow strict */
import {
  DefaultExample,
  WithIconsExample,
  CenteredExample,
  DockedLeadingExample,
  DockedTrailingExample,
  WarningExample,
  SuccessExample,
  DestructiveExample,
  LightExample,
  InverseExample,
  OutlineExample,
  MixedExample,
  StrongExample,
} from './examples';

export default {
  title: 'bpk-component-badge',
};

export const Default = DefaultExample;
export const WithIcons = WithIconsExample;

export const Centered = CenteredExample;
export const DockedRight = DockedLeadingExample;

export const DockedLeft = DockedTrailingExample;

export const WarningDefault = WarningExample;

export const Success = SuccessExample;
export const Destructive = DestructiveExample;
export const Strong = StrongExample;
export const Light = LightExample;
export const Inverse = InverseExample;
export const Outline = OutlineExample;
export const VisualTest = MixedExample;
