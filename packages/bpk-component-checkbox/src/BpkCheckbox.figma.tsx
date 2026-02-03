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

import BpkCheckbox from './BpkCheckbox';

figma.connect(
  BpkCheckbox,
  'https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=30442%3A60450',
  {
    props: {
      state: figma.enum('State', {
        Disabled: true,
      }),
      style: figma.enum('Style', {
        Default: false,
        'On dark': true,
      }),
      label: figma.textContent('Option'),
      onChange: () => {},
    },
    example: ({ label, onChange, state, style }) => (
      <BpkCheckbox
        name={label}
        label={label}
        onChange={onChange}
        white={style}
        disabled={state}
      />
    ),
  },
);
