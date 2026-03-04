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

import figma from '@figma/code-connect';

import BpkSegmentedControlV2 from './BpkSegmentedControlV2';
import { SEGMENT_TYPES_V2 } from './common-types';

// TODO: Replace 'FIGMA_URL' with the actual Figma component URL once provided by the design team.
figma.connect(BpkSegmentedControlV2.Root, 'FIGMA_URL', {
  props: {
    type: figma.enum('Type', {
      'Canvas default': SEGMENT_TYPES_V2.CanvasDefault,
      'Canvas contrast': SEGMENT_TYPES_V2.CanvasContrast,
      'Surface default': SEGMENT_TYPES_V2.SurfaceDefault,
      'Surface contrast': SEGMENT_TYPES_V2.SurfaceContrast,
    }),
    shadow: figma.boolean('Shadow'),
    disabled: figma.boolean('Disabled'),
  },
  example: ({ disabled, shadow, type }) => (
    <BpkSegmentedControlV2.Root
      type={type}
      shadow={shadow}
      disabled={disabled}
      defaultValue="option1"
      label="Select option"
    >
      <BpkSegmentedControlV2.Item value="option1">Option 1</BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="option2">Option 2</BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  ),
});
