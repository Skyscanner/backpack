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

import BpkPrice from "./BpkPrice"
import { SIZES, ALIGNS } from './common-types'


figma.connect(
  BpkPrice,
  "https://www.figma.com/design/irZ3YBx8vOm16ICkAr7mB3/Backpack-Components?node-id=16470%3A17021",
  {
    props: {
      price: figma.string("Price"),
      size: figma.enum("Size", {
        "X-Small": SIZES.xsmall,
        Small: SIZES.small,
        Medium: SIZES.medium,
        Large: SIZES.large,
      }),
      align: figma.enum("Alignment", {
        Left: ALIGNS.left,
        Right: ALIGNS.right,
      }),
      trailingText: figma.string('Trailing text'),
    },
    example: ({ align, price, size, trailingText }) => (
      <BpkPrice price={price} size={size} align={align} trailingText={trailingText} />
    ),
  },
)
