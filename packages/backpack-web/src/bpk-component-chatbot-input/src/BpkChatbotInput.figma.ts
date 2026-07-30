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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=17976-8833
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-chatbot-input/src/BpkChatbotInput.tsx
// component=BpkChatbotInput.Root

import figma from "figma"

const placeholder = figma.selectedInstance.findText("Your message").__render__()

export default {
  id: "BpkChatbotInput.Root",
  imports: [
    "import BpkChatbotInput from '@skyscanner/backpack-web/bpk-component-chatbot-input';",
  ],
  example: figma.code`<BpkChatbotInput.Root>
        <BpkChatbotInput.Input inputValue=""${figma.helpers.react.renderProp(
          "placeholder",
          placeholder,
        )} onInputChange={() => { }} onInputFocus={() => { }} onInputBlur={() => { }} onSubmit={() => { }} sendAriaLabel="Send message" loadingAriaLabel="Sending message"/>
      </BpkChatbotInput.Root>`,
  metadata: { nestable: true },
}
