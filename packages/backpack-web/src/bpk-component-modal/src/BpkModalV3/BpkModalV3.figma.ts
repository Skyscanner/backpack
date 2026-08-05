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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=15024-7431
// source=packages/backpack-web/src/bpk-component-modal/src/BpkModalV3/BpkModalV3.tsx
// component=BpkModalV3
import figma from 'figma'

const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  'Overlay': 'default',
  'Modal Sheet': 'sheet',
  'Modal Full': 'full',
  '🚧 Drawer': 'default', // WIP placeholder: maps to Overlay Modal until Drawer has its own component
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
  imports: [`import { BpkModalV3 } from '@skyscanner-internal/backpack-web/bpk-component-modal'`],
  id: 'bpk-modal-v3',
}
