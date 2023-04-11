/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

/* @flow strict */

import PropTypes from 'prop-types';
import { Component } from 'react';
import type { Node } from 'react';

import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkButton from '../../packages/bpk-component-button';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';
import { BpkDialogV2 } from '../../packages/bpk-component-dialog/src/BpkDialogV2';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyDefault,
  tagName: 'p',
  className: getClassName('bpk-dialog-paragraph'),
});

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
    return (
      <div id="dialog-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open dialog</BpkButton>
        </div>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkDialogV2
          id="bpk-dialog-element"
          ariaLabelledby="bpk-dialog-label-my-dialog"
          closeLabel="bpk-dialog-button-close"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          title="Backpack Dialog Element"
          showHeader
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('dialog-container')}
        >
          {this.props.children}
        </BpkDialogV2>
      </div>
    );
  }
}

const DefaultExample = () => (
  <DialogContainer>
    <Paragraph>
      This is a default dialog. You can put anything you want in here.
    </Paragraph>
  </DialogContainer>
);

export default DefaultExample;
