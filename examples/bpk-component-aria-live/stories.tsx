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
import { ArgTypes, Markdown, Title } from '@storybook/addon-docs/blocks';

import BpkAriaLive from '../../packages/bpk-component-aria-live/src/BpkAriaLive';

import { ChipsExample, SelectExample } from './examples';

export default {
  title: 'bpk-component-aria-live',
  component: BpkAriaLive,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
            {`**Note:** \`aria-relevant\` and \`aria-atomic\` props can also be set.
            \`aria-relevant\` determines what sort of changes should be read out. By default it is \`text\` but can be \`additions\`, \`removals\` or \`all\`. [Read more about \`aria-relevant\` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-relevant).
            \`aria-atomic\` is a boolean which determines whether changes should be read out, or the whole region should be read out. [Read more about \`aria-atomic\` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#Use_Case:_Clock).
            `}
          </Markdown>
        </>
      ),
    },
  },
};

export const Default = () => <ChipsExample />;
export const Visible = () => <SelectExample />;
