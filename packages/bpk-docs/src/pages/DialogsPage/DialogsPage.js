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
import BpkDialog from 'bpk-component-dialog';
import BpkButton from 'bpk-component-button';
import { BpkButtonLink } from 'bpk-component-link';

import dialogReadme from 'bpk-component-dialog/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

class DialogContainer extends Component {
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
        <BpkDialog id="my-dialog" isOpen={this.state.isOpen} onClose={this.onClose} wide={this.state.wide} {...rest}>
          <div>{children}</div>
          <BpkButtonLink onClick={this.onClose}>Close dialog</BpkButtonLink>
        </BpkDialog>
      </div>
    );
  }
}

DialogContainer.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const components = [
  {
    id: 'default',
    title: 'Default dialog',
    blurb: [
      <Paragraph>
        The default has a title and close icon. Tapping the scrim or close icon will dismiss the dialog.
      </Paragraph>,
    ],
    examples: [
      <DialogContainer
        title="Dialog title"
        closeLabel="Close dialog"
        buttonText="Open dialog"
        getApplicationElement={() => document.getElementById('application-container')}
      >
        <Paragraph>You can put anything you want in here.</Paragraph>
      </DialogContainer>,
    ],
  },
  {
    id: 'non-dismissible',
    title: 'Non dismissible',
    blurb: [
      <Paragraph>
        In cases when you want the user to explicitly make or accept the choice, this configuration means the dialog
        has no close icon, and tapping the scrim will NOT dismiss it. Instead, the user must interact with the dialogs
        content in order to dismiss it.
      </Paragraph>,
    ],
    examples: [
      <DialogContainer
        title="Dialog title"
        closeLabel="Close dialog"
        dismissible={false}
        buttonText="Open dialog"
        getApplicationElement={() => document.getElementById('application-container')}
      >
        <Paragraph>You can put anything you want in here.</Paragraph>
      </DialogContainer>,
    ],
  },
  {
    id: 'no-title',
    title: 'No title',
    blurb: [
      <Paragraph>
        You can configure the dialog to have no title, only a close icon.
      </Paragraph>,
    ],
    examples: [
      <DialogContainer
        closeLabel="Close dialog"
        buttonText="Open dialog"
        getApplicationElement={() => document.getElementById('application-container')}
      >
        <Paragraph>You can put anything you want in here.</Paragraph>
      </DialogContainer>,
    ],
  },
];

const DialogsPage = () => (<DocsPageBuilder
  title="Dialogs"
  blurb={[
    <Paragraph>
      Dialogs inform users about a specific task and may contain critical information, or require decisions or
      acknowledgement. For example:
    </Paragraph>,
    <ul>
      <li>
        Alert dialogs: urgent interruptions which tell users about a situation and require acknowledgement.
      </li>
      <li>
        Decision dialogs: which require users to confirm or make a choice.
      </li>
    </ul>,
    <br />,
    <Paragraph>
      Like modals, when triggered, dialogs will emerge from the centre of the viewport with a backdrop to
      indicate their separation from everything else and retain focus until dismissed or a required action has
      been taken. Unlike modals, they are not full screen at mobile size and are generally much smaller,
      containing only concise content. Use dialogs sparingly because they are interruptive.
    </Paragraph>,
  ]}
  components={components}
  readme={dialogReadme}
  sassdocId="dialogs"
/>);

export default DialogsPage;
