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

/* @flow */

import PropTypes from 'prop-types';
import React, { Component, type Node } from 'react';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@storybook/react';
import { cssModules, withDefaultProps } from 'bpk-react-utils';

import BpkDialog from './index';

import STYLES from './stories.css';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: 'base',
  tagName: 'p',
  className: getClassName('bpk-dialog-paragraph'),
});

type Props = {
  children: Node,
  dismissible: boolean,
};

type State = {
  isOpen: boolean,
};

class DialogContainer extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dismissible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    dismissible: true,
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
    return (
      <div id="dialog-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open dialog</BpkButton>
        </div>
        <BpkDialog
          closeLabel="Close dialog"
          id="my-dialog"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('dialog-container')}
          {...this.props}
        >
          {this.props.children}
          <BpkButton onClick={this.onClose}>Close</BpkButton>
        </BpkDialog>
      </div>
    );
  }
}

storiesOf('bpk-component-dialog', module)
  .add('Default', () => (
    <DialogContainer>
      <Paragraph>
        This is a default dialog. You can put anything you want in here.
      </Paragraph>
    </DialogContainer>
  ))
  .add('Not dismissible', () => (
    <DialogContainer dismissible={false}>
      <Paragraph>
        This is not dismissible. To close it you must bind the `onClose`
        function to a component inside the dialog, like the button below.
      </Paragraph>
    </DialogContainer>
  ));
