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

import {
  SolidExamples,
  TopExamples,
  BottomExamples,
  LeftExamples,
  RightExamples,
  HeavyOverlayExamples,
  VignetteExample,
  WithForegroundContentExample,
  MixedExample,
  // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
} from '../../../examples/bpk-component-overlay/examples';

import BpkOverlay from "./BpkOverlay";


export default {
  title: 'bpk-component-overlay',
  component: BpkOverlay,
};

export const Solid = SolidExamples;
export const Top = TopExamples;
export const Bottom = BottomExamples;
export const Left = LeftExamples;
export const Right = RightExamples;
export const Vignette = VignetteExample;
export const HeavyOverlays = HeavyOverlayExamples;

export const WithForegroundContent = WithForegroundContentExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
