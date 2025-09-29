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

import { BpkButtonV2 } from '../../bpk-component-button';

import BpkSectionHeader, { SECTION_TYPES } from './BpkSectionHeader';

figma.connect(
  BpkSectionHeader,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=31941%3A4068',
  {
    props: {
      title: figma.string('Title'),
      description: figma.string('Subheading'),
      button: figma.boolean('Button', {
        true: <BpkButtonV2 onClick={() => null}>action</BpkButtonV2>,
      }),
      style: figma.enum('Style', {
        Default: SECTION_TYPES.default,
        'On Dark': SECTION_TYPES.onDark,
      }),
    },
    example: ({ button, description, style, title }) => (
      <BpkSectionHeader
        title={title}
        description={description}
        style={style}
        button={button}
      />
    ),
  },
);
