// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=15024-7431
// source=packages/backpack-web/src/bpk-component-modal/src/BpkModalV3/BpkModalV3.tsx
// component=BpkModalV3
// eslint-disable-next-line import/no-unresolved
import figma from 'figma'

const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  'Overlay': 'default',
  'Modal Sheet': 'sheet',
  'Modal Full': 'full',
  '🚧 Drawer': 'default',
})

const hasHeadline = instance.getBoolean('Headline?')
const headline = hasHeadline ? instance.getSlot('Headline') : undefined
const layout = instance.getSlot('Layout')

export default {
  example: figma.code`
<BpkModalV3.Root type="${type}">
  <BpkModalV3.Trigger>
    {/* trigger element */}
  </BpkModalV3.Trigger>
  <BpkModalV3.Portal>
    <BpkModalV3.Scrim />
    <BpkModalV3.Content>
      ${hasHeadline ? figma.code`<BpkModalV3.Header>
        <BpkModalV3.Title>${headline}</BpkModalV3.Title>
        <BpkModalV3.CloseTrigger />
      </BpkModalV3.Header>` : figma.code`<BpkModalV3.CloseTrigger />`}
      <BpkModalV3.Body>
        ${layout}
      </BpkModalV3.Body>
    </BpkModalV3.Content>
  </BpkModalV3.Portal>
</BpkModalV3.Root>
  `,
  imports: [`import { BpkModalV3 } from '@skyscanner/backpack-web/bpk-component-modal'`],
  id: 'bpk-modal-v3',
}
