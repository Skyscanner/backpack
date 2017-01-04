import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import { storiesOf } from '@kadira/storybook';

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
      >
        <div>Hello world</div>
      </BpkPopover>
    );
  }
}

storiesOf('bpk-component-popover', module)
  .add('Default', () => (
    <div style={{ height: '2000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PopoverContainer />
    </div>
  ));
