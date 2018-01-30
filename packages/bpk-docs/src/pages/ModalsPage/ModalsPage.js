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

import React, { Component, type Node } from 'react';
import BpkModal from 'bpk-component-modal';
import BpkButton from 'bpk-component-button';
import { BpkButtonLink } from 'bpk-component-link';

import modalReadme from 'bpk-component-modal/readme.md';

import LoginFormExample from './LoginFormExample';
import DocsPageBuilder from './../../components/DocsPageBuilder';
import Paragraph from './../../components/Paragraph';

type Props = {
  buttonText: string,
  children: Node,
};

type State = {
  isOpen: boolean,
  hideTitle: boolean,
};

class ModalContainer extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      hideTitle: false,
      fullScreen: false,
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

  toggleWidth = () => {
    this.setState(state => ({
      hideTitle: !state.hideTitle,
    }));
  };

  fullScreen = () => {
    this.setState(state => ({
      fullScreen: !state.fullScreen,
    }));
  };

  render() {
    const { buttonText, children, ...rest } = this.props;

    return (
      <div>
        <BpkButton onClick={this.onOpen}>{buttonText}</BpkButton>
        <BpkModal
          id="my-modal"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          wide={this.state.hideTitle}
          fullScreen={this.state.fullScreen}
          getApplicationElement={() =>
            document.getElementById('application-container')
          }
          renderTarget={() => document.getElementById('portal-taget')}
          {...rest}
        >
          <div>{children}</div>
          <div>
            <BpkButtonLink onClick={this.toggleWidth}>
              Toggle width
            </BpkButtonLink>
          </div>
          <div>
            <BpkButtonLink onClick={this.fullScreen}>Full screen</BpkButtonLink>
          </div>
        </BpkModal>
      </div>
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default modal',
    blurb:
      'The default modal has a title and a close button. On mobile viewports, it always occupies the entire screen. On desktop viewports, it comes in two widths: regular and wide, or can be configured to open in full screen.',
    examples: [
      <ModalContainer
        title="Modal title"
        closeLabel="Close modal"
        buttonText="Open modal"
      >
        <Paragraph>
          You can put anything you want in here, including forms:
        </Paragraph>
        <LoginFormExample />
      </ModalContainer>,
    ],
  },
  {
    id: 'text-button',
    title: 'Text button',
    blurb: [
      <Paragraph>
        Modals can be configured to display the close button as text - useful
        for when a close icon doesn&apos;t fit the context.
      </Paragraph>,
    ],
    examples: [
      <ModalContainer
        title="Modal title"
        closeText="Done"
        buttonText="Open modal"
      >
        <Paragraph>
          You can put anything you want in here, including forms:
        </Paragraph>
        <LoginFormExample />
      </ModalContainer>,
    ],
  },
];

const ModalsPage = () => (
  <DocsPageBuilder
    title="Modals"
    blurb={[
      <Paragraph>
        Modals are used to display content or views that are separate from the
        rest of the app or page. When triggered, modals will emerge from the
        centre of the viewport with a backdrop to indicate their separation from
        everything else.
      </Paragraph>,
    ]}
    components={components}
    readme={modalReadme}
    usageTable={{
      dos: [
        'Use when users need to regain context of where they are in the UI.',
        'Use when users need to focus on a separate task/information in relation to their current goal.',
      ],
      donts: [
        "Don't use for alerts, errors and confirmations - use a dialog instead.",
        `Don't overuse modals as interruptions, as they will get in the way of the
      user's main tasks, and may disrupt context.`,
      ],
    }}
    sassdocId="modals"
  />
);

export default ModalsPage;
