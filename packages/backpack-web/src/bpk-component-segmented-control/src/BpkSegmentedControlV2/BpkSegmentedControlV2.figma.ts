// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=17386-8546
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-segmented-control/src/BpkSegmentedControlV2/BpkSegmentedControlV2.tsx
// component=BpkSegmentedControlV2.Root

import figma from "figma"

const type = figma.selectedInstance.getEnum("Style", {
  "Canvas Default": figma.helpers.react.identifier(
    "SEGMENT_TYPES_V2.CanvasDefault",
  ),
  "Canvas Contrast": figma.helpers.react.identifier(
    "SEGMENT_TYPES_V2.CanvasContrast",
  ),
  "Surface Default": figma.helpers.react.identifier(
    "SEGMENT_TYPES_V2.SurfaceDefault",
  ),
  "Surface Contrast": figma.helpers.react.identifier(
    "SEGMENT_TYPES_V2.SurfaceContrast",
  ),
})

export default {
  id: "BpkSegmentedControlV2.Root",
  imports: [
    "import BpkSegmentedControlV2 from '@skyscanner/backpack-web/bpk-component-segmented-control';",
  ],
  example: figma.code`<BpkSegmentedControlV2.Root${figma.helpers.react.renderProp(
    "type",
    type,
  )} defaultValue="option1" label="Select option">
      <BpkSegmentedControlV2.Item value="option1">
        <BpkSegmentedControlV2.ItemText>Option 1</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
      <BpkSegmentedControlV2.Item value="option2">
        <BpkSegmentedControlV2.ItemText>Option 2</BpkSegmentedControlV2.ItemText>
        <BpkSegmentedControlV2.ItemControl />
        <BpkSegmentedControlV2.ItemHiddenInput />
      </BpkSegmentedControlV2.Item>
    </BpkSegmentedControlV2.Root>`,
  metadata: { nestable: true },
}
