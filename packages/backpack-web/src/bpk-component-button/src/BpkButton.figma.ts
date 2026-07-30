// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=10858%3A8677
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-button/src/BpkButton.tsx
// component=BpkButton

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Icon") === "Icon only") {
  const style = figma.selectedInstance.getEnum("Style", {
    Primary: figma.helpers.react.identifier("BUTTON_TYPES.primary"),
    Secondary: figma.helpers.react.identifier("BUTTON_TYPES.secondary"),
    Featured: figma.helpers.react.identifier("BUTTON_TYPES.featured"),
    "Primary on light": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnLight",
    ),
    "Primary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnDark",
    ),
    "Secondary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.secondaryOnDark",
    ),
    Destructive: figma.helpers.react.identifier("BUTTON_TYPES.destructive"),
    Link: figma.helpers.react.identifier("BUTTON_TYPES.link"),
    "Link on dark": figma.helpers.react.identifier("BUTTON_TYPES.linkOnDark"),
  })
  const size = figma.selectedInstance.getEnum("Size", {
    Default: figma.helpers.react.identifier("SIZE_TYPES.small"),
    Large: figma.helpers.react.identifier("SIZE_TYPES.large"),
  })
  const isDisabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  })
  const isLoading = figma.selectedInstance.getEnum("State", {
    Loading: true,
  })
  const label = figma.selectedInstance.findText("Label").__render__()

  template = {
    id: "BpkButton",
    imports: [
      "import LightningIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/lightning';",
      "import BpkButton from '@skyscanner/backpack-web/bpk-component-button'",
    ],
    example: figma.code`<BpkButton${figma.helpers.react.renderProp(
      "type",
      style,
    )}${figma.helpers.react.renderProp(
      "size",
      size,
    )}${figma.helpers.react.renderProp(
      "disabled",
      isDisabled,
    )} iconOnly${figma.helpers.react.renderProp(
      "loading",
      isLoading,
    )}${figma.helpers.react.renderProp("aria-label", label)}>
        <LightningIcon />
      </BpkButton>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Icon") === "Left") {
  const style = figma.selectedInstance.getEnum("Style", {
    Primary: figma.helpers.react.identifier("BUTTON_TYPES.primary"),
    Secondary: figma.helpers.react.identifier("BUTTON_TYPES.secondary"),
    Featured: figma.helpers.react.identifier("BUTTON_TYPES.featured"),
    "Primary on light": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnLight",
    ),
    "Primary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnDark",
    ),
    "Secondary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.secondaryOnDark",
    ),
    Destructive: figma.helpers.react.identifier("BUTTON_TYPES.destructive"),
    Link: figma.helpers.react.identifier("BUTTON_TYPES.link"),
    "Link on dark": figma.helpers.react.identifier("BUTTON_TYPES.linkOnDark"),
  })
  const size = figma.selectedInstance.getEnum("Size", {
    Default: figma.helpers.react.identifier("SIZE_TYPES.small"),
    Large: figma.helpers.react.identifier("SIZE_TYPES.large"),
  })
  const isDisabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  })
  const isLoading = figma.selectedInstance.getEnum("State", {
    Loading: true,
  })
  const label = figma.selectedInstance.findText("Label").__render__()

  template = {
    id: "BpkButton",
    imports: [
      "import BpkButton from '@skyscanner/backpack-web/bpk-component-button'",
    ],
    example: figma.code`<BpkButton${figma.helpers.react.renderProp(
      "type",
      style,
    )}${figma.helpers.react.renderProp(
      "size",
      size,
    )}${figma.helpers.react.renderProp(
      "disabled",
      isDisabled,
    )} leadingIcon={LightningIcon}${figma.helpers.react.renderProp(
      "loading",
      isLoading,
    )}>
        ${figma.helpers.react.renderChildren(label)}
      </BpkButton>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Icon") === "Right") {
  const style = figma.selectedInstance.getEnum("Style", {
    Primary: figma.helpers.react.identifier("BUTTON_TYPES.primary"),
    Secondary: figma.helpers.react.identifier("BUTTON_TYPES.secondary"),
    Featured: figma.helpers.react.identifier("BUTTON_TYPES.featured"),
    "Primary on light": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnLight",
    ),
    "Primary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnDark",
    ),
    "Secondary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.secondaryOnDark",
    ),
    Destructive: figma.helpers.react.identifier("BUTTON_TYPES.destructive"),
    Link: figma.helpers.react.identifier("BUTTON_TYPES.link"),
    "Link on dark": figma.helpers.react.identifier("BUTTON_TYPES.linkOnDark"),
  })
  const size = figma.selectedInstance.getEnum("Size", {
    Default: figma.helpers.react.identifier("SIZE_TYPES.small"),
    Large: figma.helpers.react.identifier("SIZE_TYPES.large"),
  })
  const isDisabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  })
  const isLoading = figma.selectedInstance.getEnum("State", {
    Loading: true,
  })
  const label = figma.selectedInstance.findText("Label").__render__()

  template = {
    id: "BpkButton",
    imports: [
      "import BpkButton from '@skyscanner/backpack-web/bpk-component-button'",
    ],
    example: figma.code`<BpkButton${figma.helpers.react.renderProp(
      "type",
      style,
    )}${figma.helpers.react.renderProp(
      "size",
      size,
    )}${figma.helpers.react.renderProp(
      "disabled",
      isDisabled,
    )} trailingIcon={LongArrowRightIcon}${figma.helpers.react.renderProp(
      "loading",
      isLoading,
    )}>
        ${figma.helpers.react.renderChildren(label)}
      </BpkButton>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("Icon") === "None") {
  const style = figma.selectedInstance.getEnum("Style", {
    Primary: figma.helpers.react.identifier("BUTTON_TYPES.primary"),
    Secondary: figma.helpers.react.identifier("BUTTON_TYPES.secondary"),
    Featured: figma.helpers.react.identifier("BUTTON_TYPES.featured"),
    "Primary on light": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnLight",
    ),
    "Primary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnDark",
    ),
    "Secondary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.secondaryOnDark",
    ),
    Destructive: figma.helpers.react.identifier("BUTTON_TYPES.destructive"),
    Link: figma.helpers.react.identifier("BUTTON_TYPES.link"),
    "Link on dark": figma.helpers.react.identifier("BUTTON_TYPES.linkOnDark"),
  })
  const size = figma.selectedInstance.getEnum("Size", {
    Default: figma.helpers.react.identifier("SIZE_TYPES.small"),
    Large: figma.helpers.react.identifier("SIZE_TYPES.large"),
  })
  const isDisabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  })
  const isLoading = figma.selectedInstance.getEnum("State", {
    Loading: true,
  })
  const label = figma.selectedInstance.findText("Label").__render__()

  template = {
    id: "BpkButton",
    imports: [
      "import BpkButton from '@skyscanner/backpack-web/bpk-component-button'",
    ],
    example: figma.code`<BpkButton${figma.helpers.react.renderProp(
      "type",
      style,
    )}${figma.helpers.react.renderProp(
      "size",
      size,
    )}${figma.helpers.react.renderProp(
      "disabled",
      isDisabled,
    )}${figma.helpers.react.renderProp("loading", isLoading)}>
        ${figma.helpers.react.renderChildren(label)}
      </BpkButton>`,
    metadata: { nestable: true },
  }
} else {
  const style = figma.selectedInstance.getEnum("Style", {
    Primary: figma.helpers.react.identifier("BUTTON_TYPES.primary"),
    Secondary: figma.helpers.react.identifier("BUTTON_TYPES.secondary"),
    Featured: figma.helpers.react.identifier("BUTTON_TYPES.featured"),
    "Primary on light": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnLight",
    ),
    "Primary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.primaryOnDark",
    ),
    "Secondary on dark": figma.helpers.react.identifier(
      "BUTTON_TYPES.secondaryOnDark",
    ),
    Destructive: figma.helpers.react.identifier("BUTTON_TYPES.destructive"),
    Link: figma.helpers.react.identifier("BUTTON_TYPES.link"),
    "Link on dark": figma.helpers.react.identifier("BUTTON_TYPES.linkOnDark"),
  })
  const size = figma.selectedInstance.getEnum("Size", {
    Default: figma.helpers.react.identifier("SIZE_TYPES.small"),
    Large: figma.helpers.react.identifier("SIZE_TYPES.large"),
  })
  const isDisabled = figma.selectedInstance.getEnum("State", {
    Disabled: true,
  })
  const isLoading = figma.selectedInstance.getEnum("State", {
    Loading: true,
  })
  const label = figma.selectedInstance.findText("Label").__render__()

  template = {
    id: "BpkButton",
    imports: [
      "import BpkButton from '@skyscanner/backpack-web/bpk-component-button'",
    ],
    example: figma.code`<BpkButton${figma.helpers.react.renderProp(
      "type",
      style,
    )}${figma.helpers.react.renderProp(
      "size",
      size,
    )}${figma.helpers.react.renderProp(
      "disabled",
      isDisabled,
    )}${figma.helpers.react.renderProp("loading", isLoading)}>
        ${figma.helpers.react.renderChildren(label)}
      </BpkButton>`,
    metadata: { nestable: true },
  }
}

export default template
