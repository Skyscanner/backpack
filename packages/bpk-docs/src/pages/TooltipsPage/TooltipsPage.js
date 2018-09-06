/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import tooltipReadme from 'bpk-component-tooltip/README.md';
import { spacingSm, colorGreen500 } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';
import STYLES from './tooltips-page.css';

const getClassName = cssModules(STYLES);

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        By default, tooltips come with some padding so all you need to do is
        drop in some content.
      </Paragraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip"
        target={
          <Heading
            level="h3"
            className={getClassName('bpkdocs-tooltips-page__heading')}
          >
            LHR
          </Heading>
        }
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
        placement="right"
        target={
          <Heading
            level="h3"
            className={getClassName('bpkdocs-tooltips-page__heading')}
          >
            EDI
          </Heading>
        }
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
        Tooltips are also available without padding should you wish to display
        fullwidth content e.g. an image.
      </Paragraph>,
      <Paragraph>
        An example of this can be seen below where a coloured border is included
        to denote directness for a tooltip used on the map.
      </Paragraph>,
    ],
    examples: [
      <BpkTooltip
        id="my-tooltip-3"
        padded={false}
        target={
          <Heading
            level="h3"
            className={getClassName('bpkdocs-tooltips-page__heading')}
          >
            JFK
          </Heading>
        }
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

const blurb = [
  <IntroBlurb>
    Tooltips appear on hover of a particular element and are used to provide
    additional context/information to the user. They are generally text-only and
    are triggered on pointer based interfaces.
  </IntroBlurb>,
  <Paragraph>
    By design, tooltips do not work on touch devices and is bad practice to do
    so due to the lack of hover state. We also do not recommend using tooltips
    on interactive elements that can receive focus, such as links, buttons, and
    inputs.
  </Paragraph>,
];

const TooltipsSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Tooltips"
    components={components}
    readme={tooltipReadme}
    usageTable={{
      dos: [
        'Use to provide additional information about an element on the page, shown on hover.',
        'Use text only where possible.',
      ],
      donts: [
        "Don't use on touch devices (try using a popover instead).",
        "Don't use for long or complex content or when content includes interaction (try using a popover or modal).",
        "Don't use on interactive elements that can receive focus such as links, buttons and inputs.",
      ],
    }}
    {...rest}
  />
);

const TooltipsPage = () => (
  <DocsPageWrapper
    title="Tooltip"
    blurb={blurb}
    webSubpage={<TooltipsSubPage wrapped />}
  />
);

export default TooltipsPage;
