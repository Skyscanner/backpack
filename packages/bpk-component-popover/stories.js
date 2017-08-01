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
import { cssModules, withDefaultProps } from 'bpk-react-utils';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@storybook/react';
import BpkText from 'bpk-component-text';
import BpkContentContainer from 'bpk-component-content-container';

import BpkPopover from './index';

import STYLES from './stories.scss';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(
  BpkText,
  {
    textStyle: 'base',
    tagName: 'p',
    className: getClassName('bpk-popover-paragraph'),
  },
);

class PopoverContainer extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      showLongContent: false,
    };

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.changeTarget = this.changeTarget.bind(this);
  }

  openPopover() {
    this.setState({
      isOpen: true,
    });
  }

  closePopover() {
    this.setState({
      isOpen: false,
    });
  }

  changeContent() {
    this.setState({
      showLongContent: true,
    });
  }

  changeTarget() {
    this.setState({
      changedTarget: () => document.getElementById('reposition-alt-target'),
    });
  }

  render() {
    const { targetFunction, changeProps, ...rest } = this.props;
    let target = null;
    let openButton = <BpkButton onClick={this.openPopover}> Open </BpkButton>;

    if (targetFunction != null) {
      target = targetFunction;
    } else if (this.state.changedTarget) {
      target = this.state.changedTarget;
    } else {
      target = openButton;
      openButton = null;
    }
    return (
      <div>
        {openButton}
        <BpkPopover
          id="my-popover"
          target={target}
          onClose={this.closePopover}
          isOpen={this.state.isOpen}
          label="My popover"
          closeButtonText="Close"
          {...rest}
        >
          <BpkContentContainer>
            <Paragraph>My popover content.</Paragraph>
            <Paragraph>Some more popover content.</Paragraph>
            { changeProps
              ? <Paragraph>
                <BpkButton onClick={this.changeContent}>
                    Change content
                </BpkButton>
                <BpkButton onClick={this.changeTarget}>
                    Change target
                </BpkButton>
              </Paragraph>
              : null }
            { this.state.showLongContent
              ? <Paragraph>
                  This is some long content.
                  This is some long content.
                  This is some long content.
                </Paragraph>
              : null }
          </BpkContentContainer>
        </BpkPopover>
      </div>
    );
  }
}

PopoverContainer.propTypes = {
  changeProps: PropTypes.bool,
  targetFunction: PropTypes.func,
};

PopoverContainer.defaultProps = {
  changeProps: false,
  targetFunction: null,
};

storiesOf('bpk-component-popover', module)
  .add('Default', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <PopoverContainer />
    </div>
  ))
  .add('With label as title', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <PopoverContainer labelAsTitle />
    </div>
  ))
  .add('With label as title but close button text', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <PopoverContainer labelAsTitle closeButtonIcon={false} />
    </div>
  ))
  .add('On the side', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <PopoverContainer
        tetherOptions={{
          attachment: 'middle left',
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: true,
            },
          ],
        }}
      />
    </div>
  ))
  .add('Attach to external element', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <div id="attachElement">Pop over attached here</div>
      <p>&nbsp; </p>
      <PopoverContainer targetFunction={() => document.getElementById('attachElement')} />
    </div>
  ))
  .add('Not rendering if external element does not exist', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <div id="attachElement">Popover does not open</div>
      <p>&nbsp; </p>
      <PopoverContainer targetFunction={() => document.getElementById('doesNotExist')} />
    </div>
  ))
  .add('Repositioning', () => (
    // This story demonstrates the popover repositioning itself when props change (including children).
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <Paragraph id="reposition-alt-target" style={{ float: 'right' }}>Different target</Paragraph>
      <PopoverContainer
        changeProps
        tetherOptions={{
          attachment: 'top center',
          constraints: [
            {
              to: document.getElementById('root'),
              attachment: 'together',
              pin: true,
            },
          ],
        }}
      />
    </div>
  ));
