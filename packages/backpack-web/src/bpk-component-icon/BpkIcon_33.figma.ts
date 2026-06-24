// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=13288%3A33
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baggage-personal-item.d.ts
// component=BpkSmallBaggagePersonalItemIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBaggagePersonalItemIcon",
    imports: [
      "import BpkSmallBaggagePersonalItemIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage-personal-item';",
    ],
    example: figma.code`<BpkSmallBaggagePersonalItemIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBaggagePersonalItemIcon",
    imports: [
      "import BpkLargeBaggagePersonalItemIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-personal-item';",
    ],
    example: figma.code`<BpkLargeBaggagePersonalItemIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBaggagePersonalItemIcon",
    imports: [
      "import BpkLargeBaggagePersonalItemIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-personal-item';",
    ],
    example: figma.code`<BpkLargeBaggagePersonalItemIcon />`,
  }
}

export default template
