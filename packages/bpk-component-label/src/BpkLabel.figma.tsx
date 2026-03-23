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

import figma from "@figma/code-connect"

import BpkLabel from "./BpkLabel";

figma.connect(
  BpkLabel,
  "https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10872%3A5124",
  {
    props: {
      required: figma.enum("Required", {
        "True": true,
        "False": false,
      }),
      disabled: figma.enum("State", {
        "Disabled": true,
      }),
      valid: figma.enum("State", {
        "Invalid": false,
        "Default": undefined,
      }),
      children: figma.textContent("*"),
    },
    example: ({ children, disabled, required, valid }) => (
      <BpkLabel htmlFor="input-id" required={required} disabled={disabled} valid={valid}>
        {children}
      </BpkLabel>
    ),
  },
)
