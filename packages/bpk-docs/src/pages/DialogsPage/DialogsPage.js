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

/* @flow */

import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import BpkDialog from 'bpk-component-dialog';
import BpkButton from 'bpk-component-button';
import { BpkButtonLink } from 'bpk-component-link';

import dialogReadme from 'bpk-component-dialog/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

type Props = {
  children: Node,
};

type State = {
  isOpen: boolean,
};

class DialogContainer extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
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

  render() {
    const { children, ...rest } = this.props;

    return (
      <div>
        <BpkButton onClick={this.onOpen}>Open Dialog</BpkButton>
        <BpkDialog
          closeLabel="Close dialog"
          id="my-dialog"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          renderTarget={() => document.getElementById('application-container')}
          getApplicationElement={() => document.getElementById('portal-target')}
          {...rest}
        >
          <div>{children}</div>
          <BpkButtonLink onClick={this.onClose}>Close dialog</BpkButtonLink>
        </BpkDialog>
      </div>
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default dialog',
    blurb: [
      <Paragraph>
        The default has a title and close icon. Tapping the scrim or close icon
        will dismiss the dialog.
      </Paragraph>,
    ],
    examples: [
      <DialogContainer title="Default Dialog.">
        <Paragraph>You can put anything you want in here.</Paragraph>
      </DialogContainer>,
    ],
  },
  {
    id: 'non-dismissible',
    title: 'Non dismissible',
    blurb: [
      <Paragraph>
        In cases when you want the user to explicitly make or accept the choice,
        this configuration means the dialog has no close icon, and tapping the
        scrim will not dismiss it. Instead, the user must interact with the
        dialog&apos;s content in order to dismiss it.
      </Paragraph>,
    ],
    examples: [
      <DialogContainer dismissible={false}>
        <Paragraph>You can put anything you want in here.</Paragraph>
      </DialogContainer>,
    ],
  },
];

const DialogsPage = () => (
  <DocsPageBuilder
    title="Dialogs"
    blurb={[
      <Paragraph>
        Dialogs inform users about a specific task and may contain critical
        information, or require decisions or acknowledgement. For example:
      </Paragraph>,
      <ul>
        <li>
          Alert dialogs: urgent interruptions which tell users about a situation
          and require acknowledgement.
        </li>
        <li>
          Decision dialogs: which require users to confirm or make a choice.
        </li>
      </ul>,
      <br />,
      <Paragraph>
        Like modals, when triggered, dialogs will emerge from the centre of the
        viewport with a backdrop to indicate their separation from everything
        else. They retain focus until dismissed or a required action has been
        taken. Unlike modals, they are not full screen at mobile size and are
        generally much smaller, containing only concise content. Use dialogs
        sparingly because they are interruptive.
      </Paragraph>,
    ]}
    components={components}
    readme={dialogReadme}
    usageTable={{
      dos: [
        'Use when users are in a certain situation which needs acknowledgement.',
        'Use when users need to confirm or make a choice.',
      ],
      donts: [
        "Don't use when users need to focus on a separate task or gain context of where they are in the UI - use a modal instead.",
      ],
    }}
    sassdocId="dialogs"
  />
);

export default DialogsPage;
