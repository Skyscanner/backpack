import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@kadira/storybook';
import BpkParagraph from 'bpk-component-paragraph';
import BpkContentContainer from 'bpk-component-content-container';

import BpkPopover from './index';

class PopoverContainer extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
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

  render() {
    return (
      <BpkPopover
        target={
          <BpkButton onClick={this.openPopover}>
            Open
          </BpkButton>
        }
        onClose={this.closePopover}
        isOpen={this.state.isOpen}
        closeButtonText="Close"
        {...this.props}
      >
        <BpkContentContainer>
          <BpkParagraph>My popover content.</BpkParagraph>
          <BpkParagraph>Some more popover content.</BpkParagraph>
        </BpkContentContainer>
      </BpkPopover>
    );
  }
}

storiesOf('bpk-component-popover', module)
  .add('Default', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <PopoverContainer />
    </div>
  ))
  .add('With title', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <PopoverContainer title="My popover" />
    </div>
  ))
  .add('With title but close button text', () => (
    <div style={{ height: '1000px', margin: '30px', textAlign: 'center' }}>
      <PopoverContainer title="My popover" closeButtonIcon={false} />
    </div>
  ));
