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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkSlidingDrawer from 'bpk-component-drawer';
import BpkButton from 'bpk-component-button';
import { BpkButtonLink } from 'bpk-component-link';

import drawerReadme from 'bpk-component-drawer/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

class DrawerContainer extends Component {
  constructor() {
    super();

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.toggleTitle = this.toggleTitle.bind(this);

    this.state = {
      isOpen: false,
      hideTitle: false,
    };
  }

  onOpen() {
    this.setState({
      isOpen: true,
    });
  }

  onClose() {
    this.setState({
      isOpen: false,
    });
  }

  toggleTitle() {
    this.setState(state => ({
      hideTitle: !state.hideTitle,
    }));
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <div>
        <BpkButton onClick={this.onOpen}>Open Drawer</BpkButton>
        <BpkSlidingDrawer
          id="my-drawer"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Drawer title"
          getApplicationElement={() => document.getElementById('react-mount')}
          hideTitle={this.state.hideTitle}
          {...rest}
        >
          <div>{children}</div>
          <BpkButtonLink onClick={this.toggleTitle}>Toggle show title</BpkButtonLink>
        </BpkSlidingDrawer>
      </div>
    );
  }
}

DrawerContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const components = [
  {
    id: 'default',
    title: 'Default drawer',
    blurb: 'The default drawer has a title and a close button',
    examples: [
      <DrawerContainer
        closeLabel="Close drawer"
      >
        <Paragraph>You can put anything you want in here</Paragraph>
      </DrawerContainer>,
    ],
  },
  {
    id: 'text-button',
    title: 'Text button',
    blurb: [
      <Paragraph>
        Drawers can be configured to display the close button as text - useful for when a close icon
        doesn&apos;t fit the context.
      </Paragraph>,
    ],
    examples: [
      <DrawerContainer
        closeText="Close drawer"
      >
        <Paragraph>You can put anything you want in here</Paragraph>
      </DrawerContainer>,
    ],
  },
];

const DrawerPage = () => (<DocsPageBuilder
  title="Drawers"
  blurb={[
    <Paragraph>
      Sliding drawers are used to display content or views that are separate from the rest of the app or page. When
      triggered, drawers will slide in from the side of the viewport with a backdrop to indicate their separation from
      everything else. On mobile viewports, they leave a sliver of the backdrop visible to allow for easier closing.
    </Paragraph>,
  ]}
  components={components}
  readme={drawerReadme}
/>);

export default DrawerPage;
