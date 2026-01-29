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
  DefaultExample,
  LongTitleExample,
  HeaderNoTitleExample,
  OverflowingExample,
  OverflowingNoTitleExample,
  WideExample,
  WideNoTitleExample,
  NoPaddingExample,
  NoPaddingNoTitleExample,
  FullScreenOnDesktopExample,
  FullScreenOnDesktopNoTitleExample,
  NoFullScreenOnMobileExample,
  NoFullScreenOnMobileNoTitleExample,
  NoHeaderExample,
  MultipleModalsExample,
  ContrastExample,
} from './examples';

import { BpkModalV2 } from '@backpack/bpk-component-modal';


export default {
  title: 'bpk-component-modal-v2',
  component: BpkModalV2,
};

export const Default = DefaultExample;
export const LongTitle = LongTitleExample;
export const NoTitle = HeaderNoTitleExample;
export const Overflowing = OverflowingExample;
export const OverflowingNoTitle = OverflowingNoTitleExample;
export const Wide = WideExample;
export const WideNoTitle = WideNoTitleExample;
export const NoPadding = NoPaddingExample;
export const NoPaddingNoTitle = NoPaddingNoTitleExample;
export const FullScreenOnDesktop = FullScreenOnDesktopExample;
export const FullScreenOnDesktopNoTitle = FullScreenOnDesktopNoTitleExample;
export const NoFullScreenOnMobile = NoFullScreenOnMobileExample;
export const NoFullScreenOnMobileNoTitle = NoFullScreenOnMobileNoTitleExample;
export const NoHeader = NoHeaderExample;
export const MultipleModals = MultipleModalsExample;
export const Contrast = ContrastExample;

// Due to how iframes work we can pass a local url to load the stories above.
// Attempted to use a Custom Iframe component with a react portal and ref to
// render components but it didn't have the desired effect.
const VisualWrapper = ({id, zoomEnabled = false}: {id: string, zoomEnabled?: boolean}) => (
  <div style={{ height: '640px', width: '100%' }}>
    <iframe
      title={`Embedded Storybook ${id}`}
      src={`/iframe.html?id=${id}&viewMode=story&args=zoomEnabled:${zoomEnabled}`}
      aria-label="Embedded Storybook"
      referrerPolicy="origin"
      style={{ height: '100%', width: '100%', border: 0 }}
    />
  </div>
);

// Note that these stories won't work when published to https://backpack.github.io/storybook/
// due to the publicPath containing `/storybook` and the iframe src not including it.
export const VisualTestDefault = {
  render: () => (
    <>
      <VisualWrapper id="bpk-component-modal-v2--default" />
      <VisualWrapper id="bpk-component-modal-v2--contrast" />
      <VisualWrapper id="bpk-component-modal-v2--long-title" />
      <VisualWrapper id="bpk-component-modal-v2--no-title" />
    </>
  ),
  parameters: {
    layout: 'fullscreen',
    percy: {
      waitForTimeout: 10000,
    },
  },
};
export const VisualTestDefaultWithZoom = {
  render: () => (
    <>
      <VisualWrapper id="bpk-component-modal-v2--default" zoomEnabled />
      <VisualWrapper id="bpk-component-modal-v2--contrast" zoomEnabled />
      <VisualWrapper id="bpk-component-modal-v2--long-title" zoomEnabled />
      <VisualWrapper id="bpk-component-modal-v2--no-title" zoomEnabled />
    </>
  ),
  parameters: {
    layout: 'fullscreen',
    percy: {
      waitForTimeout: 10000,
    },
  },
  args: {
    zoomEnabled: true,
  },
};
