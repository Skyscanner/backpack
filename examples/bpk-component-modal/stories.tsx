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
  WideExample,
  OverflowingExample,
  CloseButtonTextExample,
  LongTitleExample,
  NotFullScreenOnMobileExample,
  FullScreenExample,
  FullScreenOverflowingExample,
  NestedExample,
  NoHeaderExample,
  NoPaddingExample,
  WithAccessoryViewExample,
  ContrastExample,
  ContrastWithCloseButtonTextExample,
} from './examples';

import BpkModal from '@backpack/bpk-component-modal';


export default {
  title: 'bpk-component-modal',
  component: BpkModal,
};

export const Default = DefaultExample;
export const Wide = WideExample;
export const Overflowing = OverflowingExample;
export const CloseButtonText = CloseButtonTextExample;

export const LongTitle = LongTitleExample;

export const NotFullScreenOnMobile = NotFullScreenOnMobileExample;

export const FullScreen = FullScreenExample;

export const FullScreenOverflowing = FullScreenOverflowingExample;

export const Nested = NestedExample;
export const NoHeader = NoHeaderExample;

export const NoPadding = NoPaddingExample;

export const WithAccessoryView = WithAccessoryViewExample;
export const Contrast = ContrastExample;
export const ContrastWithCloseButtonText = ContrastWithCloseButtonTextExample;

// Due to how iframes work we can pass a local url to load the stories above.
// Attempted to use a Custom Iframe component with a react portal and ref to
// render components but it didn't have the desired effect.
const visualWrapper = (id: string, zoomEnabled: boolean = false) => (
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
      {visualWrapper('bpk-component-modal--default')}
      {visualWrapper('bpk-component-modal--contrast')}
      {visualWrapper('bpk-component-modal--long-title')}
      {visualWrapper('bpk-component-modal--with-accessory-view')}
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
      {visualWrapper('bpk-component-modal--default', true)}
      {visualWrapper('bpk-component-modal--contrast', true)}
      {visualWrapper('bpk-component-modal--long-title', true)}
      {visualWrapper('bpk-component-modal--with-accessory-view', true)}
    </>
  ),
  parameters: {
    layout: 'fullscreen',
    percy: {
      waitForTimeout: 10000,
    },
  },
  args: {
    zoomEnabled: true
  },
};
