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
/* eslint-disable react/no-multi-comp */

import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkDialog from 'bpk-component-dialog';
import BpkButton from 'bpk-component-button';
import BpkCheckbox from 'bpk-component-checkbox';
import React, { Component, type Node } from 'react';

import { cssModules, withDefaultProps } from 'bpk-react-utils';

import STYLES from './DialogExamples.css';
import { ParagraphNoMargin } from '../../components/Paragraph';

const getClassName = cssModules(STYLES);

const MarginDiv = withDefaultProps(BpkText, {
  textStyle: 'base',
  tagName: 'p',
  className: getClassName('bpk-docs-dialog-examples-margin-div'),
});

const AlignRight = withDefaultProps('div', {
  className: getClassName('bpk-docs-dialog-examples-align-right'),
});

export class DialogContainer extends Component<
  {
    children: Node,
  },
  {
    isOpen: boolean,
  },
> {
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
          id="default-dialog"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          renderTarget={() => document.getElementById('portal-target')}
          getApplicationElement={() => document.getElementById('pagewrap')}
          {...rest}
        >
          <ParagraphNoMargin>{children}</ParagraphNoMargin>
        </BpkDialog>
      </div>
    );
  }
}

export class NonDismissibleDialogContainer extends Component<
  {},
  {
    isOpen: boolean,
    termsAccepted: boolean,
  },
> {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      termsAccepted: false,
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

  onTermsChange = () => {
    this.setState(prevState => ({
      termsAccepted: !prevState.termsAccepted,
    }));
  };

  render() {
    return (
      <div>
        <BpkButton onClick={this.onOpen}>Open Dialog</BpkButton>
        <BpkDialog
          id="non-dissmissible-dialog"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          renderTarget={() => document.getElementById('portal-target')}
          getApplicationElement={() => document.getElementById('pagewrap')}
          dismissible={false}
          {...this.props}
        >
          <MarginDiv>
            <BpkCheckbox
              name="terms-and-conditions"
              onChange={this.onTermsChange}
              label="Please accept our terms & conditions."
              checked={this.state.termsAccepted}
            />
          </MarginDiv>
          <AlignRight>
            <BpkButton
              onClick={this.onClose}
              disabled={!this.state.termsAccepted}
            >
              Continue
            </BpkButton>
          </AlignRight>
        </BpkDialog>
      </div>
    );
  }
}
