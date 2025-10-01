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

import figma from "@figma/code-connect";

import BpkSwitch from "./BpkSwitch";

figma.connect(
  BpkSwitch,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=6099%3A10807",
  {
    props: {
      size: figma.enum("Size", {
        "Default": false,
        "Small": true,
      }),
      state: figma.enum("State", {
        "On": true,
        "Off": false,
      }),
    },
    example: ({size, state}) => (
      <BpkSwitch ariaLabel="Activate Backpack" small={size} checked={state} />
    ),
  },
)
