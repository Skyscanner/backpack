import BpkPopover from 'bpk-component-popover';
import BpkButton from 'bpk-component-button';
import BpkParagraph from 'bpk-component-paragraph';
import React, { Component } from 'react';

import popoverReadme from 'bpk-component-popover/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

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

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        TODO
      </BpkParagraph>,
    ],
    examples: [
      <PopoverContainer />,
    ],
  },
];

const PopoverPage = () => <DocsPageBuilder
  title="Popover"
  blurb={[
    <BpkParagraph>
      TODO
    </BpkParagraph>,
  ]}
  components={components}
  readme={popoverReadme}
  sassdocId="popover"
/>;

export default PopoverPage;
