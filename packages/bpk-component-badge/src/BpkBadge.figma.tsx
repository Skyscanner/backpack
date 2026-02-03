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

import figma from "@figma/code-connect"

import BpkBadge, { BADGE_TYPES } from './BpkBadge';

figma.connect(
  BpkBadge,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=37974%3A344",
  {
    props: {
      style: figma.enum('Style', {
        "Normal": BADGE_TYPES.normal,
        "Success": BADGE_TYPES.success,
        "Warning": BADGE_TYPES.warning,
        "Critical": BADGE_TYPES.critical,
        "Inverse": BADGE_TYPES.inverse,
        "Outline": BADGE_TYPES.outline,
        "Brand": BADGE_TYPES.brand,
        "Strong": BADGE_TYPES.strong
      }),
      label: figma.textContent("Attribute"),
    },
    example: ({ label, style }) => <BpkBadge type={style}>{label}</BpkBadge>,
  },
)
