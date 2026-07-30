// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A52134
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-chip/src/BpkSelectableChip.tsx
// component=BpkSelectableChip

import figma from "figma"

// Branch per variant; no default, else first.

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
      "import BpkSelectableChip from '@skyscanner/backpack-web/bpk-component-chip';",
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
      "import BpkDropdownChip from '@skyscanner/backpack-web/bpk-component-chip';",
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
      "import BpkDismissibleChip from '@skyscanner/backpack-web/bpk-component-chip';",
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
} else {
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
      "import BpkDismissibleChip from '@skyscanner/backpack-web/bpk-component-chip';",
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
