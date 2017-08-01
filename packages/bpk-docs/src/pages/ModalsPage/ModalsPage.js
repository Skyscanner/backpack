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
import BpkModal from 'bpk-component-modal';
import BpkButton from 'bpk-component-button';
import { BpkButtonLink } from 'bpk-component-link';

import modalReadme from 'bpk-component-modal/readme.md';

import LoginFormExample from './LoginFormExample';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

class ModalContainer extends Component {
  constructor() {
    super();

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.toggleWidth = this.toggleWidth.bind(this);

    this.state = {
      isOpen: false,
      wide: false,
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

  toggleWidth() {
    this.setState(state => ({
      wide: !state.wide,
    }));
  }

  render() {
    const { buttonText, children, ...rest } = this.props;

    return (
      <div>
        <BpkButton onClick={this.onOpen}>{buttonText}</BpkButton>
        <BpkModal id="my-modal" isOpen={this.state.isOpen} onClose={this.onClose} wide={this.state.wide} {...rest}>
          <div>{children}</div>
          <BpkButtonLink onClick={this.toggleWidth}>Toggle width</BpkButtonLink>
        </BpkModal>
      </div>
    );
  }
}

ModalContainer.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const components = [
  {
    id: 'default',
    title: 'Default modal',
    blurb: 'The default modal has a title and a close button and comes in 2 widths, regular and wide.',
    examples: [
      <ModalContainer
        title="Modal title"
        closeLabel="Close modal"
        buttonText="Open modal"
        getApplicationElement={() => document.getElementById('react-mount')}
      >
        <Paragraph>You can put anything you want in here, including forms:</Paragraph>
        <LoginFormExample />
      </ModalContainer>,
    ],
  },
  {
    id: 'text-button',
    title: 'Text button',
    blurb: [
      <Paragraph>
        Modals can be configured to display the close button as text - useful for when a close icon
        doesn&apos;t fit the context.
      </Paragraph>,
    ],
    examples: [
      <ModalContainer
        title="Modal title"
        closeText="Done"
        buttonText="Open modal"
        getApplicationElement={() => document.getElementById('react-mount')}
      >
        <Paragraph>You can put anything you want in here, including forms:</Paragraph>
        <LoginFormExample />
      </ModalContainer>,
    ],
  },
];

const ModalsPage = () => <DocsPageBuilder
  title="Modals"
  blurb={[
    <Paragraph>
      Modals are used to display content or views that are separate from the rest of the app or page. When triggered,
      modals will emerge from the centre of the viewport with a backdrop to indicate their separation from everything
      else. On mobile viewports, they occupy the entire screen.
    </Paragraph>,
  ]}
  components={components}
  readme={modalReadme}
  sassdocId="modals"
/>;

export default ModalsPage;
