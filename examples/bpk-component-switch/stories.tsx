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

import { ArgTypes,Title, Markdown } from '@storybook/addon-docs/blocks';

import BpkSwitch from '../../packages/bpk-component-switch/src/BpkSwitch';

import { DefaultExample, SmallExample, MixedExample, ReducedSpaceExample } from './examples';

export default {
  title: 'bpk-component-switch',
  component: BpkSwitch,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            {
              `This component uses a hidden [\`input type=checkbox\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox), so it supports all the same properties as it (for example \`checked\`).`
            }
          </Markdown>
        </>
      )
    },
  },
};

export const Default = DefaultExample;
export const Small = SmallExample;
export const ReducedSpace = ReducedSpaceExample;

export const VisualTest = MixedExample;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  }
}
