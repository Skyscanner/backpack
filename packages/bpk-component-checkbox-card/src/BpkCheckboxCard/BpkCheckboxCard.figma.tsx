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

import BpkCheckboxCard, { CHECKBOX_CARD_VARIANTS } from './BpkCheckboxCard';

figma.connect(
  BpkCheckboxCard,
  'https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627',
  {
    props: {
      checked: figma.boolean('Checked'),
      variant: figma.enum('Style', {
        'On Canvas Default': CHECKBOX_CARD_VARIANTS.onCanvasDefault,
        'On Canvas Contrast': CHECKBOX_CARD_VARIANTS.onCanvasContrast,
        'On Surface Contrast': CHECKBOX_CARD_VARIANTS.onSurfaceContrast,
      }),
      disabled: figma.boolean('Disabled'),
      label: figma.textContent('Label'),
    },
    example: (props) => (
      <BpkCheckboxCard
        {...props}
        onChange={() => {}}
        price="£100"
      />
    ),
  },
);
