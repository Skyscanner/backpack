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
// @ts-nocheck

import figma from '@figma/code-connect';

import BpkImage from '../../bpk-component-image/src/BpkImage';

import BpkOverlay, { OVERLAY_TYPES } from './BpkOverlay';

figma.connect(
  BpkOverlay,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=11552%3A10364',
  {
    props: {
      style: figma.enum('Style', {
        High: OVERLAY_TYPES.solidHigh,
        Medium: OVERLAY_TYPES.solidMedium,
        Low: OVERLAY_TYPES.solidLow,
        None: OVERLAY_TYPES.off,
        '↓ Heavy': OVERLAY_TYPES.heavyBottom,
        '↓ High': OVERLAY_TYPES.bottomHigh,
        '↓ Medium': OVERLAY_TYPES.bottomMedium,
        '↓ Low': OVERLAY_TYPES.bottomLow,
        '↑ Heavy': OVERLAY_TYPES.heavyTop,
        '↑ High': OVERLAY_TYPES.topHigh,
        '↑ Medium': OVERLAY_TYPES.topMedium,
        '↑ Low': OVERLAY_TYPES.topLow,
        '← High': OVERLAY_TYPES.leftHigh,
        '← Medium': OVERLAY_TYPES.leftMedium,
        '← Low': OVERLAY_TYPES.leftLow,
        '→ High': OVERLAY_TYPES.rightHigh,
        '→ Medium': OVERLAY_TYPES.rightMedium,
        '→ Low': OVERLAY_TYPES.rightLow,
        '◻︎ Vignette': OVERLAY_TYPES.vignette,
      }),
    },
    example: ({ style }) => (
      <BpkOverlay overlayType={style}>
        <BpkImage
          altText="altText here"
          aspectRatio={16 / 9}
          src="https://content.skyscnr.com/m/f8b42e98e2b79a6/original/Carousel-placeholder-3.jpg"
        />
      </BpkOverlay>
    ),
  },
);
