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


import BpkDialog from '../../packages/bpk-component-dialog/src/BpkDialog';

import {
  DefaultExample,
  WithPrimaryIconExample,
  WithWarningIconExample,
  WithDestructiveIconExample,
  NotDismissibleExample,
  WithFlareExample,
} from './examples';

export default {
  title: 'bpk-component-dialog',
  component: BpkDialog,
};

export const Default = DefaultExample;
export const WithAPrimaryIcon = WithPrimaryIconExample;
export const WithAWarningIcon = WithWarningIconExample;
export const WithADestructiveIcon = WithDestructiveIconExample;
export const NotDismissible = NotDismissibleExample;
export const WithFlare = WithFlareExample;

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
      <VisualWrapper id="bpk-component-dialog--default" />
      <VisualWrapper id="bpk-component-dialog--with-a-primary-icon" />
      <VisualWrapper id="bpk-component-dialog--with-a-warning-icon" />
      <VisualWrapper id="bpk-component-dialog--with-a-destructive-icon" />
      <VisualWrapper id="bpk-component-dialog--with-flare" />
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
      <VisualWrapper id="bpk-component-dialog--default" zoomEnabled />
      <VisualWrapper id="bpk-component-dialog--with-a-primary-icon" zoomEnabled />
      <VisualWrapper id="bpk-component-dialog--with-a-warning-icon" zoomEnabled />
      <VisualWrapper id="bpk-component-dialog--with-a-destructive-icon" zoomEnabled />
      <VisualWrapper id="bpk-component-dialog--with-flare" zoomEnabled />
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

