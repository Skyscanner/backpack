/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

import React from 'react';
import BpkPanel from 'bpk-component-panel';

import panelReadme from 'bpk-component-panel/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        This is the default panel type which comes with padding already applied to get you up and running quickly.
      </Paragraph>,
    ],
    examples: [
      <BpkPanel>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: 'As above, but without padding, allowing you to have full-bleed content or roll your own padding.',
    examples: [
      <BpkPanel padded={false}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    ],
  },
  {
    id: 'full-width',
    title: 'Fullwidth',
    blurb: 'This option allows you to make a panel full width, which is especially useful on small viewports.',
    examples: [
      <BpkPanel fullWidth>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkPanel>,
    ],
  },
];

const PanelsPage = () => <DocsPageBuilder
  title="Panel"
  blurb={[
    <Paragraph>
      Panels are useful for housing distinct areas of related content.
      Unlike cards these are not clickable. Be careful not to over use these,
      these should be used sparingly to avoid the UI becoming overly boxy.
    </Paragraph>,
  ]}
  components={components}
  readme={panelReadme}
  sassdocId="panels"
/>;

export default PanelsPage;
