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

import BpkCardV2 from './BpkCardV2/BpkCardV2';
import { CARD_V2_SURFACE_COLORS, CARD_V2_VARIANTS } from './BpkCardV2/common-types';

figma.connect(
  BpkCardV2,
  'https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=15086%3A15207',
  {
    props: {
      bgColor: figma.enum('Style', {
        'Surface default': CARD_V2_SURFACE_COLORS.surfaceDefault,
        'Surface low contrast': CARD_V2_SURFACE_COLORS.surfaceLowContrast,
        'Surface elevated': CARD_V2_SURFACE_COLORS.surfaceElevated,
        'Surface tint': CARD_V2_SURFACE_COLORS.surfaceTint,
        'Surface subtle': CARD_V2_SURFACE_COLORS.surfaceSubtle,
        'Surface contrast': CARD_V2_SURFACE_COLORS.surfaceContrast,
      }),
      variant: figma.enum('Style', {
        'Panel • Keyline': CARD_V2_VARIANTS.outlined,
        'Panel • No keyline': CARD_V2_VARIANTS.noElevation,
      }),
      children: figma.slot('Contents'),
    },
    example: ({ bgColor, children, variant }) => (
      <BpkCardV2.Root bgColor={bgColor} variant={variant}>
        <BpkCardV2.Body>{children}</BpkCardV2.Body>
      </BpkCardV2.Root>
    ),
  },
);
