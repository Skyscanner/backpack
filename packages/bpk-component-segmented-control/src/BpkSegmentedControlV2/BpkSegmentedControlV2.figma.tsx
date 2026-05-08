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

figma.connect(BpkSegmentedControlV2.Root, 'https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911-36313', {
  props: {
    type: figma.enum('Style', {
      'Canvas Default': SEGMENT_TYPES_V2.CanvasDefault,
      'Canvas Contrast': SEGMENT_TYPES_V2.CanvasContrast,
      'Surface Default': SEGMENT_TYPES_V2.SurfaceDefault,
      'Surface Contrast': SEGMENT_TYPES_V2.SurfaceContrast,
    }),
  },
  example: ({ type }) => (
    <BpkSegmentedControlV2.Root
      type={type}
      defaultValue="option1"
      label="Select option"
    >
      <BpkSegmentedControlV2.Item value="option1">
        <BpkSegmentedControlV2.ItemText>Option 1</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="option2">
        <BpkSegmentedControlV2.ItemText>Option 2</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>
  ),
});
