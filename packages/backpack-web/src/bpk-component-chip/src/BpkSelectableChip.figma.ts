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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A52134
// source=https://github.com/Skyscanner/design-system/blob/main/packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip.tsx
// component=BpkSelectableChip

import figma from "figma"

let template
if (figma.selectedInstance.getPropertyValue("Type") === "Selectable") {
  const label = figma.selectedInstance.getString("Label")
  const type = figma.selectedInstance.getEnum("Style", {
    Default: figma.helpers.react.identifier("CHIP_TYPES.default"),
    "On Dark": figma.helpers.react.identifier("CHIP_TYPES.onDark"),
    "On Image": figma.helpers.react.identifier("CHIP_TYPES.onImage"),
  })
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  })
  const icon = figma.selectedInstance.getBoolean("Icon", {
    true: figma.helpers.react.jsxElement("<DealsIconSm />"),
    false: undefined,
  })

  template = {
    id: "BpkSelectableChip",
    imports: [
      "import BpkSelectableChip from '@skyscanner-internal/backpack-web/bpk-component-chip';",
    ],
    example: figma.code`<BpkSelectableChip onClick={() => null}${figma.helpers.react.renderProp(
      "leadingAccessoryView",
      icon,
    )}${figma.helpers.react.renderProp(
      "accessibilityLabel",
      label,
    )}${figma.helpers.react.renderProp(
      "type",
      type,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}>${figma.helpers.react.renderChildren(label)}</BpkSelectableChip>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Dropdown") {
  const label = figma.selectedInstance.getString("Label")
  const type = figma.selectedInstance.getEnum("Style", {
    Default: figma.helpers.react.identifier("CHIP_TYPES.default"),
    "On Dark": figma.helpers.react.identifier("CHIP_TYPES.onDark"),
    "On Image": figma.helpers.react.identifier("CHIP_TYPES.onImage"),
  })
  const disabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  })
  const icon = figma.selectedInstance.getBoolean("Icon", {
    true: figma.helpers.react.jsxElement("<DealsIconSm />"),
    false: undefined,
  })

  template = {
    id: "BpkDropdownChip",
    imports: [
      "import BpkDropdownChip from '@skyscanner-internal/backpack-web/bpk-component-chip';",
    ],
    example: figma.code`<BpkDropdownChip onClick={() => null}${figma.helpers.react.renderProp(
      "accessibilityLabel",
      label,
    )}${figma.helpers.react.renderProp(
      "leadingAccessoryView",
      icon,
    )}${figma.helpers.react.renderProp(
      "type",
      type,
    )}${figma.helpers.react.renderProp(
      "disabled",
      disabled,
    )}>${figma.helpers.react.renderChildren(label)}</BpkDropdownChip>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Type") === "Dismissible") {
  const label = figma.selectedInstance.getString("Label")
  const type = figma.selectedInstance.getEnum("Style", {
    Default: figma.helpers.react.identifier("CHIP_TYPES.default"),
    "On Dark": figma.helpers.react.identifier("CHIP_TYPES.onDark"),
    "On Image": figma.helpers.react.identifier("CHIP_TYPES.onImage"),
  })
  const icon = figma.selectedInstance.getBoolean("Icon", {
    true: figma.helpers.react.jsxElement("<DealsIconSm />"),
    false: undefined,
  })

  template = {
    id: "BpkDismissibleChip",
    imports: [
      "import BpkDismissibleChip from '@skyscanner-internal/backpack-web/bpk-component-chip';",
    ],
    example: figma.code`<BpkDismissibleChip onClick={() => null}${figma.helpers.react.renderProp(
      "leadingAccessoryView",
      icon,
    )}${figma.helpers.react.renderProp(
      "accessibilityLabel",
      label,
    )}${figma.helpers.react.renderProp(
      "type",
      type,
    )}>${figma.helpers.react.renderChildren(label)}</BpkDismissibleChip>`,
    metadata: { nestable: true },
  }
}

export default template
