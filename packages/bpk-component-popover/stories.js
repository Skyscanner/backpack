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
        id="my-popover"
        target={
          <BpkButton onClick={this.openPopover}>
            Open
          </BpkButton>
        }
        onClose={this.closePopover}
        isOpen={this.state.isOpen}
        label="My popover"
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
  ));
