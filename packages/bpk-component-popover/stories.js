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
import { cssModules, withDefaultProps } from 'bpk-react-utils';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@storybook/react';
import BpkText from 'bpk-component-text';
import BpkContentContainer from 'bpk-component-content-container';

import BpkPopover, { type BpkPopoverProps as PopoverProps } from './index';

import STYLES from './stories.css';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: 'base',
  tagName: 'p',
  className: getClassName('bpk-popover-paragraph'),
});

type Props = {
  ...$Diff<PopoverProps, { children: Node }>,
  id: string,
  changeProps: boolean,
  targetFunction: ?() => ?HTMLElement,
};

type State = {
  isOpen: boolean,
  showLongContent: boolean,
  changedTarget: ?() => ?HTMLElement,
};

class PopoverContainer extends Component<Props, State> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    changeProps: PropTypes.bool,
    targetFunction: PropTypes.func,
  };

  static defaultProps = {
    changeProps: false,
    targetFunction: null,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
      showLongContent: false,
      changedTarget: null,
    };
  }

  openPopover = () => {
    this.setState({
      isOpen: true,
    });
  };

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  };

  changeContent = () => {
    this.setState({
      showLongContent: true,
    });
  };

  changeTarget = () => {
    const changedTarget = (): ?HTMLElement =>
      document.getElementById('reposition-alt-target');

    this.setState({ changedTarget });
  };

  render() {
    const { targetFunction, changeProps, id, ...rest } = this.props;
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

    const renderTarget: ?Function = (): ?HTMLElement =>
      document.getElementById('popover-container');

    return (
      <div id="popover-container">
        {openButton}
        <BpkPopover
          closeButtonText="Close"
          id={`my-popover-${id}`}
          isOpen={this.state.isOpen}
          label="My popover"
          onClose={this.closePopover}
          renderTarget={renderTarget}
          target={target}
          {...rest}
        >
          <BpkContentContainer>
            <Paragraph>My popover content.</Paragraph>
            <Paragraph>Some more popover content.</Paragraph>
            {changeProps ? (
              <Paragraph>
                <BpkButton onClick={this.changeContent}>
                  Change content
                </BpkButton>
                <BpkButton onClick={this.changeTarget}>Change target</BpkButton>
              </Paragraph>
            ) : null}
            {this.state.showLongContent ? (
              <Paragraph>
                This is some long content. This is some long content. This is
                some long content.
              </Paragraph>
            ) : null}
          </BpkContentContainer>
        </BpkPopover>
      </div>
    );
  }
}

const Spacer = props => (
  <div className={getClassName('bpk-popover-spacer')} {...props} />
);

storiesOf('bpk-component-popover', module)
  .add('Default', () => (
    <Spacer>
      <PopoverContainer id="my-popover-1" />
      <PopoverContainer id="my-popover-2" />
    </Spacer>
  ))
  .add('With label as title', () => (
    <Spacer>
      <PopoverContainer id="my-popover" labelAsTitle />
    </Spacer>
  ))
  .add('With label as title but close button text', () => (
    <Spacer>
      <PopoverContainer id="my-popover" labelAsTitle closeButtonIcon={false} />
    </Spacer>
  ))
  .add('On the side', () => (
    <Spacer>
      <PopoverContainer id="my-popover" placement="right" />
    </Spacer>
  ))
  .add('Attach to external element', () => (
    <Spacer>
      <div id="attachElement">Pop over attached here</div>
      <p>&nbsp; </p>
      <PopoverContainer
        id="my-popover"
        targetFunction={() => document.getElementById('attachElement')}
      />
    </Spacer>
  ))
  .add('Not rendering if external element does not exist', () => (
    <Spacer>
      <div id="attachElement">Popover does not open</div>
      <p>&nbsp; </p>
      <PopoverContainer
        id="my-popover"
        targetFunction={() => document.getElementById('doesNotExist')}
      />
    </Spacer>
  ))
  .add('Repositioning', () => (
    // This story demonstrates the popover repositioning itself when props change (including children).
    <Spacer>
      <Paragraph id="reposition-alt-target" style={{ float: 'right' }}>
        Different target
      </Paragraph>
      <PopoverContainer id="my-popover" changeProps />
    </Spacer>
  ))
  .add('Popper modifiers', () => (
    <Spacer>
      <PopoverContainer
        id="my-popover"
        popperModifiers={{
          flip: { enabled: false },
        }}
      />
    </Spacer>
  ));
