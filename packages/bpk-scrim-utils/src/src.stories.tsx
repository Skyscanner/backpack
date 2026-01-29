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


import {
  WithPortalScrimExample,
  WithCustomElementAndPortalScrimExample
 } from '../../../examples/bpk-scrim-utils/examples';
import { withScrimMock, withScrimmedPortalMock } from '../../../examples/bpk-scrim-utils/stories.utils';

import BpkScrim from "./BpkScrim";

export default {
  title: 'bpk-scrim-utils',
  component: BpkScrim,
  subcomponents: { withScrimMock, withScrimmedPortalMock },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <ArgTypes exclude={['zoomEnabled']} />
          <Markdown>
          {`\`withScrim\` sends all props it receives down to the component, except \`getApplicationElement\` and \`padded\`. It also adds some props that are used for a11y and closing the modal:
          \`dialogRef\` should be set as the ref on the visible container on top of the scrim; it is used to set focus, \`onClose\` , \`isIphone\``}
          </Markdown>
        </>
      )
    }
  }
};

export const Example = WithPortalScrimExample;
export const ExampleWithCustomRenderTarget = WithCustomElementAndPortalScrimExample;
