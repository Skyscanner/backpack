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
  BpkFlex,
  BpkProvider,
  BpkSpacing,
} from '../../../bpk-component-layout';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../../bpk-theming';

import BpkCheckboxV2 from './BpkCheckboxV2';
import {
  checkboxBorderRadiusThemeAttributes,
  checkboxSelectedColorThemeAttributes,
} from './themeAttributes';

import type { Meta } from '@storybook/react';

import STYLES from './BpkCheckboxV2.stories.module.scss';

const SimpleLabelExample = () => (
  <BpkCheckboxV2.Root>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Send me deals</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

const TitleAndSubtitleExample = () => (
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

const InlineLinkInLabelExample = () => (
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

const DefaultCheckedExample = () => (
  <BpkCheckboxV2.Root defaultChecked>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Already opted in</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

const DisabledExample = () => (
  <BpkCheckboxV2.Root disabled>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Unavailable option</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

const DisabledCheckedExample = () => (
  <BpkCheckboxV2.Root disabled defaultChecked>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Mandatory selection</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

const DisabledStatesExample = () => (
  <BpkProvider>
    <BpkFlex direction="column" gap={BpkSpacing.SM}>
      <DisabledCheckedExample />
      <DisabledExample />
    </BpkFlex>
  </BpkProvider>
);

const IndeterminateExample = () => (
  <BpkCheckboxV2.Root checked="indeterminate" onCheckedChange={() => {}}>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>Weekdays (some selected)</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

const InvalidExample = () => (
  <BpkCheckboxV2.Root invalid>
    <BpkCheckboxV2.Control>
      <BpkCheckboxV2.Indicator />
    </BpkCheckboxV2.Control>
    <BpkCheckboxV2.Label>I agree to the terms</BpkCheckboxV2.Label>
    <BpkCheckboxV2.HiddenInput />
  </BpkCheckboxV2.Root>
);

const ThemedExample = () => (
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

const ComposedHertzExample = () => (
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

const MixedExample = () => (
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

const meta = {
  title: 'bpk-component-checkbox-v2',
  component: BpkCheckboxV2.Root,
  decorators: [(Story: any) => <BpkProvider><Story /></BpkProvider>],
} satisfies Meta;

export default meta;

export const SimpleLabel = {
  render: () => <SimpleLabelExample />,
};

export const TitleAndSubtitle = {
  render: () => <TitleAndSubtitleExample />,
};

export const InlineLinkInLabel = {
  render: () => <InlineLinkInLabelExample />,
};

export const DefaultChecked = {
  render: () => <DefaultCheckedExample />,
};

export const Disabled = {
  render: () => <DisabledStatesExample />,
};

export const Indeterminate = {
  render: () => <IndeterminateExample />,
};

export const Invalid = {
  render: () => <InvalidExample />,
};

export const Themed = {
  render: () => <ThemedExample />,
};

export const ComposedHertz = {
  render: () => <ComposedHertzExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
