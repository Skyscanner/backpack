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
  borderRadiusFull,
  statusDangerSpotDay,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import {
  BpkCheckboxV2,
  checkboxBorderRadiusThemeAttributes,
  checkboxSelectedColorThemeAttributes,
} from '../../packages/bpk-component-checkbox';
import {
  BpkFlex,
  BpkProvider,
  BpkSpacing,
} from '../../packages/bpk-component-layout';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../packages/bpk-theming';

import STYLES from './examples.module.scss';

export const SimpleLabelExample = () => (
  <BpkCheckboxV2.Root>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Send me deals</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

export const TitleAndSubtitleExample = () => (
  <BpkProvider>
    <BpkCheckboxV2.Root>
      <BpkCheckboxV2.Control>
        <BpkCheckboxV2.Indicator />
      </BpkCheckboxV2.Control>
      <BpkFlex direction="column">
        <BpkCheckboxV2.Label>Price alerts</BpkCheckboxV2.Label>
        <BpkCheckboxV2.Description>
          We&apos;ll email you about price drops. Unsubscribe anytime.
        </BpkCheckboxV2.Description>
      </BpkFlex>
      <BpkCheckboxV2.HiddenInput />
    </BpkCheckboxV2.Root>
  </BpkProvider>
);

export const InlineLinkInLabelExample = () => (
  <BpkCheckboxV2.Root>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>
      I agree to the <a href="/terms">terms and conditions</a>
    </BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

export const DefaultCheckedExample = () => (
  <BpkCheckboxV2.Root defaultChecked>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Already opted in</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

export const DisabledExample = () => (
  <BpkCheckboxV2.Root disabled>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Unavailable option</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

export const DisabledCheckedExample = () => (
  <BpkCheckboxV2.Root disabled defaultChecked>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Mandatory selection</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
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
  <BpkCheckboxV2.Root checked="indeterminate" onCheckedChange={() => {}}>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Weekdays (some selected)</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

export const InvalidExample = () => (
  <BpkCheckboxV2.Root invalid>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>I agree to the terms</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

export const ThemedExample = () => (
  <BpkProvider>
    <BpkThemeProvider
      theme={{ checkboxSelectedColor: statusDangerSpotDay, checkboxBorderRadius: borderRadiusFull }}
      themeAttributes={[...checkboxSelectedColorThemeAttributes, ...checkboxBorderRadiusThemeAttributes]}
    >
      <BpkFlex gap={BpkSpacing.Base} direction="column">
        <BpkCheckboxV2.Root defaultChecked>
          <BpkCheckboxV2.Control>
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label>Custom colour + border-radius — checked</BpkCheckboxV2.Label>
          <BpkCheckboxV2.HiddenInput />
        </BpkCheckboxV2.Root>
        <BpkCheckboxV2.Root checked="indeterminate" onCheckedChange={() => {}}>
          <BpkCheckboxV2.Control>
            <BpkCheckboxV2.Indicator />
          </BpkCheckboxV2.Control>
          <BpkCheckboxV2.Label>Custom colour + border-radius — indeterminate</BpkCheckboxV2.Label>
          <BpkCheckboxV2.HiddenInput />
        </BpkCheckboxV2.Root>
      </BpkFlex>
    </BpkThemeProvider>
  </BpkProvider>
);

export const ComposedHertzExample = () => (
  <BpkProvider>
    <BpkCheckboxV2.Root defaultChecked>
      <BpkCheckboxV2.Control>
        <BpkCheckboxV2.Indicator />
      </BpkCheckboxV2.Control>
      <BpkFlex direction="column" width="16rem">
        <BpkFlex justify="space-between" align="center">
          <BpkCheckboxV2.Label>Hertz</BpkCheckboxV2.Label>
          <div className={STYLES['bpk-hertz-logo-placeholder']} />
        </BpkFlex>
        <BpkCheckboxV2.Description>from £21</BpkCheckboxV2.Description>
      </BpkFlex>
      <BpkCheckboxV2.HiddenInput />
    </BpkCheckboxV2.Root>
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

/*
 * RTL Spike Option 2 — Before (no BpkProvider)
 *
 * BpkCheckboxV2 rendered WITHOUT BpkProvider.
 * Ark's LocaleProvider is absent, so the checkbox indicator position does NOT
 * respond to the Storybook RTL toolbar toggle.
 *
 * To validate: toggle the Storybook direction (RTL toolbar or html[dir="rtl"]).
 * Expected: indicator remains in its default LTR position — no Ark RTL layout.
 */
export const RtlOption2BeforeExample = () => (
  <BpkFlex direction="column" gap={BpkSpacing.SM}>
    <BpkCheckboxV2.Root defaultChecked>
      <BpkCheckboxV2.Control>
        <BpkCheckboxV2.Indicator />
      </BpkCheckboxV2.Control>
      <BpkCheckboxV2.Label>خيار محدد مسبقاً</BpkCheckboxV2.Label>
      <BpkCheckboxV2.HiddenInput />
    </BpkCheckboxV2.Root>
    <BpkCheckboxV2.Root>
      <BpkCheckboxV2.Control>
        <BpkCheckboxV2.Indicator />
      </BpkCheckboxV2.Control>
      <BpkCheckboxV2.Label>خيار غير محدد</BpkCheckboxV2.Label>
      <BpkCheckboxV2.HiddenInput />
    </BpkCheckboxV2.Root>
  </BpkFlex>
);

/*
 * RTL Spike Option 2 — After (with BpkProvider)
 *
 * BpkCheckboxV2 rendered INSIDE BpkProvider (Option 2 applied).
 * BpkProvider's LocaleProvider derives direction from document.documentElement[dir]
 * reactively, so toggling the Storybook RTL toolbar updates the Ark layout.
 *
 * To validate: toggle the Storybook direction (RTL toolbar or html[dir="rtl"]).
 * Expected: indicator and label mirror to the correct RTL position without page reload.
 */
export const RtlOption2AfterExample = () => (
  <BpkProvider>
    <BpkFlex direction="column" gap={BpkSpacing.SM}>
      <BpkCheckboxV2.Root defaultChecked>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>خيار محدد مسبقاً</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>
      <BpkCheckboxV2.Root>
        <BpkCheckboxV2.Control>
          <BpkCheckboxV2.Indicator />
        </BpkCheckboxV2.Control>
        <BpkCheckboxV2.Label>خيار غير محدد</BpkCheckboxV2.Label>
        <BpkCheckboxV2.HiddenInput />
      </BpkCheckboxV2.Root>
    </BpkFlex>
  </BpkProvider>
);
