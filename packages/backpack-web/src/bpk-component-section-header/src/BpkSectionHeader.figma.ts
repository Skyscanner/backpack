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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10911%3A28653
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-section-header/src/BpkSectionHeader.tsx
// component=BpkSectionHeader

import figma from "figma"

const title = figma.selectedInstance.getString("Title")
const description = figma.selectedInstance.getString("Subheading")
const button = figma.selectedInstance.getBoolean("Button", {
  true: figma.helpers.react.jsxElement(
    "<BpkButton onClick={() => null}>action</BpkButton>",
  ),
})
const style = figma.selectedInstance.getEnum("Style", {
  Default: figma.helpers.react.identifier("SECTION_TYPES.default"),
  "On Dark": figma.helpers.react.identifier("SECTION_TYPES.onDark"),
})

export default {
  id: "BpkSectionHeader",
  imports: [
    "import BpkSectionHeader, { SECTION_TYPES } from '@skyscanner/backpack-web/bpk-component-section-header';",
  ],
  example: figma.code`<BpkSectionHeader${figma.helpers.react.renderProp(
    "title",
    title,
  )}${figma.helpers.react.renderProp(
    "description",
    description,
  )}${figma.helpers.react.renderProp(
    "style",
    style,
  )}${figma.helpers.react.renderProp("button", button)}/>`,
  metadata: { nestable: true },
}
