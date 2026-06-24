// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=8308%3A186
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/baggage-cabin.d.ts
// component=BpkSmallBaggageCabinIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallBaggageCabinIcon",
    imports: [
      "import BpkSmallBaggageCabinIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/baggage-cabin';",
    ],
    example: figma.code`<BpkSmallBaggageCabinIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeBaggageCabinIcon",
    imports: [
      "import BpkLargeBaggageCabinIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-cabin';",
    ],
    example: figma.code`<BpkLargeBaggageCabinIcon />`,
  }
} else {
  template = {
    id: "BpkLargeBaggageCabinIcon",
    imports: [
      "import BpkLargeBaggageCabinIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/baggage-cabin';",
    ],
    example: figma.code`<BpkLargeBaggageCabinIcon />`,
  }
}

export default template
