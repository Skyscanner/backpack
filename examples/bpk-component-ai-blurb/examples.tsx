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

import BpkAiBlurb from '../../packages/bpk-component-ai-blurb/src/BpkAiBlurb';
import { AI_BLURB_STATES } from '../../packages/bpk-component-ai-blurb/src/common-types';

export const DefaultExample = () => (
  <BpkAiBlurb.Root>
    <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
    <BpkAiBlurb.Content>
      Your flight departs at 09:00 from Terminal 2. Check-in closes 45 minutes before departure.
      Baggage allowance is one cabin bag up to 10 kg. No changes are permitted after booking.
    </BpkAiBlurb.Content>
    <BpkAiBlurb.Footer>Was this helpful?</BpkAiBlurb.Footer>
  </BpkAiBlurb.Root>
);

export const ThinkingExample = () => (
  <BpkAiBlurb.Root state={AI_BLURB_STATES.thinking}>
    <BpkAiBlurb.Header>Summarized by AI</BpkAiBlurb.Header>
    <BpkAiBlurb.Content>
      Your flight departs at 09:00 from Terminal 2. Check-in closes 45 minutes before departure.
      Baggage allowance is one cabin bag up to 10 kg. No changes are permitted after booking.
    </BpkAiBlurb.Content>
  </BpkAiBlurb.Root>
);

export const CustomTextExample = () => (
  <BpkAiBlurb.Root>
    <BpkAiBlurb.Header>Analyzed by AI</BpkAiBlurb.Header>
    <BpkAiBlurb.Content>
      Prices on this route are typically lower on Tuesdays and Wednesdays.
      Booking 6–8 weeks in advance usually offers the best value.
    </BpkAiBlurb.Content>
    <BpkAiBlurb.Footer>Did this help?</BpkAiBlurb.Footer>
  </BpkAiBlurb.Root>
);

export const VisualTestExample = () => (
  <div>
    <DefaultExample />
    <ThinkingExample />
  </div>
);
