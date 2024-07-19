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

import { ArgsTable } from '@storybook/addon-docs';
import { Title, PRIMARY_STORY } from '@storybook/blocks';

import '../packages/bpk-stylesheets';
import '../packages/bpk-stylesheets/font';
import '../packages/bpk-stylesheets/larken';

import BpkRtlToggle from '../packages/bpk-component-rtl-toggle';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (story, { args }) => {
      let root;
      /**
       * We want to test all Backpack components at 200% text-only zoom, as well as the default 100% which corresponds to the browser (and Percy) root font size (16px)
       * Each component has a story with the zoomEnabled arg set to true, which will be used to test the 200% zoom
       */
      const fontSize = args.zoomEnabled ? '200%' : '100%';
      try {
        root = document?.querySelector(':root');
        (root as HTMLElement).style.setProperty('font-size', fontSize);
      } catch(e) {
        console.error(e);
      }
      return (
        <div>
            {story()}
          <br />
          <BpkRtlToggle />
        </div>
    )},
  ],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
      page: () => (
        <>
          <Title />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      )
    },
  },
  args: {
    zoomEnabled: false,
  }
};

export default preview;
