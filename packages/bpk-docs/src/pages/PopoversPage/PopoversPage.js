import React, { Component } from 'react';
import BpkButton from 'bpk-component-button';
import BpkPopover from 'bpk-component-popover';
import BpkParagraph from 'bpk-component-paragraph';
import popoverReadme from 'bpk-component-popover/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar leo in gravida varius.
Mauris eget euismod mi. Ut vulputate ex nec consequat sollicitudin. Pellentesque pulvinar ac dolor vel hendrerit.
Maecenas sed felis justo. Proin at tellus in urna molestie blandit. Duis posuere urna nec finibus imperdiet.`;

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
          <BpkButton onClick={this.openPopover}>Open</BpkButton>
        }
        onClose={this.closePopover}
        isOpen={this.state.isOpen}
        closeButtonText="Close"
        {...this.props}
      />
    );
  }
}

const components = [
  {
    id: 'default',
    title: 'Default',
    blurb: [
      <BpkParagraph>
        By default, popovers come with a small textual close button at the bottom.
      </BpkParagraph>,
    ],
    examples: [
      <PopoverContainer>{loremIpsum}</PopoverContainer>,
    ],
  },
  {
    id: 'with-title',
    title: 'With title',
    blurb: [
      <BpkParagraph>
        Popovers can be configured to have a title, this is displayed at the top opposite a close button.
      </BpkParagraph>,
    ],
    examples: [
      <PopoverContainer title="My popover">{loremIpsum}</PopoverContainer>,
    ],
  },
  {
    id: 'with-title-and-text-button',
    title: 'With title & text button',
    blurb: [
      <BpkParagraph>
        As above, but with the close button displayed as text.
      </BpkParagraph>,
    ],
    examples: [
      <PopoverContainer title="My popover" closeButtonIcon={false}>{loremIpsum}</PopoverContainer>,
    ],
  },
];

const PopoversPage = () => <DocsPageBuilder
  title="Popovers"
  blurb={[
    <BpkParagraph>
      Use popovers to display content or functionality that is related to a particular element in your app or page.
      When opened, popovers will position themselves below the target element and attempt to stay in the viewport at
      all times.
    </BpkParagraph>,
  ]}
  components={components}
  readme={popoverReadme}
  sassdocId="popovers"
/>;

export default PopoversPage;
