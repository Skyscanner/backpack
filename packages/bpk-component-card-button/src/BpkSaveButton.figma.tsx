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

import BpkSaveButton, { SIZE_TYPES, STYLE_TYPES } from "./BpkSaveButton"

figma.connect(
  BpkSaveButton,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=22719%3A26190",
  {
    props: {
      size: figma.enum("Size", {
        Default: SIZE_TYPES.default,
        Small: SIZE_TYPES.small,
      }),
      style: figma.enum("Style", {
        Default: STYLE_TYPES.default,
        Contained: STYLE_TYPES.contained,
        "On Dark": STYLE_TYPES.onDark,
      }),
      checked: figma.enum('State', {
        "Saved": true,
      })
    },
    example: ({ checked, size, style }) => (
      <BpkSaveButton
        checked={checked}
        accessibilityLabel="Save"
        onCheckedChange={() => {}}
        size={size}
        style={style}
      />
    ),
  },
)
