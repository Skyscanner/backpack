/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import React, { Component, type Node } from 'react';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import TickIcon from 'bpk-component-icon/lg/tick';
import InfoIcon from 'bpk-component-icon/lg/information-circle';
import TrashIcon from 'bpk-component-icon/lg/trash';
import { storiesOf } from '@storybook/react';
import { cssModules, withDefaultProps } from 'bpk-react-utils';

import STYLES from './stories.scss';

import BpkDialog, { HEADER_ICON_TYPES } from './index';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: 'base',
  tagName: 'p',
  className: getClassName('bpk-dialog-paragraph'),
});

type Props = {
  children: Node,
  dismissible: boolean,
  headerIcon: ?Node,
};

type State = {
  isOpen: boolean,
};

class DialogContainer extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dismissible: PropTypes.bool,
  };

  static defaultProps = {
    dismissible: true,
    headerIcon: null,
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
        <BpkDialog
          closeLabel="Close dialog"
          id="my-dialog"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('dialog-container')}
          headerIcon
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
  .add('With an icon', () => (
    <div>
      <div>
        <span>Default Icon Dialog</span>
        <DialogContainer headerIcon={<TickIcon />} dismissible={false}>
          <Paragraph>
            This is a default dialog with an icon. You can put anything you want
            in here.
          </Paragraph>
        </DialogContainer>
      </div>
      <br />
      <div>
        <span>Warning Icon Dialog</span>
        <DialogContainer
          headerIcon={<InfoIcon />}
          headerIconType={HEADER_ICON_TYPES.warning}
          dismissible={false}
        >
          <Paragraph>
            This is a warning dialog with an icon. You can put anything you want
            in here.
          </Paragraph>
        </DialogContainer>
      </div>
      <br />
      <div>
        <span>Destructive Icon Dialog</span>
        <DialogContainer
          headerIcon={<TrashIcon />}
          headerIconType={HEADER_ICON_TYPES.destructive}
          dismissible={false}
        >
          <Paragraph>
            This is a destructive dialog with an icon. You can put anything you
            want in here.
          </Paragraph>
        </DialogContainer>
      </div>
    </div>
  ))
  .add('Not dismissible', () => (
    <DialogContainer dismissible={false}>
      <Paragraph>
        This is not dismissible. To close it you must bind the `onClose`
        function to a component inside the dialog, like the button below.
      </Paragraph>
    </DialogContainer>
  ))
  .add('With flare', () => (
    <DialogContainer flare dismissible={false}>
      <Paragraph>
        This is a default dialog. You can put anything you want in here.
      </Paragraph>
    </DialogContainer>
  ));
