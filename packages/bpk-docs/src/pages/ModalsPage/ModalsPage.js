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

import modalReadme from 'bpk-component-modal/README.md';

import LoginFormExample from './LoginFormExample';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import Paragraph from '../../components/Paragraph';
import IntroBlurb from '../../components/IntroBlurb';

type Props = {
  buttonText: string,
  children: Node,
  showWidthToggle: boolean,
};

type State = {
  isOpen: boolean,
  hideTitle: boolean,
};

class ModalContainer extends Component<Props, State> {
  static defaultProps = {
    showWidthToggle: true,
  };

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

  toggleWidth = () => {
    this.setState(state => ({
      hideTitle: !state.hideTitle,
    }));
  };

  render() {
    const { buttonText, children, showWidthToggle, ...rest } = this.props;

    return (
      <div>
        <BpkButton onClick={this.onOpen}>{buttonText}</BpkButton>
        <BpkModal
          id="my-modal"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          wide={this.state.hideTitle}
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('portal-target')}
          {...rest}
        >
          <div>{children}</div>
          {showWidthToggle && (
            <div>
              <BpkButtonLink onClick={this.toggleWidth}>
                Toggle width
              </BpkButtonLink>
            </div>
          )}
        </BpkModal>
      </div>
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default modal',
    blurb: [
      <Paragraph>
        The default modal has a title and a close button. On mobile viewports,
        it always occupies the entire screen. On desktop viewports, it comes in
        two widths: regular and wide.
      </Paragraph>,
    ],
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
  {
    id: 'full-screen',
    title: 'Full screen',
    blurb: [
      <Paragraph>Modals are always full screen on mobile.</Paragraph>,
      <Paragraph>
        They can be configured to occupy the full screen on desktop too. This
        should only be used in exceptional circumstances as part of a considered
        workflow.
      </Paragraph>,
    ],
    examples: [
      <ModalContainer
        title="Modal title"
        closeLabel="Close modal"
        buttonText="Open modal"
        fullScreen
        showWidthToggle={false}
      >
        <Paragraph>
          You can put anything you want in here, including forms:
        </Paragraph>
        <LoginFormExample />
      </ModalContainer>,
    ],
  },
];

const blurb = [
  <IntroBlurb>
    Modals are used to display content or views that are separate from the rest
    of the app or page.
  </IntroBlurb>,
];

const ModalsSubPage = ({ ...rest }: { [string]: any }) => (
  <DocsPageBuilder
    title="Modal"
    components={components}
    readme={modalReadme}
    usageTable={{
      dos: [
        'Use for rich or complex content related to the current page.',
        "Make sure it's very easy for users to dismiss them.",
        `Consider how the "Back" action is used. Users should normally be able
        to use this to close a modal and return to the underlying page.`,
      ],
      donts: [
        "Don't use for alerts, errors and confirmations. Use a dialog instead.",
        `Avoid opening dialogs, other modals or popovers from non-full screen modals.
        (It's ok on full-screen modals because in this case they won't be perceived as
        adding too many extra layers or visual noise`,
        `Don't overuse modals as interruptions, as they will get in the way of the
        user's main tasks, and may disrupt context. Never use a full screen modal as an interrupt.`,
        `Don't stack modals. Only one should be open at a time.`,
      ],
    }}
    sassdocId="modals"
    {...rest}
  />
);

const ModalsPage = () => (
  <DocsPageWrapper
    title="Modal"
    blurb={blurb}
    webSubpage={<ModalsSubPage wrapped />}
  />
);

export default ModalsPage;
