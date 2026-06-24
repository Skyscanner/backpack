// url=https://www.figma.com/design/I9hynSlX2wyrlhceZr7z1u/Backpack-Icons?node-id=6033%3A230
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-icon/sm/ticket.d.ts
// component=BpkSmallTicketIcon

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("Size") === "16") {
  template = {
    id: "BpkSmallTicketIcon",
    imports: [
      "import BpkSmallTicketIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/ticket';",
    ],
    example: figma.code`<BpkSmallTicketIcon />`,
  }
} else if (figma.selectedInstance.getPropertyValue("Size") === "24") {
  template = {
    id: "BpkLargeTicketIcon",
    imports: [
      "import BpkLargeTicketIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/ticket';",
    ],
    example: figma.code`<BpkLargeTicketIcon />`,
  }
} else {
  template = {
    id: "BpkLargeTicketIcon",
    imports: [
      "import BpkLargeTicketIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/ticket';",
    ],
    example: figma.code`<BpkLargeTicketIcon />`,
  }
}

export default template
