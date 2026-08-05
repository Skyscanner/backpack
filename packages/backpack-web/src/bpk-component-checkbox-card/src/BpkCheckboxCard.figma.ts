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

// url=https://www.figma.com/design/ITvypOGdga42nM2ipBM4uk/Bpk-2.0?node-id=90-7627
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-checkbox-card/src/BpkCheckboxCard.tsx
// component=BpkCheckboxCard

import figma from "figma"

const checked = figma.selectedInstance.getEnum("State", {
  selected: true,
})
const variant = figma.selectedInstance.getEnum("Style", {
  "On Canvas Default": figma.helpers.react.identifier(
    "CHECKBOX_CARD_VARIANTS.onCanvasDefault",
  ),
  "On Canvas Contrast": figma.helpers.react.identifier(
    "CHECKBOX_CARD_VARIANTS.onCanvasContrast",
  ),
  "On Surface Contrast": figma.helpers.react.identifier(
    "CHECKBOX_CARD_VARIANTS.onSurfaceContrast",
  ),
})
const disabled = figma.selectedInstance.getEnum("State", {
  disabled: true,
})
const label = figma.selectedInstance.findText("Label").__render__()

export default {
  id: "BpkCheckboxCard",
  imports: [
    "import { BpkCheckboxCard } from '@skyscanner-internal/backpack-web/bpk-component-checkbox-card';",
  ],
  example: figma.code`<BpkCheckboxCard.Root${figma.helpers.react.renderProp(
    "checked",
    checked,
  )} onCheckedChange={() => { }}${figma.helpers.react.renderProp(
    "variant",
    variant,
  )}${figma.helpers.react.renderProp("disabled", disabled)}>
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>${figma.helpers.react.renderChildren(
            label,
          )}</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>`,
  metadata: { nestable: true },
}
