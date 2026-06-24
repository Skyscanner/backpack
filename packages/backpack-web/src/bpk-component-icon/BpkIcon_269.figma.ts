// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A263
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/world--emea.d.ts
// component=BpkSmallWorldEmeaIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallWorldEmeaIcon",
    imports: [
      "import BpkSmallWorldEmeaIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/world--emea';",
    ],
    example: figma.code`<BpkSmallWorldEmeaIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeWorldEmeaIcon",
    imports: [
      "import BpkLargeWorldEmeaIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/world--emea';",
    ],
    example: figma.code`<BpkLargeWorldEmeaIcon />`,
  }
} else {
  template = {
    id: "BpkLargeWorldEmeaIcon",
    imports: [
      "import BpkLargeWorldEmeaIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/world--emea';",
    ],
    example: figma.code`<BpkLargeWorldEmeaIcon />`,
  }
}

export default template
