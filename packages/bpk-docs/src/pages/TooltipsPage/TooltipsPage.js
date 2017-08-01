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
import BpkTooltip from 'bpk-component-tooltip';
import BpkRouterLink from 'bpk-component-router-link';
import tooltipReadme from 'bpk-component-tooltip/readme.md';
import { spacingSm, colorGreen500 } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Heading from './../../components/Heading';
import Paragraph from './../../components/Paragraph';
import STYLES from './tooltips-page.scss';

const getClassName = cssModules(STYLES);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        By default, tooltips come with some padding so all you need to do is drop in some content.
      </Paragraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip"
        target={<Heading level="h3" className={getClassName('bpkdocs-tooltips-page__heading')}>LHR</Heading>}
      >
        London Heathrow
      </BpkTooltip>,
    ],
  },
  {
    id: 'alt-positioning',
    title: 'Alternative positioning',
    blurb: [
      <Paragraph>
        Tooltips can also be positioned to either side of the target element.
      </Paragraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip-2"
        tetherOptions={{
          attachment: 'middle left',
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: true,
            },
          ],
        }}
        target={<Heading level="h3" className={getClassName('bpkdocs-tooltips-page__heading')}>EDI</Heading>}
      >
        Edinburgh
      </BpkTooltip>,
    ],
  },
  {
    id: 'without-padding',
    title: 'Without padding',
    blurb: [
      <Paragraph>
        Tooltips are also available without padding should you wish to display fullwidth content e.g. an image.
      </Paragraph>,
      <Paragraph>
        An example of this can be seen below where a coloured border is included to denote directness for a tooltip
        used on the map.
      </Paragraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip-3"
        padded={false}
        target={<Heading level="h3" className={getClassName('bpkdocs-tooltips-page__heading')}>JFK</Heading>}
      >
        <div
          style={{
            borderBottomWidth: '5px',
            borderBottomColor: colorGreen500,
            borderBottomStyle: 'solid',
            padding: spacingSm,
          }}
        >
          New York John F. Kennedy
        </div>
      </BpkTooltip>,
    ],
  },
];

const TooltipsPage = () => <DocsPageBuilder
  title="Tooltips"
  blurb={[
    <Paragraph>
      Tooltips appear on hover of a particular element and are used to provide additional context/information to the
      user. They generally are text-only and are triggered on pointer based interfaces.
    </Paragraph>,
    <Paragraph>
      By default, <em>tooltips do not work on touch devices</em>. Using tooltips in touch-based interfaces is
      generally bad practise due to the lack of hover state.
      We also don&apos;t recommend using tooltips on interactive elements that can receive focus, such as links,
      buttons, and inputs.
    </Paragraph>,
    <Paragraph>
      Tooltips do not manage focus. If you need to include interactive elements in a tooltip,
      a <BpkRouterLink to={ROUTES.POPOVERS}>popover</BpkRouterLink> might be better suited.
    </Paragraph>,
  ]}
  components={components}
  readme={tooltipReadme}
/>;

export default TooltipsPage;
