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

import {
  BpkCheckboxV2 as BpkCheckbox,
  checkboxBorderRadiusThemeAttributes,
  checkboxSelectedColorThemeAttributes,
} from '../../packages/bpk-component-checkbox';
import {
  BpkFlex,
  BpkProvider,
  BpkSpacing,
} from '../../packages/bpk-component-layout';
import BpkThemeProvider from '../../packages/bpk-theming';

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
  <BpkProvider>
    <BpkCheckbox.Root>
      <BpkCheckbox.Control>
        <BpkCheckbox.Indicator />
      </BpkCheckbox.Control>
      <BpkFlex direction="column">
        <BpkCheckbox.Label>Price alerts</BpkCheckbox.Label>
        <BpkCheckbox.Description>
          We&apos;ll email you about price drops. Unsubscribe anytime.
        </BpkCheckbox.Description>
      </BpkFlex>
      <BpkCheckbox.HiddenInput />
    </BpkCheckbox.Root>
  </BpkProvider>
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

export const DisabledStatesExample = () => (
  <BpkProvider>
    <BpkFlex direction="column" gap={BpkSpacing.SM}>
      <DisabledCheckedExample />
      <DisabledExample />
    </BpkFlex>
  </BpkProvider>
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

export const ThemedExample = () => (
  <BpkProvider>
    <BpkThemeProvider
      theme={{ checkboxSelectedColor: '#8B1A1A', checkboxBorderRadius: '50%' }}
      themeAttributes={[...checkboxSelectedColorThemeAttributes, ...checkboxBorderRadiusThemeAttributes]}
    >
      <BpkFlex gap={BpkSpacing.Base} direction="column">
        <BpkCheckbox.Root defaultChecked>
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Custom colour + border-radius — checked</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
        <BpkCheckbox.Root defaultChecked="indeterminate">
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Custom colour + border-radius — indeterminate</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
      </BpkFlex>
    </BpkThemeProvider>
  </BpkProvider>
);

export const MixedExample = () => (
  <BpkProvider>
    <BpkFlex gap={BpkSpacing.Base} direction="column">
      <SimpleLabelExample />
      <TitleAndSubtitleExample />
      <InlineLinkInLabelExample />
      <DefaultCheckedExample />
      <DisabledExample />
      <DisabledCheckedExample />
      <IndeterminateExample />
      <InvalidExample />
      <ThemedExample />
    </BpkFlex>
  </BpkProvider>
);
