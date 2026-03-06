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

import BpkCheckbox from '../../packages/bpk-component-checkbox-v2/src/BpkCheckbox';

export const SimpleLabelExample = () => (
  <BpkCheckbox.Root>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>Send me deals</BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const TitleAndSubtitleExample = () => (
  <BpkCheckbox.Root>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <div>
      <BpkCheckbox.Label>Price alerts</BpkCheckbox.Label>
      <BpkCheckbox.Description>
        We&apos;ll email you about price drops. Unsubscribe anytime.
      </BpkCheckbox.Description>
    </div>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const InlineLinkInLabelExample = () => (
  <BpkCheckbox.Root>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>
      I agree to the <a href="/terms">terms and conditions</a>
    </BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const DefaultCheckedExample = () => (
  <BpkCheckbox.Root defaultChecked>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>Already opted in</BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const DisabledExample = () => (
  <BpkCheckbox.Root disabled>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>Unavailable option</BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const DisabledCheckedExample = () => (
  <BpkCheckbox.Root disabled defaultChecked>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>Mandatory selection</BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const IndeterminateExample = () => (
  <BpkCheckbox.Root defaultChecked="indeterminate">
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>Weekdays (some selected)</BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const InvalidExample = () => (
  <BpkCheckbox.Root invalid>
    <BpkCheckbox.Control>
      <BpkCheckbox.Indicator />
    </BpkCheckbox.Control>
    <BpkCheckbox.Label>I agree to the terms</BpkCheckbox.Label>
    <BpkCheckbox.HiddenInput />
  </BpkCheckbox.Root>
);

export const MixedExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <SimpleLabelExample />
    <TitleAndSubtitleExample />
    <InlineLinkInLabelExample />
    <DefaultCheckedExample />
    <DisabledExample />
    <DisabledCheckedExample />
    <IndeterminateExample />
    <InvalidExample />
  </div>
);
