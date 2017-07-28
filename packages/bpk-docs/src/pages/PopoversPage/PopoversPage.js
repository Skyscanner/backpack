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

import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import BpkPopover from 'bpk-component-popover';
import BpkInput, { withOpenEvents } from 'bpk-component-input';
import BpkRouterLink from 'bpk-component-router-link';
import { BpkCode } from 'bpk-component-code';
import popoverReadme from 'bpk-component-popover/readme.md';

import * as ROUTES from './../../constants/routes';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

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

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }

  openPopover() {
    this.setState({
      isOpen: true,
    });
  }

  closePopover() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    /* eslint-disable react/prop-types */
    const { input, ...rest } = this.props;
    return (
      <BpkPopover
        id="my-popover"
        target={
          input ?
            <EnhancedInput
              id="input"
              name="input"
              value="Open"
              isOpen={this.state.isOpen}
              onOpen={this.openPopover}
              onChange={() => null}
            />
          :
            <BpkButton onClick={this.openPopover}>Open</BpkButton>
        }
        onClose={this.closePopover}
        isOpen={this.state.isOpen}
        label="My popover"
        closeButtonText="Close"
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
        By default, popovers come with a small textual close button at the bottom.
      </Paragraph>,
    ],
    examples: [
      <PopoverContainer>{loremIpsum}</PopoverContainer>,
    ],
  },
  {
    id: 'with-title',
    title: 'With title',
    blurb: [
      <Paragraph>
        Popovers can be configured to have a title, this is displayed at the top opposite a close button.
      </Paragraph>,
    ],
    examples: [
      <PopoverContainer labelAsTitle>{loremIpsum}</PopoverContainer>,
    ],
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
      <PopoverContainer labelAsTitle closeButtonIcon={false}>{loremIpsum}</PopoverContainer>,
    ],
  },
  {
    id: 'from-input',
    title: 'Opened by an input',
    blurb: [
      <Paragraph>
        You can use a <BpkRouterLink to={ROUTES.FORMS}>BpkInput</BpkRouterLink> enhanced
        with the <BpkCode>withOpenEvents</BpkCode> higher-order component to open popovers.
      </Paragraph>,
    ],
    examples: [
      <PopoverContainer input>{loremIpsum}</PopoverContainer>,
    ],
  },
];

const PopoversPage = () => <DocsPageBuilder
  title="Popovers"
  blurb={[
    <Paragraph>
      Use popovers to display content or functionality that is related to a particular element in your app or page.
      When opened, popovers will position themselves below the target element and attempt to stay in the viewport at
      all times.
    </Paragraph>,
  ]}
  components={components}
  readme={popoverReadme}
/>;

export default PopoversPage;
