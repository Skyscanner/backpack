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

// url=https://www.figma.com/design/KXf2gHNLDe2cXWUoHl4cTX/Backpack%E2%80%A8Foundations---Components?node-id=15024%3A6380
// source=https://github.com/Skyscanner/backpack/blob/main/packages/backpack-web/src/bpk-component-ai-blurb/src/BpkAiBlurb.tsx
// component=BpkAiBlurb.Root

import figma from "figma"

// Branch per variant; no default, else first.

let template
if (figma.selectedInstance.getPropertyValue("State") === "Default") {
  const summaryText = figma.selectedInstance.findText("Text").__render__()
  const headerTitle = figma.selectedInstance.findText("Attribute").__render__()

  template = {
    id: "BpkAiBlurb.Root",
    imports: [
      "import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';",
    ],
    example: figma.code`<BpkAiBlurb.Root>
        <BpkAiBlurb.Header${figma.helpers.react.renderProp(
          "title",
          headerTitle,
        )}/>
        <BpkAiBlurb.Summary state="aiResponse"${figma.helpers.react.renderProp(
          "aiResponseText",
          summaryText,
        )}/>
        <BpkAiBlurb.Feedback feedbackText="Was this helpful?" thankYouText="Thanks for your feedback!" thumbsUpLabel="Thumbs up" thumbsDownLabel="Thumbs down" onFeedback={() => { }}/>
      </BpkAiBlurb.Root>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("State") === "Thinking") {
  const thinkingText = figma.selectedInstance.findText("Text").__render__()

  template = {
    id: "BpkAiBlurb.Root",
    imports: [
      "import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';",
    ],
    example: figma.code`<BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI"/>
        <BpkAiBlurb.Summary state="thinking"${figma.helpers.react.renderProp(
          "thinkingText",
          thinkingText,
        )}/>
      </BpkAiBlurb.Root>`,
    metadata: { nestable: true },
  }
} else if (figma.selectedInstance.getPropertyValue("State") === "Error") {
  template = {
    id: "BpkAiBlurb.Root",
    imports: [
      "import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';",
    ],
    example: figma.code`<BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI"/>
        <BpkAiBlurb.Summary state="error" errorText="Something went wrong" errorActionText="Try again" onErrorClick={() => { }}/>
      </BpkAiBlurb.Root>`,
  }
} else {
  template = {
    id: "BpkAiBlurb.Root",
    imports: [
      "import BpkAiBlurb from '@skyscanner/backpack-web/bpk-component-ai-blurb';",
    ],
    example: figma.code`<BpkAiBlurb.Root>
        <BpkAiBlurb.Header title="Summarized by AI"/>
        <BpkAiBlurb.Summary state="error" errorText="Something went wrong" errorActionText="Try again" onErrorClick={() => { }}/>
      </BpkAiBlurb.Root>`,
  }
}

export default template
