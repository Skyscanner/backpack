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

import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import BpkPopover from 'bpk-component-popover';
import BpkInput, { withOpenEvents } from 'bpk-component-input';
import BpkRouterLink from 'bpk-component-router-link';
import popoverReadme from 'bpk-component-popover/readme.md';

import * as ROUTES from '../../constants/routes';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';
import Code from '../../components/Code';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar leo in gravida varius.
Mauris eget euismod mi. Ut vulputate ex nec consequat sollicitudin. Pellentesque pulvinar ac dolor vel hendrerit.
Maecenas sed felis justo. Proin at tellus in urna molestie blandit. Duis posuere urna nec finibus imperdiet.`;

const EnhancedInput = withOpenEvents(BpkInput);

class PopoverContainer extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  openPopover = () => {
    this.setState({
      isOpen: true,
    });
  };

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    /* eslint-disable react/prop-types */
    const { input, ...rest } = this.props;
    return (
      <BpkPopover
        id="my-popover"
        target={
          input ? (
            <EnhancedInput
              id="input"
              name="input"
              value="Open"
              isOpen={this.state.isOpen}
              onOpen={this.openPopover}
              onChange={() => null}
            />
          ) : (
            <BpkButton onClick={this.openPopover}>Open</BpkButton>
          )
        }
        onClose={this.closePopover}
        isOpen={this.state.isOpen}
        label="My popover"
        closeButtonText="Close"
        renderTarget={() => document.getElementById('portal-target')}
        {...rest}
      />
    );
    /* eslint-enable react/prop-types */
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <Paragraph>
        By default, popovers come with a small textual close button at the
        bottom.
      </Paragraph>,
    ],
    examples: [<PopoverContainer>{loremIpsum}</PopoverContainer>],
  },
  {
    id: 'with-title',
    title: 'With title',
    blurb: [
      <Paragraph>
        Popovers can be configured to have a title, this is displayed at the top
        opposite a close button.
      </Paragraph>,
    ],
    examples: [<PopoverContainer labelAsTitle>{loremIpsum}</PopoverContainer>],
  },
  {
    id: 'with-title-and-text-button',
    title: 'With title & text button',
    blurb: [
      <Paragraph>
        As above, but with the close button displayed as text.
      </Paragraph>,
    ],
    examples: [
      <PopoverContainer labelAsTitle closeButtonIcon={false}>
        {loremIpsum}
      </PopoverContainer>,
    ],
  },
  {
    id: 'from-input',
    title: 'Opened by an input',
    blurb: [
      <Paragraph>
        You can use a <BpkRouterLink to={ROUTES.FORM}>BpkInput</BpkRouterLink>{' '}
        enhanced with the <Code>withOpenEvents</Code> higher-order component to
        open popovers.
      </Paragraph>,
    ],
    examples: [<PopoverContainer input>{loremIpsum}</PopoverContainer>],
  },
];

const blurb = [
  <IntroBlurb>
    Popovers display related content or functionality that is related to a
    particular element.
  </IntroBlurb>,
];

const PopoversSubPage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Popovers"
    components={components}
    readme={popoverReadme}
    usageTable={{
      dos: [
        'Use to provide additional information related to an element on the page.',
        'Use when content is too long for a tooltip.',
        'Use when the user needs to access additional functionality, without losing their current place in the UI.',
        "Use when you want a contextual relationship with an element on screen that a modal or dialog can't provide.",
        'Use for feature prompts / onboarding.',
        'Popovers can be modal and shown on top of a scrim, especially for prompts.',
        'When an element is pressed to open the popover, pressing on the same element should close it again (especially on desktop).',
      ],
      donts: [
        "Don't use for complex content on mobile. In this case, a modal may be a better bet.",
        "Don't use when you want content to be accessed on hover.",
      ],
    }}
    {...rest}
  />
);

const PopoversPage = () => (
  <DocsPageWrapper
    title="Popover"
    blurb={blurb}
    webSubpage={<PopoversSubPage wrapped />}
  />
);

export default PopoversPage;
