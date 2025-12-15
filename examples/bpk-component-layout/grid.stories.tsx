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

import { ArgTypes, Title, Markdown } from '@storybook/addon-docs/blocks';

import { BpkProvider, BpkGrid } from '../../packages/bpk-component-layout';

import { GridComponentExample, GridItemComponentExample } from './examples';

export default {
  title: 'bpk-component-layout/Grid',
  component: BpkGrid,
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            Notes: `BpkGrid` and `BpkGridItem` are layout primitives for CSS
            grid layouts.
          </Markdown>
        </>
      ),
    },
  },
};

export const Basic = () => <GridComponentExample />;
export const GridItem = () => <GridItemComponentExample />;

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

import { BpkGrid, BpkProvider } from '../../packages/bpk-component-layout';

import {
  BpkGridExample,
  BpkGridSpanExample,
  BpkGridWithItemExample,
  BpkGridResponsiveExample,
} from './grid-examples';

export default {
  title: 'bpk-component-layout/Grid',
  component: BpkGrid,
  decorators: [
    (Story: any) => (
      <BpkProvider>
        <Story />
      </BpkProvider>
    ),
  ],
};

export const Default = BpkGridExample;
export const Span = BpkGridSpanExample;
export const WithItem = BpkGridWithItemExample;
export const Responsive = BpkGridResponsiveExample;
