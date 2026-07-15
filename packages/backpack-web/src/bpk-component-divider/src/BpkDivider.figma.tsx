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

import BpkDivider from "./BpkDivider"

// Note: the Figma component currently only includes the horizontal variant, so
// it has no `Orientation` property. The component's `orientation` prop
// (horizontal/vertical) is therefore intentionally not mapped here — design has
// confirmed both orientations are required, and the vertical case is a known
// omission in Figma. Once the vertical variant is added to the Figma component,
// map it here via `figma.enum("Orientation", { ... })`.
figma.connect(
  BpkDivider,
  "https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=21653-57904",
  {
    props: {
      spacing: figma.enum("Padding", {
        NoSpace: "none",
        Base: "base",
        Large: "lg",
      }),
      weight: figma.enum("Weight", {
        "1px": "default",
        "2px": "bold",
      }),
    },
    example: ({ spacing, weight }) => (
      <BpkDivider spacing={spacing} weight={weight} />
    ),
  },
)
