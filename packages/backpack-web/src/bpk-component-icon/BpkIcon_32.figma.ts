// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=8308%3A192
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baggage-generic.d.ts
// component=BpkSmallBaggageGenericIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBaggageGenericIcon",
    imports: [
      "import BpkSmallBaggageGenericIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage-generic';",
    ],
    example: figma.code`<BpkSmallBaggageGenericIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBaggageGenericIcon",
    imports: [
      "import BpkLargeBaggageGenericIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-generic';",
    ],
    example: figma.code`<BpkLargeBaggageGenericIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBaggageGenericIcon",
    imports: [
      "import BpkLargeBaggageGenericIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-generic';",
    ],
    example: figma.code`<BpkLargeBaggageGenericIcon />`,
  }
}

export default template
