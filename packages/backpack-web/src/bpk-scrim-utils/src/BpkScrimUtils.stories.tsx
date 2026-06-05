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


import BpkButton from '../../bpk-component-button';
import { cssModules } from '../../bpk-react-utils';

import BpkScrim from './BpkScrim';
import withScrimmedPortal from './withScrimmedPortal';

import type { Props as withScrimProps } from './withScrim';
import type { Props as withScrimmedPortalProps } from './withScrimmedPortal';
import type { Meta } from '@storybook/react';

import STYLES from './BpkScrimUtils.stories.module.scss';

/*
 * This file is a workaround for Storybook not supporting HOCs API table generation in v7 by creating mock components that can be used to generate the API table
 * They plan on adding support in v8
 * https://github.com/storybookjs/storybook/issues/12558#issuecomment-1288834879
 * @todo remove this file once we upgrade to Storybook v8
 */
const withScrimMock = (props: withScrimProps) => <div />;
const withScrimmedPortalMock = (props: withScrimmedPortalProps) => <div />;

const getClassName = cssModules(STYLES);

const DialogContent = () => (
    <section
        tabIndex={-1}
        role="dialog"
        className={getClassName('bpk-scrim-utils-example__dialog')}>
        <div className={getClassName('bpk-scrim-utils-example__dialog-content')}>
            <div>Dialog content here.</div>
            <BpkButton>Some button</BpkButton>
        </div>
    </section>
)
const DialogContentWithScrim = withScrimmedPortal(DialogContent);

const WithPortalScrimExample = () => (
    <div id="pagewrap">
        <div>
            This element should be hidden from AT by the scrim.
            It should also not be possible to tab to it.
        </div>
        <DialogContentWithScrim
            getApplicationElement={() => document.getElementById('pagewrap')}
            closeOnScrimClick={false}
            containerClassName={getClassName('bpk-scrim-utils-example__dialog-container')}
        />
    </div>
);

const WithCustomElementAndPortalScrimExample = () => (
    <div>
        <div id="portalElement">
            Dialog attached here.
        </div>
        <div id="pagewrap">
            <div>
            This element should be hidden from AT by the scrim.
            It should also not be possible to tab to it.
            </div>
            <DialogContentWithScrim
                getApplicationElement={() => document.getElementById('pagewrap')}
                closeOnScrimClick={false}
                containerClassName={getClassName('bpk-scrim-utils-example__dialog-container')}
                renderTarget={() => document.getElementById('portalElement')}
            />
        </div>
    </div>
)

const meta = {
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
} satisfies Meta;

export default meta;

export const Example = {
  render: () => <WithPortalScrimExample />,
};

export const ExampleWithCustomRenderTarget = {
  render: () => <WithCustomElementAndPortalScrimExample />,
};
