import React, { Component, PropTypes } from 'react';
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
    const { targetFunction, ...props } = this.props;
    let target = null;
    let openButton = null;

    if (targetFunction != null) {
      target = targetFunction;
      openButton = <BpkButton onClick={this.openPopover}> Open </BpkButton>;
    } else {
      target = <BpkButton onClick={this.openPopover}> Open </BpkButton>;
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
          {...props}
        >
          <BpkContentContainer>
            <BpkParagraph>My popover content.</BpkParagraph>
            <BpkParagraph>Some more popover content.</BpkParagraph>
          </BpkContentContainer>
        </BpkPopover>
      </div>
    );
  }
}

PopoverContainer.defaultProps = {
  targetFunction: null,
};

PopoverContainer.propTypes = {
  targetFunction: PropTypes.string,
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
  ));
