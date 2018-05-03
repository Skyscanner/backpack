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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkDrawer from 'bpk-component-drawer';
import BpkButton from 'bpk-component-button';
import { BpkButtonLink } from 'bpk-component-link';

import drawerReadme from 'bpk-component-drawer/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

class DrawerContainer extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      hideTitle: false,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  toggleTitle = () => {
    this.setState(state => ({
      hideTitle: !state.hideTitle,
    }));
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div>
        <BpkButton onClick={this.onOpen}>Open Drawer</BpkButton>
        <BpkDrawer
          id="my-drawer"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Drawer title"
          getApplicationElement={() =>
            document.getElementById('application-container')
          }
          hideTitle={this.state.hideTitle}
          renderTarget={() => document.getElementById('portal-target')}
          {...rest}
        >
          <div>{children}</div>
          <BpkButtonLink onClick={this.toggleTitle}>
            Toggle show title
          </BpkButtonLink>
        </BpkDrawer>
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
    title: 'Default',
    blurb: 'The default drawer has a title and a close button',
    examples: [
      <DrawerContainer closeLabel="Close drawer">
        <Paragraph>You can put anything you want in here</Paragraph>
      </DrawerContainer>,
    ],
  },
  {
    id: 'text-button',
    title: 'Text button',
    blurb: [
      <Paragraph>
        Drawers can be configured to display the close button as text - useful
        for when a close icon doesn&apos;t fit the context.
      </Paragraph>,
    ],
    examples: [
      <DrawerContainer closeText="Close drawer">
        <Paragraph>You can put anything you want in here</Paragraph>
      </DrawerContainer>,
    ],
  },
];

const blurb = [
  <Paragraph>
    Drawers slide in from the edge of the screen and are used to display content
    on top of the current view.
  </Paragraph>,
];

const DrawerPage = () => (
  <DocsPageBuilder
    title="Drawer"
    blurb={blurb}
    components={components}
    readme={drawerReadme}
  />
);

export default DrawerPage;
